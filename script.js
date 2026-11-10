
/* ==================================
   STUDYFLOW: TASK MANAGER
================================== */

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("studyflow-tasks")) || [];

function saveTasks() {
    localStorage.setItem("studyflow-tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.replaceChildren();

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        const taskText = document.createElement("span");
        const completeButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        taskText.textContent = task.text;

        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.type = "button";

        deleteButton.textContent = "Delete";
        deleteButton.type = "button";
        deleteButton.className = "delete-button";

        if (task.completed) {
            listItem.classList.add("completed");
        }

        completeButton.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;

            saveTasks();
            renderTasks();
        });

        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);

            saveTasks();
            renderTasks();
        });

        listItem.append(taskText, completeButton, deleteButton);
        taskList.appendChild(listItem);
    });

    updateDashboardStats();
}

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
});


/* ==================================
   STUDYFLOW: CODING SKILLS TRACKER
================================== */

const skillForm = document.getElementById("skill-form");
const skillInput = document.getElementById("skill-input");
const skillList = document.getElementById("skill-list");

let skills = JSON.parse(localStorage.getItem("studyflow-skills")) || [];

function saveSkills() {
    localStorage.setItem("studyflow-skills", JSON.stringify(skills));
}

function renderSkills() {
    skillList.replaceChildren();

    skills.forEach((skill, index) => {
        const container = document.createElement("div");
        const label = document.createElement("label");
        const progress = document.createElement("input");
        const percentage = document.createElement("p");

        container.className = "skill-item";

        label.textContent = skill.name;

        progress.type = "range";
        progress.min = 0;
        progress.max = 100;
        progress.value = skill.progress;

        percentage.textContent = `${skill.progress}% completed`;

        progress.addEventListener("input", () => {
            skills[index].progress = Number(progress.value);

            percentage.textContent = `${progress.value}% completed`;

            saveSkills();
        });

        container.append(label, progress, percentage);
        skillList.appendChild(container);
    });

    updateDashboardStats();
}

skillForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = skillInput.value.trim();

    if (name === "") {
        return;
    }

    skills.push({
        name: name,
        progress: 0
    });

    saveSkills();
    renderSkills();

    skillInput.value = "";
});


/* ==================================
   STUDYFLOW: STUDY TIMER
================================== */

const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start-timer");
const pauseButton = document.getElementById("pause-timer");
const resetButton = document.getElementById("reset-timer");
const sessionCount = document.getElementById("session-count");

const FOCUS_DURATION = 25 * 60;

let timeLeft = FOCUS_DURATION;
let timerInterval = null;

let completedSessions = Number(
    localStorage.getItem("studyflow-sessions")
) || 0;

function displayTime() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateSessionCount() {
    sessionCount.textContent = completedSessions;
}

function startTimer() {
    if (timerInterval !== null) {
        return;
    }

    timerInterval = setInterval(() => {
        timeLeft--;
        displayTime();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;

            completedSessions++;

            localStorage.setItem(
                "studyflow-sessions",
                completedSessions
            );

            updateSessionCount();
            updateDashboardStats();

            alert("Focus session completed! Great work!");
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    pauseTimer();

    timeLeft = FOCUS_DURATION;
    displayTime();
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

displayTime();
updateSessionCount();


/* ==================================
   STUDYFLOW: DASHBOARD STATISTICS
================================== */

function updateDashboardStats() {
    const savedTasks = JSON.parse(
        localStorage.getItem("studyflow-tasks")
    ) || [];

    const savedSkills = JSON.parse(
        localStorage.getItem("studyflow-skills")
    ) || [];

    const savedSessions = Number(
        localStorage.getItem("studyflow-sessions")
    ) || 0;

    document.getElementById("total-tasks").textContent =
        savedTasks.length;

    const completedTasks = savedTasks.filter(
        task => task.completed
    ).length;

    document.getElementById("completed-tasks").textContent =
        completedTasks;

    document.getElementById("total-skills").textContent =
        savedSkills.length;

    document.getElementById("total-sessions").textContent =
        savedSessions;
}


/* ==================================
   INITIAL PAGE SETUP
================================== */

renderTasks();
renderSkills();
updateDashboardStats();
