import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '@youngduck/yd-ui',
  description: 'YD-Design System, Tailwind 기반의 UI 라이브러리 사용 가이드',
  base: '/',
  lang: 'ko-KR',
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '시작하기', link: '/guide/installation' },
      { text: '컴포넌트', link: '/components/button' },
      { text: '디자인토큰', link: '/tokens/overview' },
      { text: '패치노트', link: 'https://github.com/youngduck/yd-ui/blob/main/CHANGELOG.md' },
      {
        text: 'Storybook',
        link: 'https://main--690969bfd75edb1c2e672267.chromatic.com/',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '시작하기',
          items: [{ text: '설치', link: '/guide/installation' }],
        },
      ],
      '/tokens/': [
        {
          text: '디자인토큰',
          items: [
            { text: '개요', link: '/tokens/overview' },
            { text: 'Color', link: '/tokens/color' },
            { text: 'Typography', link: '/tokens/typography' },
            { text: 'Spacing & Border', link: '/tokens/spacing' },
          ],
        },
      ],
      '/components/': [
        {
          text: '컴포넌트',
          items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Card', link: '/components/card' },
            { text: 'Input', link: '/components/input' },
            { text: 'CheckBox', link: '/components/checkbox' },
            { text: 'SelectBox', link: '/components/selectbox' },
            { text: 'Chips', link: '/components/chips' },
            { text: 'Table', link: '/components/table' },
            { text: 'HorizonDragScroll', link: '/components/horizon-drag-scroll' },
          ],
        },
        {
          text: '오버레이',
          items: [
            { text: 'Modal', link: '/components/modal' },
            { text: 'Toast', link: '/components/toast' },
            { text: 'ConfirmDialog', link: '/components/confirm-dialog' },
          ],
        },
      ],
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/youngduck/yd-ui',
      },
    ],
    search: {
      provider: 'local',
    },
  },
})
