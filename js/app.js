// app.js

import {
    planetsData,
    vehiclesData,
    getPlanetData,
    getVehicleData,
    calculateTime,
    showError,
    hideError,
    showLoading,
    hideLoading
} from './utils.js';

import { simulateFindFalcone } from './api.js';

// Game State
let gameState = {
    selectedPlanets: ['', '', '', ''],
    selectedVehicles: ['', '', '', ''],
    availableVehicles: {},
    totalTime: 0,
    missionData: []
};

function resetVehicleAvailability() {
    gameState.availableVehicles = {};
    vehiclesData.forEach(vehicle => {
        gameState.availableVehicles[vehicle.name] = vehicle.total_no;
    });
}

function updateAvailableVehicles() {
    resetVehicleAvailability();
    gameState.selectedVehicles.forEach(vehicle => {
        if (vehicle && gameState.availableVehicles[vehicle] > 0) {
            gameState.availableVehicles[vehicle]--;
        }
    });

    for (let i = 0; i < 4; i++) {
        updateVehicleOptions(i);
    }
    updateVehicleCount();
}

function updateVehicleOptions(index) {
    const vehicleSelect = document.getElementById(`vehicle-${index + 1}`);
    const planetSelect = document.getElementById(`planet-${index + 1}`);
    const selectedPlanet = planetSelect.value;

    vehicleSelect.innerHTML = '<option value="">Choose vehicle...</option>';
    vehicleSelect.disabled = !selectedPlanet;

    if (selectedPlanet) {
        const planet = getPlanetData(selectedPlanet);
        vehiclesData.forEach(vehicle => {
            if (vehicle.max_distance >= planet.distance &&
                gameState.availableVehicles[vehicle.name] > 0) {
                const option = document.createElement('option');
                option.value = vehicle.name;
                option.textContent = `${vehicle.name} (${gameState.availableVehicles[vehicle.name]})`;
                vehicleSelect.appendChild(option);
            }
        });
    }
}

function updateVehicleCount() {
    Object.keys(gameState.availableVehicles).forEach(name => {
        const el = document.querySelector(`[data-vehicle="${name}"]`);
        if (el) el.textContent = gameState.availableVehicles[name];
    });
}

function updateTotalTime() {
    let time = 0;
    for (let i = 0; i < 4; i++) {
        const planet = gameState.selectedPlanets[i];
        const vehicle = gameState.selectedVehicles[i];
        if (planet && vehicle) {
            const p = getPlanetData(planet);
            const v = getVehicleData(vehicle);
            time += calculateTime(p.distance, v.speed);
        }
    }
    gameState.totalTime = time;
    document.getElementById('total-time').textContent = time;

    const btn = document.getElementById('find-falcone-btn');
    const ready = gameState.selectedPlanets.every(p => p) &&
                  gameState.selectedVehicles.every(v => v);
    btn.disabled = !ready;
}

function updateDistanceAndTime(i) {
    const card = document.querySelector(`[data-destination="${i + 1}"]`);
    const dSpan = card.querySelector('.distance-value');
    const tSpan = card.querySelector('.time-value');
    const planet = gameState.selectedPlanets[i];
    const vehicle = gameState.selectedVehicles[i];

    if (planet) {
        const p = getPlanetData(planet);
        dSpan.textContent = `${p.distance} megamiles`;
        if (vehicle) {
            const v = getVehicleData(vehicle);
            const time = calculateTime(p.distance, v.speed);
            tSpan.textContent = `${time} hours`;
        } else {
            tSpan.textContent = '-';
        }
    } else {
        dSpan.textContent = '-';
        tSpan.textContent = '-';
    }
}

// --- Event Handlers (planet/vehicle selection, find/reset) ---
function handlePlanetChange(e) {
    const index = parseInt(e.target.dataset.index);
    const selected = e.target.value;
    const prev = gameState.selectedPlanets[index];

    if (gameState.selectedPlanets.includes(selected) && prev !== selected) {
        showError('Each planet must be unique!');
        e.target.value = prev;
        return;
    }

    gameState.selectedPlanets[index] = selected;
    gameState.selectedVehicles[index] = '';
    document.getElementById(`vehicle-${index + 1}`).value = '';
    updateAvailableVehicles();
    updateDistanceAndTime(index);
    updateTotalTime();
}

function handleVehicleChange(e) {
    const index = parseInt(e.target.dataset.index);
    gameState.selectedVehicles[index] = e.target.value;
    updateAvailableVehicles();
    updateDistanceAndTime(index);
    updateTotalTime();
}

function handleFindFalcone() {
    if (!gameState.selectedPlanets.every(p => p) || !gameState.selectedVehicles.every(v => v)) {
        showError('Select 4 planets and vehicles before starting mission!');
        return;
    }

    showLoading();
    simulateFindFalcone(gameState, showResults);
}

function showResults(success, planet) {
    hideLoading();
    document.getElementById('result-time').textContent = gameState.totalTime;
    document.getElementById('found-planet').textContent = planet || 'N/A';

    document.getElementById('success-result').classList.toggle('hidden', !success);
    document.getElementById('failure-result').classList.toggle('hidden', success);

    const list = document.getElementById('mission-summary-list');
    list.innerHTML = '';
    gameState.missionData.forEach((m, i) => {
        const el = document.createElement('div');
        el.className = 'summary-item';
        el.innerHTML = `
            <div><strong>Destination ${i + 1}:</strong> ${m.planet}</div>
            <div><strong>Vehicle:</strong> ${m.vehicle}</div>
            <div><strong>Time:</strong> ${m.time} hours</div>
        `;
        list.appendChild(el);
    });

    showPage('results-page');
}

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// --- Initialization ---
function initializeGame() {
    resetVehicleAvailability();

    document.querySelectorAll('.planet-select').forEach(select => {
        select.addEventListener('change', handlePlanetChange);
    });

    document.querySelectorAll('.vehicle-select').forEach(select => {
        select.addEventListener('change', handleVehicleChange);
    });

    document.getElementById('find-falcone-btn').addEventListener('click', handleFindFalcone);
    document.getElementById('reset-btn').addEventListener('click', resetGame);
    document.getElementById('start-again-btn').addEventListener('click', resetGame);
    document.getElementById('home-btn').addEventListener('click', () => showPage('home-page'));
    document.querySelector('.error-close').addEventListener('click', hideError);

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            showPage(link.dataset.page + '-page');
        });
    });

    updateVehicleCount();
    console.log('Game initialized!');
}

function resetGame() {
    gameState.selectedPlanets = ['', '', '', ''];
    gameState.selectedVehicles = ['', '', '', ''];
    gameState.totalTime = 0;
    gameState.missionData = [];
    resetVehicleAvailability();

    document.querySelectorAll('.planet-select, .vehicle-select').forEach(sel => {
        sel.value = '';
        if (sel.classList.contains('vehicle-select')) sel.disabled = true;
    });

    document.querySelectorAll('.distance-value, .time-value').forEach(span => span.textContent = '-');
    document.getElementById('total-time').textContent = '0';
    document.getElementById('find-falcone-btn').disabled = true;

    updateVehicleCount();
    hideError();
    showPage('home-page');
}

document.addEventListener('DOMContentLoaded', initializeGame);
