const menu = document.querySelector(".nav-content");

const taskInput = document.querySelector("#inputTask");

const addTask = document.querySelector("#addTask");

const taskList = document.querySelector(".task-list");

if (menu) {
  function toggleMenu() {
    menu.classList.toggle("nav-content-toggle");
  }
}

addTask.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return;

  console.log(taskInput.value);
  addItem(text);
  taskInput.value = "";
});

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

  const edit = document.createElement("span");

  edit.className = "edit";
  edit.innerHTML = `<i class="fa fa-pen"></i>`;

  const remove = document.createElement("span");

  remove.className = "delete";
  remove.innerHTML = `<i class="fa fa-trash"></i>`;

  btnDiv.appendChild(edit);
  btnDiv.appendChild(remove);
  li.appendChild(taskDiv);
  li.appendChild(btnDiv);

  taskList.appendChild(li);

  edit.addEventListener("click", () => {
    alert("Edit clicked");
  });

  remove.addEventListener("click", () => {
    li.remove();
  });

  li.addEventListener("click", () => {
    taskDiv.classList.toggle("completed");
    moveCompleted(li);
  });
}
