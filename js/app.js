const template = document.querySelector('template');
let tasks = [];

const addTask = (task) => {
    let newTask = {
        name: task,
        id: Date.now(),
        finished: false
    }

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const showTasks = (tasks) => {
    const fragment = document.createDocumentFragment();

    tasks.forEach(task => {
        const { name, id, finished } = task;
        const clone = template.content.cloneNode('true');
        clone.querySelector('p').textContent = name;
        clone.querySelector('.btn-danger').dataset.id = id;
        if(finished) {
            clone.querySelector('p').classList.add('text-decoration-line-through');
            clone.querySelector('.form-check-input').checked = true;
        } else {
            clone.querySelector('p').classList.remove('text-decoration-line-through');
            clone.querySelector('.form-check-input').checked = false;
        }

        fragment.appendChild(clone);
    });

    document.getElementById('tasks').innerHTML = '';
    document.getElementById('tasks').appendChild(fragment);

}

// INIT VALUES

if(localStorage.getItem('tasks')) {
    showTasks(JSON.parse(localStorage.getItem('tasks')));
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    if(document.querySelector('input').value.trim() !== '') {
        addTask(document.querySelector('input').value);
        showTasks(JSON.parse(localStorage.getItem('tasks')));

        document.querySelector('.invalid').classList.add('d-none');
    } else {
        document.querySelector('.invalid').classList.remove('d-none');
    }

})

document.addEventListener('click', (e) => {

    // DELETE TASK
    if(e.target.matches('.btn-danger')) {
        const i = tasks.findIndex(task => task.id === parseInt(e.target.dataset.id))
        tasks.splice(i, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        showTasks(JSON.parse(localStorage.getItem('tasks')));
    }

    // TASK FINISHED
    if(e.target.matches('.form-check-input')) {
        if(e.target.checked) {
            tasks.find(task => task.id === parseInt(e.target.nextElementSibling.dataset.id)).finished = true;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            showTasks(JSON.parse(localStorage.getItem('tasks')));
        } else {
            tasks.find(task => task.id === parseInt(e.target.nextElementSibling.dataset.id)).finished = false;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            showTasks(JSON.parse(localStorage.getItem('tasks')));
        }
    }

})