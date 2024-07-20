let startTime = 0;
let currentTime = 0;
let lapTimes = [];
let isRunning = false;

const timeDisplay = document.getElementById('time-display');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const lapButton = document.getElementById('lap-button');
const lapTimesList = document.getElementById('lap-times-list');

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', addLapTime);

function startStopwatch() {
    if (!isRunning) {
        startTime = new Date().getTime();
        isRunning = true;
        updateTimer();
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
    }
}

function resetStopwatch() {
    startTime = 0;
    currentTime = 0;
    lapTimes = [];
    isRunning = false;
    timeDisplay.textContent = '00:00:00';
    lapTimesList.innerHTML = '';
}

function addLapTime() {
    const lapTime = currentTime;
    lapTimes.push(lapTime);
    const lapTimeHTML = `<li>Lap ${lapTimes.length}: ${formatTime(lapTime)}</li>`;
    lapTimesList.innerHTML += lapTimeHTML;
}

function updateTimer() {
    if (isRunning) {
        currentTime = new Date().getTime() - startTime;
        timeDisplay.textContent = formatTime(currentTime);
        setTimeout(updateTimer, 1000);
    }
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);


    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.`;
}

function pad(number, length = 2) {
    return String(number).padStart(length, '0');
}