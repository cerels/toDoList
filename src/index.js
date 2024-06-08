import Project from './modules/projects.js';
import todoItem from './modules/todo.js';


// Sample Projects Initialization
let projects = [
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
let defaultProjectIndex = 0;

// Populate Dropdown and Display Default Project
document.addEventListener('DOMContentLoaded', () => {
    const projectSelector = document.getElementById('project-selector');
    const projectTitle = document.getElementById('project-title');
    const todoList = document.getElementById('todo-list');
    const createTodoButton = document.getElementById('create-todo-button');
    const createProjectButton = document.getElementById('create-project-button');
    const deleteProjectButton = document.getElementById('delete-project-button');

    // Function to populate the dropdown with project titles
    function populateProjectSelector() {
        projectSelector.innerHTML = ''; // Clear existing options
        projects.forEach((project, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = project.title;
            projectSelector.appendChild(option);
        });
    }

    // Function to display the selected project and its todos
    function displayProject(projectIndex) {
        const project = projects[projectIndex];
        projectTitle.textContent = project.title;
        todoList.innerHTML = ''; // Clear previous todos

        project.todos.forEach((todo, todoIndex) => {
            const todoItemDiv = document.createElement('div');
            todoItemDiv.className = 'todo-item';
            todoItemDiv.innerHTML = `
                <strong>${todo.title}</strong>
                <p>${todo.description}</p>
                <button class="delete-todo" data-project-index="${projectIndex}" data-todo-index="${todoIndex}">Delete</button>
            `;
            todoList.appendChild(todoItemDiv);
        });

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-todo').forEach(button => {
            button.addEventListener('click', (event) => {
                const projectIndex = event.target.getAttribute('data-project-index');
                const todoIndex = event.target.getAttribute('data-todo-index');
                deleteTodoItem(projectIndex, todoIndex);
            });
        });
    }

    // Display default project on load
    projectSelector.value = defaultProjectIndex;
    populateProjectSelector();
    displayProject(defaultProjectIndex);

    // Update project display when a new project is selected
    projectSelector.addEventListener('change', (event) => {
        displayProject(event.target.value);
    });

    // Function to delete a todo item
    function deleteTodoItem(projectIndex, todoIndex) {
        projects[projectIndex].removeTodo(todoIndex);
        displayProject(projectIndex);
    }

    // Event listener for creating a new todo item
    createTodoButton.addEventListener('click', () => {
        const projectIndex = projectSelector.value;
        const newTodoTitle = prompt("Enter the title for the new todo:");
        const newTodoDescription = prompt("Enter the description for the new todo:");

        if (newTodoTitle && newTodoDescription) {
            const newTodo = new todoItem(newTodoTitle, newTodoDescription);
            projects[projectIndex].addTodo(newTodo);
            displayProject(projectIndex);
        }
    });

    // Event listener for creating a new project
    createProjectButton.addEventListener('click', () => {
        const newProjectTitle = prompt("Enter the title for the new project:");

        if (newProjectTitle) {
            const newProject = new Project(newProjectTitle);
            projects.push(newProject);
            populateProjectSelector();
            projectSelector.value = projects.length - 1;
            displayProject(projectSelector.value);
        }
    });

    // Event listener for deleting the selected project
    deleteProjectButton.addEventListener('click', () => {
        const projectIndex = projectSelector.value;
        
        // Confirm the deletion
        if (confirm(`Are you sure you want to delete the project: ${projects[projectIndex].title}?`)) {
            projects.splice(projectIndex, 1);
            populateProjectSelector();
            
            // If the deleted project was the last one in the list, adjust the selected project
            if (projectSelector.value >= projects.length && projects.length > 0) {
                projectSelector.value = projects.length - 1;
            }

            if (projects.length > 0) {
                displayProject(projectSelector.value);
            } else {
                // Clear the display if there are no projects left
                projectTitle.textContent = '';
                todoList.innerHTML = '';
            }
        }
    });
});
