import { useEffect, useState } from 'react';
import { Keys } from './types';

export const useKeyInput = (): Keys => {
  const [keys, setKeys] = useState<Keys>({
    left: false,
    right: false,
    space: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowLeft':
          setKeys((prev) => ({ ...prev, left: true }));
          e.preventDefault();
          break;
        case 'ArrowRight':
          setKeys((prev) => ({ ...prev, right: true }));
          e.preventDefault();
          break;
        case 'Space':
          setKeys((prev) => ({ ...prev, space: true }));
          e.preventDefault();
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowLeft':
          setKeys((prev) => ({ ...prev, left: false }));
          break;
        case 'ArrowRight':
          setKeys((prev) => ({ ...prev, right: false }));
          break;
        case 'Space':
          setKeys((prev) => ({ ...prev, space: false }));
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys;
};