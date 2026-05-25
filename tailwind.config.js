/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0a0b0d',
        'ink-surface': 'rgba(255,255,255,0.02)',
        'ink-muted': 'rgba(255,255,255,0.04)',
        fg: '#f8f7f3',
        'fg-mid': 'rgba(232,230,225,0.75)',
        'fg-soft': 'rgba(232,230,225,0.55)',
        'fg-dim': 'rgba(232,230,225,0.35)',
        border: 'rgba(255,255,255,0.08)',
        'border-soft': 'rgba(255,255,255,0.05)',
        accent: '#7CFFB2',
        'accent-ink': '#08090b',
        // Light mode
        'light-bg': '#f4f1ea',
        'light-surface': '#fbf9f3',
        'light-fg': '#0e0f12',
        'light-accent': '#1f7e4a',
      },
      fontFamily: {
        sans: ['"Geist"', '"Inter Tight"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Newsreader"', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(4rem, 8vw, 6.5rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
      },
      maxWidth: {
        site: '1280px',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
