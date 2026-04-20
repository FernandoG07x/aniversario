// --- CONFIGURACIÓN DEL ÁLBUM ---
const config = {
    nombreCarpeta: "fotos",
    totalFotos: 23,
    extensiones: ['jpg', 'jpeg', 'png'] // Soporte para varios formatos
};

// --- CARGA AUTOMÁTICA DE FOTOS CON ANIMACIÓN ---
function cargarFotos() {
    const contenedor = document.querySelector('.album-wrapper'); // Usamos la clase del nuevo HTML
    if (!contenedor) return;

    for (let i = 1; i <= config.totalFotos; i++) {
        const img = document.createElement('img');
        
        // Intentamos cargar (por defecto .jpg, pero el navegador manejará el error si es .jpeg)
        img.src = `${config.nombreCarpeta}/foto${i}.jpg`; 
        img.classList.add('foto-pareja');
        img.alt = `Nuestro momento #${i}`;
        img.loading = "lazy";

        // Efecto de entrada: retraso progresivo para cada foto
        img.style.animationDelay = `${i * 0.15}s`;

        // Manejo de errores mejorado
        img.onerror = function() {
            // Si falla .jpg, intentamos .jpeg silenciosamente antes de ocultar
            if (!this.src.includes('.jpeg')) {
                this.src = this.src.replace('.jpg', '.jpeg');
            } else {
                this.remove(); 
            }
        };

        contenedor.appendChild(img);
    }
}

// --- FUNCIÓN PARA LA MÚSICA CON EFECTOS ---
function toggleMusica() {
    const audio = document.getElementById("miMusica");
    const btn = document.getElementById("btnMusica");
    const icon = document.getElementById("music-icon");
    const text = document.getElementById("music-text");
    
    if (audio.paused) {
        audio.play().catch(e => console.log("Interacción requerida para audio"));
        btn.classList.add('playing');
        icon.innerHTML = "⏸️";
        text.innerHTML = "Nuestra canción";
    } else {
        audio.pause();
        btn.classList.remove('playing');
        icon.innerHTML = "🎵";
        text.innerHTML = "Encender la magia";
    }
}

// --- GENERACIÓN DE PARTÍCULAS (MARIPOSAS Y CORAZONES) ---
function crearParticula() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    const particula = document.createElement('div');
    const esCorazon = Math.random() > 0.5;
    
    particula.classList.add(esCorazon ? 'corazon-float' : 'mariposa-float');
    particula.innerHTML = esCorazon ? '❤' : '🦋';
    
    // Posicionamiento
    particula.style.left = Math.random() * 100 + 'vw';
    particula.style.fontSize = (Math.random() * 10 + 15) + 'px';
    
    // Variación de color (tonos rosas y rojos)
    const hue = Math.floor(Math.random() * 30) + 330; 
    particula.style.color = `hsl(${hue}, 80%, 70%)`;
    
    // Duración aleatoria para que no suban todas iguales
    const duracion = (Math.random() * 5 + 5);
    particula.style.animation = `subirYDesaparecer ${duracion}s linear forwards`;
    
    container.appendChild(particula);
    
    // Limpieza
    setTimeout(() => particula.remove(), duracion * 1000);
}

// --- INICIALIZACIÓN ---
document.addEventListener("DOMContentLoaded", () => {
    cargarFotos();
    
    // Crear partículas continuamente
    setInterval(crearParticula, 600);

    // Opcional: Crear ráfaga al hacer click
    document.addEventListener('click', (e) => {
        for(let i=0; i<5; i++) {
            setTimeout(crearParticula, i * 100);
        }
    });
});
