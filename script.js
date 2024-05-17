document.addEventListener("DOMContentLoaded", () => {
  const todoList = document.querySelector(".todo-list");
  const forms = document.forms;
  const addForm = forms["input-form"];
  console.log(addForm);

  // delete todo
  todoList.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("cross") ||
      e.target.parentElement.classList.contains("cross")
    ) {
      const div = e.target.closest(".todo-item"); // graps todo-item div
      div.parentNode.removeChild(div);
    }
  });

  //   add todo

  // add todo
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = addForm.querySelector('input[type="text"]').value;

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

    // check the value is not empty
    if (value.trim() === "") {
      alert("Please enter a valid todo");
      return;
    }
    todoList.innerHTML += html;
    addForm.reset();
  });

  //   Update todos
});
