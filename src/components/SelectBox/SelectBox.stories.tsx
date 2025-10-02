import { Meta, StoryObj } from '@storybook/react'
import { SelectBox } from './SelectBox'
import { useSelectBox } from './hooks/useSelectBox'

const meta: Meta<typeof SelectBox> = {
  component: SelectBox,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'full'],
      control: { type: 'select' },
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SelectBox>

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Fixed width select boxes */}
      {(['sm', 'md', 'lg'] as const).map(size => (
        <div key={size}>
          <div className="mb-2 text-lg font-bold text-white capitalize">{size}</div>
          <div className="flex gap-8">
            {/* Basic */}
            <div>
              <div className="mb-1 text-sm text-yellow-300">Basic</div>
              <div className="flex gap-2">
                <SelectBox
                  size={size}
                  selectBoxHook={useSelectBox({
                    options: [
                      { label: 'option1', value: '남자' },
                      { label: 'option2', value: '여자' },
                      { label: 'option3', value: '기타' },
                    ],
                    defaultValue: '기타',
                  })}
                />
              </div>
            </div>
            {/* With Search */}
            <div>
              <div className="mb-1 text-sm text-yellow-300">With Search</div>
              <div className="flex gap-2">
                <SelectBox
                  size={size}
                  selectBoxHook={useSelectBox({
                    options: [
                      { label: 'option1', value: '서울특별시' },
                      { label: 'option2', value: '부산광역시' },
                      { label: 'option3', value: '대구광역시' },
                      { label: 'option4', value: '인천광역시' },
                    ],
                    search: true,
                    defaultValue: '서울특별시',
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Full width select boxes */}
      <div>
        <div className="mb-2 text-lg font-bold text-white capitalize">full</div>
        <div className="max-w-2xl rounded-lg border border-gray-600 p-4">
          <div className="flex gap-8">
            {/* Basic */}
            <div className="flex-1">
              <div className="mb-1 text-sm text-yellow-300">Basic</div>
              <div className="flex gap-2">
                <SelectBox
                  size="full"
                  selectBoxHook={useSelectBox({
                    options: [
                      { label: 'option1', value: '선택안함' },
                      { label: 'option2', value: '옵션1' },
                      { label: 'option3', value: '옵션2' },
                    ],
                  })}
                />
              </div>
            </div>
            {/* With Search */}
            <div className="flex-1">
              <div className="mb-1 text-sm text-yellow-300">With Search</div>
              <div className="flex gap-2">
                <SelectBox
                  size="full"
                  selectBoxHook={useSelectBox({
                    options: Array.from({ length: 20 }, (_, i) => ({
                      label: `option${i + 1}`,
                      value: `옵션 ${i + 1}`,
                    })),
                    search: true,
                    defaultValue: '옵션 1',
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* States */}
      <div>
        <div className="mb-2 text-lg font-bold text-white">States</div>
        <div className="flex gap-8">
          {/* Empty State */}
          <div>
            <div className="mb-1 text-sm text-yellow-300">Empty State</div>
            <div className="flex gap-2">
              <SelectBox
                size="md"
                selectBoxHook={useSelectBox({
                  options: [
                    { label: 'option1', value: '선택안함' },
                    { label: 'option2', value: '옵션1' },
                    { label: 'option3', value: '옵션2' },
                  ],
                  // defaultValue 없음 - "선택" 표시
                })}
              />
            </div>
          </div>
          {/* With Default */}
          <div>
            <div className="mb-1 text-sm text-yellow-300">With Default</div>
            <div className="flex gap-2">
              <SelectBox
                size="md"
                selectBoxHook={useSelectBox({
                  options: [
                    { label: 'option1', value: '남자' },
                    { label: 'option2', value: '여자' },
                    { label: 'option3', value: '기타' },
                  ],
                  defaultValue: '여자',
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

// 개별 컴포넌트 테스트용 스토리들
export const Default: Story = {
  render: () => {
    const selectBoxHook = useSelectBox({
      options: [
        { label: 'option1', value: '남자' },
        { label: 'option2', value: '여자' },
        { label: 'option3', value: '기타' },
      ],
      defaultValue: '기타',
    })

    return <SelectBox selectBoxHook={selectBoxHook} />
  },
}

export const WithSearch: Story = {
  render: () => {
    const selectBoxHook = useSelectBox({
      options: [
        { label: 'option1', value: '서울특별시' },
        { label: 'option2', value: '부산광역시' },
        { label: 'option3', value: '대구광역시' },
        { label: 'option4', value: '인천광역시' },
        { label: 'option5', value: '광주광역시' },
        { label: 'option6', value: '대전광역시' },
        { label: 'option7', value: '울산광역시' },
      ],
      search: true,
      defaultValue: '서울특별시',
    })

    return <SelectBox selectBoxHook={selectBoxHook} />
  },
}

export const Empty: Story = {
  render: () => {
    const selectBoxHook = useSelectBox({
      options: [
        { label: 'option1', value: '선택안함' },
        { label: 'option2', value: '옵션1' },
        { label: 'option3', value: '옵션2' },
      ],
      // defaultValue 없음
    })

    return <SelectBox selectBoxHook={selectBoxHook} />
  },
}

export const ManyOptions: Story = {
  render: () => {
    const manyOptions = Array.from({ length: 50 }, (_, i) => ({
      label: `option${i + 1}`,
      value: `옵션 ${i + 1}`,
    }))

    const selectBoxHook = useSelectBox({
      options: manyOptions,
      search: true,
    })

    return <SelectBox selectBoxHook={selectBoxHook} />
  },
}
