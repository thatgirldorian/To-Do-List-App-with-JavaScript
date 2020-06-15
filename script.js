//Selectors
const todoTask = document.querySelector('.todo-task');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');




//Event listeners
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
		todoParent.addEventListener('transitionend', function() {
			todoParent.remove();
		});
	};

	//tick off a task
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