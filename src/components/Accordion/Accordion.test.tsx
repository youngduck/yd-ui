import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Accordion, type AccordionItem } from './Accordion'

const ITEMS: AccordionItem[] = [
  { label: '배송은 얼마나 걸리나요?', value: 'delivery', content: <p>영업일 기준 2~3일 소요됩니다.</p> },
  { label: '교환·반품이 가능한가요?', value: 'return', content: <p>수령 후 7일 이내 가능합니다.</p> },
  { label: '해외 배송도 되나요?', value: 'overseas', content: <p>일부 국가에 한해 가능합니다.</p> },
]

/** 제어 컴포넌트를 실제 사용처처럼 상태와 함께 렌더한다 */
function ControlledAccordion({
  items = ITEMS,
  type,
  defaultOpen = [],
  lazy,
}: {
  items?: AccordionItem[]
  type?: 'single' | 'multiple'
  defaultOpen?: string[]
  lazy?: boolean
}) {
  const [value, setValue] = useState<string[]>(defaultOpen)
  return <Accordion items={items} value={value} onValueChange={setValue} type={type} lazy={lazy} />
}

const trigger = (name: string) => screen.getByRole('button', { name })

describe('Accordion', () => {
  describe('펼치기/접기', () => {
    it('기본적으로 모든 항목이 접혀 있다', () => {
      render(<ControlledAccordion />)

      for (const item of ITEMS) {
        expect(trigger(item.label as string).getAttribute('aria-expanded')).toBe('false')
      }
    })

    it('헤더를 클릭하면 펼쳐진다', async () => {
      const user = userEvent.setup()
      render(<ControlledAccordion />)

      await user.click(trigger('배송은 얼마나 걸리나요?'))

      expect(trigger('배송은 얼마나 걸리나요?').getAttribute('aria-expanded')).toBe('true')
      expect(screen.getByText('영업일 기준 2~3일 소요됩니다.')).toBeTruthy()
    })

    it('펼쳐진 헤더를 다시 클릭하면 접힌다', async () => {
      const user = userEvent.setup()
      render(<ControlledAccordion defaultOpen={['delivery']} />)

      await user.click(trigger('배송은 얼마나 걸리나요?'))

      expect(trigger('배송은 얼마나 걸리나요?').getAttribute('aria-expanded')).toBe('false')
    })
  })

  describe('type', () => {
    it('single(기본값)은 하나를 펼치면 나머지가 닫힌다', async () => {
      const user = userEvent.setup()
      render(<ControlledAccordion defaultOpen={['delivery']} />)

      await user.click(trigger('교환·반품이 가능한가요?'))

      expect(trigger('배송은 얼마나 걸리나요?').getAttribute('aria-expanded')).toBe('false')
      expect(trigger('교환·반품이 가능한가요?').getAttribute('aria-expanded')).toBe('true')
    })

    it('multiple은 여러 항목을 동시에 펼칠 수 있다', async () => {
      const user = userEvent.setup()
      render(<ControlledAccordion type="multiple" defaultOpen={['delivery']} />)

      await user.click(trigger('교환·반품이 가능한가요?'))

      expect(trigger('배송은 얼마나 걸리나요?').getAttribute('aria-expanded')).toBe('true')
      expect(trigger('교환·반품이 가능한가요?').getAttribute('aria-expanded')).toBe('true')
    })
  })

  describe('제어 컴포넌트', () => {
    it('onValueChange에 변경된 값 목록을 넘긴다', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(<Accordion items={ITEMS} value={[]} onValueChange={onValueChange} />)

      await user.click(trigger('해외 배송도 되나요?'))

      expect(onValueChange).toHaveBeenCalledWith(['overseas'])
    })

    it('value가 바뀌지 않으면 펼쳐지지 않는다 (상태의 출처는 value 하나뿐)', async () => {
      const user = userEvent.setup()
      render(<Accordion items={ITEMS} value={[]} onValueChange={() => {}} />)

      await user.click(trigger('해외 배송도 되나요?'))

      expect(trigger('해외 배송도 되나요?').getAttribute('aria-expanded')).toBe('false')
    })
  })

  describe('비제어 컴포넌트', () => {
    it('value 없이도 클릭만으로 펼쳐진다', async () => {
      const user = userEvent.setup()
      render(<Accordion items={ITEMS} />)

      await user.click(trigger('해외 배송도 되나요?'))

      expect(trigger('해외 배송도 되나요?').getAttribute('aria-expanded')).toBe('true')
      expect(screen.getByText('일부 국가에 한해 가능합니다.')).toBeTruthy()
    })

    it('defaultValue에 넣은 항목은 처음부터 펼쳐져 있다', () => {
      render(<Accordion items={ITEMS} type="multiple" defaultValue={['delivery', 'return']} />)

      expect(trigger('배송은 얼마나 걸리나요?').getAttribute('aria-expanded')).toBe('true')
      expect(trigger('교환·반품이 가능한가요?').getAttribute('aria-expanded')).toBe('true')
      expect(trigger('해외 배송도 되나요?').getAttribute('aria-expanded')).toBe('false')
    })

    it('비제어여도 onValueChange로 변경을 알린다', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(<Accordion items={ITEMS} onValueChange={onValueChange} />)

      await user.click(trigger('해외 배송도 되나요?'))

      expect(onValueChange).toHaveBeenCalledWith(['overseas'])
      expect(trigger('해외 배송도 되나요?').getAttribute('aria-expanded')).toBe('true')
    })

    it('defaultValue가 나중에 바뀌어도 이미 시작된 상태를 덮어쓰지 않는다', () => {
      const { rerender } = render(<Accordion items={ITEMS} defaultValue={['delivery']} />)
      rerender(<Accordion items={ITEMS} defaultValue={['overseas']} />)

      expect(trigger('배송은 얼마나 걸리나요?').getAttribute('aria-expanded')).toBe('true')
      expect(trigger('해외 배송도 되나요?').getAttribute('aria-expanded')).toBe('false')
    })
  })

  describe('disabled', () => {
    const withDisabled: AccordionItem[] = [ITEMS[0], { ...ITEMS[1], disabled: true }, ITEMS[2]]

    it('비활성 항목은 클릭해도 펼쳐지지 않는다', async () => {
      const user = userEvent.setup()
      render(<ControlledAccordion items={withDisabled} />)

      await user.click(trigger('교환·반품이 가능한가요?'))

      expect(trigger('교환·반품이 가능한가요?').getAttribute('aria-expanded')).toBe('false')
    })

    it('방향키 이동에서 비활성 항목을 건너뛴다', async () => {
      const user = userEvent.setup()
      render(<ControlledAccordion items={withDisabled} />)

      trigger('배송은 얼마나 걸리나요?').focus()
      await user.keyboard('{ArrowDown}')

      expect(document.activeElement).toBe(trigger('해외 배송도 되나요?'))
    })
  })

  describe('키보드 탐색', () => {
    it('ArrowDown으로 다음 헤더로 이동하고 마지막에서 순환한다', async () => {
      const user = userEvent.setup()
      render(<ControlledAccordion />)

      trigger('해외 배송도 되나요?').focus()
      await user.keyboard('{ArrowDown}')

      expect(document.activeElement).toBe(trigger('배송은 얼마나 걸리나요?'))
    })

    it('ArrowUp으로 이전 헤더로 이동한다', async () => {
      const user = userEvent.setup()
      render(<ControlledAccordion />)

      trigger('교환·반품이 가능한가요?').focus()
      await user.keyboard('{ArrowUp}')

      expect(document.activeElement).toBe(trigger('배송은 얼마나 걸리나요?'))
    })

    it('Home/End로 처음·마지막 헤더로 이동한다', async () => {
      const user = userEvent.setup()
      render(<ControlledAccordion />)

      trigger('교환·반품이 가능한가요?').focus()
      await user.keyboard('{End}')
      expect(document.activeElement).toBe(trigger('해외 배송도 되나요?'))

      await user.keyboard('{Home}')
      expect(document.activeElement).toBe(trigger('배송은 얼마나 걸리나요?'))
    })

    it('Enter로 펼칠 수 있다', async () => {
      const user = userEvent.setup()
      render(<ControlledAccordion />)

      trigger('배송은 얼마나 걸리나요?').focus()
      await user.keyboard('{Enter}')

      expect(trigger('배송은 얼마나 걸리나요?').getAttribute('aria-expanded')).toBe('true')
    })

    it('모든 헤더가 Tab으로 접근 가능하다 (로빙 탭인덱스를 쓰지 않는다)', async () => {
      const user = userEvent.setup()
      render(<ControlledAccordion />)

      await user.tab()
      expect(document.activeElement).toBe(trigger('배송은 얼마나 걸리나요?'))

      await user.tab()
      expect(document.activeElement).toBe(trigger('교환·반품이 가능한가요?'))
    })
  })

  describe('variant', () => {
    it('기본값은 outlined 다', () => {
      const { container } = render(<Accordion items={ITEMS} value={[]} onValueChange={() => {}} />)

      expect(container.querySelector('.yds-accordion-outlined')).toBeTruthy()
      expect(container.querySelector('.yds-accordion-filled')).toBeNull()
    })

    it('filled 를 주면 배경 variant 클래스가 붙는다', () => {
      const { container } = render(<Accordion items={ITEMS} value={[]} onValueChange={() => {}} variant="filled" />)

      expect(container.querySelector('.yds-accordion-filled')).toBeTruthy()
      expect(container.querySelector('.yds-accordion-outlined')).toBeNull()
    })
  })

  describe('펼침 상태 클래스', () => {
    /**
     * 조건부 클래스를 템플릿 리터럴 안의 선행 공백으로 붙이면 prettier-plugin-tailwindcss 가
     * 그 공백을 지워 두 클래스가 한 덩어리로 붙는다. aria 속성만 보는 테스트는 이걸 잡지 못한다.
     */
    it('펼쳐진 항목의 클래스가 기본 클래스와 분리되어 붙는다', () => {
      const { container } = render(<Accordion items={ITEMS} defaultValue={['delivery']} />)

      const expandedTrigger = container.querySelector('[aria-expanded="true"]') as HTMLElement
      expect(expandedTrigger.classList.contains('yds-accordion-trigger')).toBe(true)
      expect(expandedTrigger.classList.contains('yds-accordion-trigger-expanded')).toBe(true)

      const panel = container.querySelector(`#${expandedTrigger.getAttribute('aria-controls')}`) as HTMLElement
      expect(panel.classList.contains('yds-accordion-panel')).toBe(true)
      expect(panel.classList.contains('yds-accordion-panel-expanded')).toBe(true)
    })

    it('접힌 항목에는 expanded 클래스가 붙지 않는다', () => {
      const { container } = render(<Accordion items={ITEMS} />)

      expect(container.querySelector('.yds-accordion-trigger-expanded')).toBeNull()
      expect(container.querySelector('.yds-accordion-panel-expanded')).toBeNull()
      expect(container.querySelectorAll('.yds-accordion-trigger').length).toBe(ITEMS.length)
      expect(container.querySelectorAll('.yds-accordion-panel').length).toBe(ITEMS.length)
    })
  })

  describe('접근성 구조', () => {
    it('헤더 버튼과 본문이 aria-controls / aria-labelledby로 연결된다', async () => {
      const user = userEvent.setup()
      render(<ControlledAccordion />)

      await user.click(trigger('배송은 얼마나 걸리나요?'))

      const button = trigger('배송은 얼마나 걸리나요?')
      const panel = screen.getByRole('region', { name: '배송은 얼마나 걸리나요?' })

      expect(button.getAttribute('aria-controls')).toBe(panel.id)
      expect(panel.getAttribute('aria-labelledby')).toBe(button.id)
    })

    it('헤더가 제목 요소 안에 있고 headingLevel로 레벨을 바꿀 수 있다', () => {
      const { rerender } = render(<Accordion items={ITEMS} value={[]} onValueChange={() => {}} />)
      expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(ITEMS.length)

      rerender(<Accordion items={ITEMS} value={[]} onValueChange={() => {}} headingLevel={2} />)
      expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(ITEMS.length)
    })
  })
  describe('lazy', () => {
    /** 본문이 자기 데이터를 불러오는 상황을 흉내낸다 */
    const LazyBody = ({ onMount }: { onMount: () => void }) => {
      onMount()
      return <p>불러온 내용</p>
    }

    it('lazy 면 펼치기 전까지 본문을 렌더하지 않는다', () => {
      const onMount = vi.fn()
      render(
        <Accordion
          lazy
          value={[]}
          onValueChange={() => {}}
          items={[{ label: '상세', value: 'detail', content: <LazyBody onMount={onMount} /> }]}
        />,
      )

      expect(onMount).not.toHaveBeenCalled()
    })

    it('lazy 가 아니면 접혀 있어도 본문을 렌더한다 (기본 동작)', () => {
      const onMount = vi.fn()
      render(
        <Accordion
          value={[]}
          onValueChange={() => {}}
          items={[{ label: '상세', value: 'detail', content: <LazyBody onMount={onMount} /> }]}
        />,
      )

      expect(onMount).toHaveBeenCalled()
    })

    it('lazy 라도 한 번 펼친 본문은 접어도 그대로 남는다', async () => {
      const user = userEvent.setup()
      const onMount = vi.fn()
      render(
        <ControlledAccordion
          items={[{ label: '상세', value: 'detail', content: <LazyBody onMount={onMount} /> }]}
          lazy
        />,
      )

      await user.click(trigger('상세'))
      expect(onMount).toHaveBeenCalled()

      // 접어도 언마운트되지 않으므로 다시 펼칠 때 재요청이 없다
      await user.click(trigger('상세'))
      expect(screen.getByText('불러온 내용')).toBeTruthy()
    })
  })

  describe('label', () => {
    it('label 에 JSX 를 넣을 수 있다', () => {
      render(
        <Accordion
          value={[]}
          onValueChange={() => {}}
          items={[
            {
              label: (
                <span>
                  <strong>도르트문트</strong> <em>7.4점</em>
                </span>
              ),
              value: 'match',
              content: <p>상세</p>,
            },
          ]}
        />,
      )

      expect(screen.getByRole('button', { name: /도르트문트/ })).toBeTruthy()
      expect(screen.getByText('7.4점')).toBeTruthy()
    })
  })
})
