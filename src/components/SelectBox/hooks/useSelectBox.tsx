import { useEffect, useRef, useState } from 'react'

export type SelectBoxOption = {
  label: string
  value: string
}

const EMPTY_OPTION: SelectBoxOption = { label: '', value: '' }

export const useSelectBox = (config: { options: SelectBoxOption[]; defaultValue?: string; search?: boolean }) => {
  const { options, defaultValue, search = false } = config
  const defaultOption = defaultValue ? options.find(opt => opt.value === defaultValue) || EMPTY_OPTION : EMPTY_OPTION
  const [selectedOption, setSelectedOption] = useState<SelectBoxOption>(defaultOption)
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const hasOption = selectedOption.value !== '' && selectedOption.label !== ''

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchValue('') // 검색어도 초기화
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        setSearchValue('')
      }
    }

    // mousedown 사용 (click보다 빠름)
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleClickOption = (option: SelectBoxOption) => {
    setSelectedOption(option)
    setIsOpen(false)
    setSearchValue('')
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  return {
    // 상태값들
    selectedOption,
    isOpen,
    searchValue,
    options,
    search,
    containerRef,

    // 액션들
    handleClickOption,
    handleToggle,
    handleSearch,

    // 편의 프로퍼티들
    value: selectedOption.value,
    label: selectedOption.label,
    hasOption,
  }
}
