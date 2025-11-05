import type { Meta, StoryObj } from '@storybook/react';
import { Instructions } from '../features/run-jump-game/components/Instructions';

const meta = {
  title: 'Features/RunJumpGame/Instructions',
  component: Instructions,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#87CEEB' },
      ],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Instructions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};