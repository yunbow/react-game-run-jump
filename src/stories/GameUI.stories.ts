import type { Meta, StoryObj } from '@storybook/react';
import { GameUI } from '../features/run-jump-game/components/GameUI';

const meta = {
  title: 'Features/RunJumpGame/GameUI',
  component: GameUI,
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
} satisfies Meta<typeof GameUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    score: 1250,
    lives: 3,
    coins: 8,
  },
};

export const LowLives: Story = {
  args: {
    score: 2500,
    lives: 1,
    coins: 15,
  },
};

export const HighScore: Story = {
  args: {
    score: 9999,
    lives: 2,
    coins: 25,
  },
};