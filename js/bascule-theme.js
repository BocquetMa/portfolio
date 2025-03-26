document.addEventListener('DOMContentLoaded', function() {
    const interrupteurTheme = document.getElementById('interrupteur-theme');
    const iconeTheme = document.querySelector('.icone-bascule-theme');

    const themeEnregistre = localStorage.getItem('theme');
    
    if (themeEnregistre === 'sombre') {
        document.body.classList.add('mode-sombre');
        interrupteurTheme.checked = true;
        iconeTheme.textContent = '🌙';
    }

    interrupteurTheme.addEventListener('change', function() {
        if (interrupteurTheme.checked) {
            document.body.classList.add('mode-sombre');
            localStorage.setItem('theme', 'sombre');
            iconeTheme.textContent = '🌙';
        } else {
            document.body.classList.remove('mode-sombre');
            localStorage.setItem('theme', 'clair');
            iconeTheme.textContent = '☀️';
        }
    });
});