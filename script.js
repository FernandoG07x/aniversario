const config = {
    totalFotos: 26,
    carpetaFotos: "fotos",
    carpetaMusica: "Musica"
};

// Genera un arreglo de rotaciones fijas para que las polaroids se vean orgánicas pero consistentes
function obtenerRotacionAleatoria(index) {
    // Alterna ángulos positivos y negativos para dar look desordenado y natural de pila de fotos
    const angulos = [-7, 5, -4, 6, -2, 4, -6, 3, -5, 7];
    return angulos[index % angulos.length];
}

function cargarFotos() {
    const contenedor = document.getElementById('contenedor-fotos');
    if (!contenedor) return;

    contenedor.innerHTML = ""; 

    // Cargamos las imágenes en orden inverso para que la Foto 1 empiece arriba del todo de la pila
    for (let i = config.totalFotos; i >= 1; i--) {
        const card = document.createElement('div');
        card.classList.add('polaroid-card');
        
        // Aplicamos la rotación inicial desordenada de pila de fotos analógica
        const rotacion = obtenerRotacionAleatoria(i);
        card.style.transform = `rotate(${rotacion}deg)`;
        // Controlamos las capas para que queden apiladas perfectamente
        card.style.zIndex = i;

        const img = document.createElement('img');
        img.src = `${config.carpetaFotos}/foto${i}.jpeg`;
        img.alt = `Nuestro Momento nº ${i}`;
        
        // Manejo elegante de formatos de imagen si falla (.jpeg -> .jpg)
        img.onerror = function() {
            if (this.src.includes('.jpeg')) {
                this.src = this.src.replace('.jpeg', '.jpg');
            } else {
                card.remove(); // Si no existe ninguna, quitamos la Polaroid completa
                reordenarZIndex();
            }
        };

        // Al hacer click en una foto de la pila, esta se va al frente
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            // Quitamos la clase activa de cualquier otra foto
            document.querySelectorAll('.polaroid-card').forEach(c => c.classList.remove('active'));
            // Añadimos active a la seleccionada
            card.classList.add('active');
        });

        card.appendChild(img);
        contenedor.appendChild(card);
    }
}

// Función auxiliar para mantener la coherencia de capas si se borran fotos rotas
function reordenarZIndex() {
    const cards = document.querySelectorAll('.polaroid-card');
    cards.forEach((card, index) => {
        card.style.zIndex = cards.length - index;
    });
}

function toggleMenu() {
    const lista = document.getElementById("lista-musica");
    if(lista) {
        lista.classList.toggle("hidden");
    }
}

function seleccionarMusica(rutaArchivo, nombreMostrar) {
    const audio = document.getElementById("miMusica");
    const btn = document.getElementById("btnMusica");
    const text = document.getElementById("music-text");
    const icon = document.getElementById("music-icon");

    audio.src = rutaArchivo;
    audio.play().then(() => {
        btn.classList.add('playing');
        icon.innerHTML = "❤️"; // Cambia a corazón latiendo al sonar
        icon.classList.remove('icon-pulse');
        icon.style.animation = "pulse 1.2s infinite alternate"; 
        text.innerHTML = nombreMostrar;
    }).catch(e => console.error("Error al reproducir audio:", e));
    
    toggleMenu();
}

function crearParticula() {
    const container = document.getElementById('particles-container');
    if(!container) return;
    
    const p = document.createElement('div');
    p.classList.add('particle');
    
    // Filtro de partículas estéticas: corazones suaves, destellos dorados y mariposas
    const r = Math.random();
    if (r < 0.4) {
        p.innerHTML = '❤️';
        p.style.color = '#ffb3c1'; // Variantes de rosa pastel suave
    } else if (r < 0.7) {
        p.innerHTML = '✨'; // Destellos mágicos dorados
        p.style.color = '#ffe4a0';
    } else {
        p.innerHTML = '🦋'; // Mariposas sutiles
        p.style.color = '#ffccd5';
    }

    p.style.left = Math.random() * 100 + 'vw';
    // Tamaños variados para generar efecto de profundidad real (3D)
    p.style.fontSize = (Math.random() * 10 + 12) + 'px';
    // Velocidades de subida asíncronas para naturalidad
    p.style.animationDuration = (Math.random() * 4 + 5) + 's';
    
    container.appendChild(p);
    // Remoción limpia del DOM tras terminar animación
    setTimeout(() => p.remove(), 7000);
}

// Cerrar el reproductor de música de forma interactiva al hacer clic afuera
window.onclick = function(event) {
    if (!event.target.closest('.music-player')) {
        const lista = document.getElementById("lista-musica");
        if (lista && !lista.classList.contains('hidden')) {
            lista.classList.add('hidden');
        }
    }
    // Si se hace clic en el fondo general, se limpia la foto Polaroid que estaba al frente
    if (!event.target.closest('.polaroid-card')) {
        document.querySelectorAll('.polaroid-card').forEach(c => c.classList.remove('active'));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    cargarFotos();
    // Ritmo elegante de caída y ascenso de partículas
    setInterval(crearParticula, 500);
});
