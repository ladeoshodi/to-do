// using local storage to persist data

class Storage {
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
            // todo fix key
            projects.push({key: JSON.parse(localStorage.getItem(key))});
        });
        return projects;
    }

    // update an item in local storage
    static update(id, key, value) {
        let project = this.get(id);
        project[key] = value;
        localStorage.setItem(String(this.id), JSON.stringify(project));
    }

    // delete an item from local storage
    static delete(id) {
        let project = this.get(id);
        localStorage.removeItem(id);
    }

    // delete all items in local storage
    static deleteAll(id) {
        localStorage.clear();
    }
}

export default Storage;