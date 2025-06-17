import React, { useState } from "react";
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
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // State to track mouse position for tooltip
  const [isPlaying, setIsPlaying] = useState(true); // State to control animation playback
  const [displaySpeed, setDisplaySpeed] = useState(1); // 1x by default
  const [elapsedTime, setElapsedTime] = useState(0); // State to track elapsed time
  const [animationKey, setAnimationKey] = useState(0); // Key to reset animation
  //  const { zoomIn, zoomOut, resetTransform } = useControls(); // Controls for zooming and resetting the view by buttons only

  const BASE_MULTIPLIER = 32; // base speed multiplier   ********keep it high, low speed is quite slow*********
  const speed = BASE_MULTIPLIER * displaySpeed; // Adjust speed based on user input

  // Custom hook for animation
  const animationTime = OrbitAnimation(isPlaying, speed, animationKey);

  // Update elapsed time when animation is playing
  React.useEffect(() => {
    if (isPlaying) {
      setElapsedTime(animationTime);
    }
  }, [animationTime, isPlaying]);

  // Calculate the number of days elapsed
  const daysElapsed = Math.floor(
    (elapsedTime / EARTH_ORBITAL_PERIOD) * EARTH_ORBITAL_PERIOD
  );

  // Event listener to update mouse position
  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // Reset function
  const handleReset = () => {
    setAnimationKey((prevKey) => prevKey + 1);
    setElapsedTime(0);
    setDisplaySpeed(1);
    setIsPlaying(true); // auto-play
  };

  const ZoomControls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();

      /* Zoom Controls */
    return (
      <div className="zoom-controls">
        <button onClick={() => zoomIn()} title="Zoom In">
          <ZoomInIcon fontSize="small" />
        </button>
        <button onClick={() => zoomOut()} title="Zoom Out">
          <ZoomOutIcon fontSize="small" />
        </button>
        <button onClick={() => resetTransform()} title="Reset View">
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
          initialPositionX={0}
          initialPositionY={0}
          minScale={0.5}
          maxScale={5}
          wheel={{ disabled: false }}
          doubleClick={{ disabled: true }}
          pinch={{ disabled: false }}
          className="transform-wrapper"
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
              <ZoomControls />
              {/* Canvas */}
              <TransformComponent>
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
                  {planets.map((planet, index) => {
                    const orbitalProgress =
                      (elapsedTime % planet.orbitalPeriod) /
                      planet.orbitalPeriod;
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
            </>
          )}
        </TransformWrapper>
        {/* below is the Toolbox of all button  */}
        <div className="toolbox">
          {/* Reset Button */}
          <button onClick={handleReset} title="Reset">
            <ReplayIcon fontSize="small" />
          </button>

          {/* Display speed to user */}
          <span style={{ marginLeft: "10px", color: "white" }}>
            {displaySpeed}x
          </span>

          {/* Rewind Button */}
          <button
            onClick={() => setDisplaySpeed((prev) => Math.max(0.25, prev / 2))} // Dividing speed by 2 to slow down
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
            onClick={() => setDisplaySpeed((prev) => Math.min(16, prev * 2))} // Multiplying speed by 2
            title="Speed Up"
          >
            <FastForwardIcon fontSize="small" />
          </button>

          {/* Display elapsed days */}
          <span style={{ marginLeft: "10px", color: "white" }}>
            Days: {daysElapsed}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
