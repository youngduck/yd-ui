import { Meta, StoryObj } from '@storybook/react'
import { Table, THead, TBody, Th, Td, Tr, ColGroup, Col } from './index'
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

export const Sortable: Story = {
  parameters: {
    docs: {
      description: {
        story: `정렬하고 싶은 컬럼의 \`Th\`에 \`sortable\` prop 하나만 **선언(declarative)** 하면 됩니다.
소비자는 "이 컬럼은 정렬 가능하다"는 **의도만 선언**할 뿐, 정렬 상태 관리·값 비교·행 재정렬 같은 **동작(how)은 컴포넌트 내부가 캡슐화**해 처리합니다. \`sorted.map()\` 같은 절차를 직접 작성하지 않습니다.

- 헤더 클릭 시 오름차순 → 내림차순 → 정렬 해제 순으로 순환합니다.
- 값의 타입(숫자/날짜/문자열)은 런타임에 자동 판별되어(zero-config) \`Td\`에는 별도 설정이 필요 없습니다.`,
      },
    },
  },
  render: () => (
    <Table>
      <THead>
        <Tr>
          <Th sortable>Name</Th>
          <Th sortable>Age</Th>
          <Th sortable>Join Date</Th>
          <Th>Email</Th>
        </Tr>
      </THead>
      <TBody>
        <Tr>
          <Td>김영덕</Td>
          <Td>28</Td>
          <Td>2023-05-14</Td>
          <Td>youngduck.kim@example.com</Td>
        </Tr>
        <Tr>
          <Td>이민수</Td>
          <Td>32</Td>
          <Td>2021-11-02</Td>
          <Td>minsu.lee@example.com</Td>
        </Tr>
        <Tr>
          <Td>박지훈</Td>
          <Td>45</Td>
          <Td>2019-03-27</Td>
          <Td>jihoon.park@example.com</Td>
        </Tr>
        <Tr>
          <Td>최수진</Td>
          <Td>9</Td>
          <Td>2024-01-08</Td>
          <Td>sujin.choi@example.com</Td>
        </Tr>
      </TBody>
    </Table>
  ),
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
        name: '정렬 가능한 테이블',
        description: 'Th에 sortable prop만 선언(declarative)하면 정렬 활성화. 정렬 로직·상태 관리는 컴포넌트가 캡슐화해 처리하고, 값 타입(숫자/날짜/문자열)은 자동 판별됩니다',
        code: `import { Table, THead, TBody, Th, Td, Tr } from '@youngduck/yd-ui/Table';

function SortableTable() {
  return (
    <Table>
      <THead>
        <Tr>
          <Th sortable>Name</Th>
          <Th sortable>Age</Th>
          <Th sortable>Join Date</Th>
          <Th>Email</Th>
        </Tr>
      </THead>
      <TBody>
        <Tr>
          <Td>김영덕</Td>
          <Td>28</Td>
          <Td>2023-05-14</Td>
          <Td>youngduck.kim@example.com</Td>
        </Tr>
        <Tr>
          <Td>이민수</Td>
          <Td>32</Td>
          <Td>2021-11-02</Td>
          <Td>minsu.lee@example.com</Td>
        </Tr>
        <Tr>
          <Td>최수진</Td>
          <Td>9</Td>
          <Td>2024-01-08</Td>
          <Td>sujin.choi@example.com</Td>
        </Tr>
      </TBody>
    </Table>
  );
}`,
        component: (
          <Table>
            <THead>
              <Tr>
                <Th sortable>Name</Th>
                <Th sortable>Age</Th>
                <Th sortable>Join Date</Th>
                <Th>Email</Th>
              </Tr>
            </THead>
            <TBody>
              <Tr>
                <Td>김영덕</Td>
                <Td>28</Td>
                <Td>2023-05-14</Td>
                <Td>youngduck.kim@example.com</Td>
              </Tr>
              <Tr>
                <Td>이민수</Td>
                <Td>32</Td>
                <Td>2021-11-02</Td>
                <Td>minsu.lee@example.com</Td>
              </Tr>
              <Tr>
                <Td>최수진</Td>
                <Td>9</Td>
                <Td>2024-01-08</Td>
                <Td>sujin.choi@example.com</Td>
              </Tr>
            </TBody>
          </Table>
        ),
      },
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
