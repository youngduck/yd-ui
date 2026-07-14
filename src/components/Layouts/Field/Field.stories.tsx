import { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Field } from './Field'
import { Stack } from '../Stack/Stack'
import { Inline } from '../Inline/Inline'
import { Input } from '../../Inputs/Input/Input'
import { NumberInput } from '../../Inputs/NumberInput/NumberInput'
import { DatePicker } from '../../Calendars/DatePicker/DatePicker'
import { Button } from '../../Button/Button'

const meta: Meta<typeof Field> = {
  title: 'Components/Layout/Field',
  component: Field,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
YD-UI 디자인 시스템의 폼 필드 컴포넌트입니다.

입력 하나를 라벨 + 입력 + 설명/에러 메시지의 표준 구조로 묶습니다. 폼을 만들 때마다 라벨 간격과 타이포그래피를 즉흥적으로 정하지 않도록 결정을 컴포넌트에 박제하는 것이 목적입니다.

## 주요 특징
- \`label\` + 임의의 입력(children) + \`description\` / \`error\` 메시지 구조
- \`error\` 지정 시 설명 대신 에러가 표시되고 \`role="alert"\` 로 스크린 리더에 즉시 전달
- \`required\` 지정 시 라벨 옆에 필수 표시(*)
- 단일 입력 요소에 \`id\` / \`aria-describedby\` / \`aria-invalid\` 자동 주입 — 라벨은 \`htmlFor\` 로 연결되어 클릭 시 포커스, 스크린 리더가 설명·에러를 함께 읽음
- 라벨·메시지의 색상/타이포그래피/간격은 모두 디자인 토큰에서 일괄 적용

## 사용 가이드
- 여러 Field 를 세로로 배치할 때는 Stack 으로 감쌉니다.
- Input / NumberInput / DatePicker / SelectBox 등 어떤 입력이든 children 으로 넣을 수 있습니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
      description: '입력 위에 표시되는 라벨 (필수)',
    },
    description: {
      control: { type: 'text' },
      description: '입력 아래 보조 설명',
    },
    error: {
      control: { type: 'text' },
      description: '에러 메시지. 지정 시 설명 대신 표시',
    },
    required: {
      control: { type: 'boolean' },
      description: '필수 입력 표시(*) 여부',
    },
    children: {
      control: false,
      description: '라벨이 감쌀 입력 요소',
    },
  },
}

export default meta

type Story = StoryObj<typeof Field>

export const Default: Story = {
  render: args => (
    <div className="w-[320px]">
      <Field label={args.label} description={args.description} error={args.error} required={args.required}>
        <Input size="full" placeholder="예: 점심 식사" />
      </Field>
    </div>
  ),
  args: {
    label: '내용',
    description: '거래 내역에 표시될 이름입니다.',
    required: false,
  },
}

export const WithError: Story = {
  render: () => (
    <div className="w-[320px]">
      <Field label="금액" error="금액을 0보다 큰 숫자로 입력하세요." required>
        <NumberInput size="full" value="" onValueChange={() => {}} suffix="원" placeholder="0" aria-label="금액" />
      </Field>
    </div>
  ),
}

export const WithVariousInputs: Story = {
  parameters: {
    docs: {
      description: {
        story: '어떤 입력 컴포넌트든 children 으로 감쌀 수 있습니다.',
      },
    },
  },
  render: () => <VariousInputsContent />,
}

function VariousInputsContent() {
  const [amount, setAmount] = useState('400000')
  const [date, setDate] = useState('2026-07-10')

  return (
    <Stack gap="lg" className="w-[320px]">
      <Field label="내용" description="자유 텍스트 입력">
        <Input size="full" placeholder="예: 점심 식사" />
      </Field>
      <Field label="금액" required>
        <NumberInput size="full" value={amount} onValueChange={setAmount} suffix="원" aria-label="금액" />
      </Field>
      <Field label="날짜">
        <DatePicker size="full" value={date} onValueChange={setDate} />
      </Field>
    </Stack>
  )
}

export const TransactionFormRecipe: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          '거래 추가 폼 레시피: Stack + Field + Inline 조합으로 실제 화면이 어떻게 나오는지 미리 확인하는 예시입니다.',
      },
    },
  },
  render: () => <TransactionFormRecipeContent />,
}

function TransactionFormRecipeContent() {
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const amountError = submitted && amount === '' ? '금액을 입력하세요.' : undefined

  return (
    <div className="bg-background-primary flex min-h-screen items-center justify-center p-8">
      <div className="bg-background-secondary w-[400px] rounded-lg p-6">
        <Stack gap="lg">
          <h2 className="text-yds-s2 text-white">거래 추가</h2>
          <Field label="금액" required error={amountError}>
            <NumberInput size="full" value={amount} onValueChange={setAmount} suffix="원" placeholder="0" aria-label="금액" />
          </Field>
          <Field label="내용" description="거래 내역에 표시될 이름입니다.">
            <Input size="full" placeholder="예: 점심 식사" />
          </Field>
          <Field label="날짜" required>
            <DatePicker size="full" value={date} onValueChange={setDate} />
          </Field>
          <Inline gap="md" justify="end">
            <Button size="sm" variant="outlined" color="primary" onClick={() => setSubmitted(false)}>
              취소
            </Button>
            <Button size="sm" variant="fill" color="primary" onClick={() => setSubmitted(true)}>
              저장
            </Button>
          </Inline>
        </Stack>
      </div>
    </div>
  )
}
