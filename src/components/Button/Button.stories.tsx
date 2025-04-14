import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
    option: {
      $mode: "save",
    },
  },
};
export const Delete: Story = {
  args: {
    children: "Button",
    option: {
      $mode: "delete",
    },
  },
};
export const Generate: Story = {
  args: {
    children: "Button",
    option: {
      $mode: "generate",
    },
  },
};
