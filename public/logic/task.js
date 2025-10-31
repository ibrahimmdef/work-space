const menu = document.querySelector(".nav-content");

const taskInput = document.querySelector("#inputTask");

const addTask = document.querySelector("#addTask");

const taskList = document.querySelector(".task-list");

const menuBtn = document.querySelector(".menu");

if (menu) {
  function toggleMenu() {
    menu.classList.toggle("nav-content-toggle");
  }

  menuBtn.addEventListener("click", toggleMenu);
}

if (addTask)
  addTask.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text === "") return;

    console.log(taskInput.value);
    addItem(text);
    taskInput.value = "";
  });
if (taskInput)
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask.click();
  });

function addItem(text, completed = false) {
  const li = document.createElement("li");
  li.className = "taskItem";

  const taskDiv = document.createElement("div");

  taskDiv.className = "task";
  taskDiv.textContent = text;
  if (completed) taskDiv.classList.add("completed");

  const btnDiv = document.createElement("div");

  btnDiv.className = "task-btn";

  const remove = document.createElement("span");

  remove.className = "delete";
  remove.innerHTML = `<i class="fa fa-trash"></i>`;

  btnDiv.appendChild(remove);
  li.appendChild(taskDiv);
  li.appendChild(btnDiv);

  remove.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("edit") ||
      e.target.classList.contains("delete") ||
      e.target.closest(".edit") ||
      e.target.closest(".delete")
    )
      return;

    taskDiv.classList.toggle("completed");
    moveCompleted(li);
    saveTasks();
  });

  taskList.appendChild(li);
  moveCompleted(li);

  saveTasks();
}

function moveCompleted(li) {
  const task = li.querySelector(".task");
  if (task.classList.contains("completed")) {
    taskList.appendChild(li);
    li.style.opacity = 0.2;
  } else {
    taskList.prepend(li);
  }
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task-list li").forEach((li) => {
    const text = li.querySelector(".task").textContent;
    const completed = li.querySelector(".task").classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  //Export task

  const today = new Date().toDateString();

  if (localStorage.getItem("lastDayTask") !== today) {
    localStorage.setItem("dailyTasksCount", "0");
    localStorage.setItem("lastDayTask", today);
  }

  const dailyCount =
    Number(localStorage.getItem("dailyTasksCount") || 0) + tasks.length;
  localStorage.setItem("dailyTasksCount", dailyCount);

  const allCount =
    Number(localStorage.getItem("allTasksCount") || 0) + tasks.length;
  localStorage.setItem("allTasksCount", allCount);

  const count = document.querySelectorAll(".task-list li").length;
  const taskCount = document.querySelector(".task-count");
  console.log(count);
  taskCount.textContent = `${count} tasks left`;
}

function loadTasks() {
  const data = JSON.parse(localStorage.getItem("tasks")) || [];
  data.forEach((t) => addItem(t.text, t.completed));
}

window.addEventListener("load", loadTasks);

export const getTaskStats = () => {
  return {
    dailyTasksCount: Number(localStorage.getItem("dailyTasksCount") || 0),
    allTasksCount: Number(localStorage.getItem("allTasksCount") || 0),
  };
};
