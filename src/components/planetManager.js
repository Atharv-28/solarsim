import React, { useState } from "react";
import "../styles/planetManager.css";

const PlanetManager = ({ planets, setPlanets, removePlanetTrail }) => {
  const [newPlanet, setNewPlanet] = useState({
    name: "",
    color: "#ffffff",
    radius: 5,
    distance: 100,
    orbitalPeriod: 365,
    eccentricity: 0.01,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlanet((prev) => ({
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

  const addPlanet = () => {
    if (newPlanet.name.trim() === "") return alert("Planet name is required!");
    setPlanets((prev) => [...prev, { ...newPlanet }]);
    setNewPlanet({
      name: "",
      color: "#ffffff",
      radius: 5,
      distance: 100,
      orbitalPeriod: 365,
      eccentricity: 0.01,
    });
  };

  const removePlanet = (name) => {
    setPlanets((prev) => prev.filter((planet) => planet.name !== name));
    removePlanetTrail(name); // Remove the trail of the deleted planet
  };

  return (
    <div className="planet-manager">
      <div className="planet-form">
        <h3>Manage Planets</h3>
        <label>
          Planet Name:
          <input
            type="text"
            name="name"
            placeholder="Planet Name"
            value={newPlanet.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Color :
          <input
            type="color"
            name="color"
            value={newPlanet.color}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Radius:
          <input
            type="number"
            name="radius"
            placeholder="Radius"
            value={newPlanet.radius}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Distance:
          <input
            type="number"
            name="distance"
            placeholder="Distance"
            value={newPlanet.distance}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Orbital Period:
          <input
            type="number"
            name="orbitalPeriod"
            placeholder="Orbital Period"
            value={newPlanet.orbitalPeriod}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Eccentricity:
          <input
            type="number"
            step="0.01"
            name="eccentricity"
            placeholder="Eccentricity"
            value={newPlanet.eccentricity}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={addPlanet}>Add Planet</button>
      </div>
      <ul className="planet-list">
        <h3>Existing Planets</h3>
        {planets.map((planet) => (
          <li key={planet.name}>
            {planet.name}{" "}
            <button onClick={() => removePlanet(planet.name)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanetManager;
