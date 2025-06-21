const MAX_DISTANCE_MKM = 4500; // scale relative to outermost planet (like 4500 million km for Pluto)
const MAX_RADIUS_KM = 70000; // Jupiter ~71,492 km

const DISTANCE_SCALE = 400 / MAX_DISTANCE_MKM; // fit within 500 units radius
const RADIUS_SCALE = 10 / MAX_RADIUS_KM; // largest radius will be around 10 units

export function scalePlanets(planets) {
  return planets.map((p) => ({
    ...p,
    distance: Math.round(p.realDistance / 1000000 * DISTANCE_SCALE), // Convert km to million km and scale
    radius: Math.max(2, Math.round(p.realRadius * RADIUS_SCALE)), // Minimum size = 2
  }));
}