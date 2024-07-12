import Storage from './storage.js';

class Project {
    id = Math.random();

    constructor(title, description, dueDate = new Date().toJSON().slice(0, 10), priority = 0, notes = "") {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }

    // save a new project in localStorage
    save() {
        let data = {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            notes: this.notes
        }
        Storage.create(this.id, data);
    }
}

let project = new Project("Build To Do app", "To do app with JS");
// project.save();
console.log(project.title);
console.log(project.description);
console.log(project.dueDate);
console.log(project.priority);
console.log(project.notes);

console.log (Storage.retrieveAll());
// Storage.deleteAll();