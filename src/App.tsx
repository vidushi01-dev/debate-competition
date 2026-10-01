import { lazy, Suspense, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import EventPage from './pages/EventPage';
import Rankings from './pages/Rankings';
import About from './pages/About';
const Admin = lazy(() => import('./pages/Admin'));

const navLink = ({ isActive }: { isActive: boolean }) =>
  `relative px-1 py-1 font-medium transition ${isActive ? 'text-gold after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-gold' : 'text-cream/80 hover:text-gold'}`;

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-maroon text-cream">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:bg-cream focus:p-2 focus:text-ink">Skip to content</a>
      <header className="sticky top-0 z-40 border-b border-gold/25 bg-maroon/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-[clamp(16px,4vw,40px)] py-3">
          <NavLink to="/" className="font-hindi leading-tight text-gold">
            <span className="block text-xl font-bold">अमृतछाया</span>
            <span className="block text-sm">तर्क पीठ</span>
          </NavLink>
          <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
            <NavLink to="/" end className={navLink}>Home</NavLink>
            <NavLink to="/events" className={navLink}>Events</NavLink>
            <NavLink to="/rankings" className={navLink}>Rankings</NavLink>
            <NavLink to="/about" className={navLink}>About</NavLink>
            <NavLink to="/organizer" className="rounded-lg border border-gold px-4 py-2 text-sm font-semibold text-gold transition hover:bg-gold/10">Admin Login</NavLink>
          </nav>
          <button className="rounded-lg border border-gold/50 px-3 py-2 text-gold md:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(o => !o)}>
            <span className="sr-only">Menu</span>☰
          </button>
        </div>
        {open && (
          <nav id="mobile-nav" aria-label="Main" className="flex flex-col gap-1 border-t border-gold/20 px-4 pb-4 md:hidden">
            {[['/', 'Home'], ['/events', 'Events'], ['/rankings', 'Rankings'], ['/about', 'About'], ['/organizer', 'Admin Login']].map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 text-cream/90 hover:bg-gold/10 hover:text-gold">{label}</NavLink>
            ))}
          </nav>
        )}
      </header>
      <main id="main" className="mx-auto max-w-6xl px-[clamp(16px,4vw,40px)] py-[clamp(20px,4vw,48px)]">
        <Suspense fallback={<p className="text-cream/70">Loading…</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:slug" element={<EventPage />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/rankings/:slug" element={<Rankings />} />
            <Route path="/about" element={<About />} />
            <Route path="/organizer" element={<Admin />} />
          </Routes>
        </Suspense>
      </main>
      <footer className="gold-rule mt-16" />
      <p className="pb-8 pt-4 text-center font-hindi text-sm text-gold/70">विचारों से परिवर्तन</p>
    </div>
  );
}
