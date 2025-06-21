// Scaling constants
const MAX_DISTANCE_MKM = 4500; // Pluto ~4.5B km
const MAX_RADIUS_KM = 71492; // Jupiter radius in km
const DISTANCE_SCALE = 400 / MAX_DISTANCE_MKM;
const RADIUS_SCALE = 10 / MAX_RADIUS_KM;

// Helper to scale real-world planet values to canvas units
const scalePlanet = (planet) => {
  const scaledDistance = Math.round(planet.realDistance / 1000000 * DISTANCE_SCALE); // Convert km to million km and scale
  const scaledRadius = Math.max(2, Math.round(planet.realRadius * RADIUS_SCALE)); // Minimum size = 2
  
  console.log(`Scaling ${planet.name}: distance=${scaledDistance} units, radius=${scaledRadius} units`);
  
  return {
    ...planet,
    distance: scaledDistance, // Scaled distance for rendering
    radius: scaledRadius,     // Scaled radius for rendering
  };
};

// Real-world planet data
const planets = [
  {
    name: 'Mercury',
    color: '#a9a9a9',
    realRadius: 2439.7, // Radius in kilometers
    realDistance: 57900000, // Distance from the Sun in kilometers
    orbitalPeriod: 88, // Orbital period in Earth days
    eccentricity: 0.206,
    img: "https://science.nasa.gov/wp-content/uploads/2024/03/pia15162-mercury-basins-messenger-16x9-1.jpg?resize=400,225"
  },
  {
    name: 'Venus',
    color: '#c2b280',
    realRadius: 6051.8,
    realDistance: 108200000,
    orbitalPeriod: 225,
    eccentricity: 0.007,
    img: "https://science.nasa.gov/wp-content/uploads/2024/03/venus-mariner-10-pia23791-fig2-16x9-1.jpg?resize=400,225"
  },
  {
    name: 'Earth',
    color: '#4e90d2',
    realRadius: 6371,
    realDistance: 149600000,
    orbitalPeriod: 365,
    eccentricity: 0.017,
    img: "https://science.nasa.gov/wp-content/uploads/2024/03/blue-marble-apollo-17-16x9-1.jpg?resize=400,225"
  },
  {
    name: 'Mars',
    color: '#d14f3f',
    realRadius: 3389.5,
    realDistance: 227900000,
    orbitalPeriod: 687,
    eccentricity: 0.093,
    img: "https://science.nasa.gov/wp-content/uploads/2024/03/mars-full-globe-16x9-1.jpg?resize=400,225"
  },
  {
    name: 'Jupiter',
    color: '#e0a96d',
    realRadius: 69911,
    realDistance: 778500000,
    orbitalPeriod: 4333,
    eccentricity: 0.049,
    img: "https://science.nasa.gov/wp-content/uploads/2024/03/jupiter-marble-pia22946-16x9-1.jpg?resize=400,225"
  },
  {
    name: 'Saturn',
    color: '#d8c47d',
    realRadius: 58232,
    realDistance: 1434000000,
    orbitalPeriod: 10759,
    eccentricity: 0.057,
    img: "https://science.nasa.gov/wp-content/uploads/2023/05/saturn-farewell-pia21345-sse-banner-1920x640-1.jpg?resize=400,133"
  },
  {
    name: 'Uranus',
    color: '#a6e7e8',
    realRadius: 25362,
    realDistance: 2871000000,
    orbitalPeriod: 30687,
    eccentricity: 0.046,
    img: "https://science.nasa.gov/wp-content/uploads/2024/03/uranus-pia18182-16x9-1.jpg?resize=400,225"
  },
  {
    name: 'Neptune',
    color: '#4b70dd',
    realRadius: 24622,
    realDistance: 4495000000,
    orbitalPeriod: 60190,
    eccentricity: 0.010,
    img: "https://science.nasa.gov/wp-content/uploads/2024/03/pia01492-neptune-full-disk-16x9-1.jpg?resize=400,225"
  },
];

// Scale all planets
const scaledPlanets = planets.map(scalePlanet);

export default scaledPlanets;
