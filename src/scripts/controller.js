import { StorageDB } from "./storage.js";
import { Display } from "./display.js";

// event listeners
const EventListeners = (function () {
    function addNewTodoItem(e) {
        if (e.key === "Enter") {
            let id = e.target.parentElement.parentElement.parentElement.dataset.projectId;
            let key = "todoList";
            let value = e.target.value;
            StorageDB.update(id, key, value);
            Display.displayProjectsMain(StorageDB.retrieveAll());
        }
    }

    return { addNewTodoItem };
})();


export { EventListeners };