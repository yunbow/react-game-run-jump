import React from 'react';
import styles from './Instructions.module.css';

export const Instructions: React.FC = () => {
  return (
    <div className={styles.instructions}>
      スペースキー: ジャンプ | 矢印キー: 移動
    </div>
  );
};