
const todoList = [];

const todoListElement = document.querySelector("#myUL");

document.querySelector("#add_button").addEventListener("click", addTodo);
document.querySelector("#myInput").addEventListener("keydown", function(e) {
  if (e.keyCode == 13) {
    addTodo()
  }
});

/* Getting values from input to array of Objects*/
function addTodo() {
  const todoText = document.querySelector("#myInput").value;

  if (todoText == "") {
    alert("You did not enter any item");
  } else {
    const todoObject = {
      id: todoList.length,
      todoText: todoText,
      isDone: false,
    };

 /* Adding the new element to the beginning of the array using unshift.*/
 /*So that the new item shows up on top*/
    todoList.unshift(todoObject);
    displayTodos();
  }
}

/* Changing the isDone value to true when the the element is clicked*/
/*Or to false it when it is true before*/
function doneTodo(todoId) {
  const selectedTodoIndex = todoList.findIndex((item) => item.id == todoId);

  todoList[selectedTodoIndex].isDone
    ? (todoList[selectedTodoIndex].isDone = false)
    : (todoList[selectedTodoIndex].isDone = true);
  displayTodos();
}

/*Delete an item from the list*/
function deleteItem(x) {
  todoList.splice(
    todoList.findIndex((item) => item.id == x),
    1
  );
  displayTodos();
}

/*Displaying the entered Items on the screen*/
function displayTodos() {
  todoListElement.innerHTML = "";
  document.querySelector("#myInput").value = "";

  todoList.forEach((item) => {
    const listElement = document.createElement("li");
    const delBtn = document.createElement("i");

    listElement.innerHTML = item.todoText;
    listElement.setAttribute("data-id", item.id);

    delBtn.setAttribute("data-id", item.id);
    delBtn.classList.add("far");
    delBtn.classList.add("fa-trash-alt");
    delBtn.setAttribute("data-id", item.id);

    if (item.isDone) {
      listElement.classList.add("checked");
    }

    listElement.addEventListener("click", function (e) {
      const selectedId = e.target.getAttribute("data-id");
      doneTodo(selectedId);
    });

    delBtn.addEventListener("click", function (e) {
      const delId = e.target.getAttribute("data-id");
      deleteItem(delId);
    });

    todoListElement.appendChild(listElement);
    listElement.appendChild(delBtn);
  });
}
