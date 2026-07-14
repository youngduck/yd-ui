import { Meta, StoryObj } from '@storybook/react'
import { Stack, type StackGap, type StackAlign } from './Stack'

const meta: Meta<typeof Stack> = {
  title: 'Components/Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
YD-UI 디자인 시스템의 수직 나열 레이아웃 컴포넌트입니다.

자식들을 세로로 쌓고 사이 간격을 spacing 토큰(sm 8px / md 16px / lg 24px)으로 강제합니다. 화면마다 임의의 gap 값을 즉흥적으로 정하지 않도록 선택지를 좁혀 간격 리듬을 통일하는 것이 목적입니다.

## 주요 특징
- \`gap\`: sm / md / lg 세 가지만 허용 (기본값 md, 토큰화)
- \`align\`: start / center / end / stretch 교차축 정렬 (기본값 stretch)
- 표준 div 속성을 그대로 지원

## 사용 가이드
- 폼 필드 사이, 카드 안 콘텐츠 사이 등 수직 간격이 필요한 모든 곳에 사용합니다.
- 가로 나열은 Inline 컴포넌트를 사용합니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    gap: {
      options: ['sm', 'md', 'lg'] as StackGap[],
      control: { type: 'select' },
      description: '자식 사이 수직 간격 (8 / 16 / 24px)',
    },
    align: {
      options: ['start', 'center', 'end', 'stretch'] as StackAlign[],
      control: { type: 'select' },
      description: '교차축(가로) 정렬',
    },
  },
}

export default meta

type Story = StoryObj<typeof Stack>

const DemoBox = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-background-tertiary text-yds-c1m rounded-lg p-3 text-white">{children}</div>
)

export const Default: Story = {
  render: args => (
    <Stack gap={args.gap} align={args.align} className="w-[280px]">
      <DemoBox>첫 번째</DemoBox>
      <DemoBox>두 번째</DemoBox>
      <DemoBox>세 번째</DemoBox>
    </Stack>
  ),
  args: {
    gap: 'md',
    align: 'stretch',
  },
}

export const AllGaps: Story = {
  render: () => (
    <div className="flex gap-12">
      {(['sm', 'md', 'lg'] as StackGap[]).map(gap => (
        <div key={gap}>
          <div className="mb-2 text-lg font-bold text-white">{gap}</div>
          <Stack gap={gap} className="w-[160px]">
            <DemoBox>A</DemoBox>
            <DemoBox>B</DemoBox>
            <DemoBox>C</DemoBox>
          </Stack>
        </div>
      ))}
    </div>
  ),
}

export const AllAligns: Story = {
  render: () => (
    <div className="flex gap-12">
      {(['start', 'center', 'end', 'stretch'] as StackAlign[]).map(align => (
        <div key={align}>
          <div className="mb-2 text-lg font-bold text-white">{align}</div>
          <Stack gap="sm" align={align} className="w-[160px]">
            <DemoBox>짧음</DemoBox>
            <DemoBox>조금 더 긴 항목</DemoBox>
          </Stack>
        </div>
      ))}
    </div>
  ),
}
