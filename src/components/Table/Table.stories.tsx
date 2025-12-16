import { Meta, StoryObj } from '@storybook/react'
import { Table, THead, TBody, Th, Td, Tr } from './index'

const showCopySuccess = () => {
  const toast = document.createElement('div')
  toast.textContent = '코드가 클립보드에 복사되었습니다!'
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    z-index: 9999;
    font-size: 14px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `
  document.body.appendChild(toast)
  setTimeout(() => {
    document.body.removeChild(toast)
  }, 2000)
}

const copyCode = (code: string) => {
  navigator.clipboard.writeText(code)
  showCopySuccess()
}

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
YD-UI 디자인 시스템의 테이블 컴포넌트입니다.

## 주요 특징
- Compound Component 패턴으로 구성된 유연한 테이블 컴포넌트
- 스크롤 가능한 테이블 지원 (scrollable prop)
- 모든 서브 컴포넌트에서 className 커스터마이징 가능
- 접근성 고려 설계

## 사용 가이드
- \`Table\` 컴포넌트로 테이블을 감싸고, \`THead\`, \`TBody\`, \`Th\`, \`Td\`, \`Tr\` 서브 컴포넌트를 사용합니다.
- \`scrollable={true}\`일 때는 \`scrollClassName\` prop이 필수입니다. (예: "w-[800px] h-[200px]")
- \`scrollable={true}\`일 때 \`THead\`는 자동으로 sticky 처리됩니다.
- 모든 컴포넌트에서 \`className\` prop을 통해 Tailwind 클래스로 스타일을 커스터마이징할 수 있습니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    scrollable: {
      control: 'boolean',
      description: '테이블 스크롤 가능 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    scrollClassName: {
      control: 'text',
      description: '스크롤 가능한 경우 컨테이너의 크기 클래스 (예: "w-[800px] h-[200px]")',
      table: {
        type: { summary: "`'w-' | 'h-'`${string}" },
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Table>

export const Default: Story = {
  render: args => {
    if (args.scrollable) {
      return (
        <Table scrollable={true} scrollClassName={args.scrollClassName || 'w-[800px] h-[200px]'}>
          <THead>
            <Tr>
              <Th>Name</Th>
              <Th>Age</Th>
              <Th>Email</Th>
              <Th>Role</Th>
            </Tr>
          </THead>
          <TBody>
            <Tr>
              <Td>김영덕</Td>
              <Td>28</Td>
              <Td>youngduck.kim@example.com</Td>
              <Td>Developer</Td>
            </Tr>
            <Tr>
              <Td>이민수</Td>
              <Td>32</Td>
              <Td>minsu.lee@example.com</Td>
              <Td>Designer</Td>
            </Tr>
            <Tr>
              <Td>박지훈</Td>
              <Td>45</Td>
              <Td>jihoon.park@example.com</Td>
              <Td>Manager</Td>
            </Tr>
          </TBody>
        </Table>
      )
    }
    return (
      <Table>
        <THead>
          <Tr>
            <Th>Name</Th>
            <Th>Age</Th>
            <Th>Email</Th>
            <Th>Role</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>김영덕</Td>
            <Td>28</Td>
            <Td>youngduck.kim@example.com</Td>
            <Td>Developer</Td>
          </Tr>
          <Tr>
            <Td>이민수</Td>
            <Td>32</Td>
            <Td>minsu.lee@example.com</Td>
            <Td>Designer</Td>
          </Tr>
          <Tr>
            <Td>박지훈</Td>
            <Td>45</Td>
            <Td>jihoon.park@example.com</Td>
            <Td>Manager</Td>
          </Tr>
        </TBody>
      </Table>
    )
  },
  args: {
    scrollable: false,
  },
}

export const Examples = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      disable: true,
    },
  },
  render: () => {
    const examples = [
      {
        name: '기본 테이블',
        description: '스크롤 없는 기본 테이블',
        code: `import { Table, THead, TBody, Th, Td, Tr } from '@youngduck/yd-ui/Table';

function BasicTable() {
  return (
    <Table>
      <THead>
        <Tr>
          <Th>Name</Th>
          <Th>Age</Th>
          <Th>Email</Th>
        </Tr>
      </THead>
      <TBody>
        <Tr>
          <Td>김영덕</Td>
          <Td>28</Td>
          <Td>youngduck.kim@example.com</Td>
        </Tr>
        <Tr>
          <Td>이민수</Td>
          <Td>32</Td>
          <Td>minsu.lee@example.com</Td>
        </Tr>
      </TBody>
    </Table>
  );
}`,
        component: (
          <Table>
            <THead>
              <Tr>
                <Th>Name</Th>
                <Th>Age</Th>
                <Th>Email</Th>
              </Tr>
            </THead>
            <TBody>
              <Tr>
                <Td>김영덕</Td>
                <Td>28</Td>
                <Td>youngduck.kim@example.com</Td>
              </Tr>
              <Tr>
                <Td>이민수</Td>
                <Td>32</Td>
                <Td>minsu.lee@example.com</Td>
              </Tr>
            </TBody>
          </Table>
        ),
      },
      {
        name: '스크롤 가능한 테이블',
        description: '많은 데이터를 스크롤로 표시, 헤더는 고정',
        code: `import { Table, THead, TBody, Th, Td, Tr } from '@youngduck/yd-ui/Table';

function ScrollableTable() {
  return (
    <Table scrollable={true} scrollClassName="w-[600px] h-[200px]">
      <THead>
        <Tr>
          <Th className="w-[150px]">Name</Th>
          <Th className="w-[100px]">Age</Th>
          <Th className="w-[250px]">Email</Th>
          <Th className="w-[100px]">Role</Th>
        </Tr>
      </THead>
      <TBody>
        <Tr>
          <Td>김영덕</Td>
          <Td>28</Td>
          <Td>youngduck.kim@example.com</Td>
          <Td>Developer</Td>
        </Tr>
        <Tr>
          <Td>이민수</Td>
          <Td>32</Td>
          <Td>minsu.lee@example.com</Td>
          <Td>Designer</Td>
        </Tr>
        <Tr>
          <Td>박지훈</Td>
          <Td>45</Td>
          <Td>jihoon.park@example.com</Td>
          <Td>Manager</Td>
        </Tr>
        <Tr>
          <Td>최수진</Td>
          <Td>29</Td>
          <Td>sujin.choi@example.com</Td>
          <Td>Developer</Td>
        </Tr>
        <Tr>
          <Td>정다은</Td>
          <Td>35</Td>
          <Td>daeun.jung@example.com</Td>
          <Td>Designer</Td>
        </Tr>
      </TBody>
    </Table>
  );
}`,
        component: (
          <Table scrollable={true} scrollClassName="w-[600px] h-[200px]">
            <THead>
              <Tr>
                <Th className="w-[150px]">Name</Th>
                <Th className="w-[100px]">Age</Th>
                <Th className="w-[250px]">Email</Th>
                <Th className="w-[100px]">Role</Th>
              </Tr>
            </THead>
            <TBody>
              <Tr>
                <Td>김영덕</Td>
                <Td>28</Td>
                <Td>youngduck.kim@example.com</Td>
                <Td>Developer</Td>
              </Tr>
              <Tr>
                <Td>이민수</Td>
                <Td>32</Td>
                <Td>minsu.lee@example.com</Td>
                <Td>Designer</Td>
              </Tr>
              <Tr>
                <Td>박지훈</Td>
                <Td>45</Td>
                <Td>jihoon.park@example.com</Td>
                <Td>Manager</Td>
              </Tr>
              <Tr>
                <Td>최수진</Td>
                <Td>29</Td>
                <Td>sujin.choi@example.com</Td>
                <Td>Developer</Td>
              </Tr>
              <Tr>
                <Td>정다은</Td>
                <Td>35</Td>
                <Td>daeun.jung@example.com</Td>
                <Td>Designer</Td>
              </Tr>
            </TBody>
          </Table>
        ),
      },
    ]

    return (
      <div className="bg-background-primary min-h-screen p-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-yds-h1 mb-2 text-white">Table Examples</h1>
          <p className="text-yds-b2 mb-8 text-gray-300">각 예시를 클릭하면 사용 코드가 클립보드에 복사됩니다.</p>

          <div className="space-y-8">
            {examples.map((example, index) => (
              <div key={index} className="bg-background-secondary rounded-lg p-8">
                <div className="mb-4">
                  <h2 className="text-yds-s1 mb-2 text-white">{example.name}</h2>
                  <p className="text-yds-b2 text-gray-400">{example.description}</p>
                </div>
                <div
                  className="hover:bg-background-tertiary cursor-pointer rounded p-4 transition-colors"
                  onClick={() => copyCode(example.code)}
                >
                  {example.component}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
}
