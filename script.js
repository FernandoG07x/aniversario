const config = {
    totalFotos: 36,
    carpetaFotos: "fotos",
    carpetaMusica: "Musica",
    fechaAniversario: "2025-09-06T00:00:00"
};

let fotoActual = 0;
let fotosCargadas = [];
let carruselInterval;

// TEXTOS PERSONALIZADOS PARA CADA FOTO
// Puedes editar los textos entre comillas para personalizar los momentos
const dedicatorias = {
    1: "El día en que mi mundo cambió por completo... ✨",
    2: "Esa sonrisa tuya que me desarma cada día. 😍",
    3: "Nuestra primera aventura juntos de tantas.",
    4: "Tus abrazos son mi lugar seguro en el mundo.",
    5: "La complicidad perfecta en una sola foto. 🔒",
    6: "Cada momento a tu lado se convierte en mi favorito. 💖",
    7: "El mejor regalo de mi vida siempre serás tú.",
    8: "Simplemente nosotros, sin filtros y con todo el corazón.",
    9: "Donde sea, pero si es contigo, mucho mejor. 🌍",
    10: "Esa mirada que me dice todo sin hablar.",
    11: "Un recuerdo más guardado en el baúl de mis tesoros.",
    12: "Gracias por hacerme sonreír incluso en los días difíciles. ☀️",
    13: "Mi persona favorita en todo el universo.",
    14: "La forma más bonita de coincidir en esta vida.",
    15: "Detalles pequeños que hacen historias gigantes. ✨",
    16: "Amo la paz que me da estar a tu lado.",
    17: "Risas, locuras y un amor que no se acaba.",
    18: "Contigo el tiempo siempre se pasa volando. ⏳",
    19: "Mi mejor decisión siempre vas a ser tú.",
    20: "Coleccionando momentos inolvidables a tu lado. 📸",
    21: "Tu felicidad siempre va a ser la mía.",
    22: "Un pedacito de nuestra historia juntos.",
    23: "Haces que todo lo bonito valga la pena.",
    24: "Mi hogar no es un lugar, es a tu lado. 🏡",
    25: "Gracias por ser mi refugio, mi amor y mi vida. 💕",
    26: "Por esta y mil fotos más escribiendo nuestra historia. Te amo."
};

function cargarFotos() {
    const contenedor = document.getElementById('contenedor-fotos');
    if (!contenedor) return;

    contenedor.innerHTML = ""; 

    for (let i = 1; i <= config.totalFotos; i++) {
        const img = document.createElement('img');
        img.src = `${config.carpetaFotos}/foto${i}.jpeg`;
        img.classList.add('foto-pareja');
        if (i === 1) img.classList.add('active');
        img.alt = `Momento ${i}`;
        
        img.onerror = function() {
            if (this.src.includes('.jpeg')) {
                this.src = this.src.replace('.jpeg', '.jpg');
            } else {
                this.remove();
                actualizarArrayFotos();
            }
        };
        contenedor.appendChild(img);
    }
    
    setTimeout(actualizarArrayFotos, 200);
}

function actualizarArrayFotos() {
    fotosCargadas = document.querySelectorAll('.foto-pareja');
    mostrarFoto(0);
    iniciarAutoplay();
}

function mostrarFoto(indice) {
    if (fotosCargadas.length === 0) return;
    
    if (fotosCargadas[fotoActual]) {
        fotosCargadas[fotoActual].classList.remove('active');
    }
    
    fotoActual = (indice + fotosCargadas.length) % fotosCargadas.length;
    fotosCargadas[fotoActual].classList.add('active');
    
    document.getElementById('foto-contador').innerText = `${fotoActual + 1} / ${fotosCargadas.length}`;
    
    const numeroFotoReal = fotoActual + 1;
    const texto = dedicatorias[numeroFotoReal] || `Cada momento a tu lado es mi favorito. (Momento ${numeroFotoReal})`;
    document.getElementById('foto-dedicatoria').innerText = texto;
}

function cambiarFoto(direccion) {
    mostrarFoto(fotoActual + direccion);
    reiniciarAutoplay();
}

function iniciarAutoplay() {
    carruselInterval = setInterval(() => {
        cambiarFoto(1);
    }, 4500);
}

function reiniciarAutoplay() {
    clearInterval(carruselInterval);
    iniciarAutoplay();
}

function toggleMenu() {
    document.getElementById("lista-musica").classList.toggle("show");
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

function actualizarContador() {
    const fechaInicio = new Date(config.fechaAniversario);
    const ahora = new Date();
    
    let difMilisecon = ahora - fechaInicio;
    
    let totalMinutos = Math.floor(difMilisecon / 60000);
    let totalHoras = Math.floor(totalMinutos / 60);
    let totalDias = Math.floor(totalHoras / 24);
    
    let meses = Math.floor(totalDias / 30.4375);
    let diasRestantes = Math.floor(totalDias % 30.4375);
    let horasRestantes = totalHoras % 24;
    let minutosRestantes = totalMinutos % 60;
    
    document.getElementById('meses').innerText = String(meses).padStart(2, '0');
    document.getElementById('dias').innerText = String(diasRestantes).padStart(2, '0');
    document.getElementById('horas').innerText = String(horasRestantes).padStart(2, '0');
    document.getElementById('minutos').innerText = String(minutosRestantes).padStart(2, '0');
}

function crearParticula() {
    const container = document.getElementById('particles-container');
    if(!container) return;
    
    if (container.children.length > 40) return;
    
    const p = document.createElement('div');
    p.classList.add('particle');
    
    const r = Math.random();
    if (r < 0.45) p.innerHTML = '❤️';
    else if (r < 0.75) p.innerHTML = '🦋';
    else p.innerHTML = '✨';

    p.style.left = Math.random() * 100 + 'vw';
    p.style.fontSize = (Math.random() * 10 + 14) + 'px';
    p.style.animationDuration = (Math.random() * 4 + 4) + 's';
    
    container.appendChild(p);
    setTimeout(() => p.remove(), 7000);
}

window.onclick = function(event) {
    if (!event.target.closest('.music-player')) {
        const lista = document.getElementById("lista-musica");
        if (lista && lista.classList.contains('show')) {
            lista.classList.remove('show');
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    cargarFotos();
    actualizarContador();
    setInterval(actualizarContador, 60000);
    setInterval(crearParticula, 500);
});
