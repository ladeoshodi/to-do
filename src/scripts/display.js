// View

const Display = (function () {
    
    function displayProjects(projects) {
        const projectList = document.querySelector(".project-list");
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
            projectList.appendChild(ul);
        }
    }
    
    return { displayProjects };

})();

export default Display;