import { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { MonthPicker, type MonthPickerSize } from './MonthPicker'

const meta: Meta<typeof MonthPicker> = {
  title: 'Components/Calendar/MonthPicker',
  component: MonthPicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
YD-UI 디자인 시스템의 연+월 선택 달력 컴포넌트입니다.

트리거 버튼을 누르면 연도 헤더와 12개월 그리드 패널이 열리고, 월을 선택하면 \`YYYY-MM\` 형식 문자열로 값이 전달됩니다.

## 주요 특징
- 제어 컴포넌트: \`value\` / \`onValueChange\` 로 상태를 관리 (\`'2026-07'\` 형식)
- 헤더의 이전/다음 버튼으로 연도 이동, \`minYear\` / \`maxYear\` 로 범위 제한
- 선택된 월은 노란(primary) 배경 + 검정 글씨, 이번 달은 노란 테두리로 강조
- sm / md / lg / full 사이즈 지원 (토큰화)
- 접근성: \`aria-haspopup="dialog"\` 트리거, 방향키·Home·End 그리드 탐색, Escape 닫기 + 트리거 포커스 복귀

## 사용 가이드
- \`value\` prop으로 현재 선택 값을 지정하고, \`onValueChange\` 로 변경을 처리합니다. 미선택 시 빈 문자열을 전달합니다.
- \`size\` prop으로 sm / md / lg / full 을 선택합니다. (기본값 md)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'full'] as MonthPickerSize[],
      control: { type: 'select' },
      description: '트리거 너비 사이즈',
    },
    value: {
      control: false,
      description: '현재 선택된 값 (YYYY-MM 형식, 제어 컴포넌트)',
    },
    onValueChange: {
      control: false,
      description: '값이 변경될 때 호출되는 콜백',
    },
    minYear: {
      control: { type: 'number' },
      description: '선택 가능한 최소 연도 (기본값 1900)',
    },
    maxYear: {
      control: { type: 'number' },
      description: '선택 가능한 최대 연도 (기본값 2100)',
    },
    placeholder: {
      control: { type: 'text' },
      description: '미선택 시 트리거에 표시할 문구',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '피커 전체 비활성화 여부',
    },
  },
}

export default meta

type Story = StoryObj<typeof MonthPicker>

export const Default: Story = {
  render: args => {
    const [value, setValue] = useState('')

    return <MonthPicker size={args.size} value={value} onValueChange={setValue} />
  },
  args: {
    size: 'md',
  },
}

export const WithDefaultValue: Story = {
  render: () => {
    const [value, setValue] = useState('2026-07')

    return <MonthPicker value={value} onValueChange={setValue} />
  },
}

export const WithYearRange: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <MonthPicker value={value} onValueChange={setValue} minYear={2020} maxYear={2030} placeholder="2020 ~ 2030" />
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
          <MonthPicker size="sm" value={sm} onValueChange={setSm} />
        </div>
        <div>
          <div className="mb-2 text-lg font-bold text-white">Medium (기본)</div>
          <MonthPicker size="md" value={md} onValueChange={setMd} />
        </div>
        <div>
          <div className="mb-2 text-lg font-bold text-white">Large</div>
          <MonthPicker size="lg" value={lg} onValueChange={setLg} />
        </div>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => <MonthPicker value="2026-07" onValueChange={() => {}} disabled />,
}
