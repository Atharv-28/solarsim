import React from "react";
import { CANVAS_CENTER } from "../utils/constants";

const Orbits = ({ planets }) => {
  return (
    <>
      {planets.map((planet) => {
        const rx = planet.distance;
        const ry = planet.distance * (1 - planet.eccentricity); // Orbit shape
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
    </>
  );
};

export default Orbits;