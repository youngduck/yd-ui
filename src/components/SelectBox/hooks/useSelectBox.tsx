import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { useEscapeDismiss, useOutsideDismiss } from './useDismiss'

export type SelectBoxOption = {
  label: string
  value: string
}

const EMPTY_OPTION: SelectBoxOption = { label: '', value: '' }

type UseSelectBoxConfig = {
  options: SelectBoxOption[]
  defaultValue?: string
  search?: boolean
  value?: string // controlled value (option.value)
  onChange?: (value: string, option: SelectBoxOption) => void
  filterFn?: (option: SelectBoxOption, term: string) => boolean
  itemToString?: (option: SelectBoxOption) => string
  getValue?: (option: SelectBoxOption) => string
}

export const useSelectBox = (config: UseSelectBoxConfig) => {
  const {
    options,
    defaultValue,
    search = false,
    value,
    onChange,
    filterFn = (opt, term) => opt.value.toLowerCase().includes(term.toLowerCase()),
    itemToString = opt => opt.value,
    getValue = opt => opt.value,
  } = config
  const isControlled = value !== undefined
  const defaultOption = defaultValue ? options.find(opt => opt.value === defaultValue) || EMPTY_OPTION : EMPTY_OPTION
  const [selectedOption, setSelectedOption] = useState<SelectBoxOption>(defaultOption)
  type UiState = { isOpen: boolean; searchValue: string; highlightedIndex: number }
  type Action =
    | { type: 'OPEN' }
    | { type: 'CLOSE' }
    | { type: 'TOGGLE' }
    | { type: 'SEARCH'; term: string }
    | { type: 'RESET_SEARCH' }
    | { type: 'HIGHLIGHT'; index: number }

  const [ui, dispatch] = useReducer(
    (s: UiState, a: Action): UiState => {
      switch (a.type) {
        case 'OPEN':
          return { ...s, isOpen: true, highlightedIndex: 0 }
        case 'CLOSE':
          return { isOpen: false, searchValue: '', highlightedIndex: -1 }
        case 'TOGGLE':
          return s.isOpen
            ? { isOpen: false, searchValue: '', highlightedIndex: -1 }
            : { ...s, isOpen: true, highlightedIndex: 0 }
        case 'SEARCH':
          return { ...s, searchValue: a.term, highlightedIndex: 0 }
        case 'RESET_SEARCH':
          return { ...s, searchValue: '' }
        case 'HIGHLIGHT':
          return { ...s, highlightedIndex: a.index }
        default:
          return s
      }
    },
    { isOpen: false, searchValue: '', highlightedIndex: -1 },
  )
  const { isOpen, searchValue, highlightedIndex } = ui
  const controlledSelected = useMemo(() => {
    if (!isControlled) return EMPTY_OPTION
    return options.find(opt => opt.value === value) || EMPTY_OPTION
  }, [isControlled, options, value])

  const viewSelected = isControlled ? controlledSelected : selectedOption
  const hasOption = viewSelected.value !== '' && viewSelected.label !== ''

  const containerRef = useRef<HTMLDivElement>(null)
  const listboxRef = useRef<HTMLDivElement>(null)
  const optionRefs = useRef<(HTMLElement | null)[]>([])

  const handleClose = useCallback(() => {
    dispatch({ type: 'CLOSE' })
  }, [])

  useOutsideDismiss(containerRef, isOpen, handleClose)
  useEscapeDismiss(isOpen, handleClose)

  // defaultValue / options 변경 시 선택값 동기화 (수정시 편의성 패치)
  useEffect(() => {
    if (isControlled) return
    if (!defaultValue) {
      setSelectedOption(EMPTY_OPTION)
      return
    }
    const next = options.find(opt => opt.value === defaultValue || opt.label === defaultValue) || EMPTY_OPTION
    setSelectedOption(next)
  }, [isControlled, defaultValue])

  // 파생값: 검색 결과와 표시 텍스트를 선언적으로 계산
  const filteredOptions = useMemo(() => {
    if (!searchValue) return options
    return options.filter(opt => filterFn(opt, searchValue))
  }, [options, searchValue, filterFn])

  const selectedText = useMemo(() => {
    return hasOption ? itemToString(viewSelected) : '선택'
  }, [hasOption, itemToString, viewSelected])

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE' })
  }

  const handleSearch = (value: string) => {
    dispatch({ type: 'SEARCH', term: value })
  }

  const handleSelect = (option: SelectBoxOption) => {
    if (isControlled) {
      onChange?.(option.value, option)
    } else {
      setSelectedOption(option)
    }
    handleClose()
  }

  // 하이라이트된 옵션으로 스크롤
  useEffect(() => {
    if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({ block: 'nearest' })
    }
  }, [highlightedIndex])

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (!isOpen) {
          dispatch({ type: 'OPEN' })
          // 열린 후 첫 번째 옵션에 포커스
          requestAnimationFrame(() => {
            optionRefs.current[0]?.focus()
          })
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          dispatch({ type: 'OPEN' })
          requestAnimationFrame(() => {
            optionRefs.current[0]?.focus()
          })
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!isOpen) {
          dispatch({ type: 'OPEN' })
          requestAnimationFrame(() => {
            const lastIdx = filteredOptions.length - 1
            dispatch({ type: 'HIGHLIGHT', index: lastIdx })
            optionRefs.current[lastIdx]?.focus()
          })
        }
        break
    }
  }

  const handleOptionKeyDown = (e: React.KeyboardEvent, option: SelectBoxOption, index: number) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        handleSelect(option)
        // 선택 후 트리거로 포커스 복귀
        requestAnimationFrame(() => {
          const trigger = containerRef.current?.querySelector<HTMLElement>('[role="combobox"]')
          trigger?.focus()
        })
        break
      case 'ArrowDown': {
        e.preventDefault()
        const nextIdx = index < filteredOptions.length - 1 ? index + 1 : 0
        dispatch({ type: 'HIGHLIGHT', index: nextIdx })
        optionRefs.current[nextIdx]?.focus()
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        const prevIdx = index > 0 ? index - 1 : filteredOptions.length - 1
        dispatch({ type: 'HIGHLIGHT', index: prevIdx })
        optionRefs.current[prevIdx]?.focus()
        break
      }
      case 'Home':
        e.preventDefault()
        dispatch({ type: 'HIGHLIGHT', index: 0 })
        optionRefs.current[0]?.focus()
        break
      case 'End': {
        e.preventDefault()
        const lastIdx = filteredOptions.length - 1
        dispatch({ type: 'HIGHLIGHT', index: lastIdx })
        optionRefs.current[lastIdx]?.focus()
        break
      }
      case 'Escape':
        e.preventDefault()
        handleClose()
        // 닫힌 후 트리거로 포커스 복귀
        requestAnimationFrame(() => {
          const trigger = containerRef.current?.querySelector<HTMLElement>('[role="combobox"]')
          trigger?.focus()
        })
        break
      case 'Tab':
        // Tab 누르면 드롭다운 닫고 자연스럽게 다음 요소로 이동
        handleClose()
        break
    }
  }

  return {
    // 상태값들
    selectedOption: viewSelected,
    isOpen,
    searchValue,
    options,
    search,
    containerRef,
    highlightedIndex,

    // 액션들
    handleClickOption: handleSelect,
    handleToggle,
    handleSearch,
    handleClose,
    handleTriggerKeyDown,
    handleOptionKeyDown,

    // refs
    listboxRef,
    optionRefs,

    // 편의 프로퍼티들
    value: viewSelected.value,
    label: viewSelected.label,
    hasOption,
    filteredOptions,
    selectedText,
    itemToString,
    getValue,
  }
}
