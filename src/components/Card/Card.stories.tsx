import { Meta, StoryObj } from '@storybook/react'
import { Card, type CardVariant } from './Card'
import { Stack } from '../Layouts/Stack/Stack'
import { Inline } from '../Layouts/Inline/Inline'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
YD-UI 디자인 시스템의 카드 컴포넌트입니다.

콘텐츠를 담는 면(surface)으로, 테두리로 구분하는 outlined 와 배경색으로 구분하는 filled 두 가지 variant 를 지원합니다.

## 주요 특징
- outlined(테두리, 기본) / filled(배경) 두 가지 variant
- padding, border-radius, 색상은 디자인 토큰에서 일괄 적용
- \`className\` 으로 width, height 등 Tailwind 클래스를 자유롭게 지정 가능
- children 으로 자유롭게 구성 가능

## 사용 가이드
- 어두운 페이지 배경 위에 놓이는 대시보드 타일·패널·폼 컨테이너에는 \`variant="filled"\` 를 사용합니다.
- 배경과 같은 면 위에서 영역만 구분할 때는 \`variant="outlined"\` 를 사용합니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['outlined', 'filled'] as CardVariant[],
      control: { type: 'select' },
      description: 'outlined: 테두리로 구분 / filled: 배경색으로 구분',
    },
    children: {
      control: 'text',
      description: '카드 내용',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스 (크기 지정 등)',
    },
  },
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: args => (
    <Card variant={args.variant} className="w-64">
      <span className="text-yds-b2 text-white">{args.children}</span>
    </Card>
  ),
  args: {
    variant: 'outlined',
    children: '카드 내용',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="bg-background-primary rounded-lg p-8">
      <Inline gap="lg" align="start">
        <Card variant="outlined" className="w-64">
          <Stack gap="sm">
            <span className="text-yds-b1 text-white">Outlined</span>
            <span className="text-yds-c1m text-gray-300">테두리로 영역을 구분합니다.</span>
          </Stack>
        </Card>
        <Card variant="filled" className="w-64">
          <Stack gap="sm">
            <span className="text-yds-b1 text-white">Filled</span>
            <span className="text-yds-c1m text-gray-300">배경색으로 영역을 구분합니다.</span>
          </Stack>
        </Card>
      </Inline>
    </div>
  ),
}

export const DashboardTiles: Story = {
  parameters: {
    docs: {
      description: {
        story: '대시보드 요약 타일처럼 filled 카드를 그리드로 배치하는 예시입니다.',
      },
    },
  },
  render: () => (
    <div className="bg-background-primary rounded-lg p-8">
      <div className="grid w-[640px] grid-cols-3 gap-4">
        {[
          { label: '총 수입', value: '3,200,000원' },
          { label: '총 지출', value: '82,000원' },
          { label: '잔액', value: '3,118,000원' },
        ].map(item => (
          <Card key={item.label} variant="filled">
            <Stack gap="sm">
              <span className="text-yds-c1m text-primary-100">{item.label}</span>
              <span className="text-yds-s2 text-white">{item.value}</span>
            </Stack>
          </Card>
        ))}
      </div>
    </div>
  ),
}

export const WithCustomContent: Story = {
  render: () => (
    <Card variant="filled" className="max-w-md">
      <Stack gap="sm">
        <h3 className="text-yds-s2 text-white">카드 제목</h3>
        <p className="text-yds-c1m text-white">자유롭게 children 을 넣어 사용할 수 있습니다.</p>
      </Stack>
    </Card>
  ),
}
