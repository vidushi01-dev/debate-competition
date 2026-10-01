import { FormEvent, useEffect, useMemo, useState } from 'react';
import { api, ApiError, setToken } from '../api';
import { supabase } from '../supabase';
import { EmptyState, GoldButton, OutlineButton, StatusPill } from '../components/ui';

interface ScoreRow { id: number; schoolId: number; participantName: string | null; value: number | null }
interface RoundRow { id: number; stage: string; position: number; maxMarks: number | null; published: boolean; scores: ScoreRow[] }
interface EventRow { id: number; slug: string; nameHi: string; nameEn: string; position: number; rounds: RoundRow[] }
interface SchoolRow { id: number; name: string }
interface Overview { schools: SchoolRow[]; events: EventRow[] }

const input = 'rounded-lg border border-gold/30 bg-cream px-3 py-2 text-ink placeholder:text-ink/40';
const label = 'block text-sm font-medium text-cream/80';

function statusOf(round: RoundRow): 'Published' | 'Draft' | 'Pending' {
  if (round.published) return 'Published';
  return round.scores.length ? 'Draft' : 'Pending';
}

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [loginErr, setLoginErr] = useState('');
  const [data, setData] = useState<Overview>();
  const [view, setView] = useState<'dashboard' | 'schools' | 'scores'>('dashboard');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const load = async () => {
    try { setData(await api<Overview>('/api/admin/overview')); }
    catch (e) { if (e instanceof ApiError && e.status === 401) { setAuthed(false); setToken(null); } else setMsg((e as Error).message); }
  };
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setAuthed(!!data.session); setAuthChecking(false); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setAuthed(!!session));
    return () => listener.subscription.unsubscribe();
  }, []);
  useEffect(() => { if (authed) load(); }, [authed]); // eslint-disable-line

  async function run(fn: () => Promise<void>, successMsg?: string) {
    setBusy(true); setMsg('');
    try { await fn(); await load(); if (successMsg) setMsg(successMsg); }
    catch (e) { if (e instanceof ApiError && e.status === 401) { setAuthed(false); setToken(null); } else setMsg((e as Error).message); }
    finally { setBusy(false); }
  }

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    try {
      const { token } = await api<{ token: string }>('/api/auth/login', { method: 'POST', body: JSON.stringify({ email: f.get('email'), password: f.get('password') }) });
      setToken(token); setAuthed(true); setLoginErr('');
    } catch (err) { setLoginErr((err as Error).message); }
  }

  if (authChecking) return <p className="text-cream/70">Checking organizer session…</p>;

  if (!authed) return (
    <form onSubmit={login} className="mx-auto max-w-sm space-y-4">
      <h1 className="font-display text-3xl font-bold text-gold">Organizer Sign In</h1>
      <label className={label}>Email<input name="email" type="email" required autoComplete="username" className={`${input} mt-1 w-full`} /></label>
      <label className={label}>Password<input name="password" type="password" required autoComplete="current-password" className={`${input} mt-1 w-full`} /></label>
      <p role="alert" className="min-h-6 text-bad">{loginErr}</p>
      <GoldButton type="submit">Sign In</GoldButton>
    </form>
  );
  if (!data) return <p className="text-cream/70">Loading…</p>;

  const totalParticipants = new Set(data.events.flatMap(e => e.rounds.flatMap(r => r.scores.map(s => s.schoolId)))).size;
  const publishedCount = data.events.flatMap(e => e.rounds).filter(r => r.published).length;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-bold text-gold">Organizer Dashboard</h1>
        <nav className="flex flex-wrap gap-2" aria-label="Admin section">
          {(['dashboard', 'schools', 'scores'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} className={`rounded-lg border px-4 py-2 text-sm font-medium capitalize ${view === v ? 'border-gold bg-gold text-maroon' : 'border-gold/30 text-cream/80'}`}>
              {v === 'dashboard' ? 'Dashboard' : v === 'schools' ? 'Manage Schools' : 'Enter Scores'}
            </button>
          ))}
          <button onClick={async () => { await supabase.auth.signOut(); setToken(null); setAuthed(false); }} className="rounded-lg border border-bad/50 px-4 py-2 text-sm font-medium text-bad">Logout</button>
        </nav>
      </div>
      <p role="status" className="mb-4 min-h-6 text-gold">{msg}</p>

      {view === 'dashboard' && (
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[['Total Schools', data.schools.length], ['Events', data.events.length], ['Total Participants', totalParticipants], ['Results Published', publishedCount]].map(([l, v]) => (
              <div key={l as string} className="ornament-corner rounded-2xl border border-gold/30 bg-brown/40 p-5">
                <p className="text-sm text-cream/60">{l}</p>
                <p className="font-display text-3xl font-bold text-gold">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <button onClick={() => setView('schools')} className="rounded-xl border border-gold/30 bg-brown/30 p-5 text-left hover:border-gold"><p className="font-display font-bold text-gold">Manage Schools</p><p className="text-sm text-cream/60">Add / edit / remove schools</p></button>
            <button onClick={() => setView('scores')} className="rounded-xl border border-gold/30 bg-brown/30 p-5 text-left hover:border-gold"><p className="font-display font-bold text-gold">Enter Scores</p><p className="text-sm text-cream/60">Input marks for each round</p></button>
          </div>
        </div>
      )}

      {view === 'schools' && <SchoolsPanel schools={data.schools} busy={busy} run={run} />}
      {view === 'scores' && <ScoresPanel data={data} busy={busy} run={run} setMsg={setMsg} />}
    </div>
  );
}

function SchoolsPanel({ schools, busy, run }: { schools: SchoolRow[]; busy: boolean; run: (fn: () => Promise<void>, m?: string) => Promise<void> }) {
  const [editId, setEditId] = useState<number>();
  const [editName, setEditName] = useState('');
  const [err, setErr] = useState('');
  const check = (n: string, exceptId?: number) => {
    const v = n.trim().replace(/\s+/g, ' ');
    if (!v) return 'Enter a school name.';
    if (v.length > 80) return 'School name must be 80 characters or fewer.';
    if (schools.some(s => s.id !== exceptId && s.name.toLowerCase() === v.toLowerCase())) return 'A school with this name already exists.';
    return '';
  };
  const add = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget, name = String(new FormData(form).get('name') ?? '');
    const e2 = check(name); setErr(e2);
    if (!e2) run(async () => { await api('/api/schools', { method: 'POST', body: JSON.stringify({ name }) }); form.reset(); }, '✓ School added.');
  };
  const save = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const e2 = check(editName, editId); setErr(e2);
    if (!e2) run(async () => { await api(`/api/schools/${editId}`, { method: 'PATCH', body: JSON.stringify({ name: editName }) }); setEditId(undefined); }, '✓ School renamed.');
  };
  const remove = (s: SchoolRow) => { if (confirm(`Remove ${s.name}? Any scores recorded for it will also be deleted.`)) run(async () => { await api(`/api/schools/${s.id}`, { method: 'DELETE' }); }, '✓ School removed.'); };

  return (
    <div className="ornament-corner rounded-2xl border border-gold/30 bg-brown/30 p-6">
      <h2 className="font-display text-2xl font-bold text-gold">Manage Schools</h2>
      <form onSubmit={add} noValidate className="mt-4 flex flex-wrap gap-2">
        <input name="name" maxLength={80} placeholder="New school name" aria-label="New school name" className={`${input} min-w-56 flex-1`} />
        <GoldButton disabled={busy}>Add School</GoldButton>
      </form>
      <p role="alert" className="min-h-6 text-sm text-bad">{err}</p>
      {!schools.length && <EmptyState>No schools yet. Add the first one above.</EmptyState>}
      <ul className="divide-y divide-gold/15">
        {schools.map(s => (
          <li key={s.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
            {editId === s.id ? (
              <form onSubmit={save} noValidate className="flex flex-1 flex-wrap gap-2">
                <input autoFocus maxLength={80} value={editName} onChange={e => setEditName(e.target.value)} aria-label="Edit school name" className={`${input} min-w-56 flex-1`} />
                <GoldButton disabled={busy}>Save</GoldButton>
                <OutlineButton type="button" onClick={() => { setEditId(undefined); setErr(''); }}>Cancel</OutlineButton>
              </form>
            ) : (
              <>
                <span className="text-cream">{s.name}</span>
                <span className="flex gap-4">
                  <button disabled={busy} onClick={() => { setEditId(s.id); setEditName(s.name); setErr(''); }} className="text-gold underline">Edit</button>
                  <button disabled={busy} onClick={() => remove(s)} className="text-bad underline">Remove</button>
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ScoresPanel({ data, busy, run, setMsg }: { data: Overview; busy: boolean; run: (fn: () => Promise<void>, m?: string) => Promise<void>; setMsg: (m: string) => void }) {
  const [eventId, setEventId] = useState(data.events[0]?.id);
  const event = data.events.find(e => e.id === eventId) ?? data.events[0];
  const [roundId, setRoundId] = useState(event?.rounds[0]?.id);
  const round = event?.rounds.find(r => r.id === roundId) ?? event?.rounds[0];

  const [maxMarks, setMaxMarks] = useState('');
  const [rows, setRows] = useState<Record<number, { on: boolean; name: string; value: string }>>({});
  const [errs, setErrs] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!round) return;
    setMaxMarks(round.maxMarks != null ? String(round.maxMarks) : '');
    const r: typeof rows = {};
    for (const s of data.schools) {
      const existing = round.scores.find(sc => sc.schoolId === s.id);
      r[s.id] = { on: !!existing, name: existing?.participantName ?? '', value: existing?.value != null ? String(existing.value) : '' };
    }
    setRows(r); setErrs({});
  }, [round?.id, data]); // eslint-disable-line

  const participating = useMemo(() => data.schools.filter(s => rows[s.id]?.on), [data.schools, rows]);

  if (!event || !round) return <EmptyState>Create at least one event with rounds first.</EmptyState>;

  const saveMax = () => {
    const v = Number(maxMarks);
    if (!maxMarks || !(v > 0)) return setMsg('Enter a maximum marks value greater than 0.');
    run(async () => { await api(`/api/rounds/${round.id}`, { method: 'PATCH', body: JSON.stringify({ maxMarks: v }) }); }, '✓ Maximum marks saved.');
  };

  function validate() {
    const e: Record<number, string> = {};
    const max = round!.maxMarks;
    for (const s of participating) {
      const v = rows[s.id]?.value.trim() ?? '';
      if (!v) e[s.id] = 'Enter marks.';
      else if (!/^\d{1,4}(\.\d{1,2})?$/.test(v)) e[s.id] = 'Numbers only.';
      else if (max != null && +v > max) e[s.id] = `Maximum is ${max}.`;
    }
    setErrs(e); return !Object.keys(e).length;
  }
  const entries = () => participating.map(s => ({ schoolId: s.id, participantName: rows[s.id]?.name.trim() || null, value: rows[s.id]?.value ? +rows[s.id]!.value : null }));

  const save = () => { if (!validate()) return setMsg('Fix the highlighted marks before saving.'); run(async () => { await api(`/api/rounds/${round.id}/scores`, { method: 'PUT', body: JSON.stringify({ entries: entries() }) }); }, `✓ ${round.stage} scores saved.`); };
  const publish = () => {
    if (round.published) { if (!confirm(`Unpublish ${round.stage} results? They will disappear from the public site.`)) return; }
    else { if (!validate()) return setMsg('Fix the highlighted marks before publishing.'); if (!confirm(`Publish ${round.stage} results? These will become visible on the public website.`)) return; }
    run(async () => {
      if (!round.published) await api(`/api/rounds/${round.id}/scores`, { method: 'PUT', body: JSON.stringify({ entries: entries() }) });
      await api(`/api/rounds/${round.id}/publish`, { method: 'POST', body: JSON.stringify({ published: !round.published }) });
    }, round.published ? '✓ Unpublished.' : `✓ ${round.stage} published.`);
  };
  const reset = () => { if (confirm(`Reset ${round.stage} for ${event.nameHi}? This clears all marks entered for this round and cannot be undone.`)) run(async () => { await api(`/api/rounds/${round.id}/reset`, { method: 'POST' }); }, '✓ Round reset.'); };

  const missing = participating.filter(s => rows[s.id]?.value.trim() === '').length;
  const allSelected =
  data.schools.length > 0 &&
  data.schools.every(s => rows[s.id]?.on);

const toggleAll = (checked: boolean) => {
  setRows(r => {
    const updated = { ...r };

    for (const s of data.schools) {
      updated[s.id] = {
        ...updated[s.id],
        on: checked
      };
    }

    return updated;
  });
};

  return (
    <div className="space-y-5">
      <div className="ornament-corner rounded-2xl border border-gold/30 bg-brown/30 p-6">
        <div className="flex flex-wrap gap-4">
          <label className={label}>Event
            <select value={event.id} onChange={e => { const ev = data.events.find(x => x.id === +e.target.value)!; setEventId(ev.id); setRoundId(ev.rounds[0]?.id); }} className={`${input} mt-1`}>
              {data.events.map(e => <option key={e.id} value={e.id}>{e.nameHi} — {e.nameEn}</option>)}
            </select>
          </label>
          <label className={label}>Round
            <select value={round.id} onChange={e => setRoundId(+e.target.value)} className={`${input} mt-1`}>
              {event.rounds.map(r => <option key={r.id} value={r.id}>{r.stage}</option>)}
            </select>
          </label>
          <label className={label}>Maximum Marks
            <span className="mt-1 flex gap-2">
              <input inputMode="numeric" value={maxMarks} onChange={e => setMaxMarks(e.target.value)} className={`${input} w-28`} />
              <OutlineButton type="button" disabled={busy} onClick={saveMax}>Save</OutlineButton>
            </span>
          </label>
          <div className="self-end"><StatusPill status={round.published ? 'Published' : round.scores.length ? 'Draft' : 'Pending'} /></div>
        </div>
      </div>

      {round.maxMarks == null ? <EmptyState>Set the maximum marks above before entering scores for {round.stage}.</EmptyState> : (
        <div className="ornament-corner overflow-x-auto rounded-2xl border border-gold/30 bg-cream text-ink">
          <table className="w-full min-w-[560px] border-collapse">
            <thead><tr className="border-b border-ink/10 text-left text-sm text-ink/60"><th className="p-3">
  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={allSelected}
      onChange={e => toggleAll(e.target.checked)}
      className="h-5 w-5 accent-[var(--gold)]"
    />
    <span>Select All</span>
  </label>
</th><th className="p-3">School</th><th className="p-3">Participant (optional)</th><th className="p-3">Marks (0–{round.maxMarks})</th></tr></thead>
            <tbody>{data.schools.map(s => {
              const row = rows[s.id] ?? { on: false, name: '', value: '' };
              return (
                <tr key={s.id} className="border-b border-ink/5">
                  <td className="p-3"><input type="checkbox" checked={row.on} onChange={e => setRows(r => ({ ...r, [s.id]: { ...row, on: e.target.checked } }))} aria-label={`${s.name} participating`} className="h-5 w-5 accent-[var(--gold)]" /></td>
                  <td className="p-3 font-medium">{s.name}</td>
                  <td className="p-3"><input disabled={!row.on} value={row.name} onChange={e => setRows(r => ({ ...r, [s.id]: { ...row, name: e.target.value } }))} placeholder="Student name" className={`${input} w-full disabled:opacity-40`} /></td>
                  <td className="p-3">
                    <input disabled={!row.on} inputMode="decimal" value={row.value} onChange={e => setRows(r => ({ ...r, [s.id]: { ...row, value: e.target.value } }))} aria-invalid={!!errs[s.id]} className={`${input} w-24 disabled:opacity-40 ${errs[s.id] ? 'border-bad' : ''}`} />
                    {errs[s.id] && <p className="text-xs text-bad">{errs[s.id]}</p>}
                  </td>
                </tr>
              );
            })}</tbody>
          </table>
        </div>
      )}

      {round.maxMarks != null && (
        <div className="ornament-corner rounded-2xl border border-gold/30 bg-brown/30 p-5">
          <p className="font-display font-bold text-gold">Review</p>
          <p className="mt-1 text-sm text-cream/70">{participating.length} school(s) selected · {missing} missing marks · Maximum {round.maxMarks} per school</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <GoldButton disabled={busy} onClick={save}>Save Draft</GoldButton>
            <OutlineButton disabled={busy} onClick={publish} className={round.published ? 'border-bad text-bad hover:bg-bad/10' : ''}>{round.published ? 'Unpublish Round' : 'Publish Round'}</OutlineButton>
            <button disabled={busy} onClick={reset} className="ml-auto text-sm text-bad underline">Reset this round</button>
          </div>
        </div>
      )}
    </div>
  );
}
