import { Eventhandler } from "./utils.js";

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
            projectLink.addEventListener("click", (e) => {
                Eventhandler.viewProject(e);
            })
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
            projectSection.classList.add("section");
            projectSection.dataset.projectId = project.id;

            // display for project title
            const projectTitle = document.createElement("div");
            projectTitle.textContent = project.title;
            projectTitle.classList.add("project-title");
            projectSection.appendChild(projectTitle);

            // display for project description
            const projectDescription = document.createElement("div");
            if (project.description === "") {
                project.description = "No description given";
                projectDescription.style.fontStyle = "italic";
            }
            projectDescription.textContent = project.description;
            projectDescription.classList.add("project-description");
            projectSection.appendChild(projectDescription);

            // display for project due date
            const projectDueDate = document.createElement("div");
            projectDueDate.textContent = `Due Date: ${project.dueDate}`;
            if (project.dueDate <= new Date().toJSON().slice(0, 10)) {
                projectDueDate.style.color = "#e24545";
            }
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
            const todoList = document.createElement("div");
            todoList.classList.add("project-todo-list");
            todoList.textContent = "Todo List:";
            const ul = document.createElement("ul");
            for (let [index, todo] of project.todoList.entries()) {
                // create each todo item as a list item
                const todoItem = document.createElement("li");
                todoItem.id = `todo-${index}-${project.id}`;
                todoItem.dataset.value = todo;
                todoItem.textContent = todo;
                // add event listener to each todo item
                todoItem.addEventListener("click", Eventhandler.deleteTodoItem);
                
                ul.appendChild(todoItem);
            }
            todoList.appendChild(ul);
            projectSection.appendChild(todoList);

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
            addTodoInput.addEventListener("keydown", Eventhandler.createNewTodo);
            addTodo.appendChild(addTodoLabel);
            addTodo.appendChild(addTodoInput);

            projectSection.appendChild(addTodo);


            // create an edit button
            const editBtn = document.createElement("button");
            editBtn.classList.add("edit-btn");
            editBtn.textContent = "Edit Project";
            editBtn.type = "button";
            editBtn.dataset.projectId = project.id;
            // add an event listener to edit button
            editBtn.addEventListener("click", (e) => { 
                const dialogEditForm = document.querySelector("#dialog-edit-form");
                const editProjectBtn = document.querySelector("#edit-project-btn");
                dialogEditForm.showModal();
                editProjectBtn.dataset.projectId = project.id;
                Eventhandler.updateProject(e, false);
            });
            projectSection.appendChild(editBtn);

            // create a delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn");
            deleteBtn.textContent = "Delete Project";
            deleteBtn.type = "button";
            deleteBtn.dataset.projectId = project.id;
            // add an event listener to delete button
            deleteBtn.addEventListener("click", (e) => { 
                Eventhandler.deleteProject(e) 
            });
            projectSection.appendChild(deleteBtn);
            

            // append each section to the main page
            projectMain.appendChild(projectSection);
        }

    }

    return { displayProjectsNav, displayProjectsMain };

})();

export { Display };