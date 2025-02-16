const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const selectedLevel = document.querySelector("#level");
const selectedDate = document.querySelector("#date");

filterOption.value = "all";
document.addEventListener("DOMContentLoaded", generateTodoList());
// todoList.addEventListener("click", deleteCheck);
// filterOption.addEventListener("change", filterTodo);

function getLocalTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}

function saveLocalTodos(todo) {
  let todos = getLocalTodos();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function replaceLocalTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function storeTodo(event) {
  event.preventDefault();
  const textInput = todoInput.value;
  const dateInput = selectedDate.value;
  const levelInput = selectedLevel.value;

  const todo = {
    textInput,
    dateInput,
    levelInput,
    status: false,
  };

  saveLocalTodos(todo);
  generateTodoList();
  todoInput.value = "";
}

function filterTodo(todos, filter) {
  const newList = todos.filter((todo) => {
    const accepted =
      filter === "all" ||
      (filter === "completed" && todo.status) ||
      (filter === "incomplete" && !todo.status);
    if (accepted) return todo;
  });
  return newList;
}

function toggleTodoStatus(className) {
  const index = Number(className.replace("index-", ""));
  const storedTodoList = getLocalTodos();
  storedTodoList[index].status = !storedTodoList[index].status;
  replaceLocalTodos(storedTodoList);
  generateTodoList(filterOption.value);
}

function deleteTodo(className) {
  const index = Number(className.replace("index-", ""));
  let storedTodoList = getLocalTodos();
  storedTodoList = storedTodoList.filter((todo, i) => i !== index);
  replaceLocalTodos(storedTodoList);
  generateTodoList(filterOption.value);
}

function generateTodoList(filter = "all") {
  filterOption.value = filter;
  // remove all list
  while (todoList.hasChildNodes()) {
    todoList.removeChild(todoList.firstElementChild);
  }

  let storedTodoList = getLocalTodos();
  storedTodoList = filterTodo(storedTodoList, filter);
  console.log(filter)
  storedTodoList.forEach((todo, i) => {
    const identifier = `index-${i}`;
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.classList.add(identifier);
    if (todo.status) todoDiv.classList.add("completed");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo.textInput;
    newTodo.classList.add("todo-item");

    const dateTodo = document.createElement("p");
    dateTodo.innerText = todo.dateInput;
    dateTodo.classList.add("todo-date");

    const levelTodo = document.createElement("p");
    levelTodo.innerText = todo.levelInput;
    levelTodo.classList.add("todo-level");

    const parent = document.createElement('div')

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    completedButton.classList.add("complete-btn");
    completedButton.onclick = function () {
      toggleTodoStatus(identifier);
    };

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    trashButton.onclick = function () {
      deleteTodo(identifier);
    };

    parent.appendChild(completedButton)
    parent.appendChild(trashButton)
    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(dateTodo);
    todoDiv.appendChild(levelTodo);
    todoDiv.appendChild(parent)
    // todoDiv.appendChild(completedButton);
    // todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
  });
}

function deleteAllTodo(event) {
  event.preventDefault();
  localStorage.clear();
  generateTodoList();
}

// function addTodo(event) {
//   event.preventDefault();
//   const todoDiv = document.createElement("div");
//   todoDiv.classList.add("todo");
//   const newTodo = document.createElement("li");
//   newTodo.innerText = todoInput.value;
//   newTodo.classList.add("todo-item");
//   todoDiv.appendChild(newTodo);
//   //ADDING TO LOCAL STORAGE
//   saveLocalTodos(todoInput.value);

//   const completedButton = document.createElement("button");
//   completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
//   completedButton.classList.add("complete-btn");
//   todoDiv.appendChild(completedButton);

//   const trashButton = document.createElement("button");
//   trashButton.innerHTML = '<i class="fas fa-trash"></li>';
//   trashButton.classList.add("trash-btn");
//   todoDiv.appendChild(trashButton);

//   todoList.appendChild(todoDiv);
//   todoInput.value = "";
// }

// function deleteCheck(e) {
//   const item = e.target;

//   if (item.classList[0] === "trash-btn") {
//     const todo = item.parentElement;
//     todo.classList.add("slide");

//     removeLocalTodos(todo);
//     todo.addEventListener("transitionend", function () {
//       todo.remove();
//     });
//   }

//   if (item.classList[0] === "complete-btn") {
//     const todo = item.parentElement;
//     todo.classList.toggle("completed");
//   }
// }

// function filterTodo(e) {
//   const todos = todoList.childNodes;
//   todos.forEach(function (todo) {
//     switch (e.target.value) {
//       case "all":
//         todo.style.display = "flex";
//         break;
//       case "completed":
//         if (todo.classList.contains("completed")) {
//           todo.style.display = "flex";
//         } else {
//           todo.style.display = "none";
//         }
//         break;
//       case "incomplete":
//         if (!todo.classList.contains("completed")) {
//           todo.style.display = "flex";
//         } else {
//           todo.style.display = "none";
//         }
//         break;
//     }
//   });
// }

// function getLocalTodos() {
//   let todos;
//   if (localStorage.getItem("todos") === null) {
//     todos = [];
//   } else {
//     todos = JSON.parse(localStorage.getItem("todos"));
//   }
//   todos.forEach(function (todo) {
//     const todoDiv = document.createElement("div");
//     todoDiv.classList.add("todo");
//     const newTodo = document.createElement("li");
//     newTodo.innerText = todo;
//     newTodo.classList.add("todo-item");
//     todoDiv.appendChild(newTodo);

//     const completedButton = document.createElement("button");
//     completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
//     completedButton.classList.add("complete-btn");
//     todoDiv.appendChild(completedButton);

//     const trashButton = document.createElement("button");
//     trashButton.innerHTML = '<i class="fas fa-trash"></li>';
//     trashButton.classList.add("trash-btn");
//     todoDiv.appendChild(trashButton);

//     todoList.appendChild(todoDiv);
//   });
// }

// function removeLocalTodos(todo) {
//   let todos;
//   if (localStorage.getItem("todos") === null) {
//     todos = [];
//   } else {
//     todos = JSON.parse(localStorage.getItem("todos"));
//   }

//   const todoIndex = todo.children[0].innerText;
//   todos.splice(todos.indexOf(todoIndex), 1);
//   localStorage.setItem("todos", JSON.stringify(todos));
// }

// delete all
// const deleteHome = document.querySelector();
// deleteHome.setAttribute("id", "delete-btn");
// deleteHome.innerText = "delete listing";
// deleteHome.addEventListener("click", function (event) {
//   console.log("test222 home id ", homeDiv.id);

//   if (event.target.id === "delete-btn") {
//     fetch(`http://localhost:3000/homes/${home.id}`, {
//       method: "DELETE",
//       headers: {
//         "content-type": "application/json",
//         accept: "application/json",
//       },
//     })
//       .then((resp) => resp.json())
//       .then(() => {
//         homeDiv.innerHTML = "";
//         const home = homeDiv.querySelector(`[data-id='${homeDiv.id}']`);
//         home.remove();
//       });
//   }
// });

