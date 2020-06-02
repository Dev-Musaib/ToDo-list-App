// Class Task
class Task {
  constructor(taskName, taskDate, id) {
    this.taskName = taskName;
    this.taskDate = taskDate;
    this.id = id;
  }
}

// Data Structure
let data = {
  items: [],
};

// Class UI
class UI {
  // Clear Alert
  clearAlert() {
    const alert = document.querySelector(".alert");

    if (alert) {
      alert.remove();
    }
  }

  // Show Alert
  showAlert(message, className) {
    // Clear Alert to prevent multiple alerts
    this.clearAlert();
    // Create New Div
    const errorDiv = document.createElement("div");
    // Add Class Name
    errorDiv.className = `alert ${className}`;
    // Append Text Node
    errorDiv.appendChild(document.createTextNode(message));

    // Grab the Containers
    const container = document.querySelector(".container");
    const containerChild = document.querySelector("#heading");

    // Insert the Div
    container.insertBefore(errorDiv, containerChild);

    // Set Timeout
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2000);
  }

  // Add Task to List
  addTaskToList(task, taskList, id) {
    // Create New li
    const li = document.createElement("li");
    // Add Class Name
    li.className = "task-list-item";
    // Add ID
    li.id = `${task.id}`;
    // Append Inner HTML
    li.innerHTML = `
    <h1 id="output-title">${task.taskName}</h1>
    <i class="fa fa-trash"></i>
    <p id="output-para">${task.taskDate.toDateString()}</p>
  `;
    // Append to the list
    taskList.appendChild(li);
  }

  // Clear Input Fields
  clearFields(taskInput) {
    taskInput.value = "";
  }

  // Delete Task From List
  deleteTaskFromList(target) {
    // Get List Items
    const tasks = document.querySelectorAll(".task-list-item");

    tasks.forEach((task, index) => {
      if (task.id === target.parentElement.id) {
        // Remove item from UI and Data Structure
        target.parentElement.remove();
        data.items.splice(index, 1);
      }
    });
  }

  // Clear Tasks From List
  clearTasksFromList() {
    // Get List Items
    const tasks = document.querySelectorAll(".task-list-item");
    // Check for tasks
    if (tasks.length < 1) {
      this.showAlert("Nothing to clear!", "alert-danger");
    } else {
      // Confirmation
      if (confirm("Are You Sure?")) {
        // Loop Over each item and remove it
        tasks.forEach((task) => {
          task.remove();
        });

        data.items.splice(0);
      }
    }

    console.log(data.items);
  }

  // Filter Tasks in the List
  filterTasks(target) {
    // Private Variables
    let text = target.toLowerCase();

    // Get List Items
    const tasks = document.querySelectorAll(".task-list-item");

    // Check for tasks
    if (tasks.length < 1) {
      this.showAlert("Nothing to Filter!", "alert-danger");
    } else {
      tasks.forEach((task) => {
        if (task.textContent.toLowerCase().indexOf(text) !== -1) {
          task.style.display = "block";
        } else {
          task.style.display = "none";
        }
      });
    }
  }
}

// Class Local Storage
class Store {
  static getTaskFromLS() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    return tasks;
  }

  static addTaskToLS(task) {
    // Get Tasks From LS
    const tasks = Store.getTaskFromLS();
    // Push to tasks
    tasks.push(task);
    // Set Local Storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  static displayTasksFromLS() {
    // Get Tasks From LS
    const tasks = Store.getTaskFromLS();

    // Loop over each Task
    tasks.forEach((task) => {
      task.taskDate = new Date(task.taskDate);

      // Create New li
      const li = document.createElement("li");
      // Add Class Name
      li.className = "task-list-item";
      // Add ID
      li.id = task.id;
      // Append Inner HTML
      li.innerHTML = `
      <h1 id="output-title">${task.taskName}</h1>
      <i class="fa fa-trash"></i>
      <p id="output-para">${task.taskDate.toDateString()}</p>`;

      // Append to the list
      document.querySelector("#task-list").appendChild(li);
    });
  }

  static deleteTaskFromLS(target) {
    // Get Tasks From LS
    const tasks = Store.getTaskFromLS();

    // Loop over and remove the selected one
    tasks.forEach((task, index) => {
      if (task.id == target.parentElement.id) {
        tasks.splice(index, 1);
      }
    });

    // Set The Local Storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  static clearTasksFromLS() {
    localStorage.clear();
  }
}

// Class Main
class Main {
  static init() {
    // UI Variables
    const taskInput = document.getElementById("task");
    const addTaskBtn = document.getElementById("add-task-btn");
    const clearTasksBtn = document.getElementById("clear-tasks-btn");
    const filterInput = document.getElementById("task-list-filter");
    const taskList = document.getElementById("task-list");

    // Local Variable
    let ID;

    // Instantiate UI
    const ui = new UI();

    // DOM Loaded Event
    document.addEventListener("DOMContentLoaded", Store.displayTasksFromLS);

    // Click Event
    addTaskBtn.addEventListener("click", () => {
      // Validation
      if (taskInput.value === "") {
        ui.showAlert("Please add a task!", "alert-danger");
      } else {
        // New Date
        const now = new Date();

        // Create ID
        if (data.items.length > 0) {
          ID = data.items[data.items.length - 1].id + 1;
        } else {
          ID = 0;
        }

        // Instantiate Task
        const task = new Task(taskInput.value, now, ID);

        // Push to the date structure
        data.items.push(task);

        // Add Task To List & LS
        ui.addTaskToList(task, taskList);
        Store.addTaskToLS(task);
        // Clear Input
        ui.clearFields(taskInput);
      }
    });

    // Delete Event
    taskList.addEventListener("click", function (e) {
      ui.deleteTaskFromList(e.target);
      Store.deleteTaskFromLS(e.target);
    });

    // Clear Event
    clearTasksBtn.addEventListener("click", () => {
      ui.clearTasksFromList();
      Store.clearTasksFromLS();
    });

    // Filter Event
    filterInput.addEventListener("keyup", (e) => {
      ui.filterTasks(e.target.value);
    });
  }
}

Main.init();
