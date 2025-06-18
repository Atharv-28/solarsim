import React from "react";
import "../styles/tooltip.css";

const Tooltip = ({ x, y, planet }) => {
  if (!planet) return null;

  const style = {
    left: `${x + 15}px`,
    top: `${y + 15}px`,
  };

  return (
    <div className="tooltip" style={style}>
      <img src={planet.img || "https://customplanettx.com/cdn/shop/files/Orange_and_purple_fbafe2c0-f952-4652-b231-6a570f1f1dce.png?v=1723840469"}  alt={planet.name} className="planet-image" />
      <div>
        <strong>{planet.name}</strong>
        <div>Distance: {planet.distance} units</div>
        <div>Orbital Period: {planet.orbitalPeriod} days</div>
        <div>Eccentricity: {planet.eccentricity}</div>
        <div>Radius: {planet.radius}</div>
      </div>
    </div>
  );
};

export default Tooltip;
