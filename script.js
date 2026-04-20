// --- CONFIGURACIÓN ---
const totalFotos = 26;
const carpeta = "fotos"; 

// --- CARGA DE ÁLBUM ---
function cargarFotos() {
    const contenedor = document.getElementById('contenedor-fotos');
    if (!contenedor) return;

    for (let i = 1; i <= totalFotos; i++) {
        const img = document.createElement('img');
        // Intenta cargar .jpeg por defecto
        img.src = `${carpeta}/foto${i}.jpeg`;
        img.classList.add('foto-pareja');
        img.loading = "lazy";

        // Si la foto es .jpg, la corrige automáticamente
        img.onerror = function() {
            if (this.src.includes('.jpeg')) {
                this.src = this.src.replace('.jpeg', '.jpg');
            } else {
                this.style.display = 'none';
            }
        };
        contenedor.appendChild(img);
    }
}

// --- MÚSICA ---
function toggleMusica() {
    const audio = document.getElementById("miMusica");
    const btn = document.getElementById("btnMusica");
    const icon = document.getElementById("music-icon");
    const text = document.getElementById("music-text");

    if (audio.paused) {
        audio.play();
        btn.classList.add('playing');
        icon.innerHTML = "⏸️";
        text.innerHTML = "Nuestra música";
    } else {
        audio.pause();
        btn.classList.remove('playing');
        icon.innerHTML = "🎵";
        text.innerHTML = "Encender la magia";
    }
}

// --- PARTÍCULAS (CORAZONES Y MARIPOSAS) ---
function crearParticula() {
    const container = document.getElementById('particles-container');
    const p = document.createElement('div');
    const esCorazon = Math.random() > 0.5;
    
    p.classList.add('particle');
    p.innerHTML = esCorazon ? '❤️' : '🦋';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.fontSize = (Math.random() * 10 + 15) + 'px';
    p.style.animationDuration = (Math.random() * 3 + 4) + 's';
    
    container.appendChild(p);
    setTimeout(() => p.remove(), 6000);
}

// --- INICIO ---
document.addEventListener("DOMContentLoaded", () => {
    cargarFotos();
    setInterval(crearParticula, 500);
});
