// using local storage to persist data

class StorageDB {
    // save to localStorage
    static create(id, data) {
        try {
            localStorage.setItem(String(id), JSON.stringify(data));
            return true;
        } catch (e) {
            // log the error in the console
            // Todo: Create a logger function to log errors to the user
            console.log(e);
        }
    }

    // get an item from local Storage
    static retrieve(id) {
        let project = localStorage.getItem(String(id));
        return JSON.parse(project);
    }

    // get all items from local Storage
    static retrieveAll() {
        let projects = [];
        let keys = Object.keys(localStorage);
        keys.forEach((key) => {
            projects.push({[key]: JSON.parse(localStorage.getItem(key))});
        });
        return projects;
    }

    // update an item in local storage
    static update(id, key, value) {
        let project = this.retrieve(id);
        if (Object.prototype.toString.call(project[key]) === "[object Array]") {
            project[key].push(value);
        } else {
            project[key] = value;
        }
        localStorage.setItem(String(id), JSON.stringify(project));
    }

    static removeArrayItem(id, key, value) {
        let project = this.retrieve(id);
        if (key === "tags" || key === "todoList") {
            let index = project[key].indexOf(value);
            if (index >= 0) {
                project[key].splice(index, 1);
            }
            localStorage.setItem(String(id), JSON.stringify(project));
        }
    }

    // delete an item from local storage
    static deleteItem(id) {
        localStorage.removeItem(String(id));
    }

    // delete all items in local storage
    static deleteAll(id) {
        localStorage.clear();
    }
}

export default StorageDB;