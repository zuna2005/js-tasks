const input = document.querySelector("input");
const form = document.querySelector("form");
const list = document.querySelector("section");
const placeholder = document.querySelector("p");
// localStorage.clear();
if (localStorage.length == 0) {
  localStorage.setItem("index", 0);
}
else {
  const keys = [];
  for (let i = 1; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!Number.isNaN(key * 1)) {
      keys.push(Number.parseInt(key));
    }
  }
  for (let i of keys.sort()) {
    addListItem(localStorage.getItem(i), i);
  }
}

if (list.children.length == 0) {
  placeholder.textContent = "Nothing to do.";
}

function addListItem (text, index) {
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
  checkbox.checked = JSON.parse(localStorage.getItem(index + " checked"));

  itemValue.value = text;
  itemValue.style.textDecoration = checkbox.checked ? "line-through" : "none";

  deleteButton.textContent = "Delete";

  checkbox.onchange = () => {
    itemValue.style.textDecoration = checkbox.checked ? "line-through" : "none";
    localStorage.setItem(index + " checked", checkbox.checked);
  }

  itemValue.onblur = () => {
    localStorage.setItem(index, itemValue.value);
  }

  itemValue.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      localStorage.setItem(index, itemValue.value);
      itemValue.blur();
    }
  });
  
  deleteButton.onclick = () => {
    list.removeChild(listItem);
    localStorage.removeItem(index);
    localStorage.removeItem(index + "checked");
    if (list.children.length == 0) {
      placeholder.textContent = 'Nothing to do.';
    }
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  input.focus();
  if (input.value == '')
    return;
  const task = input.value;
  input.value = "";

  const index = Number.parseInt(localStorage.getItem("index"));
  localStorage.setItem(index, task);
  localStorage.setItem(index + " checked", "false");
  localStorage.setItem("index", index + 1);
  addListItem(task, index);
});