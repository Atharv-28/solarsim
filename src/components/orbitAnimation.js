import { useEffect, useRef, useState } from 'react';

const OrbitAnimation = (isPlaying) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const requestRef = useRef();

  const animate = (time) => {
    setElapsedTime((prev) => prev + 1); // could use deltaTime for precision
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current);
    }

    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying]);

  return elapsedTime;
};

export default OrbitAnimation;
