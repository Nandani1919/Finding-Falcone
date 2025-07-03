// api.js

import { getPlanetData, getVehicleData, calculateTime } from './utils.js';

// Simulate API call
export function simulateFindFalcone(gameState, callback) {
    const missionData = [];

    for (let i = 0; i < 4; i++) {
        const planet = gameState.selectedPlanets[i];
        const vehicle = gameState.selectedVehicles[i];
        const planetData = getPlanetData(planet);
        const vehicleData = getVehicleData(vehicle);
        const time = calculateTime(planetData.distance, vehicleData.speed);

        missionData.push({
            planet,
            vehicle,
            distance: planetData.distance,
            time
        });
    }

    gameState.missionData = missionData;

    setTimeout(() => {
        const isSuccess = Math.random() < 0.3;
        const foundPlanet = isSuccess
            ? gameState.selectedPlanets[Math.floor(Math.random() * 4)]
            : null;

        callback(isSuccess, foundPlanet);
    }, 2000);
}
