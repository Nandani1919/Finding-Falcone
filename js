// Game state
let gameState = {
    selectedPlanets: ['', '', '', ''],
    selectedVehicles: ['', '', '', ''],
    availableVehicles: {
        'Space Pod': 2,
        'Space Rocket': 1,
        'Space Shuttle': 1,
        'Space Ship': 2
    },
    totalTime: 0,
    missionData: []
};

// Data
const planetsData = [
    { name: 'Donlon', distance: 100 },
    { name: 'Enchai', distance: 200 },
    { name: 'Jebing', distance: 300 },
    { name: 'Sapir', distance: 400 },
    { name: 'Lerbin', distance: 500 },
    { name: 'Pingasor', distance: 600 }
];

const vehiclesData = [
    { name: 'Space Pod', total_no: 2, max_distance: 200, speed: 2 },
    { name: 'Space Rocket', total_no: 1, max_distance: 300, speed: 4 },
    { name: 'Space Shuttle', total_no: 1, max_distance: 400, speed: 5 },
    { name: 'Space Ship', total_no: 2, max_distance: 600, speed: 10 }
];

// Utility functions
function getPlanetData(planetName) {
    return planetsData.find(planet => planet.name === planetName);
}

function getVehicleData(vehicleName) {
    return vehiclesData.find(vehicle => vehicle.name === vehicleName);
}

function calculateTime(distance, speed) {
    return distance / speed;
}

function showError(message) {
    const errorDiv = document.getElementById('error-message');
    const errorText = errorDiv.querySelector('.error-text');
    errorText.textContent = message;
    errorDiv.classList.remove('hidden');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

function hideError() {
    document.getElementById('error-message').classList.add('hidden');
}

function showLoading() {
    document.getElementById('loading-overlay').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading-overlay').classList.add('hidden');
}

// Navigation functions
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageId.replace('-page', '')) {
            link.classList.add('active');
        }
    });
}

// Vehicle management functions
function updateVehicleOptions(destinationIndex) {
    const vehicleSelect = document.getElementById(`vehicle-${destinationIndex + 1}`);
    const planetSelect = document.getElementById(`planet-${destinationIndex + 1}`);
    const selectedPlanet = planetSelect.value;
    
    // Clear current options
    vehicleSelect.innerHTML = '<option value="">Choose vehicle...</option>';
    
    if (!selectedPlanet) {
        vehicleSelect.disabled = true;
        return;
    }
    
    const planetData = getPlanetData(selectedPlanet);
    vehicleSelect.disabled = false;
    
    // Add available vehicles that can reach the planet
    vehiclesData.forEach(vehicle => {
        if (vehicle.max_distance >= planetData.distance && gameState.availableVehicles[vehicle.name] > 0) {
            const option = document.createElement('option');
            option.value = vehicle.name;
            option.textContent = `${vehicle.name} (${gameState.availableVehicles[vehicle.name]} available)`;
            vehicleSelect.appendChild(option);
        }
    });
}

function updateVehicleCount() {
    // Update vehicle count display
    Object.keys(gameState.availableVehicles).forEach(vehicleName => {
        const countElement = document.querySelector(`[data-vehicle="${vehicleName}"]`);
        if (countElement) {
            countElement.textContent = gameState.availableVehicles[vehicleName];
        }
    });
}

function updateDistanceAndTime(destinationIndex) {
    const planetSelect = document.getElementById(`planet-${destinationIndex + 1}`);
    const vehicleSelect = document.getElementById(`vehicle-${destinationIndex + 1}`);
    const card = document.querySelector(`[data-destination="${destinationIndex + 1}"]`);
    const distanceSpan = card.querySelector('.distance-value');
    const timeSpan = card.querySelector('.time-value');
    
    const selectedPlanet = planetSelect.value;
    const selectedVehicle = vehicleSelect.value;
    
    if (selectedPlanet && selectedVehicle) {
        const planetData = getPlanetData(selectedPlanet);
        const vehicleData = getVehicleData(selectedVehicle);
        const time = calculateTime(planetData.distance, vehicleData.speed);
        
        distanceSpan.textContent = `${planetData.distance} megamiles`;
        timeSpan.textContent = `${time} hours`;
    } else if (selectedPlanet) {
        const planetData = getPlanetData(selectedPlanet);
        distanceSpan.textContent = `${planetData.distance} megamiles`;
        timeSpan.textContent = '-';
    } else {
        distanceSpan.textContent = '-';
        timeSpan.textContent = '-';
    }
}

function updateTotalTime() {
    let totalTime = 0;
    
    for (let i = 0; i < 4; i++) {
        const planet = gameState.selectedPlanets[i];
        const vehicle = gameState.selectedVehicles[i];
        
        if (planet && vehicle) {
            const planetData = getPlanetData(planet);
            const vehicleData = getVehicleData(vehicle);
            totalTime += calculateTime(planetData.distance, vehicleData.speed);
        }
    }
    
    gameState.totalTime = totalTime;
    document.getElementById('total-time').textContent = totalTime;
    
    // Enable/disable find button
    const findButton = document.getElementById('find-falcone-btn');
    const allSelected = gameState.selectedPlanets.every(planet => planet !== '') && 
                      gameState.selectedVehicles.every(vehicle => vehicle !== '');
    findButton.disabled = !allSelected;
}

function resetVehicleAvailability() {
    gameState.availableVehicles = {
        'Space Pod': 2,
        'Space Rocket': 1,
        'Space Shuttle': 1,
        'Space Ship': 2
    };
}

function updateAvailableVehicles() {
    // Reset to original counts
    resetVehicleAvailability();
    
    // Subtract selected vehicles
    gameState.selectedVehicles.forEach(vehicle => {
        if (vehicle && gameState.availableVehicles[vehicle] > 0) {
            gameState.availableVehicles[vehicle]--;
        }
    });
    
    // Update all vehicle dropdowns
    for (let i = 0; i < 4; i++) {
        updateVehicleOptions(i);
    }
    
    updateVehicleCount();
}

function validatePlanetSelection(destinationIndex, selectedPlanet) {
    // Check if planet is already selected in another destination
    for (let i = 0; i < 4; i++) {
        if (i !== destinationIndex && gameState.selectedPlanets[i] === selectedPlanet) {
            return false;
        }
    }
    return true;
}

// Event handlers
function handlePlanetChange(event) {
    const destinationIndex = parseInt(event.target.dataset.index);
    const selectedPlanet = event.target.value;
    const previousPlanet = gameState.selectedPlanets[destinationIndex];
    
    // Validate planet selection
    if (selectedPlanet && !validatePlanetSelection(destinationIndex, selectedPlanet)) {
        showError('Each planet can only be selected once!');
        event.target.value = previousPlanet;
        return;
    }
    
    // Clear vehicle selection for this destination
    gameState.selectedVehicles[destinationIndex] = '';
    document.getElementById(`vehicle-${destinationIndex + 1}`).value = '';
    
    // Update game state
    gameState.selectedPlanets[destinationIndex] = selectedPlanet;
    
    // Update UI
    updateAvailableVehicles();
    updateDistanceAndTime(destinationIndex);
    updateTotalTime();
}

function handleVehicleChange(event) {
    const destinationIndex = parseInt(event.target.dataset.index);
    const selectedVehicle = event.target.value;
    
    // Update game state
    gameState.selectedVehicles[destinationIndex] = selectedVehicle;
    
    // Update UI
    updateAvailableVehicles();
    updateDistanceAndTime(destinationIndex);
    updateTotalTime();
}

function handleFindFalcone() {
    if (!validateMission()) {
        return;
    }
    
    // Show loading
    showLoading();
    
    // Prepare mission data
    gameState.missionData = [];
    for (let i = 0; i < 4; i++) {
        const planet = gameState.selectedPlanets[i];
        const vehicle = gameState.selectedVehicles[i];
        const planetData = getPlanetData(planet);
        const vehicleData = getVehicleData(vehicle);
        const time = calculateTime(planetData.distance, vehicleData.speed);
        
        gameState.missionData.push({
            planet: planet,
            vehicle: vehicle,
            distance: planetData.distance,
            time: time
        });
    }
    
    // Simulate API call with random result
    setTimeout(() => {
        hideLoading();
        
        // Random success/failure (30% success rate)
        const isSuccess = Math.random() < 0.3;
        let foundPlanet = null;
        
        if (isSuccess) {
            // Randomly select one of the chosen planets as the found planet
            foundPlanet = gameState.selectedPlanets[Math.floor(Math.random() * 4)];
        }
        
        showResults(isSuccess, foundPlanet);
    }, 2000);
}

function validateMission() {
    // Check if all planets and vehicles are selected
    const allPlanetsSelected = gameState.selectedPlanets.every(planet => planet !== '');
    const allVehiclesSelected = gameState.selectedVehicles.every(vehicle => vehicle !== '');
    
    if (!allPlanetsSelected) {
        showError('Please select all 4 planets!');
        return false;
    }
    
    if (!allVehiclesSelected) {
        showError('Please select vehicles for all destinations!');
        return false;
    }
    
    // Check for duplicate planets
    const uniquePlanets = new Set(gameState.selectedPlanets);
    if (uniquePlanets.size !== 4) {
        showError('Please select 4 different planets!');
        return false;
    }
    
    return true;
}

function showResults(isSuccess, foundPlanet) {
    // Update result display
    const successResult = document.getElementById('success-result');
    const failureResult = document.getElementById('failure-result');
    const resultTime = document.getElementById('result-time');
    const foundPlanetSpan = document.getElementById('found-planet');
    
    resultTime.textContent = gameState.totalTime;
    
    if (isSuccess) {
        successResult.classList.remove('hidden');
        failureResult.classList.add('hidden');
        foundPlanetSpan.textContent = foundPlanet;
    } else {
        successResult.classList.add('hidden');
        failureResult.classList.remove('hidden');
    }
    
    // Update mission summary
    updateMissionSummary();
    
    // Show results page
    showPage('results-page');
}

function updateMissionSummary() {
    const summaryList = document.getElementById('mission-summary-list');
    summaryList.innerHTML = '';
    
    gameState.missionData.forEach((mission, index) => {
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.innerHTML = `
            <div>
                <strong>Destination ${index + 1}:</strong> ${mission.planet}
            </div>
            <div>
                <strong>Vehicle:</strong> ${mission.vehicle}
            </div>
            <div>
                <strong>Time:</strong> ${mission.time} hours
            </div>
        `;
        summaryList.appendChild(summaryItem);
    });
}

function resetGame() {
    // Reset game state
    gameState.selectedPlanets = ['', '', '', ''];
    gameState.selectedVehicles = ['', '', '', ''];
    gameState.totalTime = 0;
    gameState.missionData = [];
    resetVehicleAvailability();
    
    // Reset UI
    document.querySelectorAll('.planet-select').forEach(select => {
        select.value = '';
    });
    
    document.querySelectorAll('.vehicle-select').forEach(select => {
        select.value = '';
        select.disabled = true;
    });
    
    document.querySelectorAll('.distance-value').forEach(span => {
        span.textContent = '-';
    });
    
    document.querySelectorAll('.time-value').forEach(span => {
        span.textContent = '-';
    });
    
    document.getElementById('total-time').textContent = '0';
    document.getElementById('find-falcone-btn').disabled = true;
    
    updateVehicleCount();
    hideError();
    
    // Show home page
    showPage('home-page');
}

// Initialize the game
function initializeGame() {
    // Add event listeners for planet selects
    document.querySelectorAll('.planet-select').forEach(select => {
        select.addEventListener('change', handlePlanetChange);
    });
    
    // Add event listeners for vehicle selects
    document.querySelectorAll('.vehicle-select').forEach(select => {
        select.addEventListener('change', handleVehicleChange);
    });
    
    // Add event listener for find button
    document.getElementById('find-falcone-btn').addEventListener('click', handleFindFalcone);
    
    // Add event listeners for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.dataset.page) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showPage(link.dataset.page + '-page');
            });
        }
    });
    
    // Add event listener for reset button
    document.getElementById('reset-btn').addEventListener('click', (e) => {
        e.preventDefault();
        resetGame();
    });
    
    // Add event listeners for result page buttons
    document.getElementById('start-again-btn').addEventListener('click', resetGame);
    document.getElementById('home-btn').addEventListener('click', () => {
        showPage('home-page');
    });
    
    // Add event listener for error close button
    document.querySelector('.error-close').addEventListener('click', hideError);
    
    // Initialize vehicle counts
    updateVehicleCount();
    
    console.log('Finding Falcone game initialized!');
}

// Start the game when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeGame);
