import { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Accordion, type AccordionVariant, type AccordionItem } from './Accordion'
import { copyCodeToClipboard } from '../../storybook/utils'

const FAQ_ITEMS: AccordionItem[] = [
  {
    label: '배송은 얼마나 걸리나요?',
    value: 'delivery',
    content: <p>결제 완료 후 영업일 기준 2~3일 이내에 발송됩니다. 도서·산간 지역은 1~2일이 더 소요될 수 있습니다.</p>,
  },
  {
    label: '교환·반품이 가능한가요?',
    value: 'return',
    content: (
      <p>상품 수령 후 7일 이내에 신청하시면 교환·반품이 가능합니다. 단순 변심의 경우 왕복 배송비가 부과됩니다.</p>
    ),
  },
  {
    label: '해외 배송도 되나요?',
    value: 'overseas',
    content: <p>현재 미국·일본·싱가포르에 한해 해외 배송을 지원합니다. 국가별 관세는 수령인 부담입니다.</p>,
  },
]

const copyCode = (variant?: AccordionVariant) => {
  const variantProp = variant ? ` variant="${variant}"` : ''
  const code = `import { Accordion } from '@youngduck/yd-ui';

function Example() {
  return (
    <Accordion${variantProp}
      items={[
        { label: '배송은 얼마나 걸리나요?', value: 'delivery', content: <p>영업일 기준 2~3일 소요됩니다.</p> },
        { label: '교환·반품이 가능한가요?', value: 'return', content: <p>수령 후 7일 이내 가능합니다.</p> },
      ]}
    />
  );
}`

  copyCodeToClipboard(code)
}

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
YD-UI 디자인 시스템의 아코디언 컴포넌트입니다.

헤더를 눌러 본문을 펼치고 접는 목록이며, 펼쳐진 헤더는 노란(primary) 글자와 180도 회전한 화살표로 강조됩니다.

## 주요 특징
- Card 와 동일한 \`outlined\` / \`filled\` variant 체계 (색상 토큰 값도 Card 와 동일)
- \`type\` 으로 한 번에 하나만 펼치기(single) / 여러 개 펼치기(multiple) 선택
- 기본은 비제어: \`defaultValue\` 로 처음 펼칠 항목만 지정하면 펼침 상태는 컴포넌트가 직접 관리
- 바깥에서 펼침 상태를 읽거나 직접 바꿔야 할 때만 \`value\` / \`onValueChange\` 로 제어
- \`items\` 배열로 구성하며 항목별 \`disabled\` 지원
- 항목 사이에만 구분선을 넣습니다 (마지막 항목 아래에는 선이 없음)
- 높이 애니메이션은 CSS grid(0fr → 1fr)로 처리해 내용 높이를 JS로 재지 않습니다
- 접근성: WAI-ARIA Accordion 패턴 (제목 요소 안의 버튼, \`aria-expanded\` / \`aria-controls\`, \`role="region"\`), 방향키·Home·End 탐색
- \`prefers-reduced-motion\` 사용자에게는 전환 애니메이션을 제거합니다

## 사용 가이드
- \`items\` prop에 \`{ label, value, content, disabled? }\` 배열을 전달합니다.
- \`defaultValue\` / \`value\` 는 "펼쳐진 값의 배열"입니다. single 이어도 배열로 관리합니다.
- 펼침 상태는 대부분 바깥에서 쓸 일이 없으므로 \`defaultValue\` 를 먼저 고려하세요. 펼친 항목을 화면 다른 곳에 표시하거나 URL·서버와 맞춰야 할 때만 제어 모드가 필요합니다.
- 주변 문서 구조에 맞춰 \`headingLevel\` (기본값 3)을 지정하면 스크린리더 탐색이 자연스러워집니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['outlined', 'filled'] as AccordionVariant[],
      control: { type: 'radio' },
      description: '영역 구분 방식 (테두리 / 배경)',
    },
    type: {
      options: ['single', 'multiple'],
      control: { type: 'radio' },
      description: '한 번에 하나만 펼칠지(single) 여러 개를 펼칠지(multiple)',
    },
    headingLevel: {
      options: [2, 3, 4, 5, 6],
      control: { type: 'select' },
      description: '헤더에 사용할 제목 레벨',
    },
    value: {
      control: false,
      description: '현재 펼쳐진 값 목록 (제어 모드). 주지 않으면 비제어로 동작합니다',
    },
    defaultValue: {
      control: false,
      description: '처음부터 펼쳐둘 값 목록 (비제어 모드)',
    },
    onValueChange: {
      control: false,
      description: '펼쳐진 값이 변경될 때 호출되는 콜백',
    },
    items: {
      control: false,
      description: '아코디언 항목 목록',
      table: {
        type: { summary: 'AccordionItem[]' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  render: args => (
    <div className="w-[480px] max-w-full">
      <Accordion
        variant={args.variant}
        type={args.type}
        headingLevel={args.headingLevel}
        defaultValue={['delivery']}
        items={FAQ_ITEMS}
      />
    </div>
  ),
  args: {
    variant: 'outlined',
    type: 'single',
  },
}

export const Variants: Story = {
  render: () => {
    return (
      <div className="w-[480px] max-w-full space-y-8">
        <div>
          <div className="mb-2 text-lg font-bold text-white">Outlined (기본)</div>
          <div className="mb-3 text-sm text-gray-300">테두리로 영역을 구분합니다.</div>
          <Accordion variant="outlined" defaultValue={['delivery']} items={FAQ_ITEMS} />
        </div>
        <div>
          <div className="mb-2 text-lg font-bold text-white">Filled</div>
          <div className="mb-3 text-sm text-gray-300">배경색으로 영역을 구분합니다.</div>
          <Accordion variant="filled" defaultValue={['delivery']} items={FAQ_ITEMS} />
        </div>
      </div>
    )
  },
}

export const Multiple: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Accordion type="multiple" defaultValue={['delivery', 'return']} items={FAQ_ITEMS} />
    </div>
  ),
}

export const WithDisabledItem: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Accordion items={[FAQ_ITEMS[0], FAQ_ITEMS[1], { ...FAQ_ITEMS[2], disabled: true }]} />
    </div>
  ),
}

export const RichContent: Story = {
  render: () => {
    return (
      <div className="w-[480px] max-w-full">
        <Accordion
          type="multiple"
          defaultValue={['terms']}
          items={[
            {
              label: '이용약관 요약',
              value: 'terms',
              content: (
                <ul className="list-inside list-disc space-y-1">
                  <li>만 14세 이상만 가입할 수 있습니다.</li>
                  <li>계정을 타인에게 양도할 수 없습니다.</li>
                  <li>부정 이용 시 사전 통지 없이 이용이 제한될 수 있습니다.</li>
                </ul>
              ),
            },
            {
              label: '수수료 안내',
              value: 'fee',
              content: (
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-yellow-300">
                      <th className="pb-2">구분</th>
                      <th className="pb-2">수수료</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1">국내 이체</td>
                      <td className="py-1">면제</td>
                    </tr>
                    <tr>
                      <td className="py-1">해외 송금</td>
                      <td className="py-1">건당 3,000원</td>
                    </tr>
                  </tbody>
                </table>
              ),
            },
          ]}
        />
      </div>
    )
  },
}

export const Examples = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      disable: true,
    },
  },
  render: () => {
    return <ExamplesContent />
  },
}

function ExamplesContent() {
  // 펼쳐진 항목을 아코디언 바깥(아래 문구)에서 읽어야 하므로 여기서는 제어 모드가 실제로 필요하다.
  // 이런 경우가 아니면 defaultValue 만으로 충분하다.
  const [faq, setFaq] = useState<string[]>(['delivery'])

  return (
    <div className="bg-background-primary min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-yds-h1 mb-2 text-white">Accordion Examples</h1>
        <p className="text-yds-b2 mb-8 text-gray-300">각 아코디언을 클릭하면 사용 코드가 클립보드에 복사됩니다.</p>

        <div className="bg-background-secondary mb-8 rounded-lg p-8">
          <h2 className="text-yds-s1 mb-4 text-white">Variants (영역 구분 방식)</h2>
          <p className="text-yds-c1m mb-6 text-gray-300">
            Card 와 같은 체계입니다. variant prop으로 outlined / filled 를 선택할 수 있습니다.
          </p>
          <div className="space-y-6">
            {(['outlined', 'filled'] as AccordionVariant[]).map(variant => (
              <div key={variant}>
                <div className="mb-2 text-sm text-yellow-300">{variant}</div>
                <div
                  className="hover:bg-background-tertiary w-[480px] max-w-full cursor-pointer rounded-lg p-2 transition-colors"
                  onClick={() => copyCode(variant)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      copyCode(variant)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${variant} 아코디언 - 클릭 시 코드 복사`}
                >
                  <VariantExample variant={variant} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-background-secondary mb-8 rounded-lg p-8">
          <h2 className="text-yds-s1 mb-4 text-white">FAQ 예시</h2>
          <p className="text-yds-c1m mb-6 text-gray-300">
            자주 묻는 질문처럼 한 번에 하나만 펼치는 것이 자연스러운 곳에 single 을 사용합니다.
          </p>
          <div className="w-[600px] max-w-full">
            <Accordion value={faq} onValueChange={setFaq} items={FAQ_ITEMS} />
          </div>
          <p className="text-yds-c1r mt-4 text-gray-400">펼쳐진 항목: {faq.length > 0 ? faq.join(', ') : '없음'}</p>
        </div>
      </div>
    </div>
  )
}

function VariantExample({ variant }: { variant: AccordionVariant }) {
  return <Accordion variant={variant} defaultValue={['delivery']} items={FAQ_ITEMS} />
}
