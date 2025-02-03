// Відображення логіна користувача

document.addEventListener("DOMContentLoaded", () => {
    const userNameElement = document.querySelector(".user-name");
    const username = localStorage.getItem("username");
    
    if (username && userNameElement) {
        userNameElement.textContent = username;
    }
})

// створення нового завдання 

class Task {
    constructor(title, description, dueDate, completed = false) {
      this.id = Date.now();
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.completed = completed;
    }
  
    toggleCompleted() {
      this.completed = !this.completed;
    }
  }
  
  class TaskList {
    constructor() {
      this.tasks = this.loadFromLocalStorage();
      this.renderTasks();
    }
  
    addTask(title, description, dueDate) {
      if (!title.trim() || !description.trim() || !dueDate.trim()) return;
  
      const newTask = new Task(title, description, dueDate);
      this.tasks.push(newTask);
      this.saveToLocalStorage();
      this.renderTasks();
    }
  
    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.saveToLocalStorage();
      this.renderTasks();
    }
  
    toggleTask(id) {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
        task.toggleCompleted();
        this.saveToLocalStorage();
        this.renderTasks();
      }
    }
  
    saveToLocalStorage() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
  
    loadFromLocalStorage() {
      return JSON.parse(localStorage.getItem("tasks")) || [];
    }
  
    renderTasks() {
      const taskContainer = document.querySelector(".task-list");
      if (!taskContainer) return;
  
      taskContainer.innerHTML = ""; // Очищуємо перед оновленням
  
      this.tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task-item");
        if (task.completed) taskElement.classList.add("completed");
  
        taskElement.innerHTML = `
          <input type="text" class="task-title" value="${task.title}" readonly>
          <textarea class="task-description" readonly>${task.description}</textarea>
          <div class="task-actions">
            <span class="task-date">📅 ${task.dueDate}</span>
            <div class="task-footer">
              <button class="choose-list"><span>#</span></button>
              <div class="footer-buttons">
                <button class="toggle" data-id="${task.id}">✔</button>
                <button class="delete" data-id="${task.id}">🗑</button>
              </div>
            </div>
          </div>
        `;
  
        taskContainer.appendChild(taskElement);
      });
  
      document.querySelectorAll(".toggle").forEach(button => {
        button.addEventListener("click", (e) => {
          const id = Number(e.target.dataset.id);
          this.toggleTask(id);
        });
      });
  
      document.querySelectorAll(".delete").forEach(button => {
        button.addEventListener("click", (e) => {
          const id = Number(e.target.dataset.id);
          this.deleteTask(id);
        });
      });
    }
  }
  
  // Ініціалізація списку завдань
  const taskList = new TaskList();
  
  // Додавання нового завдання
  document.getElementById("add-button").addEventListener("click", () => {
    const title = document.querySelector(".task-title").value;
    const description = document.querySelector(".task-description").value;
    const dueDate = prompt("Введіть дату виконання (РРРР-ММ-ДД):");
  
    if (title && description && dueDate) {
      taskList.addTask(title, description, dueDate);
  
      // Очищення інпутів
      document.querySelector(".task-title").value = "#";
      document.querySelector(".task-description").value = "";
    }
  });
  
  // Скидання полів при натисканні "Відмінити"
  document.getElementById("cancel-button").addEventListener("click", () => {
    document.querySelector(".task-title").value = "#";
    document.querySelector(".task-description").value = "";
  });
  