import { Link } from 'react-router-dom';
import { EVENTS_META } from '../api';

function Mandala() {
  return (
    <svg
      viewBox="0 0 500 500"
      className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-[0.08]"
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="250" cy="250" r="210" />
        <circle cx="250" cy="250" r="175" />
        <circle cx="250" cy="250" r="135" />
        <circle cx="250" cy="250" r="95" />
        <circle cx="250" cy="250" r="55" />

        {Array.from({ length: 16 }).map((_, i) => (
          <ellipse
            key={i}
            cx="250"
            cy="100"
            rx="28"
            ry="105"
            transform={`rotate(${i * 22.5} 250 250)`}
          />
        ))}

        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={`p-${i}`}
            d="M250 40 L270 150 L250 205 L230 150 Z"
            transform={`rotate(${i * 45} 250 250)`}
          />
        ))}
      </g>
    </svg>
  );
}

function Peacock() {
  return (
    <svg
      viewBox="0 0 180 90"
      className="mx-auto mt-3 h-14 w-28 text-gold opacity-90"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Body and neck */}
      <path d="M86 68 C76 57 78 40 91 30 C101 22 113 25 116 34 C119 43 112 49 105 46" />

      {/* Head and crest */}
      <path d="M91 30 C88 23 91 16 97 12" />
      <path d="M97 12 L94 7 M97 12 L99 6 M97 12 L103 8" />
      <circle cx="108" cy="32" r="1.5" fill="currentColor" stroke="none" />

      {/* Large feather outline */}
      <path d="M82 54 C62 27 34 17 12 31 C34 31 50 43 61 61" />
      <path d="M78 59 C54 43 32 45 17 59 C39 53 55 61 66 73" />
      <path d="M76 64 C57 59 43 67 37 81 C54 72 66 75 78 81" />

      {/* Feather details */}
      <path d="M28 34 C35 36 40 40 44 46" />
      <path d="M27 57 C37 56 45 59 51 65" />
      <path d="M48 25 C55 31 60 37 63 44" />

      {/* Feet */}
      <path d="M88 68 L84 82 M101 66 L103 81" />
      <path d="M82 82 L89 82 M101 81 L108 81" />
    </svg>
  );
}

function Lotus() {
  return (
    <svg
      viewBox="0 0 220 100"
      className="h-auto w-full"
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M110 82 C72 78 38 62 25 40 C53 39 82 50 110 82Z" />
        <path d="M110 82 C148 78 182 62 195 40 C167 39 138 50 110 82Z" />
        <path d="M110 82 C83 62 68 39 72 17 C96 27 108 52 110 82Z" />
        <path d="M110 82 C137 62 152 39 148 17 C124 27 112 52 110 82Z" />
        <path d="M110 82 C102 52 103 27 110 8 C117 27 118 52 110 82Z" />
        <path d="M44 80 C72 88 148 88 176 80" />
      </g>
    </svg>
  );
}

function EventIcon({ type }: { type: number }) {
  // Kurukshetra — Dhanush
  if (type === 0) {
    return (
      <svg
        viewBox="0 0 100 100"
        className="h-16 w-16"
        aria-hidden="true"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* bow */}
          <path d="M22 20 Q50 50 22 80" />
          <path d="M22 20 Q50 50 78 20" opacity="0.35" />
          <path d="M22 80 Q50 50 78 80" opacity="0.35" />

          {/* bow string */}
          <path d="M22 20 L22 80" />

          {/* arrow */}
          <path d="M29 50 H82" />
          <path d="M82 50 L72 44" />
          <path d="M82 50 L72 56" />

          {/* arrow feathers */}
          <path d="M32 50 L25 43" />
          <path d="M32 50 L25 57" />
        </g>
      </svg>
    );
  }

  // Gyan Vahini — open book
  if (type === 1) {
    return (
      <svg
        viewBox="0 0 100 100"
        className="h-16 w-16"
        aria-hidden="true"
      >
        <g fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 30 Q34 20 50 30 V76 Q34 66 18 76 Z" />
          <path d="M82 30 Q66 20 50 30 V76 Q66 66 82 76 Z" />
          <path d="M50 30 V76" />
          <path d="M27 39 Q38 35 46 40" />
          <path d="M73 39 Q62 35 54 40" />
        </g>
      </svg>
    );
  }

  // Swaranjali — microphone
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-16 w-16"
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* microphone head */}
        <rect x="37" y="16" width="26" height="43" rx="13" />

        {/* microphone stand/body */}
        <path d="M27 48 C27 66 37 75 50 75 C63 75 73 66 73 48" />
        <path d="M50 75 V88" />
        <path d="M37 88 H63" />

        {/* small grille lines */}
        <path d="M42 27 H58" />
        <path d="M41 35 H59" />
        <path d="M41 43 H59" />
      </g>
    </svg>
  );
}

export default function Home() {
  return (
    <div className="relative -mx-[clamp(16px,4vw,40px)] overflow-hidden bg-[#f2e4ca] text-[#341b19]">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-[760px] overflow-hidden bg-[#4b1018]">

        {/* subtle texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(212,175,55,.18) 0 1px, transparent 1px), radial-gradient(circle at 80% 70%, rgba(212,175,55,.12) 0 1px, transparent 1px)',
            backgroundSize: '34px 34px, 46px 46px',
          }}
        />

        {/* warm center glow */}
        <div className="absolute left-1/2 top-[42%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7d2630] opacity-30 blur-3xl" />

        {/* mandala */}
        <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 text-[#d4af37]">
          <Mandala />
        </div>

        {/* ornamental corners */}
        <div className="absolute left-7 top-7 h-28 w-28 border-l border-t border-[#d4af37]/60" />
        <div className="absolute right-7 top-7 h-28 w-28 border-r border-t border-[#d4af37]/60" />
        <div className="absolute bottom-20 left-7 h-28 w-28 border-b border-l border-[#d4af37]/60" />
        <div className="absolute bottom-20 right-7 h-28 w-28 border-b border-r border-[#d4af37]/60" />

        {/* corner flourishes */}
        <div className="absolute left-9 top-9 text-[#d4af37]/70 text-2xl">❧</div>
        <div className="absolute right-9 top-9 -scale-x-100 text-[#d4af37]/70 text-2xl">❧</div>

      
        {/* lotus below peacock */}
        <div className="absolute bottom-10 left-[4%] hidden w-[270px] text-[#d4af37]/50 lg:block">
          <Lotus />
        </div>

        
       

        {/* main content */}
        <div className="relative z-10 mx-auto flex min-h-[760px] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">

          <p className="font-hindi max-w-3xl text-lg leading-relaxed text-[#e9d6a0] md:text-xl">
            "शूरधर्म है अभय दहकते अंगारों पर चलना,
            <br />
            शूरधर्म है शोणित-असि पर धरकर चरण मचलना।"
          </p>

          <p className="mt-4 text-xs uppercase tracking-[0.28em] text-[#e9d6a0]/60">
            राष्ट्रकवि श्री रामधारी सिंह 'दिनकर' के सम्मान में
          </p>

          <div className="mt-12 flex items-center gap-5 text-[#d4af37]/70">
            <span className="h-px w-16 bg-current md:w-28" />
            <span className="text-xl">✦</span>
            <span className="h-px w-16 bg-current md:w-28" />
          </div>

          {/* IMPORTANT: thin, elegant title */}
          <h1
            className="font-hindi mt-5 text-[clamp(3.2rem,8vw,6.3rem)] font-normal leading-[1.05] tracking-tight text-[#e2bc55]"
            style={{
              textShadow: '0 2px 25px rgba(0,0,0,.35)',
            }}
          >
            अमृतछाया
          </h1>

          <p className="font-hindi mt-1 text-[clamp(1.5rem,3vw,2.25rem)] font-normal tracking-wide text-[#f4e9ce]">
            तर्क पीठ
          </p>
          

          <div className="mx-auto mt-5 h-px w-28 bg-[#d4af37]/70" />

          <p className="mt-5 text-sm font-medium tracking-[0.3em] text-[#f4e9ce]/75 md:text-base">
            INTER-SCHOOL DEBATE COMPETITION
          </p>

          <p className="mt-3 max-w-xl text-sm leading-7 text-[#f4e9ce]/55">
            Where thought meets courage, argument meets imagination,
            and every voice has the power to shape an idea.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              to="/rankings"
              className="rounded-full bg-[#d4af37] px-7 py-3.5 text-sm font-bold tracking-wide text-[#421019] shadow-[0_8px_30px_rgba(0,0,0,.25)] transition hover:-translate-y-0.5 hover:brightness-110"
            >
              View Live Rankings
            </Link>

            <Link
              to="/about"
              className="rounded-full border border-[#d4af37]/70 bg-transparent px-7 py-3.5 text-sm font-semibold tracking-wide text-[#e7cc7e] transition hover:bg-[#d4af37]/10"
            >
              Competition Details
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-4 text-[#d4af37]/60">
            <span className="h-px w-20 bg-current" />
            <span>❧</span>
            <span className="h-px w-20 bg-current" />
          </div>
        </div>

        {/* curved transition */}
        <div className="absolute bottom-[-1px] left-[-5%] h-28 w-[110%] rounded-[50%_50%_0_0] bg-[#f2e4ca]" />
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[#b38b2c]">
          <div className="w-32">
            <Lotus />
          </div>
        </div>
      </section>

      {/* =====================================================
          EVENTS
      ====================================================== */}
      <section className="relative bg-[#f2e4ca] px-6 py-24">

        {/* paper texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(93,58,35,.12) .7px, transparent .7px)',
            backgroundSize: '12px 12px',
          }}
        />

        <div className="relative mx-auto max-w-6xl">

          <div className="text-center">
            <p className="text-xs font-bold tracking-[0.35em] text-[#9c7628]">
              THE EVENTS
            </p>

            <h2 className="font-hindi mt-3 text-4xl font-normal text-[#541a20] md:text-5xl">
              हमारे आयोजन
            </h2>

            <p className="mt-1 font-serif text-2xl text-[#6b3b2d]">
              Our Events
            </p>

            <div className="mx-auto mt-5 flex items-center justify-center gap-4 text-[#b38b2c]">
              <span className="h-px w-16 bg-current" />
              <span>✦</span>
              <span className="h-px w-16 bg-current" />
            </div>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#6b5144]">
              Three distinct celebrations of thought, knowledge and expression —
              united by the spirit of meaningful discourse.
            </p>
          </div>

          <div className="mt-16 grid gap-7 md:grid-cols-3">
  {EVENTS_META.map((event, index) => (
    <Link
      key={event.slug}
      to={`/events/${event.slug}`}
      className="group relative bg-[#f8f3e9] px-8 py-10 text-center transition-all duration-500 hover:-translate-y-1"
    >
      {/* very subtle top accent */}
      <div className="mx-auto mb-8 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-[#b38b2c]/40" />
        <span className="text-[10px] text-[#b38b2c]">✦</span>
        <span className="h-px w-8 bg-[#b38b2c]/40" />
      </div>

      {/* quiet emblem */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#b38b2c]/45 bg-[#f3ead9] text-[#8c6a32] transition-all duration-500 group-hover:border-[#b38b2c]/70 group-hover:bg-[#eee2cc]">
        <EventIcon type={index} />
      </div>

      {/* Hindi name */}
      <p className="font-hindi mt-7 text-[1.7rem] font-normal text-[#681d25]">
        {event.nameHi}
      </p>

      {/* English name */}
      <p className="mt-1 font-serif text-lg font-normal text-[#725348]">
        {event.nameEn}
      </p>

      {/* fine divider */}
      <div className="mx-auto my-6 h-px w-10 bg-[#b38b2c]/50" />

      {/* event type */}
      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#9a7937]">
        {event.blurb}
      </p>

      {/* subtle description */}
      {/* event quote */}
      {/* event quote */}
<p className="mx-auto mt-5 max-w-[18rem] text-sm leading-7 text-[#756158]">
  {event.slug === "kurukshetra" &&
    "श्रेय उसका बुद्धि पर चैतन्य उर की जीत; श्रेय मानव की असीमित मानवों से प्रीत।"}

  {event.slug === "gyan-vahini" &&
    "वाणी में ओज हो, विचारों में तेज हो, हृदय में मानवता का संदेश हो।"}

  {event.slug === "swaranjali" &&
    "केवल मनोरंजन न कवि का कर्म होना चाहिए। उसमें उचित उपदेश का भी मर्म होना चाहिए॥"}
</p>

      {/* rounds */}
      <div className="mt-7">
        <span className="font-serif text-2xl text-[#7b5a27]">
          {event.slug === "kurukshetra"
            ? "04"
            : event.slug === "gyan-vahini"
              ? "03"
              : "01"}
        </span>

        <span className="ml-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#8a7166]">
          {event.slug === "swaranjali" ? "Round" : "Rounds"}
        </span>
      </div>

      {/* understated link */}
      <div className="mt-8 border-t border-[#b38b2c]/20 pt-5">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#725348] transition-colors duration-300 group-hover:text-[#681d25]">
          {event.slug === "swaranjali" ? "View Details" : "View Rounds"}
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  ))}
</div>
        </div>
      </section>

      {/* =====================================================
          STANDINGS
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#4b1018] px-6 py-24 text-center">

        <div className="absolute left-0 top-0 h-full w-1/3 opacity-10">
          <Mandala />
        </div>

        <div className="absolute right-0 top-0 h-full w-1/3 rotate-180 opacity-10">
          <Mandala />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">

          <p className="text-xs font-bold tracking-[0.35em] text-[#d4af37]">
            THE CHAMPIONSHIP
          </p>

          <h2 className="font-hindi mt-4 text-4xl font-normal text-[#f2e4ca] md:text-5xl">
            अंतिम परिणाम
          </h2>

          <p className="mt-2 font-serif text-2xl text-[#d4af37]">
            Live Championship Standings
          </p>

          <div className="mx-auto mt-6 flex items-center justify-center gap-4 text-[#d4af37]/70">
            <span className="h-px w-20 bg-current" />
            <span>✦</span>
            <span className="h-px w-20 bg-current" />
          </div>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#f2e4ca]/60">
            Follow every school as the competition unfolds.
            Scores are updated as the championship progresses.
          </p>

          <Link
            to="/rankings"
            className="mt-8 inline-flex rounded-full border border-[#d4af37] px-8 py-3.5 text-sm font-bold tracking-wide text-[#e4c76d] transition hover:bg-[#d4af37] hover:text-[#4b1018]"
          >
            View Final Rankings
          </Link>
        </div>
      </section>
    </div>
  );
}