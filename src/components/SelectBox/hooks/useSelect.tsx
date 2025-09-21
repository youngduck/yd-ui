import { useState } from 'react'

export type SelectBoxOption = {
  label: string
  value: any
}

export const useSelect = (config: {
  options: SelectBoxOption[]
  defaultValue?: any
  search?: boolean
}) => {
  const { options, defaultValue, search = false } = config
  
  const defaultOption = defaultValue 
    ? options.find(opt => opt.value === defaultValue) || null
    : null
    
  const [selectedValue, setSelectedValue] = useState<SelectBoxOption | null>(defaultOption)
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleSelect = (option: SelectBoxOption) => {
    setSelectedValue(option)
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
    selectedValue,
    isOpen,
    searchValue,
    options,
    search,
    
    // 액션들
    handleSelect,
    handleToggle,
    handleSearch,
    
    // 편의 프로퍼티들
    value: selectedValue?.value,
    selectedOption: selectedValue,
  }
}