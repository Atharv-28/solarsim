import { useEffect, useRef, useState } from 'react';

const useOrbitAnimation = (isPlaying, speed = 1, resetKey = 0) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const pauseTimeRef = useRef(null); // Track when pause started

  const animate = (time) => {
    if (previousTimeRef.current != null) {
      const deltaTime = time - previousTimeRef.current;
      setElapsedTime((prev) => prev + deltaTime * 0.001 * speed);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  // Handle play/pause
  useEffect(() => {
    if (isPlaying) {
      // Adjust for paused time
      if (pauseTimeRef.current) {
        const pausedDuration = performance.now() - pauseTimeRef.current;
        previousTimeRef.current += pausedDuration; // shift forward
        pauseTimeRef.current = null;
      }
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current);
      pauseTimeRef.current = performance.now(); // save pause time
    }

    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, speed]);

  // Reset on resetKey
  useEffect(() => {
    setElapsedTime(0);
    previousTimeRef.current = null;
    pauseTimeRef.current = null;
  }, [resetKey]);

  return elapsedTime;
};

export default useOrbitAnimation;
