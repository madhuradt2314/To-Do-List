const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${task}
            <button class="editButton" data-index="${index}">Edit</button>
            <button class="deleteButton" data-index="${index}">Delete</button>
        `;
        taskList.appendChild(listItem);
    });
}

addButton.addEventListener("click", () => {
    const newTask = taskInput.value;
    if (newTask.trim() !== "") {
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        renderTasks();
    }
});

taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("editButton")) {
        const index = event.target.getAttribute("data-index");
        const editedTask = prompt("Edit the task:", tasks[index]);
        if (editedTask !== null) {
            tasks[index] = editedTask;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }
    }
    if (event.target.classList.contains("deleteButton")) {
        const index = event.target.getAttribute("data-index");
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }
});

renderTasks();
