import { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { NumberInput, type NumberInputSize } from './NumberInput'

const meta: Meta<typeof NumberInput> = {
  title: 'Components/Input/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
YD-UI 디자인 시스템의 숫자 전용 입력 필드 컴포넌트입니다.

\`type="number"\` 의 네이티브 스핀 버튼·휠 증감 문제를 피하기 위해 \`type="text"\` + \`inputMode="numeric"\` 조합을 사용하며, 입력 중 천단위 콤마가 자동으로 표시됩니다. 값은 콤마 없는 숫자 문자열(\`'400000'\`)로 전달됩니다.

## 주요 특징
- 제어 컴포넌트: \`value\` / \`onValueChange\` 로 상태를 관리 (0 이상 정수)
- 천단위 콤마 자동 포맷 (표시는 \`400,000\`, 값은 \`'400000'\`)
- \`prefix\` / \`suffix\` 로 단위 문구를 입력 박스 안에 표시 (예: '원')
- \`min\` / \`max\` 범위 보정(blur 시), ↑/↓ 방향키로 \`step\` 단위 증감
- 숫자 관례에 따라 기본 우측 정렬 (\`align="left"\` 지원)
- sm / md / lg / full 사이즈 지원 (토큰화)
- 접근성: \`role="spinbutton"\` + \`aria-valuenow/min/max\`, 모바일 숫자 키패드(\`inputMode="numeric"\`)

## 사용 가이드
- \`value\` prop으로 현재 값을 지정하고, \`onValueChange\` 로 변경을 처리합니다. 미입력 시 빈 문자열을 전달합니다.
- 단위가 있는 금액 입력은 \`suffix="원"\` 을 권장합니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'full'] as NumberInputSize[],
      control: { type: 'select' },
      description: '입력 필드 너비 사이즈',
    },
    value: {
      control: false,
      description: '현재 값 (콤마 없는 숫자 문자열, 제어 컴포넌트)',
    },
    onValueChange: {
      control: false,
      description: '값이 변경될 때 호출되는 콜백',
    },
    min: {
      control: { type: 'number' },
      description: '최소값 (blur 시 보정, 방향키 하한)',
    },
    max: {
      control: { type: 'number' },
      description: '최대값 (blur 시 보정, 방향키 상한)',
    },
    step: {
      control: { type: 'number' },
      description: '방향키(↑/↓) 증감 단위 (기본값 1)',
    },
    prefix: {
      control: { type: 'text' },
      description: '입력 앞 단위 문구',
    },
    suffix: {
      control: { type: 'text' },
      description: '입력 뒤 단위 문구',
    },
    align: {
      options: ['left', 'right'],
      control: { type: 'select' },
      description: '텍스트 정렬 (기본값 right)',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '입력 필드 비활성화 여부',
    },
  },
}

export default meta

type Story = StoryObj<typeof NumberInput>

export const Default: Story = {
  render: args => {
    const [value, setValue] = useState('')

    return (
      <NumberInput
        size={args.size}
        value={value}
        onValueChange={setValue}
        placeholder="0"
        aria-label="숫자 입력"
      />
    )
  },
  args: {
    size: 'md',
  },
}

export const WithSuffix: Story = {
  render: () => {
    const [value, setValue] = useState('400000')

    return <NumberInput value={value} onValueChange={setValue} suffix="원" placeholder="0" aria-label="금액" />
  },
}

export const WithMinMaxStep: Story = {
  parameters: {
    docs: {
      description: {
        story: '↑/↓ 방향키로 10,000원 단위 증감, blur 시 0 ~ 1,000,000 범위로 보정됩니다.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('50000')

    return (
      <NumberInput
        value={value}
        onValueChange={setValue}
        min={0}
        max={1000000}
        step={10000}
        suffix="원"
        aria-label="예산 금액"
      />
    )
  },
}

export const AllSizes: Story = {
  render: () => {
    const [sm, setSm] = useState('')
    const [md, setMd] = useState('')
    const [lg, setLg] = useState('')

    return (
      <div className="flex flex-col gap-8">
        <div>
          <div className="mb-2 text-lg font-bold text-white">Small</div>
          <NumberInput size="sm" value={sm} onValueChange={setSm} suffix="원" placeholder="0" aria-label="금액" />
        </div>
        <div>
          <div className="mb-2 text-lg font-bold text-white">Medium (기본)</div>
          <NumberInput size="md" value={md} onValueChange={setMd} suffix="원" placeholder="0" aria-label="금액" />
        </div>
        <div>
          <div className="mb-2 text-lg font-bold text-white">Large</div>
          <NumberInput size="lg" value={lg} onValueChange={setLg} suffix="원" placeholder="0" aria-label="금액" />
        </div>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => <NumberInput value="400000" onValueChange={() => {}} suffix="원" disabled aria-label="금액" />,
}

export const BudgetExample: Story = {
  parameters: {
    docs: {
      description: {
        story: '카테고리별 예산 입력처럼 폼 안에서 사용하는 예시입니다.',
      },
    },
  },
  render: () => <BudgetExampleContent />,
}

function BudgetExampleContent() {
  const [food, setFood] = useState('400000')
  const [traffic, setTraffic] = useState('')

  return (
    <div className="bg-background-secondary flex w-[360px] flex-col gap-4 rounded-lg p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="text-yds-b2 text-white">식비</span>
        <NumberInput size="sm" value={food} onValueChange={setFood} suffix="원" placeholder="0" aria-label="식비 예산" />
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-yds-b2 text-white">교통비</span>
        <NumberInput
          size="sm"
          value={traffic}
          onValueChange={setTraffic}
          suffix="원"
          placeholder="0"
          aria-label="교통비 예산"
        />
      </div>
    </div>
  )
}
