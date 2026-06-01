const config = {
    totalFotos: 26,
    carpetaFotos: "fotos",
    carpetaMusica: "Musica"
};

// Genera rotaciones fijas y orgánicas para el look desordenado de la pila
function obtenerRotacionAleatoria(index) {
    const angulos = [-6, 4, -3, 5, -2, 3, -5, 6, -4, 2];
    return angulos[index % angulos.length];
}

function cargarFotos() {
    const contenedor = document.getElementById('contenedor-fotos');
    if (!contenedor) return;

    contenedor.innerHTML = ""; 

    // Cargamos las imágenes de forma que la Foto 1 quede arriba del todo (Z-Index más alto)
    for (let i = 1; i <= config.totalFotos; i++) {
        const card = document.createElement('div');
        card.classList.add('polaroid-card');
        
        const rotacion = obtenerRotacionAleatoria(i);
        card.style.transform = `rotate(${rotacion}deg)`;
        
        // La foto 1 tendrá el z-index más alto de la pila inicial
        card.style.zIndex = config.totalFotos - i + 1;

        const img = document.createElement('img');
        img.src = `${config.carpetaFotos}/foto${i}.jpeg`;
        img.alt = `Nuestro Momento nº ${i}`;
        
        img.onerror = function() {
            if (this.src.includes('.jpeg')) {
                this.src = this.src.replace('.jpeg', '.jpg');
            } else {
                card.remove(); 
            }
        };

        // Lógica corregida para pasar las fotos al fondo al hacer clic de manera interactiva
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Si la tarjeta ya se está moviendo, ignorar clics rápidos
            if (card.classList.contains('shuffling')) return;

            card.classList.add('shuffling');

            // 1. Animación: Se desplaza a un lado simulando sacar la carta de la baraja
            const rotacionActual = obtenerRotacionAleatoria(i);
            card.style.transform = `translateX(120px) rotate(${rotacionActual + 10}deg) scale(1.05)`;
            card.style.opacity = "0.9";

            setTimeout(() => {
                // 2. Buscamos cuál es el z-index más bajo actualmente en uso
                let minZ = config.totalFotos;
                document.querySelectorAll('.polaroid-card').forEach(c => {
                    const z = parseInt(c.style.zIndex) || 0;
                    if (z < minZ) minZ = z;
                });

                // 3. Mandamos esta foto al fondo absoluto restándole 1 al menor z-index
                card.style.zIndex = minZ - 1;

                // 4. Regresamos la foto al centro (ahora quedará abajo visualmente de todo)
                card.style.transform = `translateX(0) rotate(${rotacionActual}deg) scale(1)`;
                card.style.opacity = "1";
                
                setTimeout(() => {
                    card.classList.remove('shuffling');
                }, 300);

            }, 300); 
        });

        card.appendChild(img);
        contenedor.appendChild(card);
    }
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
}

document.addEventListener("DOMContentLoaded", () => {
    cargarFotos();
    setInterval(crearParticula, 500);
});
