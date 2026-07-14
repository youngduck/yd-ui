import { Meta, StoryObj } from '@storybook/react'
import { Inline, type InlineGap, type InlineAlign, type InlineJustify } from './Inline'
import { Chips } from '../../Chips/Chips'
import { Button } from '../../Button/Button'

const meta: Meta<typeof Inline> = {
  title: 'Components/Layout/Inline',
  component: Inline,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
YD-UI 디자인 시스템의 수평 나열 레이아웃 컴포넌트입니다.

자식들을 가로로 나열하고(공간이 부족하면 자동 줄바꿈) 사이 간격을 spacing 토큰(sm 4px / md 8px / lg 16px)으로 강제합니다. 버튼 그룹, 칩 목록, 필터 바처럼 가로로 흐르는 배치에 사용합니다.

## 주요 특징
- \`gap\`: sm / md / lg 세 가지만 허용 (기본값 md, 토큰화)
- \`align\`: start / center / end 교차축 정렬 (기본값 center)
- \`justify\`: start / center / end / between 주축 정렬 (기본값 start)
- 공간이 부족하면 자동으로 줄바꿈 (flex-wrap)
- 표준 div 속성을 그대로 지원

## 사용 가이드
- 세로 나열은 Stack 컴포넌트를 사용합니다.
- 라벨과 값을 양 끝에 배치할 때는 \`justify="between"\` 을 사용합니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    gap: {
      options: ['sm', 'md', 'lg'] as InlineGap[],
      control: { type: 'select' },
      description: '자식 사이 수평 간격 (4 / 8 / 16px)',
    },
    align: {
      options: ['start', 'center', 'end'] as InlineAlign[],
      control: { type: 'select' },
      description: '교차축(세로) 정렬',
    },
    justify: {
      options: ['start', 'center', 'end', 'between'] as InlineJustify[],
      control: { type: 'select' },
      description: '주축(가로) 정렬',
    },
  },
}

export default meta

type Story = StoryObj<typeof Inline>

export const Default: Story = {
  render: args => (
    <Inline gap={args.gap} align={args.align} justify={args.justify} className="w-[360px]">
      <Chips variant="fill" color="primary">
        <span className="text-black">식비</span>
      </Chips>
      <Chips variant="outlined" color="primary">
        교통비
      </Chips>
      <Chips variant="outlined" color="primary">
        문화생활
      </Chips>
    </Inline>
  ),
  args: {
    gap: 'md',
    align: 'center',
    justify: 'start',
  },
}

export const ButtonGroup: Story = {
  parameters: {
    docs: {
      description: {
        story: '모달 하단 버튼 그룹처럼 우측 정렬로 배치하는 예시입니다.',
      },
    },
  },
  render: () => (
    <Inline gap="md" justify="end" className="w-[360px]">
      <Button size="sm" variant="outlined" color="primary">
        취소
      </Button>
      <Button size="sm" variant="fill" color="primary">
        저장
      </Button>
    </Inline>
  ),
}

export const SpaceBetween: Story = {
  parameters: {
    docs: {
      description: {
        story: '라벨과 값을 양 끝에 배치하는 예시입니다.',
      },
    },
  },
  render: () => (
    <Inline justify="between" className="w-[360px]">
      <span className="text-yds-c1m text-primary-100">이번 달 총 예산</span>
      <span className="text-yds-s2 text-white">₩1,200,000</span>
    </Inline>
  ),
}

export const Wrapping: Story = {
  parameters: {
    docs: {
      description: {
        story: '공간이 부족하면 자동으로 줄바꿈됩니다.',
      },
    },
  },
  render: () => (
    <Inline gap="sm" className="w-[240px]">
      {['식비', '교통비', '문화생활', '주거', '통신비', '의료', '교육'].map(name => (
        <Chips key={name} variant="outlined" color="primary">
          {name}
        </Chips>
      ))}
    </Inline>
  ),
}
