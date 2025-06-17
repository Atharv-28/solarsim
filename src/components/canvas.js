import React, { useState, useEffect } from "react";
import "../styles/canvas.css";
import Tooltip from "./tooltip";
import Sun from "./sun";
import Trails from "./trails";
import Orbits from "./orbits";
import Planets from "./planets";
import Toolbox from "./toolbox";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CropFreeIcon from "@mui/icons-material/CropFree";

import useOrbitAnimation from "./orbitAnimation";
import useTrailManager from "../utils/trailManager";
import { CANVAS_CENTER, EARTH_ORBITAL_PERIOD } from "../utils/constants";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

const Canvas = () => {
  const [hoveredPlanet, setHoveredPlanet] = useState(null); // State to track hovered planet
  const [selectedPlanet, setSelectedPlanet] = useState(null); // State to track selected planet
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // State to track mouse position for tooltip
  const [isPlaying, setIsPlaying] = useState(true); // State to control animation playback
  const [displaySpeed, setDisplaySpeed] = useState(1); // 1x by default
  const [elapsedTime, setElapsedTime] = useState(0); // State to track elapsed time
  const [animationKey, setAnimationKey] = useState(0); // Key to reset animation

  const BASE_MULTIPLIER = 32; // Base speed multiplier
  const speed = BASE_MULTIPLIER * displaySpeed; // Adjust speed based on user input

  // Custom hook for animation
  const animationTime = useOrbitAnimation(isPlaying, speed, animationKey);

  // Custom hook for managing trails
  const { trails, updateTrails, clearTrails, trailOpacity } = useTrailManager(
    isPlaying,
    elapsedTime
  );

  // Update elapsed time when animation is playing
  useEffect(() => {
    if (isPlaying) {
      setElapsedTime(animationTime);
    }
  }, [animationTime, isPlaying]);

  // Calculate the number of days elapsed
  const daysElapsed = Math.floor(
    (elapsedTime / EARTH_ORBITAL_PERIOD) * EARTH_ORBITAL_PERIOD
  );

  // Reset function
  const handleReset = () => {
    setAnimationKey((prev) => prev + 1); // Increment animation key to reset
    setElapsedTime(0); // Reset elapsed time
    setDisplaySpeed(1); // Reset speed to 1x
    setIsPlaying(false); // Pause after reset
    clearTrails(); // Clear trails
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
            {/*  ******************      Do Not Modularize zoom-controls          *********************  */}
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


              {/*     Rendering the canvas in transform components for zoom & pan feature     */}
              <TransformComponent>
                <svg
                  className="canvas"
                  viewBox="0 0 1000 1000"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => setSelectedPlanet(null)} // Deselect when background clicked
                  onMouseMove={(e) =>
                    setMousePos({ x: e.clientX, y: e.clientY })
                  } // Update mouse position for tooltip
                >
                  <Sun /> // sun
                  <Trails trails={trails} trailOpacity={trailOpacity} /> //
                  trails
                  <Orbits /> // orbits
                  <Planets // planets
                    elapsedTime={elapsedTime}
                    setHoveredPlanet={setHoveredPlanet}
                    setSelectedPlanet={setSelectedPlanet}
                    updateTrails={updateTrails}
                  />
                </svg>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
        <Toolbox
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          displaySpeed={displaySpeed}
          setDisplaySpeed={setDisplaySpeed}
          handleReset={handleReset}
          daysElapsed={daysElapsed}
        />
      </div>
    </div>
  );
};

export default Canvas;
