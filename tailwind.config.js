/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        'ink2': 'var(--ink2)',
        'ink3': 'var(--ink3)',
        'ink4': 'var(--ink4)',
        'ink5': 'var(--ink5)',
        redflag: 'var(--redflag)',
        ok: 'var(--ok)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};