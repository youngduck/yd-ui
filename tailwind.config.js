/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      /* FIGMA TOKENS COLORS START */
      colors: {
        primary: {
          DEFAULT: 'var(--primary-400)',
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
        },
      },
      /* FIGMA TOKENS COLORS END */

      /* FIGMA TOKENS START */
      fontSize: {
        'yds-h1': ['48px', { lineHeight: '58px', fontWeight: '600' }],
        'yds-h2': ['40px', { lineHeight: '48px', fontWeight: '600' }],
        'yds-s1': ['24px', { lineHeight: '30px', fontWeight: '600' }],
        'yds-s2': ['24px', { lineHeight: '30px', fontWeight: '500' }],
        'yds-b1': ['18px', { lineHeight: '26px', fontWeight: '400' }],
        'yds-b2': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'yds-c1m': ['12px', { lineHeight: '16px', fontWeight: '500' }],
        'yds-c1r': ['12px', { lineHeight: '16px', fontWeight: '400' }],
        'yds-c2r': ['10px', { lineHeight: '14px', fontWeight: '400' }],
      },
      /* FIGMA TOKENS END */

      /* YDS Font Family : Wanted Sans Variable */
      fontFamily: {
        'yds-wanted': ['Wanted Sans Variable'],
      },
      screens: {
        pcHover: {
          raw: '(hover: hover) and (pointer: fine)',
        },
      },
    },
  },
  plugins: [],
}
