const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoListUncomplete = document.querySelector(".toDoList__toDo__list");

const TODO_VALUE = "toDos";
let toDos = [];

function countToDo() {
  const li = toDoListUncomplete.querySelectorAll("li");
  const countToDo = document.querySelector(".js-countToDo");
  const liCount = li.length;
  if (liCount === 0) {
    countToDo.innerText = "Nothing to do!!";
  } else {
    countToDo.innerText = `${liCount}`;
  }
}

function removeToDo(event) {
  const target = event.target;
  const li = target.parentNode;
  toDoListUncomplete.removeChild(li);

  const cleanToDos = toDos.filter((toDo) => {
    return toDo.index !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDo();
  countToDo();
}

function saveToDo() {
  localStorage.setItem(TODO_VALUE, JSON.stringify(toDos));
}

function paintToDoInitial(currentToDo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const buttonExit = document.createElement("button");
  const index = Date.now();
  newToDo = {
    index: index,
    key: currentToDo,
  };
  span.innerText = `${currentToDo}`;
  buttonExit.innerText = "❌";
  li.appendChild(span);
  li.appendChild(buttonExit);
  li.id = index;
  toDoListUncomplete.appendChild(li);
  toDos.push(newToDo);
  // console.log(toDos);
  saveToDo();
  button.addEventListener("click", removeToDo);
}

function paintToDoSaved(key, index) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  newToDo = {
    index,
    key,
  };
  span.innerText = `${key}`;
  button.innerText = "❌";
  li.appendChild(span);
  li.appendChild(button);
  li.id = index;
  toDoListUncomplete.appendChild(li);
  toDos.push(newToDo);
  // console.log(toDos);
  saveToDo();
  button.addEventListener("click", removeToDo);
}

function loadToDo() {
  const currentToDo = localStorage.getItem(TODO_VALUE);
  const parsedToDo = JSON.parse(currentToDo);
  // console.log(parsedToDo);
  if (currentToDo !== null) {
    parsedToDo.forEach((toDos) => {
      paintToDoSaved(toDos.key, toDos.index);
    });
  }
}

function init() {
  loadToDo();
  toDoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const toDoValue = toDoInput.value;
    // console.log(toDoValue);
    toDoInput.value = "";
    paintToDoInitial(toDoValue);
    countToDo();
  });
  countToDo();
}

init();
