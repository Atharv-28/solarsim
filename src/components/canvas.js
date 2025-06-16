import React, { useState } from "react";
import "../styles/canvas.css";
import planets from "../utils/planets";
import Tooltip from "./tooltip";
import OrbitAnimation from "./orbitAnimation";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";

const CANVAS_CENTER = { x: 500, y: 500 }; // Based on viewBox 1000x1000

const Canvas = () => {
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // State to track mouse position for tooltip
  const [isPlaying, setIsPlaying] = useState(true); //state to control animation playback
  const [displaySpeed, setDisplaySpeed] = useState(1); // 1x by default
  const BASE_MULTIPLIER = 32; // base speed multiplier   ********keep it high, low speed is quite slow*********

  const speed = BASE_MULTIPLIER * displaySpeed; // Adjust speed based on user input
  const elapsedTime = OrbitAnimation(isPlaying, speed);

  // Event listener to update mouse position
  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="simulationContainer">
      {/* Tooltip to show info on hover/click */}
      <Tooltip
        x={mousePos.x}
        y={mousePos.y}
        planet={hoveredPlanet || selectedPlanet}
      />
      <div className="canvasContainer">
        <svg
          className="canvas"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setSelectedPlanet(null)} // Deselect when background clicked
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
            const orbitalProgress =
              (elapsedTime % planet.orbitalPeriod) / planet.orbitalPeriod;
            const angle = orbitalProgress * 2 * Math.PI; // Calculate angle based on elapsed time
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
                onClick={(e) => {
                  e.stopPropagation(); // Prevents SVG background click from firing
                  setSelectedPlanet(planet);
                }}
              />
            );
          })}
        </svg>
        {/* below is the Toolbox of all button  */}
        <div className="toolbox">
          {/* to display speed to user */}
          <span style={{ marginLeft: "10px", color: "white" }}>
            {displaySpeed}x
          </span>

          {/* Rewind Button */}
          <button
            onClick={() => setDisplaySpeed((prev) => Math.max(0.25, prev / 2))} // dividing speed by 2 to slow down
            title="Slow Down"
          >
            <FastRewindIcon fontSize="small" />
          </button>

          {/* Play & Pause Button */}
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <PauseIcon fontSize="small" />
            ) : (
              <PlayArrowIcon fontSize="small" />
            )}
          </button>

          {/* Fast Forward Button */}
          <button
            onClick={() => setDisplaySpeed((prev) => Math.min(16, prev * 2))} // multpying speed by 2
            title="Speed Up"
          >
            <FastForwardIcon fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
