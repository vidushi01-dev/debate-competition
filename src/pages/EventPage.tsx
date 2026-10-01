import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api, EventSummary, RoundResult, useLive, EVENTS_META } from '../api';
import { EmptyState, ErrorState, Skeleton } from '../components/ui';

function RankTable({
  result,
}: {
  result: Array<{
    rank: number;
    tied?: boolean;
    schoolName: string;
    participantName?: string | null;
    value: number;
  }>;
}) {
  if (!result.length) {
    return (
      <div className="mt-8">
        <EmptyState>No published results yet for this round.</EmptyState>
      </div>
    );
  }

  const showParticipant = result.some((r) => r.participantName);

  return (
    <div className="mt-8 overflow-hidden rounded-3xl border-2 border-gold/50 bg-cream shadow-[0_8px_30px_rgba(58,15,15,0.12)]">

      <div className="border-b border-gold/40 bg-maroon px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-lg font-bold text-gold">
              Round Standings
            </p>

            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cream/70">
              Official results
            </p>
          </div>

          <div className="text-right text-xs uppercase tracking-wider text-cream/60">
            Marks
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-maroon">

          <thead>
            <tr className="border-b border-gold/30 bg-[#EAD8C0] text-left">

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-maroon">
                Rank
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-maroon">
                School
              </th>

              {showParticipant && (
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-maroon">
                  Participant
                </th>
              )}

              <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-[0.15em] text-maroon">
                Marks
              </th>

            </tr>
          </thead>

          <tbody>
            {result.map((r, i) => (
              <tr
                key={`${r.schoolName}-${i}`}
                className={`animate-reveal border-b border-maroon/10 last:border-b-0 ${
                  i < 3
                    ? 'bg-[#F3E3C9]'
                    : i % 2 === 0
                      ? 'bg-cream'
                      : 'bg-[#F2E4D2]'
                }`}
                style={{ animationDelay: `${i * 30}ms` }}
              >

                <td className="px-5 py-5">
                  <div className="flex items-center gap-2">

                    <span className="font-display text-3xl font-bold text-maroon">
                      {r.rank}
                    </span>

                    {r.tied && (
                      <span className="rounded-full border border-maroon/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-maroon/60">
                        Tie
                      </span>
                    )}

                  </div>
                </td>

                <td className="px-5 py-5">
                  <span className="font-display text-xl font-bold text-maroon">
                    {r.schoolName}
                  </span>
                </td>

                {showParticipant && (
                  <td className="px-5 py-5">
                    <span className="text-sm font-medium text-maroon/70">
                      {r.participantName || '—'}
                    </span>
                  </td>
                )}

                <td className="px-5 py-5 text-right">
                  <span className="font-display text-3xl font-bold text-maroon">
                    {r.value}
                  </span>

                  <span className="ml-1 text-sm font-semibold text-maroon/50">
                    pts
                  </span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default function EventPage() {
  const { slug = '' } = useParams();

  const meta = EVENTS_META.find(e => e.slug === slug);

  const loadEvent = useCallback(
    () => api<EventSummary>(`/api/events/${slug}`),
    [slug]
  );

  const {
    data: event,
    error,
    loading,
    reload
  } = useLive(loadEvent);

  const [pos, setPos] = useState<number>();

  const roundPos = pos ?? event?.rounds[0]?.position;

  const loadRound = useCallback(
    () =>
      roundPos
        ? api<RoundResult>(
            `/api/events/${slug}/rounds/${roundPos}`
          )
        : Promise.reject(new Error('no round')),
    [slug, roundPos]
  );

  const round = useLive(loadRound);

  if (!meta) {
    return <EmptyState>Event not found.</EmptyState>;
  }

  if (loading) {
    return <Skeleton rows={3} />;
  }

  if (!event) {
    return <ErrorState message={error} onRetry={reload} />;
  }

  return (
    <>
      <p className="text-cream/60">
        <a
          href="/events"
          className="hover:text-gold"
        >
          ← Back to Events
        </a>
      </p>

      <h1 className="font-hindi mt-2 text-5xl font-bold text-gold">
        {meta.nameHi}
      </h1>

      <p className="font-display text-xl text-cream/80">
        {meta.nameEn}
      </p>

      <div
        className="mt-6 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Round"
      >
        {event.rounds.map(r => (
          <button
            key={r.id}
            role="tab"
            aria-selected={roundPos === r.position}
            onClick={() => setPos(r.position)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
              roundPos === r.position
                ? 'border-gold bg-gold text-maroon'
                : 'border-gold/40 text-cream/80 hover:border-gold'
            }`}
          >
            {r.stage}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {round.loading ? (
          <Skeleton rows={3} />
        ) : round.data ? (
          <RankTable result={round.data.rows} />
        ) : (
          <ErrorState
            message={round.error}
            onRetry={round.reload}
          />
        )}
      </div>
    </>
  );
}