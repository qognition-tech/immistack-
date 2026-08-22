import colors from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';

/**
 * Immistack design tokens.
 *
 * This file replaced the Tailwind CDN + inlined `tailwind.config` that used to
 * live in index.html. The CDN shipped the full JIT compiler (~300KB,
 * render-blocking, no purge) to every visitor; this config is compiled at build
 * time and purged against the sources listed in `content`.
 *
 * See DESIGN.md for the token table.
 */
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './routes.tsx',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './context/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0B1120',
        navyLight: '#1E293B',
        techBlue: '#3B82F6',
        gold: '#FBBF24', // Amber 400 — backgrounds/accents only, never text on white
        goldLight: '#FEF3C7', // Amber 100
        // Amber 700. Was #D97706 (Amber 600) which is 3.19:1 on white and fails
        // WCAG AA for body text; #B45309 is 5.02:1 and passes.
        goldDark: '#B45309',
        goldVivid: '#FFD700',
        growth: '#10B981',
        // `slate` is both a scale (slate-50 … slate-900, used widely) and a flat
        // brand token (`bg-slate` = the default page background). Setting
        // `slate: '#F8FAFC'` — as the old CDN config did — replaced the whole
        // scale with a string, so every `bg-slate-50` / `text-slate-300` in the
        // codebase silently produced no CSS. Keeping the scale and adding a
        // DEFAULT restores both.
        slate: { ...colors.slate, DEFAULT: '#F8FAFC' },
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        // Was referenced by WaitlistModal and ExitIntentPopup but never defined,
        // so both modals appeared with no animation at all.
        'fade-in-up': 'fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
    },
  },
  plugins: [
    // 3D tilt utilities. `rotate-y-[-6deg]` / `rotate-x-[4deg]` were used in the
    // hero but Tailwind has no `rotate-y`/`rotate-x` utility, so they were
    // silently dropped and the mockup rendered flat.
    plugin(({ matchUtilities }) => {
      matchUtilities(
        {
          'rotate-x': (value) => ({
            '--tw-rotate-x': value,
            transform:
              'rotateX(var(--tw-rotate-x, 0deg)) rotateY(var(--tw-rotate-y, 0deg))',
            transformStyle: 'preserve-3d',
          }),
          'rotate-y': (value) => ({
            '--tw-rotate-y': value,
            transform:
              'rotateX(var(--tw-rotate-x, 0deg)) rotateY(var(--tw-rotate-y, 0deg))',
            transformStyle: 'preserve-3d',
          }),
        },
        { values: { 6: '6deg', 12: '12deg' }, supportsNegativeValues: true },
      );
    }),
  ],
};
