import { Project, StorageDB } from "./storage.js";
import { Display } from "./display.js";
import { Eventhandler } from "./utils.js";

const openDialogForm = document.querySelector("#open-dialog-form");
const dialogForm = document.querySelector("#dialog-form");
const addProjectBtn = document.querySelector("#add-project-btn");
const editProjectBtn = document.querySelector("#edit-project-btn");
const viewToday = document.querySelector("#view-today");
const viewUpcoming = document.querySelector("#view-upcoming");
const viewAll = document.querySelector("#view-all");

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

// show all projects
viewAll.addEventListener("click", (e) => {
    e.preventDefault();
    const projects = StorageDB.retrieveAll();
    Display.displayProjectsMain(projects);
});

// show all projects that are due today
viewToday.addEventListener("click", (e) => {
    e.preventDefault();
    const projects = StorageDB.retrieveAll();
    const dueProjects = projects.filter((project) => { 
        return project.dueDate <= new Date().toJSON().slice(0, 10)
    });
    Display.displayProjectsMain(dueProjects);
});

// show all projects that are due in the future
viewUpcoming.addEventListener("click", (e) => {
    e.preventDefault();
    const projects = StorageDB.retrieveAll();
    const upcomingProjects = projects.filter((project) => { 
        return project.dueDate > new Date().toJSON().slice(0, 10)
    });
    Display.displayProjectsMain(upcomingProjects);
});