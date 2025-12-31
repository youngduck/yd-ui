import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '@youngduck/yd-ui',
  description: 'YD-Design System, Tailwind 기반의 UI 라이브러리 사용 가이드',
  base: '/',
  lang: 'ko-KR',
  themeConfig: {
    nav: [
      { text: '시작하기', link: '/guide/installation' },
      { text: '컴포넌트', link: '/components/button' },
      { text: '패치노트', link: 'https://github.com/youngduck/yd-ui/blob/main/CHANGELOG.md' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '시작하기',
          items: [{ text: '설치', link: '/guide/installation' }],
        },
      ],
      '/components/': [
        {
          text: '컴포넌트',
          items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Input', link: '/components/input' },
            { text: 'CheckBox', link: '/components/checkbox' },
            { text: 'SelectBox', link: '/components/selectbox' },
            { text: 'Table', link: '/components/table' },
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
