const config = {
    totalFotos: 26,
    carpetaFotos: "fotos",
    carpetaMusica: "Musica"
};

function obtenerRotacionAleatoria(index) {
    const angulos = [-7, 5, -4, 6, -2, 4, -6, 3, -5, 7];
    return angulos[index % angulos.length];
}

function cargarFotos() {
    const contenedor = document.getElementById('contenedor-fotos');
    if (!contenedor) return;

    contenedor.innerHTML = ""; 

    // Cargamos en orden para que la foto 1 quede arriba del todo
    for (let i = config.totalFotos; i >= 1; i--) {
        const card = document.createElement('div');
        card.classList.add('polaroid-card');
        
        const rotacion = obtenerRotacionAleatoria(i);
        card.style.transform = `rotate(${rotacion}deg)`;
        card.style.zIndex = i;

        const img = document.createElement('img');
        img.src = `${config.carpetaFotos}/foto${i}.jpeg`;
        img.alt = `Nuestro Momento nº ${i}`;
        
        img.onerror = function() {
            if (this.src.includes('.jpeg')) {
                this.src = this.src.replace('.jpeg', '.jpg');
            } else {
                card.remove(); 
                reordenarZIndex();
            }
        };

        // EVENTO CORREGIDO: Al hacer clic o tocar en móvil
        card.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el clic se descarte por el window.onclick
            
            // Si ya está activa, la mandamos al fondo para poder ver la siguiente
            if (card.classList.contains('active')) {
                card.classList.remove('active');
                card.style.zIndex = i; // Vuelve a su lugar original en la pila
            } else {
                // Quitamos la clase activa de cualquier otra foto primero
                document.querySelectorAll('.polaroid-card').forEach(c => c.classList.remove('active'));
                // Activamos esta foto (se endereza y escala por CSS)
                card.classList.add('active');
            }
        });

        card.appendChild(img);
        contenedor.appendChild(card);
    }
}

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
        icon.innerHTML = "❤️"; 
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
    
    const r = Math.random();
    if (r < 0.4) {
        p.innerHTML = '❤️';
        p.style.color = '#ffb3c1'; 
    } else if (r < 0.7) {
        p.innerHTML = '✨'; 
        p.style.color = '#ffe4a0';
    } else {
        p.innerHTML = '🦋'; 
        p.style.color = '#ffccd5';
    }

    p.style.left = Math.random() * 100 + 'vw';
    p.style.fontSize = (Math.random() * 10 + 12) + 'px';
    p.style.animationDuration = (Math.random() * 4 + 5) + 's';
    
    container.appendChild(p);
    setTimeout(() => p.remove(), 7000);
}

window.onclick = function(event) {
    if (!event.target.closest('.music-player')) {
        const lista = document.getElementById("lista-musica");
        if (lista && !lista.classList.contains('hidden')) {
            lista.classList.add('hidden');
        }
    }
    // Si toca cualquier parte de la pantalla que no sea una foto, desactiva la foto actual
    if (!event.target.closest('.polaroid-card')) {
        document.querySelectorAll('.polaroid-card').forEach(c => c.classList.remove('active'));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    cargarFotos();
    setInterval(crearParticula, 500);
});
