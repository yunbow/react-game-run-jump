import { useRef, useImperativeHandle, forwardRef } from 'react';
import styles from './Canvas.module.css';

interface CanvasProps {
  width: number;
  height: number;
  className?: string;
}

export interface CanvasRef {
  getContext: () => CanvasRenderingContext2D | null;
}

export const Canvas = forwardRef<CanvasRef, CanvasProps>(({
  width,
  height,
  className,
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => ({
    getContext: () => canvasRef.current?.getContext('2d') || null,
  }));

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`${styles.canvas} ${className || ''}`}
    />
  );
});