import { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Tabs, type TabsSize, type TabOption } from './Tabs'
import { copyCodeToClipboard } from '../../storybook/utils'

const REGION_OPTIONS: TabOption[] = [
  { label: '전체', value: 'all' },
  { label: '국내', value: 'domestic' },
  { label: '해외', value: 'overseas' },
]

const copyCode = (size?: TabsSize) => {
  const sizeProp = size ? ` size="${size}"` : ''
  const code = `import { Tabs } from '@youngduck/yd-ui';

function Example() {
  return (
    <Tabs${sizeProp}
      defaultValue="all"
      options={[
        { label: '전체', value: 'all' },
        { label: '국내', value: 'domestic' },
        { label: '해외', value: 'overseas' },
      ]}
    />
  );
}`

  copyCodeToClipboard(code)
}

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
YD-UI 디자인 시스템의 탭 컴포넌트입니다.

컨테이너 안에서 여러 항목 중 하나를 선택하는 탭형 토글이며, 선택된 탭은 노란(primary) 글자로 강조됩니다.

## 주요 특징
- 구분선 색 테두리를 두른 네이비 컨테이너 안에서 선택 탭은 노란 글자, 미선택 탭은 흰 글자로 표시
- sm / md / lg 사이즈 지원 (토큰화)
- 기본은 비제어: \`defaultValue\` 로 처음 선택할 탭만 지정하면 선택 상태는 컴포넌트가 직접 관리
- 바깥에서 선택값을 읽거나 직접 바꿔야 할 때만 \`value\` / \`onValueChange\` 로 제어
- \`options\` 배열로 탭을 구성하며 탭별 \`disabled\` 지원
- 접근성: \`role="radiogroup"\` / \`role="radio"\`, 방향키·Home·End 키보드 탐색, 로빙 탭인덱스 적용
- 색상·간격·타이포그래피는 모두 디자인 토큰에서 일괄 적용

## 사용 가이드
- \`options\` prop에 \`{ label, value, disabled? }\` 배열을 전달합니다.
- \`value\` prop으로 현재 선택 값을 지정하고, \`onValueChange\` 로 변경을 처리합니다.
- \`size\` prop으로 sm / md / lg 를 선택합니다. (기본값 md)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'] as TabsSize[],
      control: { type: 'select' },
      description: '탭 사이즈',
    },
    value: {
      control: false,
      description: '현재 선택된 값 (제어 모드). 주지 않으면 비제어로 동작합니다',
    },
    defaultValue: {
      control: false,
      description: '처음 선택해둘 값 (비제어 모드)',
    },
    onValueChange: {
      control: false,
      description: '값이 변경될 때 호출되는 콜백',
    },
    options: {
      control: false,
      description: '탭 항목 목록',
      table: {
        type: { summary: 'TabOption[]' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: args => {
    return <Tabs size={args.size} defaultValue="all" options={REGION_OPTIONS} />
  },
  args: {
    size: 'md',
  },
}

export const AllSizes: Story = {
  render: () => {
    return (
      <div className="space-y-8">
        <div>
          <div className="mb-2 text-lg font-bold text-white">Small</div>
          <Tabs size="sm" defaultValue="all" options={REGION_OPTIONS} />
        </div>
        <div>
          <div className="mb-2 text-lg font-bold text-white">Medium (기본)</div>
          <Tabs size="md" defaultValue="all" options={REGION_OPTIONS} />
        </div>
        <div>
          <div className="mb-2 text-lg font-bold text-white">Large</div>
          <Tabs size="lg" defaultValue="all" options={REGION_OPTIONS} />
        </div>
      </div>
    )
  },
}

export const WithDisabledTab: Story = {
  render: () => {
    return (
      <Tabs
        defaultValue="all"
        options={[
          { label: '전체', value: 'all' },
          { label: '국내', value: 'domestic' },
          { label: '해외', value: 'overseas', disabled: true },
        ]}
      />
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
  // 선택값을 탭 바깥(아래 "선택: ..." 문구)에서 읽어야 하므로 여기서는 제어 모드가 실제로 필요하다.
  // 이런 경우가 아니면 defaultValue 만으로 충분하다.
  const [region, setRegion] = useState('all')
  const [period, setPeriod] = useState('day')

  return (
    <div className="bg-background-primary min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-yds-h1 mb-2 text-white">Tabs Examples</h1>
        <p className="text-yds-b2 mb-8 text-gray-300">각 탭을 클릭하면 사용 코드가 클립보드에 복사됩니다.</p>

        <div className="bg-background-secondary mb-8 rounded-lg p-8">
          <h2 className="text-yds-s1 mb-4 text-white">Sizes (사이즈 변형)</h2>
          <p className="text-yds-c1m mb-6 text-gray-300">size prop으로 sm / md / lg 를 선택할 수 있습니다.</p>
          <div className="space-y-6">
            {(['sm', 'md', 'lg'] as TabsSize[]).map(size => (
              <div key={size}>
                <div className="mb-2 text-sm text-yellow-300">{size}</div>
                <div
                  className="hover:bg-background-tertiary inline-block cursor-pointer rounded-lg p-2 transition-colors"
                  onClick={() => copyCode(size)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      copyCode(size)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${size} 탭 - 클릭 시 코드 복사`}
                >
                  <SizedExample size={size} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-background-secondary mb-8 rounded-lg p-8">
          <h2 className="text-yds-s1 mb-4 text-white">필터 조합 예시</h2>
          <p className="text-yds-c1m mb-6 text-gray-300">여러 탭을 필터로 함께 사용하는 예시입니다.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Tabs value={region} onValueChange={setRegion} options={REGION_OPTIONS} aria-label="지역 필터" />
            <Tabs
              value={period}
              onValueChange={setPeriod}
              options={[
                { label: '일간', value: 'day' },
                { label: '주간', value: 'week' },
                { label: '월간', value: 'month' },
              ]}
              aria-label="기간 필터"
            />
          </div>
          <p className="text-yds-c1r mt-4 text-gray-400">
            선택: 지역={region} / 기간={period}
          </p>
        </div>
      </div>
    </div>
  )
}

function SizedExample({ size }: { size: TabsSize }) {
  return <Tabs size={size} defaultValue="all" options={REGION_OPTIONS} />
}
