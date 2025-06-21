import React, { useState, useEffect } from "react";
import "../styles/canvas.css";
import Tooltip from "./tooltip";
import Sun from "./sun";
import Trails from "./trails";
import Orbits from "./orbits";
import Planets from "./planets";
import Toolbox from "./toolbox";
import PlanetManager from "./planetManager"; // Import the new component
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CropFreeIcon from "@mui/icons-material/CropFree";

import useOrbitAnimation from "./orbitAnimation";
import TrailManager from "../utils/trailManager";
import { CANVAS_CENTER, EARTH_ORBITAL_PERIOD } from "../utils/constants";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import initialPlanets from "../utils/planets"; // Import the initial planets

const Canvas = () => {
  const [hoveredPlanet, setHoveredPlanet] = useState(null); // State to track hovered planet
  const [selectedPlanet, setSelectedPlanet] = useState(null); // State to track selected planet
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // State to track mouse position for tooltip
  const [isPlaying, setIsPlaying] = useState(true); // State to control animation playback
  const [displaySpeed, setDisplaySpeed] = useState(1); // 1x by default
  const [elapsedTime, setElapsedTime] = useState(0); // State to track elapsed time
  const [animationKey, setAnimationKey] = useState(0); // Key to reset animation
  const [planets, setPlanets] = useState(initialPlanets); // State to manage planets dynamically

  const BASE_MULTIPLIER = 32; // Base speed multiplier
  const speed = BASE_MULTIPLIER * displaySpeed; // Adjust speed based on user input

  // Custom hook for animation
  const animationTime = useOrbitAnimation(isPlaying, speed, animationKey);

  // Custom hook for managing trails
  const { trails, updateTrails, removeTrail, clearTrails, trailOpacity } = TrailManager(isPlaying, elapsedTime);

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
  setPlanets(initialPlanets); // Restore default planets
  clearTrails(); // Clear all trails
};

   // Function to remove a planet's trail
  const removePlanetTrail = (planetName) => {
    removeTrail(planetName); // Use the removeTrail function from TrailManager
  };
  
 // Function to update a planet's details
  const updatePlanet = (planetName, updatedPlanet) => {
    setPlanets((prev) =>
      prev.map((planet) =>
        planet.name === planetName ? { ...planet, ...updatedPlanet } : planet
      )
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
          updatePlanet={updatePlanet} // Pass the updatePlanet function
        />
      </div>
      <div className="canvasContainer">
        <TransformWrapper
          initialScale={1}
          initialPositionX={-CANVAS_CENTER.x + window.innerWidth / 2} // Center horizontally
          initialPositionY={-CANVAS_CENTER.y + window.innerHeight / 2} // Center vertically
          minScale={0.5}
          maxScale={5}
          wheel={{ disabled: false }}
          doubleClick={{ disabled: true }}
          pinch={{ disabled: false }}
          className="transform-wrapper"
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
              {/* Zoom Controls */}
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

              {/* Canvas */}
              <TransformComponent>
                <svg
                  className="canvas"
                  viewBox="0 0 1500 1500"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => setSelectedPlanet(null)} // Deselect when background clicked
                  onMouseMove={(e) =>
                    setMousePos({ x: e.clientX, y: e.clientY })
                  } // Update mouse position for tooltip
                >
                  <Sun />
                  <Trails trails={trails} trailOpacity={trailOpacity} />
                  <Orbits planets={planets} /> {/* Pass planets dynamically */}
                  <Planets
                    planets={planets} // Pass planets dynamically
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
      <PlanetManager
        planets={planets}
        setPlanets={setPlanets}
        removePlanetTrail={removePlanetTrail} // Pass the function to PlanetManager
      /> {/* Add PlanetManager */}
    </div>
  );
};

export default Canvas;
