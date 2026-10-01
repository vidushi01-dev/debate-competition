import { Link } from 'react-router-dom';
import { EVENTS_META } from '../api';

export default function Events() {
  return (
    <>
      <h1 className="font-display text-center text-4xl font-bold text-gold">Our Events</h1>
      <p className="mt-2 text-center text-cream/70">Three events. One shared vision — The power of ideas.</p>
      <div className="mt-10 grid gap-6">
        {EVENTS_META.map(e => (
          <div key={e.slug} className="ornament-corner flex flex-col items-center justify-between gap-4 rounded-2xl border border-gold/40 bg-brown/40 p-8 sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="font-hindi text-4xl font-bold text-gold">{e.nameHi}</p>
              <p className="mt-1 font-display text-xl text-cream">{e.nameEn}</p>
              <p className="mt-1 text-cream/60">{e.blurb}</p>
            </div>
            <Link to={`/events/${e.slug}`} className="shrink-0 rounded-lg bg-gold px-6 py-3 font-semibold text-maroon transition hover:brightness-110">
              {e.slug === 'swaranjali' ? 'View Details →' : 'View Rounds →'}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
