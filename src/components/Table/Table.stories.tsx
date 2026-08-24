import { Meta, StoryObj } from '@storybook/react'
import { Table, THead, TBody, Th, Td, Tr, ColGroup, Col, useTableSort } from './index'
import { copyCodeToClipboard } from '../../storybook/utils'

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
- \`useTableSort\` 훅 + \`Th sortable\` 조합으로 오름차순/내림차순 정렬 지원
- 접근성 고려 설계

## 사용 가이드
- \`Table\` 컴포넌트로 테이블을 감싸고, \`THead\`, \`TBody\`, \`Th\`, \`Td\`, \`Tr\` 서브 컴포넌트를 사용합니다.
- \`scrollable={true}\`일 때는 \`scrollClassName\` prop이 필수입니다. (예: "w-[800px] h-[200px]")
- \`scrollable={true}\`일 때 \`THead\`는 자동으로 sticky 처리됩니다.
- 모든 컴포넌트에서 \`className\` prop을 통해 Tailwind 클래스로 스타일을 커스터마이징할 수 있습니다.
- 정렬은 \`useTableSort(data)\` 로 상태·정렬된 데이터를 얻고, \`<Th {...getSortProps('key')}>\` 로 헤더에 연결합니다.
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

type Member = {
  name: string
  age: number
  email: string
  role: string
  joinedAt: string
}

const MEMBERS: Member[] = [
  { name: '김영덕', age: 28, email: 'youngduck.kim@example.com', role: 'Developer', joinedAt: '2023-04-01' },
  { name: '이민수', age: 32, email: 'minsu.lee@example.com', role: 'Designer', joinedAt: '2021-11-15' },
  { name: '박지훈', age: 45, email: 'jihoon.park@example.com', role: 'Manager', joinedAt: '2019-02-20' },
  { name: '최수진', age: 29, email: 'sujin.choi@example.com', role: 'Developer', joinedAt: '2024-07-08' },
  { name: '정다은', age: 35, email: 'daeun.jung@example.com', role: 'Designer', joinedAt: '2022-09-30' },
]

/** useTableSort 훅으로 정렬 상태를 관리하는 예시 컴포넌트 */
function SortableTableExample() {
  const { sortedData, getSortProps } = useTableSort(MEMBERS, {
    defaultSort: { key: 'name', direction: 'asc' },
    // 문자열 날짜는 Date 로 변환해 비교합니다.
    accessors: { joinedAt: member => new Date(member.joinedAt) },
  })

  return (
    <Table>
      <ColGroup>
        <Col className="w-[140px]" />
        <Col className="w-[80px]" />
        <Col className="w-[260px]" />
        <Col className="w-[120px]" />
        <Col className="w-[140px]" />
      </ColGroup>
      <THead>
        <Tr>
          <Th {...getSortProps('name')}>Name</Th>
          <Th {...getSortProps('age')}>Age</Th>
          <Th>Email</Th>
          <Th {...getSortProps('role')}>Role</Th>
          <Th {...getSortProps('joinedAt')}>Joined</Th>
        </Tr>
      </THead>
      <TBody>
        {sortedData.map(member => (
          <Tr key={member.email}>
            <Td>{member.name}</Td>
            <Td>{member.age}</Td>
            <Td>{member.email}</Td>
            <Td>{member.role}</Td>
            <Td>{member.joinedAt}</Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  )
}

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

export const Sortable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`useTableSort` 훅과 `Th` 의 `sortable` prop 을 조합한 정렬 테이블입니다. 헤더를 클릭하면 오름차순 → 내림차순으로 순환하고, 다른 컬럼을 누르면 오름차순부터 다시 시작합니다.',
      },
    },
  },
  render: () => <SortableTableExample />,
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
        name: 'ColGroup으로 열 너비 고정',
        description: 'ColGroup, Col 컴포넌트로 각 열의 너비를 Tailwind className으로 지정',
        code: `import { Table, ColGroup, Col, THead, TBody, Th, Td, Tr } from '@youngduck/yd-ui/Table';

function ColGroupTable() {
  return (
    <Table>
      <ColGroup>
        <Col className="w-[200px]" />
        <Col className="w-[80px]" />
        <Col className="w-[280px]" />
      </ColGroup>
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
            <ColGroup>
              <Col className="w-[200px]" />
              <Col className="w-[50px]" />
              <Col className="w-[280px]" />
            </ColGroup>
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
      {
        name: '스크롤 + ColGroup 열 너비 고정',
        description: '가로·세로 스크롤 테이블에서 ColGroup, Col로 각 열 너비를 Tailwind className으로 지정',
        code: `import { Table, ColGroup, Col, THead, TBody, Th, Td, Tr } from '@youngduck/yd-ui/Table';

function ScrollableColGroupTable() {
  return (
    <Table scrollable={true} scrollClassName="w-[500px] h-[200px]">
      <ColGroup>
        <Col className="w-[180px]" />
        <Col className="w-[80px]" />
        <Col className="w-[300px]" />
        <Col className="w-[120px]" />
        <Col className="w-[150px]" />
      </ColGroup>
      <THead>
        <Tr>
          <Th>Name</Th>
          <Th>Age</Th>
          <Th>Email</Th>
          <Th>Role</Th>
          <Th>Department</Th>
        </Tr>
      </THead>
      <TBody>
        <Tr>
          <Td>김영덕</Td>
          <Td>28</Td>
          <Td>youngduck.kim@example.com</Td>
          <Td>Developer</Td>
          <Td>Engineering</Td>
        </Tr>
        <Tr>
          <Td>이민수</Td>
          <Td>32</Td>
          <Td>minsu.lee@example.com</Td>
          <Td>Designer</Td>
          <Td>Product</Td>
        </Tr>
        <Tr>
          <Td>박지훈</Td>
          <Td>45</Td>
          <Td>jihoon.park@example.com</Td>
          <Td>Manager</Td>
          <Td>Engineering</Td>
        </Tr>
        <Tr>
          <Td>최수진</Td>
          <Td>29</Td>
          <Td>sujin.choi@example.com</Td>
          <Td>Developer</Td>
          <Td>Platform</Td>
        </Tr>
        <Tr>
          <Td>정다은</Td>
          <Td>35</Td>
          <Td>daeun.jung@example.com</Td>
          <Td>Designer</Td>
          <Td>Product</Td>
        </Tr>
      </TBody>
    </Table>
  );
}`,
        component: (
          <Table scrollable={true} scrollClassName="w-[500px] h-[200px]">
            <ColGroup>
              <Col className="w-[180px]" />
              <Col className="w-[80px]" />
              <Col className="w-[300px]" />
              <Col className="w-[120px]" />
              <Col className="w-[150px]" />
            </ColGroup>
            <THead>
              <Tr>
                <Th>Name</Th>
                <Th>Age</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Department</Th>
              </Tr>
            </THead>
            <TBody>
              <Tr>
                <Td>김영덕</Td>
                <Td>28</Td>
                <Td>youngduck.kim@example.com</Td>
                <Td>Developer</Td>
                <Td>Engineering</Td>
              </Tr>
              <Tr>
                <Td>이민수</Td>
                <Td>32</Td>
                <Td>minsu.lee@example.com</Td>
                <Td>Designer</Td>
                <Td>Product</Td>
              </Tr>
              <Tr>
                <Td>박지훈</Td>
                <Td>45</Td>
                <Td>jihoon.park@example.com</Td>
                <Td>Manager</Td>
                <Td>Engineering</Td>
              </Tr>
              <Tr>
                <Td>최수진</Td>
                <Td>29</Td>
                <Td>sujin.choi@example.com</Td>
                <Td>Developer</Td>
                <Td>Platform</Td>
              </Tr>
              <Tr>
                <Td>정다은</Td>
                <Td>35</Td>
                <Td>daeun.jung@example.com</Td>
                <Td>Designer</Td>
                <Td>Product</Td>
              </Tr>
            </TBody>
          </Table>
        ),
      },
      {
        name: '정렬 가능한 테이블',
        description: 'useTableSort 훅으로 오름차순·내림차순 정렬 (헤더 클릭 시 방향 순환)',
        code: `import { Table, THead, TBody, Th, Td, Tr, useTableSort } from '@youngduck/yd-ui/Table';

function SortableTable({ members }) {
  const { sortedData, getSortProps } = useTableSort(members, {
    defaultSort: { key: 'name', direction: 'asc' },
    // 문자열 날짜는 Date 로 변환해 비교
    accessors: { joinedAt: member => new Date(member.joinedAt) },
  });

  return (
    <Table>
      <THead>
        <Tr>
          <Th {...getSortProps('name')}>Name</Th>
          <Th {...getSortProps('age')}>Age</Th>
          <Th>Email</Th>
          <Th {...getSortProps('joinedAt')}>Joined</Th>
        </Tr>
      </THead>
      <TBody>
        {sortedData.map((member) => (
          <Tr key={member.email}>
            <Td>{member.name}</Td>
            <Td>{member.age}</Td>
            <Td>{member.email}</Td>
            <Td>{member.joinedAt}</Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  );
}`,
        component: <SortableTableExample />,
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
                  onClick={() => copyCodeToClipboard(example.code)}
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
