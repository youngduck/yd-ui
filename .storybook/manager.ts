import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming'

const theme = create({
  base: 'dark',
  brandTitle: 'YD-UI',
  brandImage: '/logo.png',
})

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
  },
})
