import React from 'react';
import '../styles/canvas.css';
import planets from '../utils/planets';

const CANVAS_CENTER = { x: 500, y: 500 }; // Based on viewBox 1000x1000

const Canvas = () => {
  return (
    <div className="canvasContainer">
      <svg
        className="canvas"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >

        {/* Sun */}
        <circle
          cx={CANVAS_CENTER.x}
          cy={CANVAS_CENTER.y}
          r="20"
          fill="yellow"
        />

        {/* Planets */}
        {planets.map((planet, index) => {
          const angle = (2 * Math.PI * index) / planets.length; // even spacing for now
          const x = CANVAS_CENTER.x + planet.distance * Math.cos(angle);
          const y = CANVAS_CENTER.y + planet.distance * Math.sin(angle);

          return (
            <circle
              key={planet.name}
              cx={x}
              cy={y}
              r={planet.radius}
              fill={planet.color}
            />
          );
        })}

        
      </svg>
    </div>
  );
};

export default Canvas;
