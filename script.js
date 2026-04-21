const config = {
    totalFotos: 26,
    carpetaFotos: "fotos",
    carpetaMusica: "Musica"
};

function cargarFotos() {
    const contenedor = document.getElementById('contenedor-fotos');
    if (!contenedor) return;

    contenedor.innerHTML = ""; // Limpia para evitar duplicados

    for (let i = 1; i <= config.totalFotos; i++) {
        const img = document.createElement('img');
        img.src = `${config.carpetaFotos}/foto${i}.jpeg`;
        img.classList.add('foto-pareja');
        img.alt = `Momento ${i}`;
        
        img.onerror = function() {
            if (this.src.includes('.jpeg')) {
                this.src = this.src.replace('.jpeg', '.jpg');
            } else {
                this.remove(); // En lugar de display: none, la quitamos del DOM
            }
        };
        contenedor.appendChild(img);
    }
}

function toggleMenu() {
    document.getElementById("lista-musica").classList.toggle("hidden");
}

function seleccionarMusica(rutaArchivo, nombreMostrar) {
    const audio = document.getElementById("miMusica");
    const btn = document.getElementById("btnMusica");
    const text = document.getElementById("music-text");
    const icon = document.getElementById("music-icon");

    audio.src = rutaArchivo;
    audio.play().then(() => {
        btn.classList.add('playing');
        icon.innerHTML = "⏸️";
        text.innerHTML = nombreMostrar;
    }).catch(e => console.error("Error al cargar música:", e));
    
    toggleMenu();
}

function crearParticula() {
    const container = document.getElementById('particles-container');
    if(!container) return;
    
    const p = document.createElement('div');
    p.classList.add('particle');
    
    const r = Math.random();
    if (r < 0.33) p.innerHTML = '❤️';
    else if (r < 0.66) p.innerHTML = '🦋';
    else p.innerHTML = '❄️';

    p.style.left = Math.random() * 100 + 'vw';
    p.style.fontSize = (Math.random() * 12 + 15) + 'px';
    p.style.animationDuration = (Math.random() * 3 + 4) + 's';
    
    container.appendChild(p);
    setTimeout(() => p.remove(), 6000);
}

window.onclick = function(event) {
    if (!event.target.closest('.music-player')) {
        const lista = document.getElementById("lista-musica");
        if (lista && !lista.classList.contains('hidden')) {
            lista.classList.add('hidden');
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    cargarFotos();
    setInterval(crearParticula, 600);
});
