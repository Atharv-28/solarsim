import React, { useState } from 'react';
import "../styles/canvas.css";
import planets from "../utils/planets";
import Tooltip from "./tooltip";

const CANVAS_CENTER = { x: 500, y: 500 }; // Based on viewBox 1000x1000

const Canvas = () => {
  const [hoveredPlanet, setHoveredPlanet] = useState(null); //  State to track which planet is hovered
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // State to track mouse position for tooltip

  // Event listener to update mouse position
  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

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

        {/* Orbits */}
        {planets.map((planet) => {
          const rx = planet.distance;
          const ry = planet.distance * (1 - planet.eccentricity); // orbit shape
          const cx = CANVAS_CENTER.x + planet.distance * planet.eccentricity; // Focus shift
          const cy = CANVAS_CENTER.y;

          return (
            <ellipse
              key={`${planet.name}-orbit`}
              cx={cx}
              cy={cy}
              rx={rx}
              ry={ry}
              fill="none"
              stroke="white"
              strokeOpacity={0.1}
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Planets */}
        {planets.map((planet, index) => {
          const angle = (2 * Math.PI * index) / planets.length; // even spacing for now
          const rx = planet.distance;
          const ry = planet.distance * (1 - planet.eccentricity); // orbit shape
          const cx = CANVAS_CENTER.x + planet.distance * planet.eccentricity; // Focus shift
          const cy = CANVAS_CENTER.y;
          const x = cx + rx * Math.cos(angle);
          const y = cy + ry * Math.sin(angle);

          return (
            <circle
              key={planet.name}
              cx={x}
              cy={y}
              r={planet.radius}
              fill={planet.color}
              onMouseEnter={() => setHoveredPlanet(planet)}
              onMouseLeave={() => setHoveredPlanet(null)}
            />
          );
        })}
      </svg>

      {/* Tooltip to show info on hover/click */}
      <Tooltip x={mousePos.x} y={mousePos.y} planet={hoveredPlanet} />
    </div>
  );
};

export default Canvas;
