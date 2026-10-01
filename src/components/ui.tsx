import { ReactNode } from 'react';

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="ornament-corner rounded-2xl border border-gold/30 bg-maroon/40 p-10 text-center text-cream/70">
      {children}
    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message?: string;
  onRetry: () => void;
}) {
  return (
    <div
      role="alert"
      className="ornament-corner rounded-2xl border border-bad/50 bg-maroon/40 p-10 text-center"
    >
      <p className="font-display text-lg font-bold text-cream">
        Something went wrong. Please try again.
      </p>

      {message && <p className="mt-1 text-cream/70">{message}</p>}

      <button
        onClick={onRetry}
        className="mt-4 rounded-lg bg-gold px-4 py-2 font-semibold text-maroon transition hover:brightness-110"
      >
        Try again
      </button>
    </div>
  );
}

export function Skeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div aria-busy="true" className="grid gap-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-16 animate-pulse rounded-xl bg-cream/10"
        />
      ))}
    </div>
  );
}

export function StatusPill({
  status,
}: {
  status: 'Published' | 'Draft' | 'Pending';
}) {
  const c =
    status === 'Published'
      ? 'text-ok border-ok'
      : status === 'Draft'
        ? 'text-gold-muted border-gold-muted'
        : 'text-pending border-pending';

  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-xs font-medium ${c}`}
    >
      {status}
    </span>
  );
}

export function GoldButton({
  children,
  ...p
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...p}
      className={`rounded-lg bg-gold px-5 py-2.5 font-semibold text-maroon shadow-sm transition hover:brightness-110 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-50 ${p.className ?? ''}`}
    >
      {children}
    </button>
  );
}

export function OutlineButton({
  children,
  ...p
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...p}
      className={`rounded-lg border border-gold px-5 py-2.5 font-semibold text-gold transition hover:bg-gold/10 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-50 ${p.className ?? ''}`}
    >
      {children}
    </button>
  );
}

export function Podium({
  rows,
  unit,
}: {
  rows: { schoolName: string; value: number }[];
  unit?: string;
}) {
  const top = rows.slice(0, 3);

  if (!top.length) return null;

  const first = top[0];
  const second = top[1];
  const third = top[2];

  return (
    <div className="mt-6 flex flex-col items-center text-center">

      {/* 1st Place */}
      {first && (
        <div className="flex flex-col items-center">
          <div className="text-6xl leading-none">🏆</div>

          <p className="mt-2 text-2xl font-extrabold uppercase tracking-wide text-gold">
            1st Place
          </p>

          <p className="mt-1 max-w-[18rem] text-xl font-extrabold text-cream">
            {first.schoolName}
          </p>

          <p className="mt-1 text-lg font-bold text-gold">
            {first.value}
            {unit ? ` ${unit}` : ''}
          </p>
        </div>
      )}

      {/* 2nd + 3rd Place */}
      <div className="mt-7 grid w-full max-w-2xl grid-cols-2 gap-8">

        {/* 2nd Place */}
        {second && (
          <div className="flex flex-col items-center text-center">
            <div className="text-5xl leading-none">🥈</div>

            <p className="mt-2 text-lg font-extrabold uppercase tracking-wide text-cream">
              2nd Place
            </p>

            <p className="mt-1 max-w-[14rem] text-lg font-extrabold text-cream">
              {second.schoolName}
            </p>

            <p className="mt-1 text-base font-bold text-gold">
              {second.value}
              {unit ? ` ${unit}` : ''}
            </p>
          </div>
        )}

        {/* 3rd Place */}
        {third && (
          <div className="flex flex-col items-center text-center">
            <div className="text-5xl leading-none">🥉</div>

            <p className="mt-2 text-lg font-extrabold uppercase tracking-wide text-cream">
              3rd Place
            </p>

            <p className="mt-1 max-w-[14rem] text-lg font-extrabold text-cream">
              {third.schoolName}
            </p>

            <p className="mt-1 text-base font-bold text-gold">
              {third.value}
              {unit ? ` ${unit}` : ''}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}