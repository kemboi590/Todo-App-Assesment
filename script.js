document.addEventListener("DOMContentLoaded", () => {
  const todoList = document.querySelector(".todo-list");
  const forms = document.forms;
  const addForm = forms["input-form"];
  const itemsLeft = document.getElementById("items-left");
  const clearCompleted = document.getElementById("clear-completed");

  const updateLocalStorage = () => {
    const todos = Array.from(todoList.children).map(item => ({
      text: item.querySelector("p").textContent,
      completed: item.querySelector("input[type='radio']").checked,
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
    updateItemsLeft();
  };

  const loadTodos = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => {
      const html = `
        <div class="todo-item">
          <div class="check-box">
            <input type="radio" ${todo.completed ? "checked" : ""} />
          </div>
          <p>${todo.text}</p>
          <div class="cross">
            <img src="./images/icon-cross.svg" alt="" class="delete" />
          </div>
        </div>
      `;
      todoList.innerHTML += html;
    });
    updateItemsLeft();
  };

  const updateItemsLeft = () => {
    const count = todoList.querySelectorAll(".todo-item input[type='radio']:not(:checked)").length;
    itemsLeft.textContent = `${count} items left`;
  };

  todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("cross") || e.target.parentElement.classList.contains("cross")) {
      const div = e.target.closest(".todo-item");
      div.parentNode.removeChild(div);
      updateLocalStorage();
    } else if (e.target.type === "radio") {
      updateLocalStorage();
    }
  });

  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = addForm.querySelector('input[type="text"]').value;

    if (value.trim() === "") {
      alert("Please enter a valid todo");
      return;
    }

    const html = `
      <div class="todo-item">
        <div class="check-box">
          <input type="radio" />
        </div>
        <p>${value}</p>
        <div class="cross">
          <img src="./images/icon-cross.svg" alt="" />
        </div>
      </div>
    `;
    todoList.innerHTML += html;
    addForm.reset();
    updateLocalStorage();
  });

  clearCompleted.addEventListener("click", () => {
    const completedItems = todoList.querySelectorAll(".todo-item input[type='radio']:checked");
    completedItems.forEach(item => item.closest(".todo-item").remove());
    updateLocalStorage();
  });

  loadTodos();
});