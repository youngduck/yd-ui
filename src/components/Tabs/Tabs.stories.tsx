import { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Tabs, type TabsSize, type TabsVariant, type TabOption } from './Tabs'
import { copyCodeToClipboard } from '../../storybook/utils'

const REGION_OPTIONS: TabOption[] = [
  { label: '전체', value: 'all' },
  { label: '국내', value: 'domestic' },
  { label: '해외', value: 'overseas' },
]

const SECTION_OPTIONS: TabOption[] = [
  { label: '실시간 차트', value: 'chart' },
  { label: '지금 뜨는 산업', value: 'industry' },
  { label: '외국인·기관 매매 동향', value: 'trend' },
]

const VARIANTS: { variant: TabsVariant; label: string }[] = [
  { variant: 'default', label: 'Default' },
  { variant: 'underline', label: 'Underline' },
]

const copyCode = (size?: TabsSize, variant?: TabsVariant) => {
  const sizeProp = size ? ` size="${size}"` : ''
  const variantProp = variant && variant !== 'default' ? ` variant="${variant}"` : ''
  const code = `import { Tabs } from '@youngduck/yd-ui';

function Example() {
  return (
    <Tabs${variantProp}${sizeProp}
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
- \`variant\`: default(테두리 컨테이너) / underline(하단 표시선)
- 기본은 비제어: \`defaultValue\` 로 처음 선택할 탭만 지정하면 선택 상태는 컴포넌트가 직접 관리
- 바깥에서 선택값을 읽거나 직접 바꿔야 할 때만 \`value\` / \`onValueChange\` 로 제어
- \`options\` 배열로 탭을 구성하며 탭별 \`disabled\` 지원
- 접근성: \`role="radiogroup"\` / \`role="radio"\`, 방향키·Home·End 키보드 탐색, 로빙 탭인덱스 적용
- 색상·간격·타이포그래피는 모두 디자인 토큰에서 일괄 적용

## 사용 가이드
- \`options\` prop에 \`{ label, value, disabled? }\` 배열을 전달합니다.
- \`value\` prop으로 현재 선택 값을 지정하고, \`onValueChange\` 로 변경을 처리합니다.
- \`size\` prop으로 sm / md / lg 를 선택합니다. (기본값 md)
- 같은 목록을 걸러 보는 필터면 default, 화면 영역 자체를 바꾸는 탭이면 \`variant="underline"\` 을 씁니다.
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
    variant: {
      options: ['default', 'underline'] as TabsVariant[],
      control: { type: 'select' },
      description: '탭 표시 스타일',
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
    return <Tabs size={args.size} variant={args.variant} defaultValue="all" options={REGION_OPTIONS} />
  },
  args: {
    size: 'md',
    variant: 'default',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="w-[480px] max-w-full space-y-8">
      <div>
        <div className="mb-2 text-lg font-bold text-white">Default (기본)</div>
        <div className="mb-3 text-sm text-gray-300">
          테두리 컨테이너 안에서 선택합니다. 같은 목록을 걸러 보는 필터에 씁니다.
        </div>
        <Tabs defaultValue="all" options={REGION_OPTIONS} />
      </div>
      <div>
        <div className="mb-2 text-lg font-bold text-white">Underline</div>
        <div className="mb-3 text-sm text-gray-300">
          하단 구분선 위의 표시선으로 선택합니다. 화면 영역 자체를 바꾸는 탭에 씁니다.
        </div>
        <Tabs variant="underline" defaultValue="all" options={REGION_OPTIONS} />
      </div>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => {
    return (
      // underline 은 높이가 48px 로 고정되고 size 는 글자 크기만 바꾼다
      <div className="grid w-[640px] max-w-full grid-cols-2 gap-x-10 gap-y-8">
        {(['sm', 'md', 'lg'] as TabsSize[]).map(size =>
          VARIANTS.map(({ variant, label }) => (
            <div key={`${size}-${variant}`}>
              <div className="mb-2 text-lg font-bold text-white">
                {label} · {size}
                {size === 'md' ? ' (기본)' : ''}
              </div>
              <Tabs variant={variant} size={size} defaultValue="all" options={REGION_OPTIONS} />
            </div>
          )),
        )}
      </div>
    )
  },
}

export const WithDisabledTab: Story = {
  render: () => {
    return (
      <div className="w-[480px] max-w-full space-y-8">
        {VARIANTS.map(({ variant, label }) => (
          <div key={variant}>
            <div className="mb-2 text-lg font-bold text-white">{label}</div>
            <Tabs
              variant={variant}
              defaultValue="all"
              options={[
                { label: '전체', value: 'all' },
                { label: '국내', value: 'domestic' },
                { label: '해외', value: 'overseas', disabled: true },
              ]}
            />
          </div>
        ))}
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
  // 선택값을 탭 바깥(아래 "선택: ..." 문구)에서 읽어야 하므로 여기서는 제어 모드가 실제로 필요하다.
  // 이런 경우가 아니면 defaultValue 만으로 충분하다.
  const [region, setRegion] = useState('all')
  const [period, setPeriod] = useState('day')
  const [section, setSection] = useState('trend')

  return (
    <div className="bg-background-primary min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-yds-h1 mb-2 text-white">Tabs Examples</h1>
        <p className="text-yds-b2 mb-8 text-gray-300">각 탭을 클릭하면 사용 코드가 클립보드에 복사됩니다.</p>

        <div className="bg-background-secondary mb-8 rounded-lg p-8">
          <h2 className="text-yds-s1 mb-4 text-white">Variants × Sizes</h2>
          <p className="text-yds-c1m mb-6 text-gray-300">
            variant prop으로 default / underline 을, size prop으로 sm / md / lg 를 선택할 수 있습니다.
          </p>
          <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
            {(['sm', 'md', 'lg'] as TabsSize[]).map(size =>
              VARIANTS.map(({ variant, label }) => (
                <div key={`${size}-${variant}`}>
                  <div className="mb-2 text-sm text-yellow-300">
                    {label} · {size}
                  </div>
                  <div
                    className="hover:bg-background-tertiary cursor-pointer rounded-lg p-2 transition-colors"
                    onClick={() => copyCode(size, variant)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        copyCode(size, variant)
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${label} ${size} 탭 - 클릭 시 코드 복사`}
                  >
                    <SizedExample size={size} variant={variant} />
                  </div>
                </div>
              )),
            )}
          </div>
        </div>

        <div className="bg-background-secondary mb-8 rounded-lg p-8">
          <h2 className="text-yds-s1 mb-4 text-white">화면 전환 예시 (underline)</h2>
          <p className="text-yds-c1m mb-6 text-gray-300">
            페이지 상단에서 아래 영역 전체를 바꾸는 탭은 underline 을 사용합니다.
          </p>
          <Tabs
            variant="underline"
            value={section}
            onValueChange={setSection}
            options={SECTION_OPTIONS}
            aria-label="주식 정보"
          />
          <div className="text-yds-b2 bg-background-primary mt-4 rounded-lg p-6 text-gray-300">
            {SECTION_OPTIONS.find(option => option.value === section)?.label} 영역
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

function SizedExample({ size, variant }: { size: TabsSize; variant: TabsVariant }) {
  return <Tabs variant={variant} size={size} defaultValue="all" options={REGION_OPTIONS} />
}
