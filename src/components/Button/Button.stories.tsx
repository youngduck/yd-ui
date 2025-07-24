import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
    variant: {
      options: ['fill', 'outlined'],
      control: { type: 'select' },
    },
    color: {
      options: ['primary', 'secondary', 'danger'],
      control: { type: 'select' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      {['small', 'medium', 'large'].map((size) => (
        <div key={size}>
          <div className="mb-2 font-bold text-lg capitalize text-white">
            {size}
          </div>
          <div className="flex gap-8">
            {/* Fill */}
            <div>
              <div className="mb-1 text-sm text-yellow-300">Fill</div>
              <div className="flex gap-2">
                <Button size={size as any} variant="fill" color="primary">
                  저장
                </Button>
                <Button size={size as any} variant="fill" color="secondary">
                  보조
                </Button>
                <Button size={size as any} variant="fill" color="danger">
                  삭제
                </Button>
              </div>
            </div>
            {/* Outlined */}
            <div>
              <div className="mb-1 text-sm text-yellow-300">Outlined</div>
              <div className="flex gap-2">
                <Button size={size as any} variant="outlined" color="primary">
                  저장
                </Button>
                <Button size={size as any} variant="outlined" color="secondary">
                  보조
                </Button>
                <Button size={size as any} variant="outlined" color="danger">
                  삭제
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};
