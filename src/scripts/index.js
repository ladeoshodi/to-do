import { Project, StorageDB } from "./storage.js";
import { Display } from "./display.js";
import { Eventhandler } from "./utils.js";

const openDialogForm = document.querySelector("#open-dialog-form");
const dialogForm = document.querySelector("#dialog-form");
const addProjectBtn = document.querySelector("#add-project-btn");
const editProjectBtn = document.querySelector("#edit-project-btn");

// display projects on nav
Display.displayProjectsNav(StorageDB.retrieveAll());

// display projects in main section
Display.displayProjectsMain(StorageDB.retrieveAll());

// Open dialog box
openDialogForm.addEventListener("click", () => {
    dialogForm.showModal();
});

// Create a new project via the dialog box form
addProjectBtn.addEventListener("click", (e) => Eventhandler.createNewProject(e));

// Update project via dialog box
editProjectBtn.addEventListener("click", (e) => Eventhandler.updateProject(e, true));