let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {

    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    input.value = "";

    saveTasks();
    displayTasks();
}

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();
    displayTasks();
}

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    displayTasks();
}

function filterTasks(filter) {

    currentFilter = filter;
    displayTasks();
}

function displayTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <div class="task-left">
                <input 
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${task.id})"
                >

                <span>${task.text}</span>
            </div>

            <button 
                class="delete-btn"
                onclick="deleteTask(${task.id})"
            >
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });

    updateStats();
}

function updateStats() {

    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const pending = total - completed;

    document.getElementById("totalTasks").textContent = total;

    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("pendingTasks").textContent = pending;
}

document.getElementById("taskInput").addEventListener(
    "keypress",
    function(event) {

        if (event.key === "Enter") {
            addTask();
        }

    }
);

displayTasks();