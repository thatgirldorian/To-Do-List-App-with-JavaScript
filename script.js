//Selectors
const todoTask = document.querySelector('.todo-task');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');




//Event listeners
//this listener will check if the content on page = loaded, if it is, execute the getTodos func
document.addEventListener('DOMContentLoaded', getTodos); 
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteAndComplete);
filterOption.addEventListener('click', filterTask);


//Functions

//this function adds a new todo item
function addTodo(event) {
	//prevent form from submitting
	event.preventDefault();
	//create a to-do div
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');
	//create a new to-do item
	const newTodo = document.createElement('li');
	newTodo.innerText = todoTask.value;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);
	//add todo to local storage
	saveLocalTodos(todoTask.value);
	//complete task button
	const checkButton = document.createElement('button');
	checkButton.innerHTML = '<i class="fas fa-check"></i>';
	checkButton.classList.add('check-button');
	todoDiv.appendChild(checkButton);
	//delete task button
	const deleteButton = document.createElement('button');
	deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
	deleteButton.classList.add('delete-button');
	todoDiv.appendChild(deleteButton);
	//append div and all to the list
	todoList.appendChild(todoDiv);
	//clear todo input value
	todoTask.value = '';
};


//this function will delete a task
function deleteAndComplete(e) {
	const item = e.target;
	//delete a task
	if (item.classList[0] === 'delete-button') {
		const todoParent = item.parentElement;
		//this animation runs when you delete a task
		todoParent.classList.add('fall');
		deleteLocalTodos(todoParent);
		todoParent.addEventListener('transitionend', function() {
			todoParent.remove();
		});
	};

	//check off a task
	if (item.classList[0] === 'check-button') {
		const todoParent = item.parentElement;
		todoParent.classList.toggle('completed');
	}
};

//this function will filter our to-do items
function filterTask(e) {
    const todos = document.querySelectorAll('.todo');
	const todo = todoList.childNodes;
	todos.forEach(function (todo) {
		switch(e.target.value) {
			case 'all':
			todo.style.display = 'flex';
			break;
			case 'completed':
			if (todo.classList.contains('completed')) {
				todo.style.display = 'flex';
			} else {
				todo.style.display = 'none';
			}
				break;
			case 'unfinished':
			if (!todo.classList.contains('completed')) {
				todo.style.display = 'flex';
			} else {
				todo.style.display = 'none';
			}
				break;
		}
	});
};


//this function saves our to-dos to local storage
function saveLocalTodos(todo) {
//check if todos already exist in local storage
	let todos;
		if (localStorage.getItem('todos') === null) {
			todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	//push the todos into the array if the todos exist in local storage
	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
};


//this function shows our saved todo items on the UI
function getTodos() {
//check if todos already exist in local storage
	let todos;
		if (localStorage.getItem('todos') === null) {
			todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	//loop over each todo
	todos.forEach(function(todo) {
		//create a to-do div
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');
	//create a new to-do item
	const newTodo = document.createElement('li');
	//switch the value for what we have in local storage
	newTodo.innerText = todo;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);
	//complete task button
	const checkButton = document.createElement('button');
	checkButton.innerHTML = '<i class="fas fa-check"></i>';
	checkButton.classList.add('check-button');
	todoDiv.appendChild(checkButton);
	//delete task button
	const deleteButton = document.createElement('button');
	deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
	deleteButton.classList.add('delete-button');
	todoDiv.appendChild(deleteButton);
	//append div and all to the list
	todoList.appendChild(todoDiv);
	});
};


//this function will delete todo items saved in local storage
function deleteLocalTodos(todo) {
	//check if todos already exist in local storage
	let todos;
		if (localStorage.getItem('todos') === null) {
			todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	//remove the element clicked on
	const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
};
