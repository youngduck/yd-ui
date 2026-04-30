/**
 * 작성자: KYD
 * 기능: 사용자 선택을 받는 선택박스 컴포넌트, 검색기능도 같이 제공
 * 프로세스 설명: 선택박스 컴포넌트
 */

import { Check, ChevronDown, Search } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { useSelectBox } from './hooks/useSelectBox'
import { useId } from 'react'

const wrapperVariants = cva('relative h-12', {
  variants: {
    size: {
      sm: 'w-[200px]',
      md: 'w-[300px]',
      lg: 'w-[400px]',
      full: 'w-full',
    },
  },
  defaultVariants: {
    size: 'full',
  },
})
export type SelectBoxProps = {
  selectBoxHook: ReturnType<typeof useSelectBox>
  label?: string
} & VariantProps<typeof wrapperVariants>

export function SelectBox({ size, selectBoxHook, label }: SelectBoxProps) {
  const {
    selectedOption,
    isOpen,
    searchValue,
    filteredOptions,
    selectedText,
    search,
    containerRef,
    highlightedIndex,
    handleClickOption,
    handleToggle,
    handleSearch,
    handleTriggerKeyDown,
    handleOptionKeyDown,
    listboxRef,
    optionRefs,
  } = selectBoxHook

  const listboxId = useId()
  const labelId = useId()

  return (
    <div className={wrapperVariants({ size })} ref={containerRef}>
      {label && (
        <span id={labelId} className="sr-only">
          {label}
        </span>
      )}
      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? listboxId : undefined}
        aria-labelledby={label ? labelId : undefined}
        tabIndex={0}
        className="border-primary-100 text-yds-b1 flex h-full w-full cursor-pointer items-center justify-between rounded-lg border-2 p-3 text-yellow-100"
        onClick={handleToggle}
        onKeyDown={handleTriggerKeyDown}
      >
        {selectedText}
        <ChevronDown className="text-yellow-100 transition-transform duration-300" aria-hidden />
      </div>
      {isOpen && (
        <div className="bg-background-secondary border-primary-100 z-[var(--z-index-select-box-dropdown)] absolute top-14 left-0 flex w-full flex-col gap-2 rounded-lg border-2 p-3">
          {search && (
            <div className="flex h-[40px] items-center border-y-2 border-yellow-100">
              <Search className="text-yellow-100" size={20} aria-hidden />
              <input
                type="text"
                role="searchbox"
                aria-label="옵션 검색"
                className="w-full p-2 text-white hover:outline-none focus:outline-none"
                value={searchValue}
                placeholder="검색으로 쉽게찾기"
                onChange={e => handleSearch(e.target.value)}
              />
            </div>
          )}
          <div
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            aria-label={label || '옵션 목록'}
            className="scrollbar-hide flex h-auto max-h-[200px] flex-col gap-2 overflow-y-scroll"
          >
            {filteredOptions.map((option, index) => (
              <div
                key={option.label}
                ref={el => { optionRefs.current[index] = el }}
                role="option"
                aria-selected={selectedOption.value === option.value}
                tabIndex={highlightedIndex === index ? 0 : -1}
                className={`text-yds-c1m hover:bg-background-primary flex cursor-pointer items-center justify-between text-white ${highlightedIndex === index ? 'bg-background-primary' : ''}`}
                onClick={() => handleClickOption(option)}
                onKeyDown={e => handleOptionKeyDown(e, option, index)}
              >
                {option.value}
                {selectedOption.value === option.value && <Check className="text-yellow-100" size={20} aria-hidden />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
