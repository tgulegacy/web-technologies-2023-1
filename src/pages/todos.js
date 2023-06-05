import Auth from "../services/auth.js";
import location from "../services/location.js";
import loading from "../services/loading.js";
import Todos from "../services/todos.js";
import Form from "../components/form.js";

const init = async () => {
    const { ok: isLogged } = await Auth.me()

    if (isLogged) {
        loading.stop()
    } else {
        return location.login()
    }

    generateTodoList();

    const formEl = document.getElementById('todo-form');

    new Form(formEl, {'description': () => false,}, (values) => {
        addTodo(values.description);
    })
}

function generateTodo(todo) {
    const todoHTML = document.createElement('div'),
        todoCheckbox = document.createElement('input'),
        todoDescription = document.createElement('span'),
        todoRemoveButton = document.createElement('button');

    // Настройка родительского элемента todo
    todoHTML.classList.add('todo');


    // Настройка checkbox
    todoCheckbox.setAttribute('type', 'checkbox');
    todoCheckbox.classList.add('todo__checkbox');
    todoCheckbox.checked = todo.completed;
    todoCheckbox.onchange = async function(e) {
        loading.start();

        // Запоминаем значение пользователя
        const checboxValue = e.target.checked;

        // Тут же отменяем его, т.е. визуально чек бокс не меняет значение
        e.target.checked = !e.target.checked;

        // Делаем запрос на сервер для изменения чекбокса
        const response = await Todos.updateStatusById(todo.id, checboxValue);

        // Если ответ пришел, то снова меняем значение чекбокса на противоположное,
        loading.stop();
        if (response) {
            e.target.checked = !e.target.checked;
        } else {
            alert('Не удалось отправить запрос на сервер. Попробуйте ещё раз.')
        }
    }

    // Описание
    todoDescription.classList.add('todo__description');
    todoDescription.innerText = todo.description;


    // Кнопка удаления
    todoRemoveButton.classList.add('todo__remove');
    todoRemoveButton.innerText = 'Удалить';
    todoRemoveButton.onclick = async function(e) {
        const response = confirm('Вы уверены?');

        if (response) {
            loading.start();
            await Todos.deleteById(todo.id);
            generateTodoList();
        }
    }


    // Добавление в todo всех настроенных элементов
    todoHTML.appendChild(todoCheckbox);
    todoHTML.appendChild(todoDescription);
    todoHTML.appendChild(todoRemoveButton);

    return todoHTML;
}


const generateTodoList = async () => {
    const todos = await Todos.getAll();

    document.querySelector('.todos').innerHTML = '';
    loading.stop();

    for (const todo of todos) {
        const todoHTML = generateTodo(todo);

        // Готовый todo прикрепляем на страницу
        document.querySelector('.todos').appendChild(todoHTML);
    }
}


const addTodo = async (description) => {
    loading.start();
    const response = await Todos.create(description);

    console.log(response);

    if (!response.ok) {
        console.log('Ошибка!');
    } else {
        generateTodoList();
    }
}


if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", init)
} else {
    init()
}
