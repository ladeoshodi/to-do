import { Project, StorageDB } from "./storage.js";
import { Display } from "./display.js";

// display projects on nav
Display.displayProjectsNav(StorageDB.retrieveAll());

// display projects in main section
Display.displayProjectsMain(StorageDB.retrieveAll());

// add new project via dialog box
const openDialogForm = document.querySelector("#open-dialog-form");
const dialogForm = document.querySelector("#dialog-form");
const addProjectBtn = document.querySelector("#add-project-btn");
const dialogProjectName = document.querySelector("#dialog-project-name");
const dialogProjectDescription = document.querySelector("#dialog-project-description");
const dialogProjectDueDate = document.querySelector("#dialog-project-duedate");
const dialogProjectTags = document.querySelector("#dialog-project-tags");

// Show dialog box
openDialogForm.addEventListener("click", () => {
    dialogForm.showModal();
});

// Create a new project
addProjectBtn.addEventListener("click", (e) => {
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
});




// debugging in the console
let project1 = new Project("Project 1", "Project 1 Description");
let project2 = new Project("Project 2", "Project 2 Description", new Date('July 31, 2024').toJSON().slice(0, 10));
let project3 = new Project("Project 3", "Project 3 Description", new Date('August 08, 2024').toJSON().slice(0, 10), ['projects']);
let project4 = new Project("Project 4", "Project 4 Description", new Date('August 20, 2024').toJSON().slice(0, 10), ['go to school', 'choir']);



window.project1 = project1;
window.project2 = project2;
window.project3 = project3;
window.project4 = project4;
window.Project = Project;
window.StorageDB = StorageDB;
window.Display = Display;