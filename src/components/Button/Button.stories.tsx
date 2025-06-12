import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    variant: {
      options: [
        "default",
        "delete",
        "generate",
        "save",
        "elmark",
        "excel",
        "elfile",
      ],
      control: { type: "select" },
    },
    size: {
      options: ["default", "sm", "lg"],
      control: { type: "select" },
    },
    fullWidth: {
      control: { type: "boolean" },
    },
    isActive: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "버튼",
    variant: "default",
  },
};

export const Delete: Story = {
  args: {
    children: "삭제",
    variant: "delete",
  },
};

export const Generate: Story = {
  args: {
    children: "생성",
    variant: "generate",
  },
};

export const Save: Story = {
  args: {
    children: "저장",
    variant: "save",
  },
};

export const Elmark: Story = {
  args: {
    children: "엘마크",
    variant: "elmark",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button size="sm">작은 버튼</Button>
      <Button size="default">기본 버튼</Button>
      <Button size="lg">큰 버튼</Button>
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    children: "너비 100%",
    fullWidth: true,
  },
};
