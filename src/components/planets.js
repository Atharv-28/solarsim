import React, { useEffect } from "react";
import { CANVAS_CENTER } from "../utils/constants";

const Planets = ({
  planets, // Receive planets dynamically
  elapsedTime,
  setHoveredPlanet,
  setSelectedPlanet,
  updateTrails,
}) => {
  useEffect(() => {
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

      updateTrails(planet.name, { x, y }, planet.distance); // Update trails for the planet
    });
  }, [elapsedTime, planets, updateTrails]); // Only run when elapsedTime changes

  return (
    <>
      {planets.map((planet) => {
        const orbitalProgress =
          (elapsedTime % planet.orbitalPeriod) / planet.orbitalPeriod;
        const angle = orbitalProgress * 2 * Math.PI; // Calculate angle based on elapsed time
        const rx = planet.distance;
        const ry = planet.distance * (1 - planet.eccentricity); // Orbit shape
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
    </>
  );
};

export default Planets;