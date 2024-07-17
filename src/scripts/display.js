import { Project, StorageDB } from "./storage.js";

// dialog box form fields
const openDialogForm = document.querySelector("#open-dialog-form");
const dialogForm = document.querySelector("#dialog-form");
const dialogEditForm = document.querySelector("#dialog-edit-form");
const addProjectBtn = document.querySelector("#add-project-btn");
const editProjectBtn = document.querySelector("#edit-project-btn");
const dialogProjectName = document.querySelector("#dialog-project-name");
const dialogEditProjectName = document.querySelector("#dialog-edit-project-name");
const dialogProjectDescription = document.querySelector("#dialog-project-description");
const dialogEditProjectDescription = document.querySelector("#dialog-edit-project-description");
const dialogProjectDueDate = document.querySelector("#dialog-project-duedate");
const dialogEditProjectDueDate = document.querySelector("#dialog-edit-project-duedate");
const dialogProjectTags = document.querySelector("#dialog-project-tags");
const dialogEditProjectTags = document.querySelector("#dialog-edit-project-tags");

function createNewProject(e) {
    e.preventDefault();
    if (dialogProjectName.value === "") {
        dialogProjectName.reportValidity();
        return;
    }
    const project = new Project(
        dialogProjectName.value,
        dialogProjectDescription.value,
        dialogProjectDueDate.value,
        dialogProjectTags.value.split(" ")
    )
    project.save();

    // clear form fields
    dialogProjectName.value = "";
    dialogProjectDescription.value = "";
    dialogProjectDueDate.value = "";
    dialogProjectTags.value = "";

    // refresh nav section
    Display.displayProjectsNav(StorageDB.retrieveAll());

    // refresh main section
    Display.displayProjectsMain(StorageDB.retrieveAll());

    dialogForm.close();
}

function updateProject(e, updateToDB=false) {
    e.preventDefault();
    const currentProject = StorageDB.retrieve(e.target.dataset.projectId);
    if (updateToDB) {
        if (dialogEditProjectName.value === "") {
            dialogEditProjectName.reportValidity();
            return;
        }
        // save the new values from the dom
        StorageDB.update(currentProject.id, "title", dialogEditProjectName.value);
        StorageDB.update(currentProject.id, "description", dialogEditProjectDescription.value);
        StorageDB.update(currentProject.id, "dueDate", dialogEditProjectDueDate.value);
        StorageDB.update(currentProject.id, "tags", dialogEditProjectTags.value.split(" "));

        // refresh nav section
        Display.displayProjectsNav(StorageDB.retrieveAll());

        // refresh main section
        Display.displayProjectsMain(StorageDB.retrieveAll());

        dialogEditForm.close();
    } else {
        // update edit form with current project values
        dialogEditProjectName.value = currentProject.title;
        dialogEditProjectDescription.value = currentProject.description;
        dialogEditProjectDueDate.value = currentProject.dueDate;
        dialogEditProjectTags.value = currentProject.tags;
    }
}

function createNewTodo(e) {
    if (e.key === "Enter") {
        let id = e.target.id.split("-")[2];
        let key = "todoList";
        let value = e.target.value;
        StorageDB.update(id, key, value);
        Display.displayProjectsMain(StorageDB.retrieveAll());
    }
}

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
            addTodoInput.addEventListener("keydown", createNewTodo);
            addTodo.appendChild(addTodoLabel);
            addTodo.appendChild(addTodoInput);
            todoFieldset.appendChild(addTodo);

            projectSection.appendChild(todoFieldset);

            // create an edit button
            const editBtn = document.createElement("button");
            editBtn.classList.add("edit-btn");
            editBtn.textContent = "Edit Project";
            editBtn.type = "button";
            editBtn.dataset.projectId = project.id;
            // add an event listener to edit button
            editBtn.addEventListener("click", (e) => { 
                dialogEditForm.showModal();
                editProjectBtn.dataset.projectId = project.id;
                updateProject(e, false);
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

            });
            projectSection.appendChild(deleteBtn);
            

            // append each section to the main page
            projectMain.appendChild(projectSection);
        }

    }

    return { displayProjectsNav, displayProjectsMain };

})();



// display projects on nav
Display.displayProjectsNav(StorageDB.retrieveAll());

// display projects in main section
Display.displayProjectsMain(StorageDB.retrieveAll());

// Open dialog box
openDialogForm.addEventListener("click", () => {
    dialogForm.showModal();
});

// Create a new project via the dialog box form
addProjectBtn.addEventListener("click", (e) => createNewProject(e));

// Update project via dialog box
editProjectBtn.addEventListener("click", (e) => updateProject(e, true));

export { Display };