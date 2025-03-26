// Effet de texte dynamique (type-writing)
document.addEventListener('DOMContentLoaded', () => {
    const typedTextElement = document.querySelector('.typed-text');
    const texts = [
        'Développeur Web Fullstack',
        'Passionné par l\'Innovation',
        'Créateur d\'Expériences Numériques'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        let displayText;

        if (isDeleting) {
            displayText = currentText.slice(0, charIndex - 1);
            charIndex--;
        } else {
            displayText = currentText.slice(0, charIndex + 1);
            charIndex++;
        }

        typedTextElement.textContent = displayText;

        let typeSpeed = 100;

        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
});

// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Récupérer les valeurs du formulaire
        const name = contactForm.querySelector('input[name="name"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;

        // Validation simple
        if (!name || !email || !message) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        // Simulation d'envoi (à remplacer par une vraie logique d'envoi)
        alert('Message envoyé avec succès ! Je vous recontacterai bientôt.');
        
        // Réinitialiser le formulaire
        contactForm.reset();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Ne pas interférer avec les liens externes ou absolus
            if (!href.startsWith('#')) {
                return; // Laisser le comportement par défaut
            }
            
            // Pour les liens d'ancrage internes, appliquer le défilement fluide
            e.preventDefault();
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    });
});