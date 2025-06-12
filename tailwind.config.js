/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFDB58', // 시그니처 노란색
          50: '#FFFDF0',
          100: '#FFF8D1',
          200: '#FFF3B2',
          300: '#FFED93',
          400: '#FFE674',
          500: '#FFDB58', // 기본값
          600: '#FFD12E',
          700: '#FFC700',
          800: '#D6A700',
          900: '#A88400',
          950: '#7A6000',
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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
    },
  },
  plugins: [],
} 