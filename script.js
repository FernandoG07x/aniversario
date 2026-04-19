// --- CONFIGURACIÓN DEL ÁLBUM ---
const nombreCarpeta = "fotos"; // Nombre de tu carpeta
const totalFotos = 23; // CAMBIA ESTE NÚMERO cada vez que agregues más fotos

// --- CARGA AUTOMÁTICA DE FOTOS ---
function cargarFotos() {
    const contenedor = document.getElementById('contenedor-fotos');
    if (!contenedor) return;

    for (let i = 1; i <= totalFotos; i++) {
        const img = document.createElement('img');
        
        // Intentamos cargar la foto con extensión .jpg
        img.src = `${nombreCarpeta}/foto${i}.jpg`; 
        img.classList.add('foto-pareja');
        img.alt = `Momento #${i}`;
        img.loading = "lazy";

        // Si la foto no existe, la ocultamos
        img.onerror = function() {
            this.style.display = 'none'; 
        };

        contenedor.appendChild(img);
    }
}

// --- FUNCIÓN PARA LA MÚSICA ---
function toggleMusica() {
    const audio = document.getElementById("miMusica");
    const btn = document.getElementById("btnMusica");
    
    if (audio.paused) {
        audio.play().catch(e => console.log("Autoplay bloqueado"));
        btn.innerHTML = "⏸️ Pausar música";
    } else {
        audio.pause();
        btn.innerHTML = "🎵 Toca para música";
    }
}

// --- GENERACIÓN DE MARIPOSAS ---
document.addEventListener("DOMContentLoaded", () => {
    // Primero cargamos las fotos al iniciar
    cargarFotos();

    const container = document.getElementById('mariposas-container');
    
    function crearMariposa() {
        if (!container) return;
        
        const mariposa = document.createElement('div');
        mariposa.classList.add('mariposa');
        
        // Posición horizontal aleatoria
        mariposa.style.left = Math.random() * 100 + '%';
        // Empiezan desde la mitad inferior como pediste
        mariposa.style.top = (Math.random() * 50 + 50) + '%'; 
        
        // Tamaño aleatorio
        const size = Math.random() * 10 + 5;
        mariposa.style.width = size + 'px';
        mariposa.style.height = size + 'px';
        
        // Duración de animación aleatoria
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
