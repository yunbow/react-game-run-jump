import { useCallback, useEffect, useRef } from 'react';
import { GameState, Player, Obstacle, Coin, PowerUp, Keys } from './types';
import { GAME_CONFIG } from '../../Config';

interface UseGameLoopProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  player: Player;
  setPlayer: React.Dispatch<React.SetStateAction<Player>>;
  obstacles: Obstacle[];
  setObstacles: React.Dispatch<React.SetStateAction<Obstacle[]>>;
  coins: Coin[];
  setCoins: React.Dispatch<React.SetStateAction<Coin[]>>;
  setCoinCollected: (index: number) => void;
  powerUps: PowerUp[];
  setPowerUps: React.Dispatch<React.SetStateAction<PowerUp[]>>;
  setPowerUpCollected: (index: number) => void;
  keys: Keys;
  ctx: CanvasRenderingContext2D | null;
}

export const useGameLoop = ({
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
}: UseGameLoopProps) => {
  const animationId = useRef<number>();

  const updateObstacles = useCallback(() => {
    setObstacles((prevObstacles) =>
      prevObstacles.map((obstacle) => ({
        ...obstacle,
        x: obstacle.x - GAME_CONFIG.OBSTACLE_SPEED,
      }))
    );
  }, [setObstacles]);

  const updateCoins = useCallback(() => {
    setCoins((prevCoins) =>
      prevCoins.map((coin) => ({
        ...coin,
        x: coin.x - GAME_CONFIG.ITEM_SPEED,
      }))
    );
  }, [setCoins]);

  const updatePowerUps = useCallback(() => {
    setPowerUps((prevPowerUps) =>
      prevPowerUps.map((powerUp) => ({
        ...powerUp,
        x: powerUp.x - GAME_CONFIG.ITEM_SPEED,
      }))
    );
  }, [setPowerUps]);

  const updatePlayer = useCallback(() => {
    setPlayer((prevPlayer) => {
      const newPlayer = { ...prevPlayer };

      if (keys.left && newPlayer.x > gameState.cameraX) {
        newPlayer.velocityX = -newPlayer.speed;
      } else if (keys.right) {
        newPlayer.velocityX = newPlayer.speed;
      } else {
        newPlayer.velocityX *= 0.8;
      }

      if (keys.space && newPlayer.onGround) {
        newPlayer.velocityY = -newPlayer.jumpPower;
        newPlayer.onGround = false;
      }

      newPlayer.velocityY += GAME_CONFIG.GRAVITY;
      newPlayer.x += newPlayer.velocityX;
      newPlayer.y += newPlayer.velocityY;

      if (newPlayer.y + newPlayer.height >= GAME_CONFIG.GROUND_Y) {
        newPlayer.y = GAME_CONFIG.GROUND_Y - newPlayer.height;
        newPlayer.velocityY = 0;
        newPlayer.onGround = true;
      }

      if (newPlayer.invincible) {
        newPlayer.invincibleTime--;
        if (newPlayer.invincibleTime <= 0) {
          newPlayer.invincible = false;
        }
      }

      return newPlayer;
    });
  }, [keys, gameState.cameraX]);

  const checkCollisions = useCallback(() => {
    obstacles.forEach((obstacle) => {
      if (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
      ) {
        if (!player.invincible) {
          setGameState((prev) => ({ ...prev, lives: prev.lives - 1 }));
          setPlayer((prev) => ({
            ...prev,
            invincible: true,
            invincibleTime: GAME_CONFIG.INVINCIBLE_TIME_DAMAGE,
          }));
        }
      }
    });

    coins.forEach((coin, index) => {
      if (
        !coin.collected &&
        player.x < coin.x + coin.width &&
        player.x + player.width > coin.x &&
        player.y < coin.y + coin.height &&
        player.y + player.height > coin.y
      ) {
        setCoinCollected(index);
        setGameState((prev) => ({
          ...prev,
          coins: prev.coins + 1,
          score: prev.score + GAME_CONFIG.SCORE_PER_COIN,
        }));
      }
    });

    powerUps.forEach((powerUp, index) => {
      if (
        !powerUp.collected &&
        player.x < powerUp.x + powerUp.width &&
        player.x + powerUp.width > powerUp.x &&
        player.y < powerUp.y + powerUp.height &&
        player.y + powerUp.height > powerUp.y
      ) {
        setPowerUpCollected(index);
        if (powerUp.type === 'invincible') {
          setPlayer((prev) => ({
            ...prev,
            invincible: true,
            invincibleTime: GAME_CONFIG.INVINCIBLE_TIME_POWERUP,
          }));
          setGameState((prev) => ({
            ...prev,
            score: prev.score + GAME_CONFIG.SCORE_PER_POWERUP,
          }));
        }
      }
    });
  }, [player, obstacles, coins, powerUps, setCoinCollected, setPowerUpCollected, setGameState, setPlayer]);

  const draw = useCallback(() => {
    if (!ctx) return;

    ctx.clearRect(0, 0, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT);

    ctx.fillStyle = '#fff';
    for (let i = 0; i < 10; i++) {
      const cloudX = (i * 150 + 50) - gameState.cameraX * 0.3;
      if (cloudX > -50 && cloudX < GAME_CONFIG.CANVAS_WIDTH) {
        drawCloud(ctx, cloudX, 50 + (i % 3) * 20);
      }
    }

    ctx.fillStyle = '#8B4513';
    ctx.fillRect(-gameState.cameraX, GAME_CONFIG.GROUND_Y, GAME_CONFIG.CANVAS_WIDTH + gameState.cameraX, 50);

    ctx.fillStyle = '#228B22';
    ctx.fillRect(-gameState.cameraX, GAME_CONFIG.GROUND_Y, GAME_CONFIG.CANVAS_WIDTH + gameState.cameraX, 10);

    obstacles.forEach((obstacle) => {
      const screenX = obstacle.x - gameState.cameraX;
      if (screenX > -50 && screenX < GAME_CONFIG.CANVAS_WIDTH) {
        ctx.fillStyle = '#FF4500';
        ctx.fillRect(screenX, obstacle.y, obstacle.width, obstacle.height);
        ctx.fillStyle = '#FF0000';
        for (let i = 0; i < obstacle.width; i += 5) {
          ctx.fillRect(screenX + i, obstacle.y - 5, 2, 5);
        }
      }
    });

    coins.forEach((coin) => {
      if (!coin.collected) {
        const screenX = coin.x - gameState.cameraX;
        if (screenX > -50 && screenX < GAME_CONFIG.CANVAS_WIDTH) {
          ctx.fillStyle = '#FFD700';
          ctx.beginPath();
          ctx.arc(screenX + coin.width / 2, coin.y + coin.height / 2, coin.width / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#FFF';
          ctx.beginPath();
          ctx.arc(screenX + coin.width / 2 - 2, coin.y + coin.height / 2 - 2, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });

    powerUps.forEach((powerUp) => {
      if (!powerUp.collected) {
        const screenX = powerUp.x - gameState.cameraX;
        if (screenX > -50 && screenX < GAME_CONFIG.CANVAS_WIDTH) {
          ctx.fillStyle = '#9932CC';
          ctx.fillRect(screenX, powerUp.y, powerUp.width, powerUp.height);
          ctx.fillStyle = '#FFF';
          ctx.font = '12px Arial';
          ctx.fillText('★', screenX + 6, powerUp.y + 14);
        }
      }
    });

    const screenX = player.x - gameState.cameraX;
    if (player.invincible && Math.floor(gameState.time / 10) % 2 === 0) {
      ctx.fillStyle = 'rgba(0, 100, 255, 0.5)';
    } else {
      ctx.fillStyle = '#0066FF';
    }
    ctx.fillRect(screenX, player.y, player.width, player.height);

    ctx.fillStyle = '#FFF';
    ctx.fillRect(screenX + 8, player.y + 8, 4, 4);
    ctx.fillRect(screenX + 18, player.y + 8, 4, 4);
    ctx.fillRect(screenX + 12, player.y + 18, 6, 2);
  }, [ctx, gameState, player, obstacles, coins, powerUps]);

  const gameLoop = useCallback(() => {
    if (gameState.running) {
      updateObstacles();
      updateCoins();
      updatePowerUps();
      updatePlayer();
      checkCollisions();
      setGameState((prev) => {
        const newCameraX = player.x > prev.cameraX + 300 ? player.x - 300 : prev.cameraX;
        return {
          ...prev,
          time: prev.time + 1,
          score: prev.score + GAME_CONFIG.SCORE_PER_TIME,
          cameraX: newCameraX,
        };
      });

      if (gameState.lives <= 0) {
        setGameState((prev) => ({ ...prev, running: false }));
      }
    }

    draw();
    animationId.current = requestAnimationFrame(gameLoop);
  }, [gameState.running, gameState.lives, updateObstacles, updateCoins, updatePowerUps, updatePlayer, checkCollisions, draw, player.x, setGameState]);

  useEffect(() => {
    animationId.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [gameLoop]);
};

const drawCloud = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx.beginPath();
  ctx.arc(x, y, 15, 0, Math.PI * 2);
  ctx.arc(x + 15, y, 20, 0, Math.PI * 2);
  ctx.arc(x + 30, y, 15, 0, Math.PI * 2);
  ctx.arc(x + 10, y - 10, 12, 0, Math.PI * 2);
  ctx.arc(x + 20, y - 10, 12, 0, Math.PI * 2);
  ctx.fill();
};