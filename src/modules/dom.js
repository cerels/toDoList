import Project from './projects.js';
import todoItem from './todo.js';

// Sample Projects Initialization
const projects = [
    new Project("Project Alpha"),
    new Project("Project Beta"),
    new Project("Project Gamma"),
];

// Add sample todos to each project
projects[0].addTodo(new todoItem("Alpha Task 1", "Description for Alpha Task 1"));
projects[0].addTodo(new todoItem("Alpha Task 2", "Description for Alpha Task 2"));
projects[1].addTodo(new todoItem("Beta Task 1", "Description for Beta Task 1"));
projects[2].addTodo(new todoItem("Gamma Task 1", "Description for Gamma Task 1"));

// Default Project
const defaultProjectIndex = 0;

// Populate Dropdown and Display Default Project
document.addEventListener('DOMContentLoaded', () => {
    const projectSelector = document.getElementById('project-selector');
    const projectTitle = document.getElementById('project-title');
    const todoList = document.getElementById('todo-list');

    // Populate dropdown with project titles
    projects.forEach((project, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = project.title;
        projectSelector.appendChild(option);
    });

    // Function to display selected project and its todos
    function displayProject(projectIndex) {
        const project = projects[projectIndex];
        projectTitle.textContent = project.title;
        todoList.innerHTML = ''; // Clear previous todos

        project.todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.className = 'todo-item';
            todoItem.innerHTML = `<strong>${todo.title}</strong><p>${todo.description}</p>`;
            todoList.appendChild(todoItem);
        });
    }

    // Display default project on load
    projectSelector.value = defaultProjectIndex;
    displayProject(defaultProjectIndex);

    // Update project display when a new project is selected
    projectSelector.addEventListener('change', (event) => {
        displayProject(event.target.value);
    });
});
