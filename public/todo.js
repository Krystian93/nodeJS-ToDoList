const todoList = document.querySelector('.todo-list');
const btnAddTodo = document.querySelector('.btn-add-todo');


function deleteTodo() {
    const idOfTodo = this.parentElement.dataset.id;
    const deleteTodo = {
        id: idOfTodo,
    }
    //post new todo to the server
    //'https://pure-node-todo.herokuapp.com/delete-todo'
    fetch('http://localhost:3000/delete-todo', {
        method: 'POST',
        'Content-Type': 'application/json',

        body: JSON.stringify(deleteTodo),
    })
    renderTodos();
}

function addListener(event, callback, arr) {
    arr.forEach(el => {
        el.addEventListener(event, callback);
    })
}

function getAllDeleteBtns() {
    const deleteBtns = [...document.querySelectorAll('.btn-delete-todo')];
    return deleteBtns;
}

function initDeleteBtn() {
    const todos = getAllDeleteBtns();
    addListener('click', deleteTodo, todos);
}

//returning promise
function getAllTodos() {
    const todos = fetch('http://localhost:3000/get-todos')
        .then(response => response.json());
    return todos;
}

function getInputValue() {
    const inputTodo = document.querySelector('.input-todo').value;
    return inputTodo;
}

function addTodo() {

    let value = getInputValue()
    if (value === "") return
    else {

        const newToDo = {
            title: value,
        }
        //post new todo to the server
        fetch('http://localhost:3000/add-todo', {
            method: 'POST',
            'Content-Type': 'application/json',

            body: JSON.stringify(newToDo),
        })

        document.querySelector('.input-todo').value = "";
        document.querySelector('.input-todo').focus();
        renderTodos();
    }
}

function createLiElement(el) {
    return `<li data-id="${el._id}" class="todo-item">${el.title}<span class="btn-delete-todo">&#10007;</span></li>`
}

//remove all child nodes to generate new pack of todos
function removeAllChildNodes(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

function renderTodos() {
    removeAllChildNodes(todoList);
    const todos = getAllTodos();
    todos.then(todos => {
        todos.map(todo => {
            todoList.insertAdjacentHTML('beforeend', createLiElement(todo));
        });
        initDeleteBtn();
    })
}
renderTodos();




btnAddTodo.addEventListener('click', addTodo);