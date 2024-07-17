import { StorageDB } from "./storage.js";

const Display = (function () {
    
    function displayProjectsNav(projects) {
        const projectNavList = document.querySelector(".project-list");
        // faux reset
        projectNavList.replaceChildren();
        const ul = document.createElement("ul");
        if (projects.length === 0) {
            projectList.textContent = "No projects to display";
            return;
        } 
        for (let project of projects) {
            const li = document.createElement("li");
            const projectLink = document.createElement("a");
            projectLink.href = "#";
            projectLink.textContent = project.title;
            projectLink.dataset.projectId = project.id
            projectLink.classList.add("project");
            li.appendChild(projectLink);
            ul.appendChild(li);
        }
        projectNavList.appendChild(ul);
    }
    
    function displayProjectsMain(projects) {
        const projectMain = document.querySelector(".main");
        // faux reset
        projectMain.replaceChildren();
        if (projects.length === 0) {
            projectMain.textContent = "No projects to display";
            return;
        } 
        for (let project of projects) {
            // Create section container
            const projectSection = document.createElement("section");
            projectSection.dataset.projectId = project.id;

            // display for project title
            const projectTitle = document.createElement("div");
            projectTitle.textContent = project.title;
            projectTitle.classList.add("project-title");
            projectSection.appendChild(projectTitle);

            // display for project description
            const projectDescription = document.createElement("div");
            projectDescription.textContent = project.description;
            projectDescription.classList.add("project-description");
            projectSection.appendChild(projectDescription);

            // display for project due date
            const projectDueDate = document.createElement("div");
            projectDueDate.textContent = `Due Date: ${project.dueDate}`;
            projectDueDate.classList.add("project-due-date");
            projectSection.appendChild(projectDueDate);

            //display for project tags
            const projectTags = document.createElement("div");
            // add # to the tags
            project.tags = project.tags.map(tag => `#${tag}`);
            projectTags.textContent = `Tags: ${project.tags.join(", ")}`;
            projectTags.classList.add("project-tags");
            projectSection.appendChild(projectTags);

            //display for project todo list
            // create a fieldset to hold the todo list
            const todoFieldset = document.createElement("fieldset");
            todoFieldset.classList.add("project-todo-list");
            const todoLegend = document.createElement("legend");
            todoLegend.textContent = "Todo List:";
            todoFieldset.appendChild(todoLegend);
            for (let [index, todo] of project.todoList.entries()) {
                const todoItem = document.createElement("div");
                // create a checkbox for each todo item
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.name = `todo-${index}-${project.id}`;
                checkbox.id = `todo-${index}-${project.id}`;
                checkbox.value = todo;
                // create a label for each todo item
                const label = document.createElement("label");
                label.htmlFor = `todo-${index}-${project.id}`;
                label.textContent = todo;
                
                todoItem.appendChild(checkbox);
                todoItem.appendChild(label);
                todoFieldset.appendChild(todoItem);
            }
            // add new todo list button
            const addTodo = document.createElement("div");
            const addTodoLabel = document.createElement("label");
            const addTodoInput = document.createElement("input");
            addTodo.classList.add("add-todo");
            addTodoLabel.htmlFor = `add-todo-${project.id}`;
            addTodoLabel.textContent = "Add item: ";
            addTodoInput.id = `add-todo-${project.id}`;
            addTodoInput.name = `add-todo-${project.id}`;
            addTodoInput.placeholder = "Enter new todo item";
            // add an event listener for the enter button
            addTodoInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    let id = e.target.parentElement.parentElement.parentElement.dataset.projectId;
                    let key = "todoList";
                    let value = e.target.value;
                    StorageDB.update(id, key, value);
                    displayProjectsMain(StorageDB.retrieveAll());
                }
            });
            addTodo.appendChild(addTodoLabel);
            addTodo.appendChild(addTodoInput);
            todoFieldset.appendChild(addTodo);

            projectSection.appendChild(todoFieldset);

            // create an edit button
            const editBtn = document.createElement("button");
            editBtn.classList.add("edit-btn");
            editBtn.textContent = "Edit Project";
            projectSection.appendChild(editBtn);

            // create a delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn");
            deleteBtn.textContent = "Delete Project";
            projectSection.appendChild(deleteBtn);
            

            // append each section to the main page
            projectMain.appendChild(projectSection);
        }

    }

    return { displayProjectsNav, displayProjectsMain };

})();

export { Display };