import StorageDB from './storage.js';

class Project {
    id = Math.random();

    constructor(title, description = "", dueDate = new Date().toJSON().slice(0, 10), tags = []) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.tags = tags;
    }

    // save a new project in localStorage
    save() {
        let data = {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            tags: this.tags
        }
        StorageDB.create(this.id, data);
    }
}

let project1 = new Project("Project 1", "Project 1 Description");
let project2 = new Project("Project 2", "Project 2 Description", new Date('July 31, 2024').toJSON().slice(0, 10));
let project3 = new Project("Project 3", "Project 3 Description", new Date('August 08, 2024').toJSON().slice(0, 10), ['projects']);
let project4 = new Project("Project 4", "Project 4 Description", new Date('August 20, 2024').toJSON().slice(0, 10), ['school', 'choir']);


// debugging in the console
window.project1 = project1;
window.project2 = project2;
window.project3 = project3;
window.project4 = project4;
window.Project = Project;
window.StorageDB = StorageDB;