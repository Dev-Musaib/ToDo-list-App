// Define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Event Handler
form.addEventListener('submit', addTask);
document.addEventListener('DOMContentLoaded', getTaskFromLocalStorage);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTasks);
filter.addEventListener('keyup', filterTasks);

// Add Task
function addTask(e) {
  e.preventDefault();

  const li = document.createElement('li');
  const link = document.createElement('a');

  li.className = 'collection-item';
  link.className = 'delete-item secondary-content'

  link.innerHTML = '<i class= "fa fa-remove"></i>';

  li.appendChild(document.createTextNode(taskInput.value));
  li.appendChild(link);

  taskList.appendChild(li);
  addTaskToLocalStorage(taskInput.value);
}

// Add Task to LS
function addTaskToLocalStorage(taskInput) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(taskInput);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get Task from LS
function getTaskFromLocalStorage() {

  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    const link = document.createElement('a');

    li.className = 'collection-item';
    link.className = 'delete-item secondary-content'

    link.innerHTML = '<i class= "fa fa-remove"></i>';

    li.appendChild(document.createTextNode(task));
    li.appendChild(link);

    taskList.appendChild(li);
  })
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    const li = e.target.parentElement.parentElement;
    taskList.removeChild(li);

    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

// Remove Task from LS
function removeTaskFromLocalStorage(taskValue) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if (task === taskValue.textContent) {
      tasks.splice(index, 1);
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks(e) {
  const lis = document.querySelectorAll('.collection-item');

  if (taskList.children.length < 1) {
    alert('Nothing to clear!')
  } else {
    if (confirm('Are you sure?')) {
      for (task of lis) {
        taskList.removeChild(task);
      }
      clearTasksFromLocalStorage();
    }
  }
}

// Clear Tasks from LS
function clearTasksFromLocalStorage(e) {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const filterInput = e.target.value.toLowerCase();
  const lis = document.querySelectorAll('.collection-item');

  lis.forEach(task => {
    if (task.textContent.toLowerCase().indexOf(filterInput) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })

}