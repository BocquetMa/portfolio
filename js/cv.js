document.addEventListener('DOMContentLoaded', function() {
    // Gestion des onglets
    const onglets = document.querySelectorAll('.onglet');
    const sections = document.querySelectorAll('.section-cv');
    
    onglets.forEach(onglet => {
        onglet.addEventListener('click', function() {
            // Supprime la classe actif de tous les onglets
            onglets.forEach(o => o.classList.remove('actif'));
            
            // Ajoute la classe actif à l'onglet cliqué
            this.classList.add('actif');
            
            // Récupère la section à afficher
            const sectionId = this.getAttribute('data-section');
            
            // Cache toutes les sections
            sections.forEach(section => section.classList.remove('actif'));
            
            // Affiche la section correspondante
            document.getElementById(sectionId).classList.add('actif');
        });
    });
    
    // Gestion du thème clair/sombre
    const boutonTheme = document.getElementById('bouton-theme');
    const iconeTheme = boutonTheme.querySelector('i');
    
    // Vérifie si un thème est enregistré dans le localStorage
    const themeEnregistre = localStorage.getItem('theme-cv');
    
    if (themeEnregistre === 'sombre') {
        document.body.classList.add('theme-sombre');
        iconeTheme.classList.remove('fa-moon');
        iconeTheme.classList.add('fa-sun');
    }
    
    // Bascule le thème lors du clic sur le bouton
    boutonTheme.addEventListener('click', function() {
        document.body.classList.toggle('theme-sombre');
        
        if (document.body.classList.contains('theme-sombre')) {
            iconeTheme.classList.remove('fa-moon');
            iconeTheme.classList.add('fa-sun');
            localStorage.setItem('theme-cv', 'sombre');
        } else {
            iconeTheme.classList.remove('fa-sun');
            iconeTheme.classList.add('fa-moon');
            localStorage.setItem('theme-cv', 'clair');
        }
    });
    
    // Animation des barres de progression
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
});