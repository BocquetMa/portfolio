document.addEventListener('DOMContentLoaded', function() {
    initialiserAnimation();
    initialiserNavigation();
    initialiserProjets();
    initialiserTheme();
    initialiserCV();
    initialiserModals();
});

function initialiserAnimation() {
    const elementTexteAnime = document.querySelector('.texte-anime');
    if (!elementTexteAnime) return;

    const textes = [
        'Développeur Web Fullstack',
        'Passionné par l\'Innovation',
        'Créateur d\'Expériences Numériques'
    ];
    
    let indexTexte = 0;
    let indexChar = 0;
    let estEffacement = false;

    function animerTexte() {
        const texteActuel = textes[indexTexte];
        let texteAffiche;

        if (estEffacement) {
            texteAffiche = texteActuel.slice(0, indexChar - 1);
            indexChar--;
        } else {
            texteAffiche = texteActuel.slice(0, indexChar + 1);
            indexChar++;
        }

        elementTexteAnime.textContent = texteAffiche;

        let vitesseAnimation = 100;

        if (estEffacement) {
            vitesseAnimation /= 2;
        }

        if (!estEffacement && indexChar === texteActuel.length) {
            vitesseAnimation = 2000;
            estEffacement = true;
        } else if (estEffacement && indexChar === 0) {
            estEffacement = false;
            indexTexte = (indexTexte + 1) % textes.length;
            vitesseAnimation = 500;
        }

        setTimeout(animerTexte, vitesseAnimation);
    }

    animerTexte();
}

function initialiserNavigation() {
    const liensNav = document.querySelectorAll('.nav-liens a');

    liensNav.forEach(lien => {
        lien.addEventListener('click', (e) => {
            const href = lien.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const sectionCible = document.querySelector(href);
                
                if (sectionCible) {
                    sectionCible.scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                }
            }
        });
    });
}


function initialiserProjets() {
    const conteneurProjets = document.getElementById('projects-grid');
    if (!conteneurProjets) return;

    const projets = [
        {
            titre: "Application de formation",
            description: "Application web pour l'entreprise ABCCI, permettant de présenter les formations, effectuer des quiz et bien plus encore",
            technologies: ["HTML5", "CSS3", "JavaScript", "Symfony6", "MySQL"],
            imageUrl: "assets/images/projets/abcci.png",
            lienGithub: "https://github.com/BocquetMa/abcci",
            lienDemo: "file:///C:/xampp/htdocs/portfolio/html/projet/abcci.html"
        },
        {
            titre: "Application de gestion",
            description: "Application web de gestion pour le Service Départemental d'Incendie et de Secours du Calvados",
            technologies: ["Java EE", "JSP", "HTML5", "JavaScript", "MariaDB"],
            imageUrl: "assets/images/projets/sdisweb.png",
            lienGithub: "https://github.com/BocquetMa/sdisweb",
            lienDemo: "file:///C:/xampp/htdocs/portfolio/html/projet/sdisweb.html"
        },
        {
            titre: "Tableau de Bord Analytics",
            description: "Tableau de bord interactif pour visualiser des données complexes en temps réel.",
            technologies: ["Vue.js", "D3.js", "Firebase", "Chart.js"],
            imageUrl: "assets/images/projects/dashboard.jpg",
            lienGithub: "https://github.com/votrenom/analytics-dashboard",
            lienDemo: "https://votre-dashboard.vercel.app"
        }
    ];

    projets.forEach(projet => {
        const carteProjet = document.createElement('div');
        carteProjet.classList.add('carte-projet');
        
        carteProjet.innerHTML = `
            <img src="${projet.imageUrl}" alt="${projet.titre}" class="image-projet">
            <div class="info-projet">
                <h3>${projet.titre}</h3>
                <p>${projet.description}</p>
                <div class="technologies-projet">
                    ${projet.technologies.map(tech => `<span class="tag-techno">${tech}</span>`).join(' ')}
                </div>
                <div class="liens-projet">
                    <a href="${projet.lienGithub}" target="_blank" class="lien-github">Code Source</a>
                    <a href="${projet.lienDemo}" target="_blank" class="lien-demo">Voir le Projet</a>
                </div>
            </div>
        `;
        
        conteneurProjets.appendChild(carteProjet);
    });
}

function initialiserTheme() {
    const interrupteurTheme = document.getElementById('theme-switch');
    if (interrupteurTheme) {
        const iconeTheme = document.querySelector('.theme-switch-icon');
        
        const themeEnregistre = localStorage.getItem('theme');
        
        if (themeEnregistre === 'clair') {
            document.body.classList.add('mode-clair');
            interrupteurTheme.checked = true;
            if (iconeTheme) iconeTheme.textContent = '🌙';
        }
        
        interrupteurTheme.addEventListener('change', function() {
            document.body.classList.toggle('mode-clair');
            
            if (document.body.classList.contains('mode-clair')) {
                localStorage.setItem('theme', 'clair');
                if (iconeTheme) iconeTheme.textContent = '🌙';
            } else {
                localStorage.setItem('theme', 'sombre');
                if (iconeTheme) iconeTheme.textContent = '☀️';
            }
        });
    }
    
    const interrupteurThemeProjet = document.getElementById('interrupteur-theme');
    if (interrupteurThemeProjet) {
        const iconeThemeProjet = document.querySelector('.icone-bascule-theme');
        
        const themeEnregistre = localStorage.getItem('theme');
        
        if (themeEnregistre === 'clair') {
            document.body.classList.add('mode-clair');
            interrupteurThemeProjet.checked = true;
            if (iconeThemeProjet) iconeThemeProjet.textContent = '🌙';
        }
        
        interrupteurThemeProjet.addEventListener('change', function() {
            document.body.classList.toggle('mode-clair');
            
            if (document.body.classList.contains('mode-clair')) {
                localStorage.setItem('theme', 'clair');
                if (iconeThemeProjet) iconeThemeProjet.textContent = '🌙';
            } else {
                localStorage.setItem('theme', 'sombre');
                if (iconeThemeProjet) iconeThemeProjet.textContent = '☀️';
            }
        });
    }
}

function initialiserCV() {
    const onglets = document.querySelectorAll('.onglet');
    const sections = document.querySelectorAll('.section-cv');
    
    if (!onglets.length || !sections.length) return;
    
    onglets.forEach(onglet => {
        onglet.addEventListener('click', function() {
            onglets.forEach(o => o.classList.remove('actif'));
            
            this.classList.add('actif');
            
            const sectionId = this.getAttribute('data-section');
            
            sections.forEach(section => section.classList.remove('actif'));
            
            document.getElementById(sectionId).classList.add('actif');
        });
    });
    
    const boutonTheme = document.getElementById('bouton-theme');
    if (boutonTheme) {
        const iconeTheme = boutonTheme.querySelector('i');
        
        const themeEnregistre = localStorage.getItem('theme');
        
        if (themeEnregistre === 'clair') {
            document.body.classList.add('mode-clair');
            if (iconeTheme) {
                iconeTheme.classList.remove('fa-moon');
                iconeTheme.classList.add('fa-sun');
            }
        }
        
        boutonTheme.addEventListener('click', function() {
            document.body.classList.toggle('mode-clair');
            
            if (document.body.classList.contains('mode-clair')) {
                if (iconeTheme) {
                    iconeTheme.classList.remove('fa-moon');
                    iconeTheme.classList.add('fa-sun');
                }
                localStorage.setItem('theme', 'clair');
            } else {
                if (iconeTheme) {
                    iconeTheme.classList.remove('fa-sun');
                    iconeTheme.classList.add('fa-moon');
                }
                localStorage.setItem('theme', 'sombre');
            }
        });
    }
    
    setTimeout(() => {
        const barresProgression = document.querySelectorAll('.barre');
        
        barresProgression.forEach(barre => {
            const largeurOriginale = barre.style.width;
            barre.style.width = '0';
            
            setTimeout(() => {
                barre.style.width = largeurOriginale;
            }, 300);
        });
    }, 500);
}

function initialiserModals() {
    const boutonsLecture = document.querySelectorAll('.bouton-lecture');
    if (!boutonsLecture.length) return;
    
    if (!document.getElementById('modalDemo')) {
        const modalHTML = `
            <div class="modal-demo" id="modalDemo">
                <div class="contenu-modal">
                    <div class="fermer-modal">&times;</div>
                    <video class="video-demo" controls id="videoDemo">
                        <source src="" type="video/mp4">
                        Votre navigateur ne supporte pas la lecture vidéo.
                    </video>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    const modal = document.getElementById('modalDemo');
    const video = document.getElementById('videoDemo');
    const fermerBtn = document.querySelector('.fermer-modal');
    
    boutonsLecture.forEach(bouton => {
        bouton.addEventListener('click', function(e) {
            e.preventDefault();
            const videoSrc = this.getAttribute('data-video') || '../assets/demos/default-demo.mp4';
            const videoSource = video.querySelector('source');
            videoSource.src = videoSrc;
            video.load();
            modal.style.display = 'flex';
        });
    });
    
    fermerBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        video.pause();
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            video.pause();
        }
    });
}