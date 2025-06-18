import { useState, useEffect } from "react";

const TrailManager = (isPlaying, elapsedTime) => {
  const [trails, setTrails] = useState({}); // State to store trails for each planet
  const [trailOpacity, setTrailOpacity] = useState(1); // State to control trail opacity

  // Function to update trails for a specific planet
  const updateTrails = (planetName, point, planetDistance) => {
    setTrails((prev) => {
      const newTrails = { ...prev };
      if (!newTrails[planetName]) newTrails[planetName] = [];
      newTrails[planetName].push(point);

      // Limit the trail length dynamically based on the planet's distance
      const maxTrailLength = Math.floor(planetDistance)*1.25; // Trail length proportional to distance
      
      if (newTrails[planetName].length > maxTrailLength) {
        newTrails[planetName].shift(); // Remove the oldest point
      }

      return newTrails;
    });
  };

  // Clear trails when paused or reset
  const clearTrails = () => {
    setTrails({});
    setTrailOpacity(1); // Reset trail opacity
  };

  // Fade trails when paused
  useEffect(() => {
    if (isPlaying) return; // Do not fade trails when playing

    const fadeInterval = setInterval(() => {
      setTrailOpacity((prev) => {
        if (prev <= 0) {
          clearInterval(fadeInterval);
          clearTrails(); // Clear trails when fully faded
          return 0;
        }
        return prev - 0.05; // Gradually decrease opacity
      });
    }, 100); // Adjust fading speed (100ms interval)

    return () => clearInterval(fadeInterval); // Cleanup interval on unmount or play
  }, [isPlaying]);

  return { trails, updateTrails, clearTrails, trailOpacity };
};

export default TrailManager;