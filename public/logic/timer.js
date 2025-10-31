const modules = document.querySelectorAll(".module");

const playBtn = document.querySelector(".play");

const deepMinutes = document.getElementById("deepMinutes");

const deepSeconds = document.getElementById("deepSeconds");

const breakMinutes = document.getElementById("breakMinutes");

const breakSeconds = document.getElementById("breakSeconds");

const deepSection = document.getElementById("deepSection");

const breakSection = document.getElementById("breakSection");

const refresh = document.querySelector(".refresh");

const menuBtn = document.querySelector(".menu");

const menu = document.querySelector(".nav-content");

const deepInput = document.querySelector("#deepSettings");

const breakInput = document.querySelector("#breakSettings");

//Settings timer value

if (playBtn && deepMinutes && breakMinutes) {
  let timer;
  let deepTime = (localStorage.getItem("deepTime") || 50) * 60;
  let breakTime = (localStorage.getItem("breakTime") || 10) * 60;
  let time = deepTime;
  let working = false;
  let currentMode = "deep";

  modules.forEach((btn) => {
    btn.addEventListener("click", changeModule);
  });

  document.querySelector(".refresh").addEventListener("click", reset);

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
    let audio = new Audio("../sounds/sound1.mp3");
    audio.play();
    timer = setInterval(() => {
      if (time <= 0) {
        clearInterval(timer);
        working = false;
        playBtn.classList.remove("active-button");

        const minutes = currentMode === "deep" ? deepTime / 60 : breakTime / 60;

        //Add minutes for stats

        if (currentMode === "deep") addDeep(minutes);
        else addBreak(minutes);

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
      refresh.style.display = "none";
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

  updateDisplay();
}

function toggleMenu() {
  menu.classList.toggle("nav-content-toggle");
}

menuBtn.addEventListener("click", toggleMenu);

// Settings Input

if (deepInput && breakInput) {
  deepInput.addEventListener("change", () => {
    const deepValue = Number(deepInput.value);
    localStorage.setItem("deepTime", deepValue);
    console.log(deepInput.value);
  });

  breakInput.addEventListener("change", () => {
    const breakValue = Number(breakInput.value);
    localStorage.setItem("breakTime", breakValue);
  });

  window.addEventListener("load", () => {
    const savedDeepTime = localStorage.getItem("deepTime");
    const saveBreakTime = localStorage.getItem("breakTime");
    if (savedDeepTime) {
      deepInput.value = savedDeepTime;
    }
    if (saveBreakTime) {
      breakInput.value = saveBreakTime;
    }
  });
}

//Export data

function addDeep(minutes) {
  updateDailyDeep(minutes);
  updateAllDeep(minutes);
}

function updateDailyDeep(minutes) {
  const today = new Date().toDateString();

  if (localStorage.getItem("lastDayDeep") !== today) {
    localStorage.setItem("dailyDeepTime", 0);
    localStorage.setItem("lastDayDeep", today);
  }

  const daily = Number(localStorage.getItem("dailyDeepTime") || 0) + minutes;
  localStorage.setItem("dailyDeepTime", daily);
}

function updateAllDeep(minutes) {
  const all = Number(localStorage.getItem("allDeepTime") || 0) + minutes;
  localStorage.setItem("allDeepTime", all);
}

function addBreak(minutes) {
  updateDailyBreak(minutes);
  updateAllBreak(minutes);
}

function updateDailyBreak(minutes) {
  const today = new Date().toDateString();

  if (localStorage.getItem("lastDayBreak") !== today) {
    localStorage.setItem("dailyBreakTime", 0);
    localStorage.setItem("lastDayBreak", today);
  }

  const daily = Number(localStorage.getItem("dailyBreakTime") || 0) + minutes;
  localStorage.setItem("dailyBreakTime", daily);
}

function updateAllBreak(minutes) {
  const all = Number(localStorage.getItem("allBreakTime") || 0) + minutes;
  localStorage.setItem("allBreakTime", all);
}

export const getStats = () => {
  return {
    dailyDeepTime: Number(localStorage.getItem("dailyDeepTime") || 0),
    allDeepTime: Number(localStorage.getItem("allDeepTime") || 0),
    dailyBreakTime: Number(localStorage.getItem("dailyBreakTime") || 0),
    allBreakTime: Number(localStorage.getItem("allBreakTime") || 0),
  };
};
