import { useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, EventRankingResult, GrandRow, useLive, EVENTS_META } from '../api';
import { EmptyState, ErrorState, Podium, Skeleton } from '../components/ui';

function EventTable({ result }: { result: EventRankingResult }) {
  if (!result.rows.length) {
    return (
      <EmptyState>
        No published results yet for {result.event.nameEn}.
      </EmptyState>
    );
  }

  return (
    <>
      <Podium rows={result.rows} unit="pts" />

      <div className="mt-8 overflow-hidden rounded-3xl border-2 border-gold/50 bg-cream shadow-[0_8px_30px_rgba(58,15,15,0.12)]">
        
        <div className="border-b border-gold/40 bg-maroon px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-lg font-bold text-gold">
                {result.event.nameEn}
              </p>

              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cream/70">
                Final standings
              </p>
            </div>

            <div className="text-right text-xs uppercase tracking-wider text-cream/60">
              Marks
            </div>
          </div>
        </div>

        <table className="w-full border-collapse text-maroon">
          <thead>
            <tr className="border-b border-gold/30 bg-[#EAD8C0] text-left">
              
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-maroon">
                Rank
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-maroon">
                School
              </th>

              <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-[0.15em] text-maroon">
                Marks
              </th>

            </tr>
          </thead>

          <tbody>
            {result.rows.map((r, i) => (
              <tr
                key={r.schoolId}
                className={`animate-reveal border-b border-maroon/10 last:border-b-0 ${
                  i < 3
                    ? "bg-[#F3E3C9]"
                    : i % 2 === 0
                      ? "bg-cream"
                      : "bg-[#F2E4D2]"
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
    </>
  );
}

function GrandTable({ rows = [] }: { rows?: GrandRow[] }) {
  if (!rows.length) {
    return <EmptyState>No published results yet.</EmptyState>;
  }

  return (
    <>
      <Podium rows={rows} unit="pts" />

      <div className="mt-8 overflow-hidden rounded-3xl border-2 border-gold/50 bg-cream shadow-[0_8px_30px_rgba(58,15,15,0.12)]">

        <div className="border-b border-gold/40 bg-maroon px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-lg font-bold text-gold">
                Grand Total
              </p>

              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cream/70">
                Overall championship standings
              </p>
            </div>

            <div className="text-right text-xs uppercase tracking-wider text-cream/60">
              Total
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-maroon">

            <thead>
              <tr className="border-b border-gold/30 bg-[#EAD8C0] text-left">

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-maroon">
                  Rank
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-maroon">
                  School
                </th>

                <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.12em] text-maroon">
                  Kurukshetra
                </th>

                <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.12em] text-maroon">
                  Gyan Vahini
                </th>

                <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.12em] text-maroon">
                  Swaranjali
                </th>

                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-[0.15em] text-maroon">
                  Grand Total
                </th>

              </tr>
            </thead>

            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.schoolId}
                  className={`animate-reveal border-b border-maroon/10 last:border-b-0 ${
                    i < 3
                      ? "bg-[#F3E3C9]"
                      : i % 2 === 0
                        ? "bg-cream"
                        : "bg-[#F2E4D2]"
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

                  <td className="px-5 py-5 text-center text-lg font-semibold text-maroon/80">
                    {r.extra.kurukshetra ?? 0}
                  </td>

                  <td className="px-5 py-5 text-center text-lg font-semibold text-maroon/80">
                    {r.extra["gyan-vahini"] ?? 0}
                  </td>

                  <td className="px-5 py-5 text-center text-lg font-semibold text-maroon/80">
                    {r.extra.swaranjali ?? 0}
                  </td>

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
    </>
  );
}

export default function Rankings() {
  const { slug } = useParams();
  const nav = useNavigate();
  const tab: 'grand' | string = slug ?? 'grand';
  const loadGrand = useCallback(() => api<{ rows: GrandRow[] }>('/api/rankings/grand/all'), []);
  // Guarding inside the callback (rather than skipping the hook) keeps hook order stable while
  // avoiding a wasted request when the Grand Total tab is active.
  const loadEvent = useCallback(() => (tab === 'grand' ? Promise.resolve({ event: { slug: 'grand', nameHi: '', nameEn: '' }, rows: [] }) : api<EventRankingResult>(`/api/rankings/${tab}`)), [tab]);
  const grand = useLive(loadGrand);
  const event = useLive(loadEvent);

  return (
    <>
      <h1 className="font-display text-center text-4xl font-bold text-gold">Final Rankings</h1>
      <div className="mt-6 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Ranking view">
        <button role="tab" aria-selected={tab === 'grand'} onClick={() => nav('/rankings')} className={`rounded-lg border px-4 py-2 font-medium ${tab === 'grand' ? 'border-gold bg-gold text-maroon' : 'border-gold/40 text-cream/80'}`}>Grand Total</button>
        {EVENTS_META.map(e => (
          <button key={e.slug} role="tab" aria-selected={tab === e.slug} onClick={() => nav(`/rankings/${e.slug}`)} className={`rounded-lg border px-4 py-2 font-medium ${tab === e.slug ? 'border-gold bg-gold text-maroon' : 'border-gold/40 text-cream/80'}`}>{e.nameHi}</button>
        ))}
      </div>
      <div className="mt-8">
        {tab === 'grand'
          ? grand.loading ? <Skeleton /> : grand.data ? <GrandTable rows={grand.data.rows} /> : <ErrorState message={grand.error} onRetry={grand.reload} />
          : event.loading ? <Skeleton /> : (event.data as EventRankingResult)?.rows ? <EventTable result={event.data as EventRankingResult} /> : <ErrorState message={event.error} onRetry={event.reload} />}
      </div>
    </>
  );
}
