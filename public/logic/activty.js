import { getStats } from "./timer.js";

import { getTaskStats } from "./task.js";
console.log(getStats());

document.addEventListener("DOMContentLoaded", () => {
  const dailyDeep = document.querySelector(".dailyDeep");
  const dailyBreak = document.querySelector(".dailyBreak");
  const allDeep = document.querySelector(".allDeep");
  const allBreak = document.querySelector(".allBreak");
  const dailyTask = document.querySelector(".dailyTask");
  const allTask = document.querySelector(".allTask");

  if (dailyDeep && dailyBreak && allDeep && allBreak) {
    const data = getStats();

    function formatTime(minutes) {
      const hrs = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return hrs === 0 ? `${mins}m` : `${hrs}h ${mins}m`;
    }

    dailyDeep.textContent = formatTime(data.dailyDeepTime);
    dailyBreak.textContent = formatTime(data.dailyBreakTime);
    allDeep.textContent = formatTime(data.allDeepTime);
    allBreak.textContent = formatTime(data.allBreakTime);
  }

  if (dailyTask && allTask) {
    const tasks = getTaskStats();
    dailyTask.textContent = tasks.dailyTasksCount;
    allTask.textContent = tasks.allTasksCount;
  }

  const menuBtn = document.querySelector(".menu");

  const menu = document.querySelector(".nav-content");

  if (menu) {
    function toggleMenu() {
      menu.classList.toggle("nav-content-toggle");
    }

    menuBtn.addEventListener("click", toggleMenu);
  }
});
