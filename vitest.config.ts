import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    // 컴포넌트가 DOM·포커스·키보드 이벤트를 다루므로 브라우저 유사 환경이 필요하다
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    // 스타일은 디자인 토큰(CSS)이 담당하고 테스트는 동작·접근성만 검증하므로 CSS는 처리하지 않는다
    css: false,
  },
})
