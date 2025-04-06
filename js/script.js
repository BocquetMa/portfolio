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
        'Jeune développeur web Fullstack',
        'Passionné par l\'informatique et le développement',
        'Créateur d\'applications et de sites web'
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
            titre: "Application de formation ABCCI",
            description: "Application web pour l'entreprise ABCCI, permettant de gérer les formations, d'effectuer des quiz et d'échanger via une messagerie interne.",
            technologies: ["HTML5", "CSS3", "JavaScript", "Symfony6", "MySQL"],
            imageUrl: "assets/images/projets/abcci/abcci-profil.png",
            lienGithub: "https://github.com/BocquetMa/abcci",
            lienDemo: "html/projet/abcci.html"
        },
        {
            titre: "SDIS Web",
            description: "Application de gestion pour le Service Départemental d'Incendie et de Secours du Calvados. Gestion des pompiers, véhicules et interventions.",
            technologies: ["Java EE", "JSP", "HTML5", "JavaScript", "MariaDB"],
            imageUrl: "assets/images/projets/sdisweb.png",
            lienGithub: "https://github.com/BocquetMa/sdisweb",
            lienDemo: "html/projet/sdisweb.html"
        },
        {
            titre: "Emusic - Gestion d'école de musique",
            description: "Application pour gérer une école de musique : inscriptions, professeurs, cours, instruments et prêts de matériel.",
            technologies: ["Symfony", "Twig", "MySQL", "Bootstrap"],
            imageUrl: "assets/images/projets/emuusic.png",
            lienGithub: "https://github.com/BocquetMa/emusic",
            lienDemo: "html/projet/emusic.html"
        },
        {
            titre: "Paris 2024 - Système de Gestion",
            description: "Application de gestion pour les Jeux Olympiques permettant d'administrer les athlètes, épreuves et actualités.",
            technologies: ["Spring Boot", "Thymeleaf", "API REST", "MariaDB"],
            imageUrl: "assets/images/projets/paris2024.png",
            lienGithub: "https://github.com/BocquetMa/paris2024webapp",
            lienDemo: "html/projet/paris2024.html"
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
    const boutonTheme = document.getElementById('bouton-theme');
    if (!boutonTheme) return;
    
    const iconeTheme = boutonTheme.querySelector('i');
    
    const prefereThemeSombre = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let themeEnregistre = localStorage.getItem('theme');
    
    if (!themeEnregistre) {
        themeEnregistre = prefereThemeSombre ? 'sombre' : 'clair';
        localStorage.setItem('theme', themeEnregistre);
    }
    
    if (themeEnregistre === 'clair') {
        document.body.classList.add('mode-clair');
        if (iconeTheme) {
            iconeTheme.classList.remove('fa-moon');
            iconeTheme.classList.add('fa-sun');
        }
    } else {
        document.body.classList.remove('mode-clair');
        if (iconeTheme) {
            iconeTheme.classList.remove('fa-sun');
            iconeTheme.classList.add('fa-moon');
        }
    }
    
    document.body.classList.add('transition-theme');
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const nouveauTheme = e.matches ? 'sombre' : 'clair';
        
        const themeExplicite = localStorage.getItem('theme-explicite');
        if (!themeExplicite) {
            appliquerTheme(nouveauTheme);
            localStorage.setItem('theme', nouveauTheme);
        }
    });
    
    boutonTheme.addEventListener('click', function() {
        const actuelTheme = document.body.classList.contains('mode-clair') ? 'clair' : 'sombre';
        const nouveauTheme = actuelTheme === 'clair' ? 'sombre' : 'clair';
        
        appliquerTheme(nouveauTheme);
        
        localStorage.setItem('theme-explicite', 'true');
        localStorage.setItem('theme', nouveauTheme);
    });
    
    function appliquerTheme(theme) {
        if (theme === 'clair') {
            document.body.classList.add('mode-clair');
            if (iconeTheme) {
                iconeTheme.classList.remove('fa-moon');
                iconeTheme.classList.add('fa-sun');
            }
        } else {
            document.body.classList.remove('mode-clair');
            if (iconeTheme) {
                iconeTheme.classList.remove('fa-sun');
                iconeTheme.classList.add('fa-moon');
            }
        }
    }
    
    const interrupteurThemeProjet = document.getElementById('interrupteur-theme');
    if (interrupteurThemeProjet) {
        const iconeThemeProjet = document.querySelector('.icone-bascule-theme');
        
        if (themeEnregistre === 'clair') {
            document.body.classList.add('mode-clair');
            interrupteurThemeProjet.checked = true;
            if (iconeThemeProjet) iconeThemeProjet.textContent = '🌙';
        }
        
        interrupteurThemeProjet.addEventListener('change', function() {
            document.body.classList.toggle('mode-clair');
            
            if (document.body.classList.contains('mode-clair')) {
                localStorage.setItem('theme', 'clair');
                localStorage.setItem('theme-explicite', 'true');
                if (iconeThemeProjet) iconeThemeProjet.textContent = '🌙';
            } else {
                localStorage.setItem('theme', 'sombre');
                localStorage.setItem('theme-explicite', 'true');
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