// utils.js

// Data
export const planetsData = [
    { name: 'Donlon', distance: 100 },
    { name: 'Enchai', distance: 200 },
    { name: 'Jebing', distance: 300 },
    { name: 'Sapir', distance: 400 },
    { name: 'Lerbin', distance: 500 },
    { name: 'Pingasor', distance: 600 }
];

export const vehiclesData = [
    { name: 'Space Pod', total_no: 2, max_distance: 200, speed: 2 },
    { name: 'Space Rocket', total_no: 1, max_distance: 300, speed: 4 },
    { name: 'Space Shuttle', total_no: 1, max_distance: 400, speed: 5 },
    { name: 'Space Ship', total_no: 2, max_distance: 600, speed: 10 }
];

// Getters
export function getPlanetData(name) {
    return planetsData.find(planet => planet.name === name);
}

export function getVehicleData(name) {
    return vehiclesData.find(vehicle => vehicle.name === name);
}

// Calculations
export function calculateTime(distance, speed) {
    return distance / speed;
}

// Error UI
export function showError(message) {
    const errorDiv = document.getElementById('error-message');
    const errorText = errorDiv.querySelector('.error-text');
    errorText.textContent = message;
    errorDiv.classList.remove('hidden');
    setTimeout(hideError, 5000);
}

export function hideError() {
    document.getElementById('error-message').classList.add('hidden');
}

// Loading UI
export function showLoading() {
    document.getElementById('loading-overlay').classList.remove('hidden');
}

export function hideLoading() {
    document.getElementById('loading-overlay').classList.add('hidden');
}
