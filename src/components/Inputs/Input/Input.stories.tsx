import { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Input, type InputSize, type InputColor, type InputVariant } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
YD-UI 디자인 시스템의 기본 입력 필드 컴포넌트입니다.

자유 텍스트(text / password / email 등) 입력을 담당합니다. 금액·수량 같은 숫자 입력에는 NumberInput, 날짜 입력에는 DatePicker 사용을 권장합니다.

## 주요 특징
- input(기본) / search(검색 아이콘 포함) 두 가지 variant
- white / primary-400 / primary-100 색상 지원 — 테두리·텍스트·placeholder·아이콘에 일괄 적용
- sm / md / lg / full 사이즈 지원 (토큰화)
- \`type="number"\` 사용 시 브라우저 기본 스핀 버튼 자동 숨김
- 색상·간격·타이포그래피는 모두 디자인 토큰에서 일괄 적용

## 사용 가이드
- 표준 HTML input 속성(\`value\`, \`onChange\`, \`placeholder\`, \`type\` 등)을 그대로 사용합니다.
- \`variant="search"\` 는 좌측에 검색 아이콘 공간이 확보됩니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['input', 'search'] as InputVariant[],
      control: { type: 'select' },
      description: '입력 필드 variant (search 는 검색 아이콘 포함)',
    },
    size: {
      options: ['sm', 'md', 'lg', 'full'] as InputSize[],
      control: { type: 'select' },
      description: '입력 필드 너비 사이즈',
    },
    color: {
      options: ['white', 'primary-400', 'primary-100'] as InputColor[],
      control: { type: 'select' },
      description: '테두리·텍스트·placeholder·아이콘 색상',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '입력 필드 비활성화 여부',
    },
  },
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: '입력...',
    size: 'md',
    color: 'primary-100',
    variant: 'input',
  },
}

export const SearchVariant: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    variant: 'search',
    color: 'white',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-8">
      <div>
        <div className="mb-2 text-lg font-bold text-white">Small</div>
        <Input size="sm" placeholder="입력..." />
      </div>
      <div>
        <div className="mb-2 text-lg font-bold text-white">Medium (기본)</div>
        <Input size="md" placeholder="입력..." />
      </div>
      <div>
        <div className="mb-2 text-lg font-bold text-white">Large</div>
        <Input size="lg" placeholder="입력..." />
      </div>
      <div>
        <div className="mb-2 text-lg font-bold text-white">Full</div>
        <Input size="full" placeholder="입력..." />
      </div>
    </div>
  ),
}

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Input color="primary-400" placeholder="primary-400" />
      <Input color="primary-100" placeholder="primary-100" />
      <Input color="white" placeholder="white" />
      <Input variant="search" color="primary-400" placeholder="primary-400 검색..." />
      <Input variant="search" color="primary-100" placeholder="primary-100 검색..." />
      <Input variant="search" color="white" placeholder="white 검색..." />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Input placeholder="입력 비활성화" disabled />
      <Input variant="search" placeholder="검색 비활성화" disabled />
    </div>
  ),
}

export const Controlled: Story = {
  render: () => <ControlledContent />,
}

function ControlledContent() {
  const [value, setValue] = useState('')

  return (
    <div className="flex flex-col gap-2">
      <Input value={value} onChange={e => setValue(e.target.value)} placeholder="Controlled Input" />
      <p className="text-yds-c1r text-gray-400">입력된 값: {value || '(없음)'}</p>
    </div>
  )
}
