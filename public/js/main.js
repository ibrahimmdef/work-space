const modules = document.querySelectorAll(".module");
const playBtn = document.querySelector(".play");

const currentMinutes = document.getElementById("minutes");

const currentSeconds = document.getElementById("seconds");

let timer;
let time = 10 * 60;
let working = false;

function changeModule(e) {
  modules.forEach((btn) => btn.classList.remove("active-module"));
  e.target.classList.add("active-module");
}

function updateDisplay() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  currentMinutes.textContent = String(minutes).padStart(2, "0");
  currentSeconds.textContent = String(seconds).padStart(2, "0");
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

  if (working) {
    startTimer();
  } else {
    pauseTimer();
  }
}

playBtn.addEventListener("click", togglePlayPause);

updateDisplay();
