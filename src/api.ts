import { useCallback, useEffect, useState } from 'react';
import { supabase } from './supabase';
import { grandTotal, eventTotals, rankRound } from './ranking';

export const BASE = '';

export class ApiError extends Error {
  constructor(public status: number, msg: string) { super(msg); }
}

export interface RoundSummary { id: number; stage: string; position: number; published: boolean; maxMarks: number | null }
export interface EventSummary { id: number; slug: string; nameHi: string; nameEn: string; position: number; rounds: RoundSummary[] }
export interface RankedRow { rank: number; tied: boolean; value: number; schoolId: number; schoolName: string; extra: any }
export interface RoundResult { stage: string; isPublished: boolean; maxMarks?: number; rows: RankedRow[] }
export interface EventRankingResult { event: { slug: string; nameHi: string; nameEn: string }; rows: RankedRow[] }
export interface GrandRow { rank: number; tied: boolean; value: number; schoolId: number; schoolName: string; extra: Record<string, number> }

export const EVENTS_META = [
  { slug: 'kurukshetra', nameHi: 'कुरुक्षेत्र', nameEn: 'Parliamentary Debate', blurb: '4 Rounds' },
  { slug: 'gyan-vahini', nameHi: 'ज्ञानवाहिनी', nameEn: 'CD Debate', blurb: '3 Rounds' },
  { slug: 'swaranjali', nameHi: 'स्वरांजलि', nameEn: 'Speech Competition', blurb: '1 Round' },
];

type School = { id: number; name: string };
type EventRow = EventSummary;
type Score = { id: number; schoolId: number; participantName: string | null; value: number | null };
type Round = RoundSummary & { scores: Score[] };

async function requireAdmin() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new ApiError(401, 'Please sign in again.');
  const { data: profile, error } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle();
  if (error || profile?.role !== 'ADMIN') throw new ApiError(401, 'Please sign in again.');
  return user;
}

function fail(error: { message: string } | null, status = 500): never {
  throw new ApiError(status, error?.message ?? 'Something went wrong. Please try again.');
}

async function schools(): Promise<School[]> {
  const { data, error } = await supabase.from('schools').select('id,name').order('name');
  if (error) fail(error);
  return data ?? [];
}

async function events(): Promise<EventRow[]> {
  const { data, error } = await supabase.from('events').select('id,slug,nameHi:name_hi,nameEn:name_en,position,event_rounds(id,stage,position,published,maxMarks:max_marks)').order('position');
  if (error) fail(error);
  return (data ?? []).map((e: any) => ({
    ...e,
    rounds: (e.event_rounds ?? []).sort(
      (a: RoundSummary, b: RoundSummary) => a.position - b.position
    )
  }));
}

async function eventBySlug(slug: string): Promise<EventRow> {
  const { data, error } = await supabase.from('events').select('id,slug,nameHi:name_hi,nameEn:name_en,position,event_rounds(id,stage,position,published,maxMarks:max_marks)').eq('slug', slug).maybeSingle();
  if (error) fail(error);
  if (!data) throw new ApiError(404, 'Event not found.');
  const e: any = data;
  return {
    ...e,
    rounds: (e.event_rounds ?? []).sort(
      (a: RoundSummary, b: RoundSummary) => a.position - b.position
    )
  };
}

async function roundResult(slug: string, position: number): Promise<RoundResult> {
  const event = await eventBySlug(slug);
  const round = event.rounds.find(r => r.position === position);

  if (!round) throw new ApiError(404, 'Round not found.');

  if (!round.published) {
    return {
      stage: round.stage,
      isPublished: false,
      maxMarks: round.maxMarks ?? undefined,
      rows: []
    };
  }

  const { data, error } = await supabase
    .from('scores')
    .select('school_id,participant_name,value,schools!inner(name)')
    .eq('round_id', round.id);

  if (error) fail(error);

  const rows = rankRound(
    (data ?? []).map((s: any) => ({
      schoolId: s.school_id,
      schoolName: s.schools.name,
      participantName: s.participant_name,
      value: s.value
    }))
  );

  return {
    stage: round.stage,
    isPublished: true,
    maxMarks: round.maxMarks ?? undefined,
    rows
  };
}

async function eventRanking(slug: string): Promise<EventRankingResult> {
  const event = await eventBySlug(slug);

  const { data, error } = await supabase
    .from('scores')
    .select('school_id,value,round_id,event_rounds!inner(event_id,published)')
    .eq('event_rounds.event_id', event.id)
    .eq('event_rounds.published', true);

  if (error) fail(error);
  console.log("GRAND SCORE DEBUG:", data);

  const ss = await schools();

  const rounds = event.rounds.map(r => ({
    published: r.published,
    scores: [] as { schoolId: number; value: number | null }[]
  }));

  for (const s of data ?? []) {
  const index = event.rounds.findIndex(r => r.id === s.round_id);

  if (index !== -1) {
    rounds[index].scores.push({
      schoolId: s.school_id,
      value: s.value
    });
  }
}
console.log("GRAND ROUNDS DEBUG:", rounds);

  return {
    event: {
      slug: event.slug,
      nameHi: event.nameHi,
      nameEn: event.nameEn
    },
    rows: eventTotals(ss, rounds)
  };
}

async function grandRanking(): Promise<{ rows: GrandRow[] }> {
  const ss = await schools();
  const es = await events();

  const maps: Record<string, Map<number, number>> = {};

  for (const e of es) {
    const rounds = e.rounds.map(r => ({
      published: r.published,
      scores: [] as { schoolId: number; value: number | null }[]
    }));

    const roundIds = e.rounds.map(r => r.id);

    if (roundIds.length) {
      const { data, error } = await supabase
        .from('scores')
        .select('school_id,round_id,value')
        .in('round_id', roundIds);

      if (error) fail(error);

      for (const s of data ?? []) {
        const index = e.rounds.findIndex(r => r.id === s.round_id);

        if (index !== -1) {
          rounds[index].scores.push({
            schoolId: s.school_id,
            value: s.value
          });
        }
      }
    }
   console.log(
  "GRAND EVENT:",
  e.slug,
  rounds.map((r, i) =>
    `Round ${i + 1}: published=${r.published}, scores=${r.scores.length}`
  ).join(" | ")
);

    const rows = eventTotals(ss, rounds);

    maps[e.slug] = new Map(
      rows.map(r => [r.schoolId, r.value])
    );
  }

  return { rows: grandTotal(ss, maps) };
}

async function adminOverview() {
  await requireAdmin();

  const ss = await schools();
  const es = await events();

  const ids = es.flatMap(e => e.rounds.map(r => r.id));

  let scores: any[] = [];

  if (ids.length) {
    const { data, error } = await supabase
      .from('scores')
      .select('id,round_id,school_id,participant_name,value')
      .in('round_id', ids);

    if (error) fail(error);

    scores = data ?? [];
  }

  return {
    schools: ss,
    events: es.map(e => ({
      ...e,
      rounds: e.rounds.map(r => ({
        ...r,
        scores: scores
          .filter(s => s.round_id === r.id)
          .map(s => ({
            id: s.id,
            schoolId: s.school_id,
            participantName: s.participant_name,
            value: s.value
          }))
      }))
    }))
  };
}

async function parseBody(init: RequestInit) {
  if (!init.body) return {};
  return JSON.parse(String(init.body));
}

export async function api<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  try {
    const method = init.method?.toUpperCase() ?? 'GET';
    const body: any = await parseBody(init);

    if (path === '/api/auth/login' && method === 'POST') {
      const { email, password } = body;

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: String(email).toLowerCase(),
          password
        });

      if (error || !data.session) {
        throw new ApiError(401, 'Incorrect email or password.');
      }

      await requireAdmin();

      return {
        token: data.session.access_token
      } as T;
    }

    if (path === '/api/auth/logout') {
      await supabase.auth.signOut();
      return undefined as T;
    }

    if (path === '/api/events' && method === 'GET') {
      return await events() as T;
    }

    const em = path.match(/^\/api\/events\/([^/]+)$/);

    if (em && method === 'GET') {
      return await eventBySlug(em[1]) as T;
    }

    const rm = path.match(
      /^\/api\/events\/([^/]+)\/rounds\/(\d+)$/
    );

    if (rm && method === 'GET') {
      return await roundResult(
        rm[1],
        Number(rm[2])
      ) as T;
    }

    const rank = path.match(
      /^\/api\/rankings\/([^/]+)$/
    );

    if (rank && method === 'GET') {
      return await eventRanking(rank[1]) as T;
    }

    if (
      path === '/api/rankings/grand/all' &&
      method === 'GET'
    ) {
      return await grandRanking() as T;
    }

    if (
      path === '/api/admin/overview' &&
      method === 'GET'
    ) {
      return await adminOverview() as T;
    }

    await requireAdmin();

    if (
      path === '/api/schools' &&
      method === 'POST'
    ) {
      const name = String(body.name ?? '')
        .trim()
        .replace(/\s+/g, ' ');

      if (!name || name.length > 80) {
        throw new ApiError(
          400,
          'Enter a valid school name.'
        );
      }

      const { data, error } = await supabase
        .from('schools')
        .insert({ name })
        .select('id,name')
        .single();

      if (error) {
        fail(
          error,
          error.code === '23505' ? 409 : 400
        );
      }

      return data as T;
    }

    const schoolPatch = path.match(
      /^\/api\/schools\/(\d+)$/
    );

    if (
      schoolPatch &&
      method === 'PATCH'
    ) {
      const name = String(body.name ?? '')
        .trim()
        .replace(/\s+/g, ' ');

      const { data, error } = await supabase
        .from('schools')
        .update({ name })
        .eq('id', Number(schoolPatch[1]))
        .select('id,name')
        .single();

      if (error) {
        fail(
          error,
          error.code === '23505' ? 409 : 400
        );
      }

      return data as T;
    }

    if (
      schoolPatch &&
      method === 'DELETE'
    ) {
      const { error } = await supabase
        .from('schools')
        .delete()
        .eq(
          'id',
          Number(schoolPatch[1])
        );

      if (error) fail(error);

      return undefined as T;
    }

    const roundPatch = path.match(
      /^\/api\/rounds\/(\d+)$/
    );

    if (
      roundPatch &&
      method === 'PATCH'
    ) {
      const { error } = await supabase
        .from('event_rounds')
        .update({
          max_marks: Number(body.maxMarks)
        })
        .eq(
          'id',
          Number(roundPatch[1])
        );

      if (error) fail(error, 400);

      return { ok: true } as T;
    }

    const scorePath = path.match(
      /^\/api\/rounds\/(\d+)\/scores$/
    );

    if (
      scorePath &&
      method === 'PUT'
    ) {
      const roundId = Number(scorePath[1]);
      const entries = Array.isArray(body.entries)
        ? body.entries
        : [];

      const { data: round, error: re } =
        await supabase
          .from('event_rounds')
          .select('id,max_marks')
          .eq('id', roundId)
          .single();

      if (re) fail(re, 404);

      const max = round.max_marks as number | null;

      for (const e of entries) {
        if (
          e.value != null &&
          (
            e.value < 0 ||
            (
              max != null &&
              e.value > max
            )
          )
        ) {
          throw new ApiError(
            400,
            `Marks cannot exceed the maximum of ${max}.`
          );
        }
      }

      const { data: old, error: oe } =
        await supabase
          .from('scores')
          .select('school_id')
          .eq('round_id', roundId);

      if (oe) fail(oe);

      const keep = new Set(
        entries.map(
          (e: any) => Number(e.schoolId)
        )
      );

      const removeIds = (old ?? [])
        .map(x => x.school_id)
        .filter(id => !keep.has(id));

      if (removeIds.length) {
        const { error } =
          await supabase
            .from('scores')
            .delete()
            .eq('round_id', roundId)
            .in('school_id', removeIds);

        if (error) fail(error);
      }

      if (entries.length) {
        const payload = entries.map(
          (e: any) => ({
            round_id: roundId,
            school_id: Number(e.schoolId),
            participant_name:
              e.participantName ?? null,
            value:
              e.value == null ||
              e.value === ''
                ? null
                : Number(e.value)
          })
        );

        const { error } =
          await supabase
            .from('scores')
            .upsert(
              payload,
              {
                onConflict:
                  'round_id,school_id'
              }
            );

        if (error) fail(error, 400);
      }

      return { saved: true } as T;
    }

    const publish = path.match(
      /^\/api\/rounds\/(\d+)\/publish$/
    );

    if (
      publish &&
      method === 'POST'
    ) {
      const roundId = Number(publish[1]);
      const published = Boolean(
        body.published
      );

      if (published) {
        const { data: r, error: re } =
          await supabase
            .from('event_rounds')
            .select('max_marks')
            .eq('id', roundId)
            .single();

        if (re) fail(re, 404);

        const { data: scores, error: se } =
          await supabase
            .from('scores')
            .select('value')
            .eq('round_id', roundId);

        if (se) fail(se);

        if (r.max_marks == null) {
          throw new ApiError(
            400,
            'Set the maximum marks before publishing.'
          );
        }

        if (!scores?.length) {
          throw new ApiError(
            400,
            'Add at least one participating school before publishing.'
          );
        }

        if (
          scores.some(
            s => s.value == null
          )
        ) {
          throw new ApiError(
            400,
            'Every participating school needs marks before publishing.'
          );
        }
      }

      const { error } =
        await supabase
          .from('event_rounds')
          .update({
            published,
            published_at: published
              ? new Date().toISOString()
              : null
          })
          .eq('id', roundId);

      if (error) fail(error);

      return { published } as T;
    }

    const reset = path.match(
      /^\/api\/rounds\/(\d+)\/reset$/
    );

    if (
      reset &&
      method === 'POST'
    ) {
      const roundId = Number(reset[1]);

      const { error: de } =
        await supabase
          .from('scores')
          .delete()
          .eq('round_id', roundId);

      if (de) fail(de);

      const { error } =
        await supabase
          .from('event_rounds')
          .update({
            published: false,
            published_at: null
          })
          .eq('id', roundId);

      if (error) fail(error);

      return { ok: true } as T;
    }

    throw new ApiError(404, 'Not found.');

  } catch (e) {
    if (e instanceof ApiError) throw e;

    const message =
      e instanceof Error
        ? e.message
        : 'Something went wrong. Please try again.';

    throw new ApiError(500, message);
  }
}

export const setToken = (_t: string | null) => {
  /* Supabase Auth manages the session. */
};

let sessionToken: string | null = null;

supabase.auth
  .getSession()
  .then(({ data }) => {
    sessionToken =
      data.session?.access_token ?? null;
  });

supabase.auth.onAuthStateChange(
  (_event, session) => {
    sessionToken =
      session?.access_token ?? null;
  }
);

export const hasToken = () =>
  sessionToken !== null;

export function useLive<T>(load: () => Promise<T>) {
  const [s, set] = useState<{
    data?: T;
    error?: string;
    loading: boolean;
  }>({ loading: true });

  const run = useCallback(() => {
    load()
      .then(data => {
        set({
          data,
          loading: false,
        });
      })
      .catch(e => {
        set(p => ({
          ...p,
          error: e.message,
          loading: false,
        }));
      });
  }, [load]);

  useEffect(() => {
    run();

    const t = setInterval(run, 30_000);

    return () => {
      clearInterval(t);
    };
  }, [run]);

  return {
    ...s,
    reload: run,
  };
}
