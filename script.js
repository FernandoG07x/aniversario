document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('mariposas-container');
    const numMariposas = 30; // Número de mariposas a crear

    function crearMariposa() {
        const mariposa = document.createElement('div');
        mariposa.classList.add('mariposa');

        // Posición inicial aleatoria
        mariposa.style.left = Math.random() * 100 + '%';
        mariposa.style.top = Math.random() * 100 + '%';
        
        // Tamaño aleatorio
        const scale = Math.random() * 1 + 0.5;
        mariposa.style.transform = `scale(${scale})`;

        // Duración y retraso de la animación aleatorios
        const duration = Math.random() * 3 + 2; // Entre 2 y 5 segundos
        const delay = Math.random() * 2; // Retraso de hasta 2 segundos

        mariposa.style.animation = `fly ${duration}s ${delay}s infinite linear`;

        container.appendChild(mariposa);
    }

    // Crear las mariposas iniciales
    for (let i = 0; i < numMariposas; i++) {
        crearMariposa();
    }
});