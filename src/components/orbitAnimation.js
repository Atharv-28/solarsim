import { useEffect, useRef, useState } from 'react';

const OrbitAnimation = (isPlaying, speed = 1) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const requestRef = useRef();
  const previousTimeRef = useRef();


  const animate = (time) => {
    if (previousTimeRef.current != null) {
      const deltaTime = time - previousTimeRef.current;
      setElapsedTime((prev) => prev + deltaTime * 0.001 * speed); // seconds * speed
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };


  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current);
      previousTimeRef.current = null;
    }

    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, speed]);

  return elapsedTime;
};

export default OrbitAnimation;
