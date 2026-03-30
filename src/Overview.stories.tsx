import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Button } from './components/Button/Button'
import { Input } from './components/Input/Input'
import { CheckBox } from './components/CheckBox/CheckBox'
import { SelectBox } from './components/SelectBox/SelectBox'
import { useSelectBox } from './components/SelectBox/hooks/useSelectBox'
import { Chips } from './components/Chips/Chips'
import { Table, THead, TBody, Tr, Th, Td } from './components/Table'

const meta: Meta = {
  title: 'Overview',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

const OverviewPage: React.FC = () => {
  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(true)
  const [checked3, setChecked3] = useState(false)

  const selectBox1 = useSelectBox({
    options: [
      { label: 'option1', value: 'Option A' },
      { label: 'option2', value: 'Option B' },
      { label: 'option3', value: 'Option C' },
    ],
    defaultValue: 'Option A',
  })

  const selectBox2 = useSelectBox({
    options: [
      { label: 'option1', value: 'Option A' },
      { label: 'option2', value: 'Option B' },
    ],
    search: true,
  })

  const primaryColors = [
    { name: 'primary-50', value: 'rgb(252, 246, 223)', class: 'bg-primary-50' },
    { name: 'primary-100', value: 'rgb(201, 191, 145)', class: 'bg-primary-100' },
    { name: 'primary-200', value: 'rgb(253, 230, 138)', class: 'bg-primary-200' },
    { name: 'primary-300', value: 'rgb(236, 203, 67)', class: 'bg-primary-300' },
    { name: 'primary-400', value: 'rgb(233, 190, 17)', class: 'bg-primary-400' },
  ]

  const secondaryColors = [
    { name: 'secondary-50', value: 'rgb(77,89,109)', class: 'bg-secondary-50' },
    { name: 'secondary-100', value: 'rgb(52,58,70)', class: 'bg-secondary-100' },
    { name: 'secondary-200', value: 'rgb(32,36,45)', class: 'bg-secondary-200' },
    { name: 'secondary-300', value: 'rgb(42,48,60)', class: 'bg-secondary-300' },
    { name: 'secondary-400', value: 'rgb(25,25,31)', class: 'bg-secondary-400' },
  ]

  return (
    <div className="bg-background-primary flex min-h-screen flex-col gap-10 p-10">
      {/* 1행: 로고 + 색상 */}
      <div className="flex items-center gap-12">
        <section className="flex shrink-0 flex-col items-center">
          <img src="/logo.png" alt="YD-UI Logo" className="h-60 w-60" />
          <h1 className="text-yds-h1 text-primary-400">YD - Design System</h1>
        </section>
        <div className="flex flex-1 flex-col gap-6">
          <div>
            <h2 className="text-yds-h2 mb-4 text-white">Primary</h2>
            <div className="flex gap-3">
              {primaryColors.map(c => (
                <div key={c.name} className={`${c.class} h-20 w-20 rounded-lg`} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-yds-h2 mb-4 text-white">Secondary</h2>
            <div className="flex gap-3">
              {secondaryColors.map(c => (
                <div key={c.name} className={`${c.class} border-secondary-50 h-20 w-20 rounded-lg`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2행: Button, Input, CheckBox */}
      <div className="flex gap-8">
        <section className="flex-1">
          <h2 className="text-yds-h2 text-primary-300 mb-4">Button</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm" variant="fill" color="primary">
              Small
            </Button>
            <Button size="md" variant="fill" color="primary">
              Medium
            </Button>
            <Button size="lg" variant="fill" color="primary">
              Large
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button size="sm" variant="outlined" color="primary">
              Small
            </Button>
            <Button size="md" variant="outlined" color="primary">
              Medium
            </Button>
            <Button size="lg" variant="outlined" color="primary">
              Large
            </Button>
          </div>
          <div className="mt-3">
            <Button size="full" variant="fill" color="primary">
              Full Width
            </Button>
          </div>
        </section>

        <section className="flex-1">
          <h2 className="text-yds-h2 text-primary-300 mb-4">Input</h2>
          <div className="flex flex-col gap-3">
            <Input size="md" variant="search" color="white" placeholder="검색..." />
            <Input size="md" variant="input" color="primary-400" placeholder="입력..." />
            <Input size="md" variant="input" color="primary-100" placeholder="입력..." />
            <Input size="md" variant="input" color="primary-400" placeholder="Disabled" disabled />
          </div>
        </section>

        <section className="flex-1">
          <h2 className="text-yds-h2 text-primary-300 mb-4">CheckBox</h2>
          <div className="flex flex-col gap-3">
            <CheckBox value="Unchecked" checked={checked1} onCheckedChange={setChecked1} shape="square" />
            <CheckBox value="Checked" checked={checked2} onCheckedChange={setChecked2} shape="square" />
            <CheckBox value="Check Shape" checked={checked3} onCheckedChange={setChecked3} shape="check" />
            <CheckBox value="Indeterminate" checked={false} onCheckedChange={() => {}} indeterminate shape="square" />
          </div>
        </section>
      </div>

      {/* 3행: SelectBox, Chips, Table */}
      <div className="flex gap-8">
        <section className="flex-1">
          <h2 className="text-yds-h2 text-primary-300 mb-4">SelectBox</h2>
          <div className="flex flex-col gap-3">
            <SelectBox selectBoxHook={selectBox1} size="md" />
            <SelectBox selectBoxHook={selectBox2} size="md" />
          </div>
        </section>

        <section className="flex-1">
          <h2 className="text-yds-h2 text-primary-300 mb-4">Chips</h2>
          <div className="flex flex-wrap gap-3">
            <Chips variant="fill" color="primary">
              <span className="text-black">Fill</span>
            </Chips>
            <Chips variant="outlined" color="primary">
              Outlined
            </Chips>
            <Chips variant="fill" color="primary">
              <span className="text-black">Tag</span>
            </Chips>
            <Chips variant="outlined" color="primary">
              Label
            </Chips>
          </div>
        </section>

        <section className="flex-1">
          <h2 className="text-yds-h2 text-primary-300 mb-4">Table</h2>
          <Table>
            <THead>
              <Tr>
                <Th>Name</Th>
                <Th>Position</Th>
                <Th>Status</Th>
              </Tr>
            </THead>
            <TBody>
              <Tr>
                <Td>김영덕</Td>
                <Td>Frontend</Td>
                <Td>
                  <Chips variant="fill" color="primary">
                    <span className="text-black">Active</span>
                  </Chips>
                </Td>
              </Tr>
              <Tr>
                <Td>홍길동</Td>
                <Td>Backend</Td>
                <Td>
                  <Chips variant="outlined" color="primary">
                    Inactive
                  </Chips>
                </Td>
              </Tr>
            </TBody>
          </Table>
        </section>
      </div>
    </div>
  )
}

export const Showcase: StoryObj = {
  render: () => <OverviewPage />,
}
