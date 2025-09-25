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
  type UiState = { isOpen: boolean; searchValue: string }
  type Action =
    | { type: 'OPEN' }
    | { type: 'CLOSE' }
    | { type: 'TOGGLE' }
    | { type: 'SEARCH'; term: string }
    | { type: 'RESET_SEARCH' }

  const [ui, dispatch] = useReducer(
    (s: UiState, a: Action): UiState => {
      switch (a.type) {
        case 'OPEN':
          return { ...s, isOpen: true }
        case 'CLOSE':
          return { isOpen: false, searchValue: '' }
        case 'TOGGLE':
          return { ...s, isOpen: !s.isOpen }
        case 'SEARCH':
          return { ...s, searchValue: a.term }
        case 'RESET_SEARCH':
          return { ...s, searchValue: '' }
        default:
          return s
      }
    },
    { isOpen: false, searchValue: '' },
  )
  const { isOpen, searchValue } = ui
  const controlledSelected = useMemo(() => {
    if (!isControlled) return EMPTY_OPTION
    return options.find(opt => opt.value === value) || EMPTY_OPTION
  }, [isControlled, options, value])

  const viewSelected = isControlled ? controlledSelected : selectedOption
  const hasOption = viewSelected.value !== '' && viewSelected.label !== ''

  const containerRef = useRef<HTMLDivElement>(null)

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

  return {
    // 상태값들
    selectedOption: viewSelected,
    isOpen,
    searchValue,
    options,
    search,
    containerRef,

    // 액션들
    handleClickOption: handleSelect,
    handleToggle,
    handleSearch,
    handleClose,

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
