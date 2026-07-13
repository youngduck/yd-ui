import { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { YearPicker, type YearPickerSize } from './YearPicker'

const meta: Meta<typeof YearPicker> = {
  title: 'Components/Calendar/YearPicker',
  component: YearPicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
YD-UI 디자인 시스템의 연도 선택 달력 컴포넌트입니다.

트리거 버튼을 누르면 12년 단위 그리드 패널이 열리고, 연도를 선택하면 \`YYYY\` 형식 문자열로 값이 전달됩니다.

## 주요 특징
- 제어 컴포넌트: \`value\` / \`onValueChange\` 로 상태를 관리 (\`'2026'\` 형식)
- \`minYear\` / \`maxYear\` 로 선택 가능한 연도 범위 제한
- 선택된 연도는 노란(primary) 배경 + 검정 글씨, 올해는 노란 테두리로 강조
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
      options: ['sm', 'md', 'lg', 'full'] as YearPickerSize[],
      control: { type: 'select' },
      description: '트리거 너비 사이즈',
    },
    value: {
      control: false,
      description: '현재 선택된 값 (YYYY 형식, 제어 컴포넌트)',
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

type Story = StoryObj<typeof YearPicker>

export const Default: Story = {
  render: args => {
    const [value, setValue] = useState('')

    return <YearPicker size={args.size} value={value} onValueChange={setValue} />
  },
  args: {
    size: 'md',
  },
}

export const WithDefaultValue: Story = {
  render: () => {
    const [value, setValue] = useState('2026')

    return <YearPicker value={value} onValueChange={setValue} />
  },
}

export const WithYearRange: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return <YearPicker value={value} onValueChange={setValue} minYear={2020} maxYear={2030} placeholder="2020 ~ 2030" />
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
          <YearPicker size="sm" value={sm} onValueChange={setSm} />
        </div>
        <div>
          <div className="mb-2 text-lg font-bold text-white">Medium (기본)</div>
          <YearPicker size="md" value={md} onValueChange={setMd} />
        </div>
        <div>
          <div className="mb-2 text-lg font-bold text-white">Large</div>
          <YearPicker size="lg" value={lg} onValueChange={setLg} />
        </div>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => <YearPicker value="2026" onValueChange={() => {}} disabled />,
}
