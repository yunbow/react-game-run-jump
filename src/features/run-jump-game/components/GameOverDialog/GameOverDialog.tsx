import React from 'react';
import { Button } from '../../../../components/Button';
import styles from './GameOverDialog.module.css';

interface GameOverDialogProps {
  isVisible: boolean;
  finalScore: number;
  onRestart: () => void;
}

export const GameOverDialog: React.FC<GameOverDialogProps> = ({
  isVisible,
  finalScore,
  onRestart,
}) => {
  if (!isVisible) return null;

  return (
    <div className={styles.gameOver}>
      <h2>ゲームオーバー</h2>
      <p>最終スコア: <span>{finalScore}</span></p>
      <Button onClick={onRestart}>再開</Button>
    </div>
  );
};