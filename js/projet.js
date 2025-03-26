const projects = [
    {
        title: "Application de formation",
        description: "Application web pour l'entreprise ABCCI, permettant de présenter les formations, effectuer des quiz et bien plus encore",
        technologies: ["HTML5", "CSS3", "JavaScript", "Symfony6", "MySQL"],
        imageUrl: "assets/images/projets/abcci.png",
        githubLink: "https://github.com/votrenom/todo-app",
        liveLink: "http://localhost/portfolio/html/projet/abcci.html"
    },
    {
        title: "Site E-commerce",
        description: "Plateforme de commerce électronique avec système de panier et paiement intégré.",
        technologies: ["React", "Express", "PostgreSQL", "Stripe API"],
        imageUrl: "assets/images/projects/ecommerce.jpg",
        githubLink: "https://github.com/votrenom/ecommerce-site",
        liveLink: "https://votre-site-ecommerce.netlify.app"
    },
    {
        title: "Tableau de Bord Analytics",
        description: "Tableau de bord interactif pour visualiser des données complexes en temps réel.",
        technologies: ["Vue.js", "D3.js", "Firebase", "Chart.js"],
        imageUrl: "assets/images/projects/dashboard.jpg",
        githubLink: "https://github.com/votrenom/analytics-dashboard",
        liveLink: "https://votre-dashboard.vercel.app"
    }
];

function renderProjects() {
    const projectsContainer = document.getElementById('projects-grid');
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        
        projectCard.innerHTML = `
            <img src="${project.imageUrl}" alt="${project.title}" class="project-image">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join(' ')}
                </div>
                <div class="project-links">
                    <a href="${project.githubLink}" target="_blank" class="github-link">Code Source</a>
                    <a href="${project.liveLink}" target="_blank" class="live-link">Voir le Projet</a>
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
}

// Appeler la fonction de rendu lors du chargement de la page
document.addEventListener('DOMContentLoaded', renderProjects);