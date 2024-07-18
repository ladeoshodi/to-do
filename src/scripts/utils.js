import { Project, StorageDB } from "./storage.js";
import { Display } from "./display.js";

const Eventhandler = (function () {
    const dialogForm = document.querySelector("#dialog-form");
    const dialogProjectName = document.querySelector("#dialog-project-name");
    const dialogProjectDescription = document.querySelector("#dialog-project-description");
    const dialogProjectDueDate = document.querySelector("#dialog-project-duedate");
    const dialogProjectTags = document.querySelector("#dialog-project-tags");
    const dialogEditForm = document.querySelector("#dialog-edit-form");
    const dialogEditProjectName = document.querySelector("#dialog-edit-project-name");
    const dialogEditProjectDescription = document.querySelector("#dialog-edit-project-description");
    const dialogEditProjectDueDate = document.querySelector("#dialog-edit-project-duedate");
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

        // clear the input form
        dialogProjectName.value = "";
        dialogProjectDescription.value = "";
        dialogProjectDueDate.value = "";
        dialogProjectTags.value = "";

        // reload the main and nav
        dialogForm.close();
        Display.displayProjectsMain(StorageDB.retrieveAll());
        Display.displayProjectsNav(StorageDB.retrieveAll());
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

            // reload the main and nav
            dialogEditForm.close();
            Display.displayProjectsMain(StorageDB.retrieveAll());
            Display.displayProjectsNav(StorageDB.retrieveAll());
        } else {
            // update edit form with current project values
            dialogEditProjectName.value = currentProject.title;
            dialogEditProjectDescription.value = currentProject.description;
            dialogEditProjectDueDate.value = currentProject.dueDate;
            dialogEditProjectTags.value = currentProject.tags.join(" ");
        }
    }

    function deleteProject(e) {
        StorageDB.deleteItem(e.target.dataset.projectId);

        // reload the main and nav
        Display.displayProjectsMain(StorageDB.retrieveAll());
        Display.displayProjectsNav(StorageDB.retrieveAll());
    }

    function createNewTodo(e) {
        if (e.key === "Enter") {
            let id = e.target.id.split("-")[2];
            let key = "todoList";
            let value = e.target.value;
            StorageDB.update(id, key, value);

            // reload the main div
            Display.displayProjectsMain(StorageDB.retrieveAll());
        }
    }

    function deleteTodoItem(e) {
        e.target.style.textDecoration = "line-through";
        StorageDB.removeArrayItem(e.target.id.split("-")[2], "todoList", e.target.dataset.value);
    }
    
    function viewProject(e) {
        let projects = StorageDB.retrieveAll();
        let project = projects.filter((project) => {
            return String(project.id) === e.target.dataset.projectId
        });
        Display.displayProjectsMain(project);

    }

    return { createNewProject, updateProject, deleteProject, createNewTodo, deleteTodoItem, viewProject };
})();


export { Eventhandler };