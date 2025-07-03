const todoForm = document.getElementById("todo-form");
const todoInput = document.querySelector(".todo-input");
const todoAdd = document.getElementById("todo-add");
const addIcon = document.getElementById("add-icon");
const todoUl = document.getElementById("todo-ul");

let todos = getTodo()
    updatetodo();

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (todoInput.value.trim().length > 0) {
        addIcon.classList.add("active");
        setTimeout(() => {
            addIcon.classList.remove('active');
        }, 3000);
        addTodo();
    } else {
        const message = document.getElementById('message');
        message.textContent = `Please write something before procceding`;
        setTimeout(() => {
            message.textContent = '';
        }, 4000);
        return
    }
})

function addTodo() {
   const todoValue = todoInput.value.trim();
    if (todoValue.length > 0) {
        const todoObject = {
            text: todoValue,
            completed: false
        };
    todoInput.value = '';
        todos.unshift(todoObject);
        updatetodo();
        saveTodo();
    }
}
function updatetodo () {
    todoUl.innerHTML= '';
    todos.forEach((todo, todoindex) => {
    createItem = createtodo(todo, todoindex);
    todoUl.append(createItem);
    })
}
function createtodo(todo, todoindex) {
    const todoPlace = document.createElement("li");
    const todoId = "check-"+ todoindex;
    const todoValue = todo.text;
    todoPlace.classList = "todo";
    todoPlace.innerHTML = `
    <input type="checkbox" id="${todoId}">
            <label class="custom-checkbox" for="${todoId}"><svg xmlns="http://www.w3.org/2000/svg" class="tick" height="30px" viewBox="0 -960 960 960" width="30px" fill="transparent"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></label>
            <label for="${todoId}" class="todo-text">${todoValue}</label>
            <button type="button" class="todo-delete"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
    `
    const deleteBtn = todoPlace.querySelector(".todo-delete");
    deleteBtn.addEventListener('click', () => {
        deleteTodo(todoindex);
    })
    const checkbox = todoPlace.querySelector('input');
    checkbox.addEventListener('change', () => {
        todos[todoindex].completed = checkbox.checked;
        saveTodo();
    })
    checkbox.checked = todo.completed;
    return todoPlace;
}
function deleteTodo(todoindex) {    
    todos = todos.filter((_, i) => i !== todoindex);
    saveTodo();
    updatetodo();
}
function saveTodo() {
    const todoJSON = JSON.stringify(todos);
    localStorage.setItem("todos", todoJSON);
};
function getTodo() {
    const getTodos = localStorage.getItem("todos") || "[]";
    return JSON.parse(getTodos);
}