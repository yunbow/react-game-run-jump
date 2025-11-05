import type { Meta, StoryObj } from '@storybook/react';
import { RunJumpGame } from '../features/run-jump-game/RunJumpGame';

const meta = {
  title: 'Features/RunJumpGame',
  component: RunJumpGame,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RunJumpGame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};