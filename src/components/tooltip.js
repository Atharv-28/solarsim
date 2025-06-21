import React, { useState } from "react";
import "../styles/tooltip.css";
import planetImg from "../assets/planet.png";
import EditIcon from '@mui/icons-material/Edit';

const Tooltip = ({ x, y, planet, updatePlanet }) => {
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [editedPlanet, setEditedPlanet] = useState({ ...planet }); // State to store edited planet details

  if (!planet) return null;

  const style = {
    left: `${x + 15}px`,
    top: `${y + 15}px`,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPlanet((prev) => ({
      ...prev,
      [name]:
        name === "radius" ||
        name === "distance" ||
        name === "orbitalPeriod" ||
        name === "eccentricity"
          ? parseFloat(value)
          : value,
    }));
  };

  const saveChanges = () => {
    updatePlanet(planet.name, editedPlanet); // Update the planet details in the parent state
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="tooltip" style={style}>
      <img
        src={planet.img || planetImg}
        alt={planet.name}
        className="planet-image"
      />
      {isEditing ? (
        <div>
          <strong>Edit {planet.name}</strong>
          <div>
            <label>
              Distance:
              <input
                type="number"
                name="distance"
                value={editedPlanet.distance}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Orbital Period:
              <input
                type="number"
                name="orbitalPeriod"
                value={editedPlanet.orbitalPeriod}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Eccentricity:
              <input
                type="number"
                step="0.01"
                name="eccentricity"
                value={editedPlanet.eccentricity}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Radius:
              <input
                type="number"
                name="radius"
                value={editedPlanet.radius}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editedPlanet.name}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <button onClick={saveChanges}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <div className="tooltip-header">
            <strong>{planet.name}</strong>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              <EditIcon fontSize="small" />
            </button>
          </div>
          <div>Distance: {planet.distance} units</div>
          <div>Orbital Period: {planet.orbitalPeriod} days</div>
          <div>Eccentricity: {planet.eccentricity}</div>
          <div>Radius: {planet.radius}</div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
