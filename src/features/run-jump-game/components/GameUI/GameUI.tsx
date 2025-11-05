import React from 'react';
import styles from './GameUI.module.css';

interface GameUIProps {
  score: number;
  lives: number;
  coins: number;
}

export const GameUI: React.FC<GameUIProps> = ({ score, lives, coins }) => {
  return (
    <div className={styles.ui}>
      <div>スコア: <span>{score}</span></div>
      <div>ライフ: <span>{lives}</span></div>
      <div>コイン: <span>{coins}</span></div>
    </div>
  );
};