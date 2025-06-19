import React from "react";
import "../styles/tooltip.css";
import planetImg from "../assets/planet.png"; 

const Tooltip = ({ x, y, planet }) => {
  if (!planet) return null;

  const style = {
    left: `${x + 15}px`,
    top: `${y + 15}px`,
  };

  return (
    <div className="tooltip" style={style}>
      <img src={planet.img || planetImg}  alt={planet.name} className="planet-image" />
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
