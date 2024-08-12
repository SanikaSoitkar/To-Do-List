document.addEventListener('DOMContentLoaded', loadTasks);
document.querySelector('#task-form').addEventListener('submit', addTask);
document.querySelector('#task-list').addEventListener('click', removeOrCompleteTask);

function addTask(e) {
    e.preventDefault();
    const taskInput = document.querySelector('#task-input');
    if (taskInput.value.trim() === '') return;

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(taskInput.value));

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(deleteBtn);

    document.querySelector('#task-list').appendChild(li);

    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = '';
}

function removeOrCompleteTask(e) {
    if (e.target.classList.contains('delete-btn')) {
        if (confirm('Are you sure you want to delete this task?')) {
            const li = e.target.parentElement;
            li.remove();
            removeTaskFromLocalStorage(li);
        }
    } else {
        e.target.classList.toggle('completed');
        toggleTaskInLocalStorage(e.target.textContent);
    }
}

function storeTaskInLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push({ text: task, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(task.text));
        if (task.completed) li.classList.add('completed');

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.appendChild(document.createTextNode('Delete'));
        li.appendChild(deleteBtn);

        document.querySelector('#task-list').appendChild(li);
    });
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.text !== taskItem.firstChild.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleTaskInLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
