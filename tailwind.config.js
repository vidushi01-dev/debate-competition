export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: {
      maroon: 'var(--maroon)', gold: 'var(--gold)', cream: 'var(--cream)', brown: 'var(--brown)', 'gold-muted': 'var(--gold-muted)',
      ink: 'var(--ink)', ok: 'var(--ok)', bad: 'var(--bad)', pending: 'var(--pending)',
    },
    fontFamily: { display: ['"Playfair Display"', 'Georgia', 'serif'], hindi: ['"Noto Serif Devanagari"', 'serif'], sans: ['Montserrat', 'system-ui', 'sans-serif'] },
    keyframes: {
      sweep: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      reveal: { '0%': { opacity: 0, transform: 'translateY(6px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
    },
    animation: { sweep: 'sweep 2.4s linear infinite', reveal: 'reveal .35s ease-out both' },
  } },
};
