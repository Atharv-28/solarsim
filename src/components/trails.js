import React from "react";

const Trails = ({ trails, trailOpacity }) => {
  return (
    <>
      {Object.keys(trails).map((planetName) => {
        const trail = trails[planetName];
        // if (!trail || trail.length < 2) return null;

        return trail.slice(1).map((point, i) => {
          const prev = trail[i];
          const opacity = (i / trail.length) * trailOpacity; // Apply fading effect

          return (
            <line
              key={`${planetName}-trail-line-${i}`}
              x1={prev.x}
              y1={prev.y}
              x2={point.x}
              y2={point.y}
              stroke="white"
              strokeOpacity={opacity}
              strokeWidth="1"
            />
          );
        });
      })}
    </>
  );
};

export default Trails;