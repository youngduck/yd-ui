import { Meta, StoryObj } from '@storybook/react'

import { Table, THead, TBody, Th, Td, Tr } from './index'

const meta: Meta<typeof Table> = {
  component: Table,
}

export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {
  render: () => (
    <Table scrollable={true} scrollClassName="w-[800px] h-[200px]">
      <THead>
        <Tr>
          <Th className="w-40">Name</Th>
          <Th className="w-40">Age</Th>
          <Th className="w-40">Gender</Th>
          <Th className="w-40">Email</Th>
          <Th className="w-40">Phone</Th>
        </Tr>
      </THead>
      <TBody>
        <Tr>
          <Td>John Doe</Td>
          <Td>20</Td>
          <Td>Male</Td>
          <Td>john.doe@example.com</Td>
          <Td>123-456-7890</Td>
        </Tr>
        <Tr>
          <Td>Jane Doe</Td>
          <Td>21</Td>
          <Td>Female</Td>
          <Td>jane.doe@example.com</Td>
          <Td>123-456-7890</Td>
        </Tr>
        <Tr>
          <Td>Jim Beam</Td>
          <Td>22</Td>
          <Td>Male</Td>
          <Td>jim.beam@example.com</Td>
          <Td>123-456-7890</Td>
        </Tr>
        <Tr>
          <Td>Jim Beam</Td>
          <Td>22</Td>
          <Td>Male</Td>
          <Td>jim.beam@example.com</Td>
          <Td>123-456-7890</Td>
        </Tr>
        <Tr>
          <Td>Jim Beam</Td>
          <Td>22</Td>
          <Td>Male</Td>
          <Td>jim.beam@example.com</Td>
          <Td>123-456-7890</Td>
        </Tr>
      </TBody>
    </Table>
  ),
}
