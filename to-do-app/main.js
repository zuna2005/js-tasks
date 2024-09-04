class Todos {
  todos = [];
  localStorageKey = "todos";

  constructor() {
    this.todos = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
    this.update();
  }

  addTodo(text) {
    this.todos.push({
      id: Math.random().toString(16).slice(2),
      checked: false,
      text,
    });
    this.update();
  }

  deleteTodo(todoId) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
    this.update();
  }

  editTodo(id, data) {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, ...data } : todo
    );
    this.update();
  }

  update() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.todos));

    renderTodos({
      todos: this.todos,
      handleDelete: this.deleteTodo.bind(this),
      handleEdit: this.editTodo.bind(this),
    });
  }
}

const input = document.querySelector("input");
const form = document.querySelector("form");
const list = document.querySelector("section");
const placeholder = document.querySelector("p");

const toDoList = new Todos();

function renderTodos(data) {
  list.textContent = '';
  if (data.todos.length == 0) {
    placeholder.textContent = 'Nothing to do.';
    return;
  }
  data.todos.forEach((item) => addListItem({ 
    todo: item, 
    handleEdit: data.handleEdit, 
    handleDelete: data.handleDelete
  }));
}

function addListItem({todo, handleEdit, handleDelete}) {
  placeholder.textContent = '';

  const listItem = document.createElement("div");
  const checkboxWrapper = document.createElement("div");
  const checkbox = document.createElement("input");
  const itemValue = document.createElement("input");
  const deleteButton = document.createElement("button");

  checkboxWrapper.appendChild(checkbox);
  listItem.appendChild(checkboxWrapper);
  listItem.appendChild(itemValue);
  listItem.appendChild(deleteButton);
  list.appendChild(listItem);

  listItem.classList.add("input-group", "mb-3");
  checkboxWrapper.classList.add("input-group-text");
  checkbox.classList.add("form-check-input", "mt-0");
  itemValue.classList.add("form-control");
  deleteButton.classList.add("btn", "btn-outline-danger");

  checkbox.type = "checkbox";
  checkbox.checked = todo.checked;

  itemValue.value = todo.text;
  itemValue.style.textDecoration = checkbox.checked ? "line-through" : "none";

  deleteButton.textContent = "Delete";

  checkbox.onchange = () => handleEdit(todo.id, {checked: checkbox.checked});

  itemValue.onblur = () => handleEdit(todo.id, {text: itemValue.value});

  itemValue.addEventListener("keydown", (event) => {
    if (event.key === "Enter")
      itemValue.blur();
  });
  
  deleteButton.onclick = () => {
    handleDelete(todo.id);
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  input.focus();
  if (input.value == '')
    return;
  toDoList.addTodo(input.value);
  input.value = "";
});