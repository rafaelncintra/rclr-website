/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          DEFAULT: '#F5F2EE',
          50: '#FDFCFB',
          100: '#F5F2EE',
          200: '#EDEAE3',
          300: '#E0DBD2',
          400: '#DDD8D0',
        },
        bark: {
          DEFAULT: '#1A1714',
          light: '#2E2926',
          muted: '#7A6F65',
          faint: '#A89F96',
        },
        terra: {
          DEFAULT: '#C4633A',
          light: '#D4825E',
          dim: '#9E4D2C',
        },
        border: '#DDD8D0',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.2rem, 8vw, 7.5rem)', { lineHeight: '0.93', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 5vw, 4.5rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body-md': ['1rem', { lineHeight: '1.7' }],
        'caption': ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.06em' }],
      },
      spacing: {
        'section': '9rem',
        'section-sm': '5rem',
      },
      maxWidth: {
        'editorial': '1200px',
        'prose-lg': '72ch',
        'prose-md': '62ch',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(26,23,20,0.06), 0 1px 3px rgba(26,23,20,0.04)',
        'card-hover': '0 8px 32px rgba(26,23,20,0.10), 0 2px 8px rgba(26,23,20,0.06)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.9s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
