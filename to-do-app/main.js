const input = document.querySelector("input");
const addButton = document.querySelector("button");
const list = document.querySelector("section");
const placeholder = document.querySelector("p");

addButton.onclick = () => {
  input.focus();
  if (input.value == '')
    return;
  placeholder.style.visibility = 'hidden';
  const task = input.value;
  input.value = "";
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

  listItem.classList.add("input-group", "mb-3")
  checkboxWrapper.classList.add("input-group-text")
  itemValue.value = task;
  itemValue.classList.add("form-control")
  checkbox.type = "checkbox";
  checkbox.classList.add("form-check-input", "mt-0")
  checkbox.onchange = () => {
    console.log("checkbox changed");
    itemValue.style.textDecoration = checkbox.checked ? "line-through" : "none";
  }
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("btn", "btn-outline-danger")
  deleteButton.onclick = () => {
    list.removeChild(listItem);
    if (list.children.length == 0) {
      placeholder.style.visibility = 'visible';
    }
  }
}