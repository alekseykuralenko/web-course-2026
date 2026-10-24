// Массив, в котором хранятся все задачи
let tasks = [];

// Следующий уникальный идентификатор
let nextId = 1;

// Текущий фильтр
let currentFilter = "all";

// Находим элементы страницы
const todoForm = document.querySelector("#todo-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const taskCount = document.querySelector("#task-count");
const emptyState = document.querySelector("#empty-state");
const inputMessage = document.querySelector("#input-message");
const filterButtons = document.querySelectorAll(".filter-button");

// Добавление задачи
todoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = taskInput.value.trim();

    // Не добавляем пустую задачу
    if (text === "") {
        inputMessage.textContent = "Сначала напиши задачу.";
        taskInput.focus();
        return;
    }

    // Создаём новый объект задачи
    const newTask = {
        id: nextId,
        text: text,
        completed: false
    };

    nextId++;

    // Добавляем задачу в массив
    tasks.push(newTask);

    // Очищаем поле и сообщение
    taskInput.value = "";
    inputMessage.textContent = "";

    // Обновляем список на экране
    render();

    taskInput.focus();
});

// Убираем предупреждение, когда пользователь начинает вводить текст
taskInput.addEventListener("input", function () {
    inputMessage.textContent = "";
});

// Переключение фильтров
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        currentFilter = button.dataset.filter;

        // Обновляем внешний вид выбранного фильтра
        filterButtons.forEach(function (filterButton) {
            const isActive =
                filterButton.dataset.filter === currentFilter;

            filterButton.classList.toggle("active", isActive);
            filterButton.setAttribute("aria-pressed", String(isActive));
        });

        render();
    });
});

// Отрисовка списка задач
function render() {
    // Считаем активные и завершённые задачи
    const remaining = tasks.filter(function (task) {
        return !task.completed;
    }).length;

    const completed = tasks.filter(function (task) {
        return task.completed;
    }).length;

    taskCount.textContent =
        `Осталось: ${remaining}, Выполнено: ${completed}`;

    // Выбираем задачи для текущего фильтра
    const visibleTasks = tasks.filter(function (task) {
        if (currentFilter === "active") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    // Очищаем старую отрисовку
    taskList.replaceChildren();

    // Создаём HTML-элементы для каждой видимой задачи
    const taskElements = visibleTasks.map(function (task) {
        const item = document.createElement("li");
        item.classList.add("task-item");

        if (task.completed) {
            item.classList.add("completed");
        }

        // Чекбокс выполнения
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");
        checkbox.checked = task.completed;
        checkbox.setAttribute(
            "aria-label",
            `Отметить задачу «${task.text}» выполненной`
        );

        checkbox.addEventListener("change", function () {
            const selectedTask = tasks.find(function (item) {
                return item.id === task.id;
            });

            if (selectedTask) {
                selectedTask.completed = checkbox.checked;
                render();
            }
        });

        // Текст задачи
        const taskText = document.createElement("span");
        taskText.classList.add("task-text");
        taskText.textContent = task.text;

        // Кнопка удаления
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Удалить";
        deleteButton.setAttribute(
            "aria-label",
            `Удалить задачу «${task.text}»`
        );

        deleteButton.addEventListener("click", function () {
            tasks = tasks.filter(function (item) {
                return item.id !== task.id;
            });

            render();
        });

        // Собираем элемент задачи
        item.append(checkbox, taskText, deleteButton);

        return item;
    });

    // Добавляем созданные элементы на страницу
    taskElements.forEach(function (element) {
        taskList.append(element);
    });

    // Показываем сообщение, если список пуст
    if (tasks.length === 0) {
        emptyState.textContent =
            "Здесь пока тихо. Добавь свою первую задачу";
        emptyState.hidden = false;
    } else if (visibleTasks.length === 0) {
        emptyState.textContent =
            "В этом разделе пока нет задач.";
        emptyState.hidden = false;
    } else {
        emptyState.hidden = true;
    }
}

// Первоначальная отрисовка
render();