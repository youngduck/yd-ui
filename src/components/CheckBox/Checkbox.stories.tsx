import { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { CheckBox } from './CheckBox'
import { copyCodeToClipboard } from '../../storybook/utils'

const copyCode = (shape: 'square' | 'check', checked: boolean, indeterminate: boolean, value: string) => {
  const shapeProp = shape === 'check' ? ' shape="check"' : ''
  const checkedState = checked ? 'true' : 'false'
  const indeterminateProp = indeterminate ? ' indeterminate={true}' : ''
  const code = `import { CheckBox } from '@youngduck/yd-ui';\nimport { useState } from 'react';\n\nfunction Example() {\n  const [checked, setChecked] = useState(${checkedState});\n  \n  return (\n    <CheckBox${shapeProp}${indeterminateProp}\n      value="${value}"\n      checked={checked}\n      onCheckedChange={setChecked}\n    />\n  );\n}`

  copyCodeToClipboard(code)
}

const meta: Meta<typeof CheckBox> = {
  title: 'Components/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
YD-UI 디자인 시스템의 체크박스 컴포넌트입니다.

## 주요 특징
- 2가지 형태 제공 (square, check)
- 3가지 상태 지원 (unchecked, checked, indeterminate)
- 완전 제어 형태 컴포넌트 (controlled component)
- 접근성 고려 설계

## 사용 가이드
- \`checked\`와 \`onCheckedChange\`는 필수 prop입니다.
- 완전 제어 컴포넌트이므로 상태 관리는 부모 컴포넌트에서 처리해야 합니다.
- \`shape\` prop으로 네모 형태(square) 또는 체크 아이콘 형태(check)를 선택할 수 있습니다.
- \`indeterminate\` prop으로 부분 선택 상태를 표현할 수 있습니다. (예: 체크박스 그룹에서 일부만 선택된 경우)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: '체크박스 라벨 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    shape: {
      control: 'radio',
      options: ['square', 'check'],
      description: '체크박스 형태',
      table: {
        type: { summary: "'square' | 'check'" },
        defaultValue: { summary: "'square'" },
      },
    },
    checked: {
      control: 'boolean',
      description: '체크 상태 (필수)',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onCheckedChange: {
      action: 'checked',
      description: '체크 상태 변경 핸들러 (필수)',
      table: {
        type: { summary: '(checked: boolean) => void' },
      },
    },
    name: {
      control: 'text',
      description: 'input name 속성',
      table: {
        type: { summary: 'string' },
      },
    },
    id: {
      control: 'text',
      description: 'input id 속성 (지정하지 않으면 자동 생성)',
      table: {
        type: { summary: 'string' },
      },
    },
    indeterminate: {
      control: 'boolean',
      description: '부분 선택 상태 (일부만 선택된 경우)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    type: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof CheckBox>

export const Default: Story = {
  render: args => {
    const [isChecked, setIsChecked] = useState(args.checked ?? false)

    // args.checked가 변경되면 상태 동기화
    React.useEffect(() => {
      if (args.checked !== undefined) {
        setIsChecked(args.checked)
      }
    }, [args.checked])

    return (
      <CheckBox
        value={args.value}
        shape={args.shape}
        checked={isChecked}
        indeterminate={args.indeterminate}
        onCheckedChange={setIsChecked}
      />
    )
  },
  args: {
    value: '기본 체크박스',
    shape: 'square',
    checked: false,
    indeterminate: false,
  },
}

// 🎨 CheckBox - 단축키 예시
export const Examples = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      disable: true,
    },
  },
  render: () => {
    const shapes: Array<'square' | 'check'> = ['square', 'check']
    const states = ['Unchecked', 'Checked', 'Indeterminate'] as const

    // 각 체크박스의 상태를 관리하는 컴포넌트
    const CheckboxCell = ({
      shape,
      initialState,
      initialIndeterminate,
      onCopy,
    }: {
      shape: 'square' | 'check'
      initialState: boolean
      initialIndeterminate: boolean
      onCopy: () => void
    }) => {
      const [checked, setChecked] = useState(initialState)
      const [indeterminate] = useState(initialIndeterminate)

      return (
        <div className="hover:bg-background-tertiary cursor-pointer p-4 text-center transition-colors" onClick={onCopy}>
          <div className="flex items-center justify-center">
            <CheckBox
              value="체크박스 라벨"
              shape={shape}
              checked={checked}
              indeterminate={indeterminate}
              onCheckedChange={setChecked}
            />
          </div>
        </div>
      )
    }

    return (
      <div className="bg-background-primary min-h-screen p-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-yds-h1 mb-2 text-white">CheckBox Examples</h1>
          <p className="text-yds-b2 mb-8 text-gray-300">각 체크박스를 클릭하면 사용 코드가 클립보드에 복사됩니다.</p>

          <div className="bg-background-secondary rounded-lg p-8">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-yds-b1 border-b border-gray-600 p-4 text-left text-white">Shape</th>
                  {states.map(state => (
                    <th key={state} className="text-yds-b1 border-b border-gray-600 p-4 text-center text-white">
                      {state}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shapes.map(shape => (
                  <tr key={shape} className="border-b border-gray-700">
                    <td className="text-yds-b2 p-4 font-medium text-white">
                      {shape === 'square' ? 'Square' : 'Check'}
                    </td>
                    {states.map(state => {
                      const checked = state === 'Checked'
                      const indeterminate = state === 'Indeterminate'
                      return (
                        <td key={state}>
                          <CheckboxCell
                            shape={shape}
                            initialState={checked}
                            initialIndeterminate={indeterminate}
                            onCopy={() => copyCode(shape, checked, indeterminate, '체크박스 라벨')}
                          />
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 여러 체크박스 예시 - 부모-자식 관계 */}
          <div className="bg-background-secondary mt-8 rounded-lg p-8">
            <h2 className="text-yds-s1 mb-4 text-white">Indeterminate 상태 체크박스 예시</h2>
            <IndeterminateCheckboxExample />
          </div>
        </div>
      </div>
    )
  },
}

// indeterminate 상태 체크박스 예시 컴포넌트
const IndeterminateCheckboxExample = () => {
  const [items, setItems] = useState([
    { id: 1, label: '항목 1', checked: false },
    { id: 2, label: '항목 2', checked: true },
    { id: 3, label: '항목 3', checked: false },
  ])

  const allChecked = items.every(item => item.checked)
  const someChecked = items.some(item => item.checked)
  const parentChecked = allChecked
  const parentIndeterminate = someChecked && !allChecked

  const handleParentChange = (checked: boolean) => {
    setItems(items.map(item => ({ ...item, checked })))
  }

  const handleChildChange = (id: number, checked: boolean) => {
    setItems(items.map(item => (item.id === id ? { ...item, checked } : item)))
  }

  const copyParentCode = () => {
    const code = `import { CheckBox } from '@youngduck/yd-ui';\nimport { useState } from 'react';\n\nfunction ParentChildExample() {\n  const [items, setItems] = useState([\n    { id: 1, label: '항목 1', checked: false },\n    { id: 2, label: '항목 2', checked: true },\n    { id: 3, label: '항목 3', checked: false },\n  ]);\n\n  const allChecked = items.every(item => item.checked);\n  const someChecked = items.some(item => item.checked);\n  const parentIndeterminate = someChecked && !allChecked;\n\n  const handleParentChange = (checked: boolean) => {\n    setItems(items.map(item => ({ ...item, checked })));\n  };\n\n  const handleChildChange = (id: number, checked: boolean) => {\n    setItems(items.map(item => (item.id === id ? { ...item, checked } : item)));\n  };\n\n  return (\n    <div className="space-y-2">\n      <CheckBox\n        value="전체 선택"\n        checked={allChecked}\n        indeterminate={parentIndeterminate}\n        onCheckedChange={handleParentChange}\n      />\n      {items.map(item => (\n        <div key={item.id} className="ml-6">\n          <CheckBox\n            value={item.label}\n            checked={item.checked}\n            onCheckedChange={(checked) => handleChildChange(item.id, checked)}\n          />\n        </div>\n      ))}\n    </div>\n  );\n}`

    copyCodeToClipboard(code)
  }

  return (
    <div className="space-y-4">
      <div
        className="hover:bg-background-tertiary cursor-pointer rounded p-4 transition-colors"
        onClick={copyParentCode}
      >
        <div className="space-y-2">
          <CheckBox
            value="전체 선택"
            shape="check"
            checked={parentChecked}
            indeterminate={parentIndeterminate}
            onCheckedChange={handleParentChange}
          />
          {items.map(item => (
            <div key={item.id} className="ml-6">
              <CheckBox
                value={item.label}
                shape="check"
                checked={item.checked}
                onCheckedChange={checked => handleChildChange(item.id, checked)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
