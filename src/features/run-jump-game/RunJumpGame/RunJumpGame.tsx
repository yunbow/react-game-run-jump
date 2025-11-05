import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, CanvasRef } from '../../../components/Canvas';
import { GameUI } from '../components/GameUI';
import { GameOverDialog } from '../components/GameOverDialog';
import { Instructions } from '../components/Instructions';
import { useGameLoop } from '../useGameLoop';
import { useKeyInput } from '../useKeyInput';
import { GameState, Player, Obstacle, Coin, PowerUp } from '../types';
import { GAME_CONFIG } from '../../../Config';
import styles from './RunJumpGame.module.css';

export const RunJumpGame: React.FC = () => {
  const canvasRef = useRef<CanvasRef>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const [gameState, setGameState] = useState<GameState>({
    running: true,
    score: 0,
    lives: GAME_CONFIG.INITIAL_LIVES,
    coins: 0,
    time: 0,
    cameraX: 0,
  });

  const [player, setPlayer] = useState<Player>({
    x: 100,
    y: 320,
    width: GAME_CONFIG.PLAYER_SIZE,
    height: GAME_CONFIG.PLAYER_SIZE,
    velocityX: 0,
    velocityY: 0,
    onGround: false,
    speed: GAME_CONFIG.PLAYER_SPEED,
    jumpPower: GAME_CONFIG.PLAYER_JUMP_POWER,
    invincible: false,
    invincibleTime: 0,
  });

  const [obstacles, setObstacles] = useState<Obstacle[]>(() => {
    const obs: Obstacle[] = [];
    for (let i = 0; i < GAME_CONFIG.OBSTACLE_COUNT; i++) {
      obs.push({
        x: 300 + i * 150 + Math.random() * 50,
        y: GAME_CONFIG.GROUND_Y - 20,
        width: 20,
        height: 20,
        type: 'spike',
      });
    }
    return obs;
  });

  const [coins, setCoins] = useState<Coin[]>(() => {
    const coinArray: Coin[] = [];
    for (let i = 0; i < GAME_CONFIG.COIN_COUNT; i++) {
      coinArray.push({
        x: 200 + i * 200 + Math.random() * 100,
        y: GAME_CONFIG.GROUND_Y - 60 - Math.random() * 100,
        width: 15,
        height: 15,
        collected: false,
      });
    }
    return coinArray;
  });

  const [powerUps, setPowerUps] = useState<PowerUp[]>(() => {
    const powerUpArray: PowerUp[] = [];
    for (let i = 0; i < GAME_CONFIG.POWERUP_COUNT; i++) {
      powerUpArray.push({
        x: 400 + i * 400 + Math.random() * 100,
        y: GAME_CONFIG.GROUND_Y - 40,
        width: 20,
        height: 20,
        type: 'invincible',
        collected: false,
      });
    }
    return powerUpArray;
  });

  const keys = useKeyInput();

  const setCoinCollected = useCallback((index: number) => {
    setCoins((prev) => {
      const newCoins = [...prev];
      newCoins[index] = { ...newCoins[index], collected: true };
      return newCoins;
    });
  }, []);

  const setPowerUpCollected = useCallback((index: number) => {
    setPowerUps((prev) => {
      const newPowerUps = [...prev];
      newPowerUps[index] = { ...newPowerUps[index], collected: true };
      return newPowerUps;
    });
  }, []);

  const restartGame = useCallback(() => {
    setGameState({
      running: true,
      score: 0,
      lives: GAME_CONFIG.INITIAL_LIVES,
      coins: 0,
      time: 0,
      cameraX: 0,
    });

    setPlayer({
      x: 100,
      y: 320,
      width: GAME_CONFIG.PLAYER_SIZE,
      height: GAME_CONFIG.PLAYER_SIZE,
      velocityX: 0,
      velocityY: 0,
      onGround: false,
      speed: GAME_CONFIG.PLAYER_SPEED,
      jumpPower: GAME_CONFIG.PLAYER_JUMP_POWER,
      invincible: false,
      invincibleTime: 0,
    });

    setObstacles(() => {
      const obs: Obstacle[] = [];
      for (let i = 0; i < GAME_CONFIG.OBSTACLE_COUNT; i++) {
        obs.push({
          x: 300 + i * 150 + Math.random() * 50,
          y: GAME_CONFIG.GROUND_Y - 20,
          width: 20,
          height: 20,
          type: 'spike',
        });
      }
      return obs;
    });

    setCoins(() => {
      const coinArray: Coin[] = [];
      for (let i = 0; i < GAME_CONFIG.COIN_COUNT; i++) {
        coinArray.push({
          x: 200 + i * 200 + Math.random() * 100,
          y: GAME_CONFIG.GROUND_Y - 60 - Math.random() * 100,
          width: 15,
          height: 15,
          collected: false,
        });
      }
      return coinArray;
    });

    setPowerUps(() => {
      const powerUpArray: PowerUp[] = [];
      for (let i = 0; i < GAME_CONFIG.POWERUP_COUNT; i++) {
        powerUpArray.push({
          x: 400 + i * 400 + Math.random() * 100,
          y: GAME_CONFIG.GROUND_Y - 40,
          width: 20,
          height: 20,
          type: 'invincible',
          collected: false,
        });
      }
      return powerUpArray;
    });
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext();
      setCtx(context);
    }
  }, []);

  useGameLoop({
    gameState,
    setGameState,
    player,
    setPlayer,
    obstacles,
    setObstacles,
    coins,
    setCoins,
    setCoinCollected,
    powerUps,
    setPowerUps,
    setPowerUpCollected,
    keys,
    ctx,
  });

  return (
    <div className={styles.gameContainer}>
      <Canvas
        ref={canvasRef}
        width={GAME_CONFIG.CANVAS_WIDTH}
        height={GAME_CONFIG.CANVAS_HEIGHT}
      />
      <GameUI
        score={gameState.score}
        lives={gameState.lives}
        coins={gameState.coins}
      />
      <GameOverDialog
        isVisible={!gameState.running}
        finalScore={gameState.score}
        onRestart={restartGame}
      />
      <Instructions />
    </div>
  );
};