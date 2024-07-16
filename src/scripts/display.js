// View

const Display = (function () {
    
    function displayProjects(projects) {
        const projectsView = document.querySelector(".project-list");
        if (projects.length === 0) {
            projectsView.textContent = "No projects to display";
            return;
        } 
        for (let project of projects) {
            const projectView = document.createElement("div");
            projectView.textContent = project.title;
            projectView.dataset.projectId = project.id
            projectView.classList.add("project");
            projectsView.appendChild(projectView);
        }
    }
    
    return { displayProjects };

})();

export default Display;