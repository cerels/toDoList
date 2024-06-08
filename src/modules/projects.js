import todoItem from './todo.js';

class Project {
    constructor(title) {
        this.title = title;
        this.id = `project-${Date.now()}`; // Generate unique id based on timestamp
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(todoIndex) {
        this.todos.splice(todoIndex, 1);
    }

    updateTitle(newTitle) {
        this.title = newTitle;
    }
}

export default Project;
