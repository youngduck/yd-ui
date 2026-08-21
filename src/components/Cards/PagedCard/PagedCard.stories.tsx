import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { PagedCard } from './PagedCard'

const meta: Meta<typeof PagedCard> = {
  title: 'Components/PagedCard',
  component: PagedCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
YD-UI 디자인 시스템의 페이지네이션 카드 컴포넌트입니다.

Card(surface) 위에 헤더(제목 + 우측 상단 dot 페이저)와 좌우로 넘기는 페이지 본문을 얹은 합성(compound) 컴포넌트입니다.

## 주요 특징
- \`PagedCard\` / \`PagedCard.Header\` / \`PagedCard.Page\` 의 compound 구조 (Context 로 현재 페이지 공유)
- 우측 상단 **dot 클릭** 으로 페이지 전환
- 전환 애니메이션은 별도 라이브러리 없이 CSS transform(translateX) transition 으로 처리 (\`prefers-reduced-motion\` 대응)
- \`page\`/\`onPageChange\`(controlled), \`defaultPage\`(uncontrolled) 모두 지원
- 표면은 Card 를 재사용하므로 \`variant\`(outlined/filled) 전달 가능

## 사용 예시
\`\`\`tsx
<PagedCard defaultPage={0} className="w-80 h-64">
  <PagedCard.Header>Stages</PagedCard.Header>
  <PagedCard.Page>...1페이지...</PagedCard.Page>
  <PagedCard.Page>...2페이지...</PagedCard.Page>
</PagedCard>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof PagedCard>

const pageBoxClass = 'flex h-full w-full items-center justify-center text-yds-b1 text-white'

export const Default: Story = {
  render: () => (
    <PagedCard defaultPage={0} className="h-64 w-80">
      <PagedCard.Header>Stages</PagedCard.Header>
      <PagedCard.Page>
        <div className={pageBoxClass}>1 페이지</div>
      </PagedCard.Page>
      <PagedCard.Page>
        <div className={pageBoxClass}>2 페이지</div>
      </PagedCard.Page>
      <PagedCard.Page>
        <div className={pageBoxClass}>3 페이지</div>
      </PagedCard.Page>
    </PagedCard>
  ),
}

export const Filled: Story = {
  parameters: {
    docs: {
      description: {
        story: '배경색으로 영역을 구분하는 filled variant 입니다. (기본값은 Card 와 동일하게 outlined)',
      },
    },
  },
  render: () => (
    <PagedCard variant="filled" defaultPage={0} className="h-64 w-80">
      <PagedCard.Header>Filled</PagedCard.Header>
      <PagedCard.Page>
        <div className={pageBoxClass}>A</div>
      </PagedCard.Page>
      <PagedCard.Page>
        <div className={pageBoxClass}>B</div>
      </PagedCard.Page>
    </PagedCard>
  ),
}

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'page/onPageChange 로 외부 상태와 동기화하는 제어 모드 예시입니다.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(0)
    return (
      <div className="flex flex-col items-center gap-4">
        <PagedCard page={page} onPageChange={setPage} className="h-64 w-80">
          <PagedCard.Header>현재: {page + 1}페이지</PagedCard.Header>
          <PagedCard.Page>
            <div className={pageBoxClass}>1</div>
          </PagedCard.Page>
          <PagedCard.Page>
            <div className={pageBoxClass}>2</div>
          </PagedCard.Page>
          <PagedCard.Page>
            <div className={pageBoxClass}>3</div>
          </PagedCard.Page>
        </PagedCard>
        <div className="flex gap-2">
          <button type="button" className="text-yds-c1m text-white" onClick={() => setPage((p) => Math.max(p - 1, 0))}>
            이전
          </button>
          <button type="button" className="text-yds-c1m text-white" onClick={() => setPage((p) => Math.min(p + 1, 2))}>
            다음
          </button>
        </div>
      </div>
    )
  },
}
