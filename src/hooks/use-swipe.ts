import { useCallback, useRef, useState } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

interface SwipeOptions {
  threshold?: number; // Minimum distance for a swipe
  preventDefaultTouchmoveEvent?: boolean;
  trackMouse?: boolean;
}

interface SwipeState {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  deltaX: number;
  deltaY: number;
  absX: number;
  absY: number;
  duration: number;
  velocity: number;
}

export const useSwipe = (
  handlers: SwipeHandlers,
  options: SwipeOptions = {}
) => {
  const {
    threshold = 50,
    preventDefaultTouchmoveEvent = false,
    trackMouse = false,
  } = options;

  const [isSwiping, setIsSwiping] = useState(false);
  const startTimeRef = useRef<number>(0);
  const startPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleStart = useCallback((clientX: number, clientY: number) => {
    startTimeRef.current = Date.now();
    startPosRef.current = { x: clientX, y: clientY };
    currentPosRef.current = { x: clientX, y: clientY };
    setIsSwiping(true);
  }, []);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isSwiping) return;
    currentPosRef.current = { x: clientX, y: clientY };
  }, [isSwiping]);

  const handleEnd = useCallback(() => {
    if (!isSwiping) return;

    const endTime = Date.now();
    const duration = endTime - startTimeRef.current;
    const deltaX = currentPosRef.current.x - startPosRef.current.x;
    const deltaY = currentPosRef.current.y - startPosRef.current.y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / duration;

    const swipeState: SwipeState = {
      startX: startPosRef.current.x,
      startY: startPosRef.current.y,
      endX: currentPosRef.current.x,
      endY: currentPosRef.current.y,
      deltaX,
      deltaY,
      absX,
      absY,
      duration,
      velocity,
    };

    // Determine swipe direction
    if (absX > absY && absX > threshold) {
      // Horizontal swipe
      if (deltaX > 0) {
        handlers.onSwipeRight?.();
      } else {
        handlers.onSwipeLeft?.();
      }
    } else if (absY > absX && absY > threshold) {
      // Vertical swipe
      if (deltaY > 0) {
        handlers.onSwipeDown?.();
      } else {
        handlers.onSwipeUp?.();
      }
    }

    setIsSwiping(false);
  }, [isSwiping, handlers, threshold]);

  // Touch event handlers
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  }, [handleStart]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (preventDefaultTouchmoveEvent) {
      e.preventDefault();
    }
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  }, [handleMove, preventDefaultTouchmoveEvent]);

  const onTouchEnd = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // Mouse event handlers (optional)
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!trackMouse) return;
    handleStart(e.clientX, e.clientY);
  }, [handleStart, trackMouse]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!trackMouse) return;
    handleMove(e.clientX, e.clientY);
  }, [handleMove, trackMouse]);

  const onMouseUp = useCallback(() => {
    if (!trackMouse) return;
    handleEnd();
  }, [handleEnd, trackMouse]);

  const onMouseLeave = useCallback(() => {
    if (!trackMouse) return;
    handleEnd();
  }, [handleEnd, trackMouse]);

  return {
    isSwiping,
    handlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      ...(trackMouse && {
        onMouseDown,
        onMouseMove,
        onMouseUp,
        onMouseLeave,
      }),
    },
  };
};