import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs, type TabOption } from './Tabs'

const OPTIONS: TabOption[] = [
  { label: '전체', value: 'all' },
  { label: '국내', value: 'domestic' },
  { label: '해외', value: 'overseas' },
]

const tab = (name: string) => screen.getByRole('radio', { name })

describe('Tabs', () => {
  describe('비제어 컴포넌트', () => {
    it('value 없이도 클릭만으로 선택이 바뀐다', async () => {
      const user = userEvent.setup()
      render(<Tabs options={OPTIONS} defaultValue="all" />)

      await user.click(tab('해외'))

      expect(tab('해외').getAttribute('aria-checked')).toBe('true')
      expect(tab('전체').getAttribute('aria-checked')).toBe('false')
    })

    it('defaultValue 로 지정한 탭이 처음부터 선택되어 있다', () => {
      render(<Tabs options={OPTIONS} defaultValue="domestic" />)

      expect(tab('국내').getAttribute('aria-checked')).toBe('true')
    })

    it('defaultValue 가 없으면 아무 탭도 선택되지 않는다', () => {
      render(<Tabs options={OPTIONS} />)

      for (const option of OPTIONS) {
        expect(tab(option.label).getAttribute('aria-checked')).toBe('false')
      }
    })

    it('비제어여도 onValueChange 로 변경을 알린다', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(<Tabs options={OPTIONS} defaultValue="all" onValueChange={onValueChange} />)

      await user.click(tab('국내'))

      expect(onValueChange).toHaveBeenCalledWith('domestic')
      expect(tab('국내').getAttribute('aria-checked')).toBe('true')
    })

    it('defaultValue 가 나중에 바뀌어도 이미 시작된 선택을 덮어쓰지 않는다', () => {
      const { rerender } = render(<Tabs options={OPTIONS} defaultValue="all" />)
      rerender(<Tabs options={OPTIONS} defaultValue="overseas" />)

      expect(tab('전체').getAttribute('aria-checked')).toBe('true')
      expect(tab('해외').getAttribute('aria-checked')).toBe('false')
    })
  })

  describe('제어 컴포넌트', () => {
    it('onValueChange 에 선택된 값을 넘긴다', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(<Tabs options={OPTIONS} value="all" onValueChange={onValueChange} />)

      await user.click(tab('해외'))

      expect(onValueChange).toHaveBeenCalledWith('overseas')
    })

    it('value 가 바뀌지 않으면 선택도 바뀌지 않는다 (상태의 출처는 value 하나뿐)', async () => {
      const user = userEvent.setup()
      render(<Tabs options={OPTIONS} value="all" onValueChange={() => {}} />)

      await user.click(tab('해외'))

      expect(tab('전체').getAttribute('aria-checked')).toBe('true')
      expect(tab('해외').getAttribute('aria-checked')).toBe('false')
    })

    it('바깥 상태와 함께 쓰면 선택이 반영된다', async () => {
      function Controlled() {
        const [value, setValue] = useState('all')
        return (
          <>
            <Tabs options={OPTIONS} value={value} onValueChange={setValue} />
            <p>선택: {value}</p>
          </>
        )
      }
      const user = userEvent.setup()
      render(<Controlled />)

      await user.click(tab('국내'))

      expect(screen.getByText('선택: domestic')).toBeTruthy()
    })
  })

  describe('disabled', () => {
    it('비활성 탭은 클릭해도 선택되지 않는다', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(
        <Tabs
          options={[...OPTIONS.slice(0, 2), { label: '해외', value: 'overseas', disabled: true }]}
          defaultValue="all"
          onValueChange={onValueChange}
        />,
      )

      await user.click(tab('해외'))

      expect(onValueChange).not.toHaveBeenCalled()
      expect(tab('전체').getAttribute('aria-checked')).toBe('true')
    })
  })

  describe('키보드 탐색', () => {
    it('오른쪽 방향키로 다음 탭이 선택된다', async () => {
      const user = userEvent.setup()
      render(<Tabs options={OPTIONS} defaultValue="all" />)

      tab('전체').focus()
      await user.keyboard('{ArrowRight}')

      expect(tab('국내').getAttribute('aria-checked')).toBe('true')
    })

    it('마지막 탭에서 오른쪽 방향키를 누르면 첫 탭으로 순환한다', async () => {
      const user = userEvent.setup()
      render(<Tabs options={OPTIONS} defaultValue="overseas" />)

      tab('해외').focus()
      await user.keyboard('{ArrowRight}')

      expect(tab('전체').getAttribute('aria-checked')).toBe('true')
    })

    it('비활성 탭은 방향키 이동에서 건너뛴다', async () => {
      const user = userEvent.setup()
      render(
        <Tabs
          options={[OPTIONS[0], { label: '국내', value: 'domestic', disabled: true }, OPTIONS[2]]}
          defaultValue="all"
        />,
      )

      tab('전체').focus()
      await user.keyboard('{ArrowRight}')

      expect(tab('해외').getAttribute('aria-checked')).toBe('true')
    })

    it('Home / End 로 첫 탭과 마지막 탭을 선택한다', async () => {
      const user = userEvent.setup()
      render(<Tabs options={OPTIONS} defaultValue="domestic" />)

      tab('국내').focus()
      await user.keyboard('{End}')
      expect(tab('해외').getAttribute('aria-checked')).toBe('true')

      await user.keyboard('{Home}')
      expect(tab('전체').getAttribute('aria-checked')).toBe('true')
    })
  })

  describe('선택 상태 클래스', () => {
    /**
     * 조건부 클래스를 템플릿 리터럴 안의 선행 공백으로 붙이면 prettier-plugin-tailwindcss 가
     * 그 공백을 지워 두 클래스가 한 덩어리로 붙는다. aria 속성만 보는 테스트는 이걸 잡지 못한다.
     */
    it('선택된 탭의 클래스가 기본 클래스와 분리되어 붙는다', () => {
      const { container } = render(<Tabs options={OPTIONS} defaultValue="all" />)

      const selected = container.querySelector('[aria-checked="true"]') as HTMLElement
      expect(selected.classList.contains('yds-tabs-item')).toBe(true)
      expect(selected.classList.contains('yds-tabs-item-selected')).toBe(true)
      expect(container.querySelectorAll('.yds-tabs-item-selected').length).toBe(1)
    })
  })
})
