import type { Meta, StoryObj } from '@storybook/react';
import { GameOverDialog } from '../features/run-jump-game/components/GameOverDialog';

const meta = {
  title: 'Features/RunJumpGame/GameOverDialog',
  component: GameOverDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onRestart: () => {} },
} satisfies Meta<typeof GameOverDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Visible: Story = {
  args: {
    isVisible: true,
    finalScore: 1850,
  },
};

export const Hidden: Story = {
  args: {
    isVisible: false,
    finalScore: 1850,
  },
};

export const HighScore: Story = {
  args: {
    isVisible: true,
    finalScore: 9999,
  },
};