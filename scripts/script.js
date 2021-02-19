'use strict';
document.addEventListener('DOMContentLoaded', () => {

    const   todoControl = document.querySelector('.todo-control'),
            headerInput = document.querySelector('.header-input'),
            headerButton = document.querySelector('.header-button'),
            todoList = document.querySelector('.todo-list'),
            todoCompleted = document.querySelector('.todo-completed');

    headerButton.disabled = true;
    let todoData = [];
    

    if(localStorage.getItem('localStor')){
        todoData = JSON.parse(localStorage.getItem('localStor'));
    }

    const dataUpdate = () => {
        localStorage.setItem('localStor', JSON.stringify(todoData));
    };

    let isNumber = n => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    headerInput.addEventListener('input', () => {
        if(headerInput.value !== ''){
            headerButton.disabled = false;
        }else{
            headerButton.disabled = true;
        }
    });

    const render = () => {
        todoList.textContent = '';
        todoCompleted.textContent = '';

        todoData.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('todo-item');
       
            li.innerHTML = `<span class="text-todo">${item.value.trim()}</span>
			<div class="todo-buttons">
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
			</div>
            `;

            if(item.completed){
                todoCompleted.append(li);
            }else{
                todoList.append(li);
            }

            const btnTodoComplete = li.querySelector('.todo-complete');

            btnTodoComplete.addEventListener('click', () => {
                item.completed = !item.completed;
                render();
                dataUpdate();
            });

            const btnTodoRemove = li.querySelector('.todo-remove');
            btnTodoRemove.addEventListener('click', e => {
                const item = e.target.parentNode.parentNode;
                const itemVal = item.textContent.trim();
                item.remove();
                todoData = todoData.filter(itemTD => {
                    return itemTD.value !== itemVal;
                });
                dataUpdate();
            });
            headerInput.value = '';
        });
    };

    todoControl.addEventListener('submit', e => {
        e.preventDefault();
        const newTodo = {
            value: headerInput.value,
            completed: false
        };

        todoData.push(newTodo);
        render();
        dataUpdate();
    });
    render();
});