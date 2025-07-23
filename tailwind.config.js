/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary-400)', // CSS 변수 참조
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
        },
        secondary: {
          DEFAULT: '#0A8CC4', // 기존 코드의 #0A8CC4 색상
        },
        danger: {
          DEFAULT: '#ED1515', // 기존 코드의 삭제 관련 색상
        },
        warning: {
          DEFAULT: '#F87209', // 기존 코드의 엘마크/엑셀 관련 색상
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
    },
  },
  plugins: [],
};
