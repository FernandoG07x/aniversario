// Función para la música
function toggleMusica() {
    const audio = document.getElementById("miMusica");
    const btn = document.getElementById("btnMusica");
    
    if (audio.paused) {
        audio.play();
        btn.innerHTML = "⏸️ Pausar música";
    } else {
        audio.pause();
        btn.innerHTML = "🎵 Toca para música";
    }
}

// Generación de mariposas
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('mariposas-container');
    
    function crearMariposa() {
        const mariposa = document.createElement('div');
        mariposa.classList.add('mariposa');
        
        mariposa.style.left = Math.random() * 100 + '%';
        mariposa.style.top = (Math.random() * 50 + 50) + '%'; // Empiezan desde la mitad inferior
        
        const size = Math.random() * 10 + 5;
        mariposa.style.width = size + 'px';
        mariposa.style.height = size + 'px';
        
        mariposa.style.animationDuration = (Math.random() * 3 + 4) + 's';
        
        container.appendChild(mariposa);
        
        // Eliminar después de la animación para no saturar el navegador
        setTimeout(() => {
            mariposa.remove();
        }, 6000);
    }

    // Crear mariposas cada 400ms
    setInterval(crearMariposa, 400);
});
