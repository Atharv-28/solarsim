import React, { useState, useEffect } from "react";
import "../styles/canvas.css";
import planets from "../utils/planets";
import Tooltip from "./tooltip";
import OrbitAnimation from "./orbitAnimation";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import ReplayIcon from "@mui/icons-material/Replay";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CropFreeIcon from "@mui/icons-material/CropFree";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

const CANVAS_CENTER = { x: 500, y: 500 }; // Based on viewBox 1000x1000
const EARTH_ORBITAL_PERIOD = 365; // Earth's orbital period in days

const Canvas = () => {
  const [hoveredPlanet, setHoveredPlanet] = useState(null); // State to track hovered planet
  const [selectedPlanet, setSelectedPlanet] = useState(null); // State to track selected planet
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // State to track mouse position for tooltip
  const [isPlaying, setIsPlaying] = useState(true); // State to control animation playback
  const [displaySpeed, setDisplaySpeed] = useState(1); // 1x by default
  const [elapsedTime, setElapsedTime] = useState(0); // State to track elapsed time
  const [animationKey, setAnimationKey] = useState(0); // Key to reset animation
  const [trails, setTrails] = useState({}); // State to store trails for each planet
  const [trailOpacity, setTrailOpacity] = useState(1); // State to control trail opacity

  const BASE_MULTIPLIER = 32; // Base speed multiplier
  const speed = BASE_MULTIPLIER * displaySpeed; // Adjust speed based on user input

  // Custom hook for animation
  const animationTime = OrbitAnimation(isPlaying, speed, animationKey);

  // Update elapsed time when animation is playing
  useEffect(() => {
    if (isPlaying) {
      setElapsedTime(animationTime);
      setTrailOpacity(1); // Reset trail opacity when playing
    }
  }, [animationTime, isPlaying]);

  // Calculate the number of days elapsed
  const daysElapsed = Math.floor(
    (elapsedTime / EARTH_ORBITAL_PERIOD) * EARTH_ORBITAL_PERIOD
  );

  // Map planet names to their colors for trail rendering
  const planetColorMap = planets.reduce((acc, p) => {
    acc[p.name] = p.color;
    return acc;
  }, {});

  // Update trails as planets move
  useEffect(() => {
    if (!isPlaying) return; // Do not update trails when paused

    const newTrails = { ...trails };

    planets.forEach((planet) => {
      const orbitalProgress =
        (elapsedTime % planet.orbitalPeriod) / planet.orbitalPeriod;
      const angle = orbitalProgress * 2 * Math.PI; // Calculate angle based on elapsed time
      const rx = planet.distance;
      const ry = planet.distance * (1 - planet.eccentricity); // Orbit shape
      const cx = CANVAS_CENTER.x + planet.distance * planet.eccentricity; // Focus shift
      const cy = CANVAS_CENTER.y;
      const x = cx + rx * Math.cos(angle);
      const y = cy + ry * Math.sin(angle);

      // Add the current position to the trail
      if (!newTrails[planet.name]) {
        newTrails[planet.name] = [];
      }
      newTrails[planet.name].push({ x, y });

      // Adjust trail length based on planet's distance
      const maxTrailLength = Math.floor(planet.distance); // Longer trails for farther planets
      if (newTrails[planet.name].length > maxTrailLength) {
        newTrails[planet.name].shift();
      }
    });

    setTrails(newTrails);
  }, [elapsedTime, isPlaying]);

  // Fade trails when paused
  useEffect(() => {
    if (isPlaying) return; // Do not fade trails when playing

    const fadeInterval = setInterval(() => {
      setTrailOpacity((prev) => {
        if (prev <= 0) {
          clearInterval(fadeInterval);
          setTrails({}); // Clear trails when fully faded
          return 0;
        }
        return prev - 0.05; // Gradually decrease opacity
      });
    }, 100); // Adjust fading speed (100ms interval)

    return () => clearInterval(fadeInterval); // Cleanup interval on unmount or play
  }, [isPlaying]);

  // Reset function
  const handleReset = () => {
    setAnimationKey((prev) => prev + 1); // Increment animation key to reset
    setElapsedTime(0); // Reset elapsed time
    setDisplaySpeed(1); // Reset speed to 1x
    setIsPlaying(false); // Pause after reset
    setTrails({}); // Clear trails
    setTrailOpacity(1); // Reset trail opacity
  };

  // Zoom controls component
  const ZoomControls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
      <div className="zoom-controls">
        <button onClick={zoomIn}>
          <ZoomInIcon fontSize="small" />
        </button>
        <button onClick={zoomOut}>
          <ZoomOutIcon fontSize="small" />
        </button>
        <button onClick={resetTransform}>
          <CropFreeIcon fontSize="small" />
        </button>
      </div>
    );
  };

  return (
    <div className="simulationContainer">
      <div className="tooltipContainer">
        {/* Tooltip to show info on hover/click */}
        <Tooltip
          x={mousePos.x}
          y={mousePos.y}
          planet={hoveredPlanet || selectedPlanet}
        />
      </div>
      <div className="canvasContainer">
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={5}
          wheel={{ step: 0.2 }}
          doubleClick={{ disabled: true }}
          pinch={{ disabled: false }}
        >
          <ZoomControls />
          <TransformComponent>
            <svg
              className="canvas"
              viewBox="0 0 1000 1000"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setSelectedPlanet(null)} // Deselect when background clicked
              onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })} // Update mouse position for tooltip
            >
              {/* Sun */}
              <circle
                cx={CANVAS_CENTER.x}
                cy={CANVAS_CENTER.y}
                r="20"
                fill="yellow"
              />

              {/* Trails */}
              {planets.map((planet) => {
                const trail = trails[planet.name];
                if (!trail || trail.length < 2) return null;

                return trail.slice(1).map((point, i) => {
                  const prev = trail[i];
                  const opacity = (i / trail.length) * trailOpacity; // Apply fading effect

                  return (
                    <line
                      key={`${planet.name}-trail-line-${i}`}
                      x1={prev.x}
                      y1={prev.y}
                      x2={point.x}
                      y2={point.y}
                      stroke={planetColorMap[planet.name]}
                      strokeOpacity={opacity}
                      strokeWidth="1"
                    />
                  );
                });
              })}

              {/* Orbits */}
              {planets.map((planet) => {
                const rx = planet.distance;
                const ry = planet.distance * (1 - planet.eccentricity); // Orbit shape
                const cx =
                  CANVAS_CENTER.x + planet.distance * planet.eccentricity; // Focus shift
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
              {planets.map((planet) => {
                const orbitalProgress =
                  (elapsedTime % planet.orbitalPeriod) / planet.orbitalPeriod;
                const angle = orbitalProgress * 2 * Math.PI; // Calculate angle based on elapsed time
                const rx = planet.distance;
                const ry = planet.distance * (1 - planet.eccentricity); // Orbit shape
                const cx =
                  CANVAS_CENTER.x + planet.distance * planet.eccentricity; // Focus shift
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
          </TransformComponent>
        </TransformWrapper>

        {/* Toolbox with buttons */}
        <div className="toolbox">
          <button onClick={handleReset}>
            <ReplayIcon fontSize="small" />
          </button>
          <span style={{ marginLeft: "10px", color: "white" }}>
            {displaySpeed}x
          </span>
          <button
            onClick={() => setDisplaySpeed((prev) => Math.max(0.25, prev / 2))}
          >
            <FastRewindIcon fontSize="small" />
          </button>
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <PauseIcon fontSize="small" />
            ) : (
              <PlayArrowIcon fontSize="small" />
            )}
          </button>
          <button
            onClick={() => setDisplaySpeed((prev) => Math.min(16, prev * 2))}
          >
            <FastForwardIcon fontSize="small" />
          </button>
          <span style={{ marginLeft: "10px", color: "white" }}>
            Days: {daysElapsed}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
