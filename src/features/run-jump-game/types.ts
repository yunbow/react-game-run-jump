export interface GameState {
  running: boolean;
  score: number;
  lives: number;
  coins: number;
  time: number;
  cameraX: number;
}

export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;
  onGround: boolean;
  speed: number;
  jumpPower: number;
  invincible: boolean;
  invincibleTime: number;
}

export interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'spike';
}

export interface Coin {
  x: number;
  y: number;
  width: number;
  height: number;
  collected: boolean;
}

export interface PowerUp {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'invincible';
  collected: boolean;
}

export interface Keys {
  left: boolean;
  right: boolean;
  space: boolean;
}

export interface GameProps {
  className?: string;
}