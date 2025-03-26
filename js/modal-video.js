document.addEventListener('DOMContentLoaded', function() {
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
    
    const modal = document.getElementById('modalDemo');
    const video = document.getElementById('videoDemo');
    const fermerBtn = document.querySelector('.fermer-modal');
    const boutonsLecture = document.querySelectorAll('.bouton-lecture');
    
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
});