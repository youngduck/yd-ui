import { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { DatePicker, type DatePickerSize } from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'Components/Calendar/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
YD-UI 디자인 시스템의 연+월+일 선택 달력 컴포넌트입니다.

트리거 버튼을 누르면 요일 헤더와 6주 고정 날짜 그리드 패널이 열리고, 날짜를 선택하면 \`YYYY-MM-DD\` 형식 문자열로 값이 전달됩니다. 거래 내역의 발생일처럼 폼에서 날짜 하나를 입력받을 때 사용합니다.

## 주요 특징
- 제어 컴포넌트: \`value\` / \`onValueChange\` 로 상태를 관리 (\`'2026-07-10'\` 형식, \`input type="date"\` 와 호환)
- 헤더의 이전/다음 버튼으로 월 이동, \`minYear\` / \`maxYear\` 로 범위 제한
- 표시 중인 달의 앞뒤는 이전/다음 달 날짜로 채워지며(흐리게 표시) 바로 선택 가능
- 선택된 날짜는 노란(primary) 배경 + 검정 글씨, 오늘은 노란 테두리 + \`aria-current="date"\` 로 강조
- sm / md / lg / full 사이즈 지원 (토큰화)
- 접근성: \`aria-haspopup="dialog"\` 트리거, 방향키(±1일/±1주)·Home·End 그리드 탐색, Escape 닫기 + 트리거 포커스 복귀

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
      options: ['sm', 'md', 'lg', 'full'] as DatePickerSize[],
      control: { type: 'select' },
      description: '트리거 너비 사이즈',
    },
    value: {
      control: false,
      description: '현재 선택된 값 (YYYY-MM-DD 형식, 제어 컴포넌트)',
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

type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  render: args => {
    const [value, setValue] = useState('')

    return <DatePicker size={args.size} value={value} onValueChange={setValue} />
  },
  args: {
    size: 'md',
  },
}

export const WithDefaultValue: Story = {
  render: () => {
    const [value, setValue] = useState('2026-07-10')

    return <DatePicker value={value} onValueChange={setValue} />
  },
}

export const WithYearRange: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return <DatePicker value={value} onValueChange={setValue} minYear={2020} maxYear={2030} placeholder="2020 ~ 2030" />
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
          <DatePicker size="sm" value={sm} onValueChange={setSm} />
        </div>
        <div>
          <div className="mb-2 text-lg font-bold text-white">Medium (기본)</div>
          <DatePicker size="md" value={md} onValueChange={setMd} />
        </div>
        <div>
          <div className="mb-2 text-lg font-bold text-white">Large</div>
          <DatePicker size="lg" value={lg} onValueChange={setLg} />
        </div>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => <DatePicker value="2026-07-10" onValueChange={() => {}} disabled />,
}

export const FormExample: Story = {
  parameters: {
    docs: {
      description: {
        story: '거래 추가 폼처럼 세 가지 피커를 함께 사용하는 예시입니다.',
      },
    },
  },
  render: () => <FormExampleContent />,
}

function FormExampleContent() {
  const [date, setDate] = useState('')

  return (
    <div className="bg-background-secondary flex w-[360px] flex-col gap-2 rounded-lg p-6">
      <span className="text-yds-c1m text-primary-100">날짜</span>
      <DatePicker size="full" value={date} onValueChange={setDate} />
      <p className="text-yds-c1r mt-2 text-gray-400">선택된 값: {date || '(없음)'}</p>
    </div>
  )
}
