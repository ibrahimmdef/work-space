const modules = document.querySelectorAll(".module");

const playBtn = document.querySelector(".play");

const deepMinutes = document.getElementById("deepMinutes");

const deepSeconds = document.getElementById("deepSeconds");

const breakMinutes = document.getElementById("breakMinutes");

const breakSeconds = document.getElementById("breakSeconds");

const deepSection = document.getElementById("deepSection");

const breakSection = document.getElementById("breakSection");

const refresh = document.querySelector(".refresh");

const menu = document.querySelector(".nav-content");

const main = document.querySelector(".main-content");

let timer;
let deepTime = 20 * 60;
let breakTime = 4 * 60;
let time = deepTime;
let working = false;
let currentMode = "deep";

function changeModule(e) {
  modules.forEach((btn) => btn.classList.remove("active-module"));
  e.target.classList.add("active-module");

  clearInterval(timer);

  if (e.target.classList.contains("deep")) {
    currentMode = "deep";
    deepSection.style.display = "block";
    breakSection.style.display = "none";
    time = deepTime;
  } else if (e.target.classList.contains("break")) {
    currentMode = "break";
    deepSection.style.display = "none";
    breakSection.style.display = "block";
    time = breakTime;
  }

  if (working) {
    togglePlayPause();
    refresh.style.display = "none";
  }
  updateDisplay();
}

// Timer logic

function updateDisplay() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  if (currentMode === "deep") {
    deepMinutes.textContent = String(minutes).padStart(2, "0");
    deepSeconds.textContent = String(seconds).padStart(2, "0");
  } else {
    breakMinutes.textContent = String(minutes).padStart(2, "0");
    breakSeconds.textContent = String(seconds).padStart(2, "0");
  }
}

function startTimer() {
  timer = setInterval(() => {
    if (time <= 0) {
      clearInterval(timer);
      working = false;
      playBtn.classList.remove("active-button");
      return;
    }
    time--;
    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
}

function togglePlayPause() {
  working = !working;
  playBtn.classList.toggle("active-button");

  refresh.style.display = "block";

  if (working) {
    startTimer();
  } else {
    pauseTimer();
  }
}

playBtn.addEventListener("click", togglePlayPause);

function reset() {
  if (currentMode === "deep") {
    time = deepTime;
    updateDisplay();
  } else {
    time = breakTime;
    updateDisplay();
  }

  if (working) {
    togglePlayPause();
    refresh.style.display = "none";
  }
}

// Toggle Menu

function toggleMenu() {
  menu.classList.toggle("nav-content-toggle");
}

updateDisplay();

// Tasks
