import React, { useState, useEffect } from "react";
import "../styles/tooltip.css";
import planetImg from "../assets/planet.png";
import EditIcon from "@mui/icons-material/Edit";

const Tooltip = ({ x, y, planet, updatePlanet }) => {
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [editedPlanet, setEditedPlanet] = useState({ ...planet }); // State to store edited planet details

  // Synchronize editedPlanet state with the planet prop
  useEffect(() => {
    if (planet) {
      setEditedPlanet({ ...planet });
    }
  }, [planet]);

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
          ? parseFloat(value) // Convert numeric fields to numbers
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
        <div className="tooltip-content-edit">
          <strong>Edit {planet.name}</strong>
          <div className="tooltip-edit">
            <label>
              Distance:
              <input
                className="tooltip-input"
                type="number"
                name="distance"
                placeholder={planet.distance} // Use placeholder for current value
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="tooltip-edit">
            <label>
              Orbital Period:
              <input
                className="tooltip-input"
                type="number"
                name="orbitalPeriod"
                placeholder={planet.orbitalPeriod} // Use placeholder for current value
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="tooltip-edit">
            <label>
              Eccentricity:
              <input
                className="tooltip-input"
                type="number"
                step="0.01"
                name="eccentricity"
                placeholder={planet.eccentricity} // Use placeholder for current value
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="tooltip-edit">
            <label>
              Radius:
              <input
                className="tooltip-input"
                type="number"
                name="radius"
                placeholder={planet.radius} // Use placeholder for current value
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="tooltip-edit">
            <label>
              Name:
              <input
                className="tooltip-input"
                type="text"
                name="name"
                placeholder={planet.name} // Use placeholder for current value
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="tooltip-edit">
            <button onClick={saveChanges}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="tooltip-content">
          <div className="tooltip-header">
            <strong>{planet.name}</strong>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              <EditIcon fontSize="inherit" />
            </button>
          </div>
          <div>Distance: {editedPlanet.distance} units</div>
          <div>Orbital Period: {editedPlanet.orbitalPeriod} days</div>
          <div>Eccentricity: {editedPlanet.eccentricity}</div>
          <div>Radius: {editedPlanet.radius}</div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
