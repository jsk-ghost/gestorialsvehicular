// ==========================================
// 1. GESTIÓN DEL FONDO ANIMADO PLEXUS ÉLITE
// ==========================================
const canvas = document.getElementById('plexus-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationFrameId;

// AJUSTE CRÍTICO: El canvas debe ocupar el alto total de la página, no solo de la pantalla.
function resizeCanvas() {
    // Obtenemos el alto total del documento, incluyendo lo que se scrollea
    const bodyHeight = Math.max(
        document.body.scrollHeight, document.body.offsetHeight,
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight
    );
    canvas.width = window.innerWidth;
    canvas.height = bodyHeight;
}

// Inicializar y vincular el resize a eventos
resizeCanvas();
// Usamos throttling ligero para no saturar con el resize al rotar el móvil
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 150);
});

// CLASE PARTÍCULA MEJORADA
class Particle {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        // Posición inicial aleatoria en todo el alto del documento
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        // Velocidad muy suave (Élite/Premium)
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        // Radio sutil
        this.r = 1.3;
    }
    draw() {
        ctx.fillStyle = '#FF6600'; // Naranja KTM
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }
    update(w, h) {
        // Al redimensionar, actualizamos los límites
        this.w = w;
        this.h = h;
        this.x += this.vx;
        this.y += this.vy;

        // Rebote fluido en los bordes totales
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
    }
}

// Inicialización de partículas distribuida
function initParticles() {
    const w = canvas.width;
    const h = canvas.height;
    particles = [];
    // Número base de partículas, ajustado por el alto total
    const density = (w * h) / 10000;
    const count = Math.min(Math.max(density, 50), 200); // Mínimo 50, máximo 200 para rendimiento

    for (let i = 0; i < count; i++) {
        particles.push(new Particle(w, h));
    }
}

// BUCLE DE ANIMACIÓN OPTIMIZADO
function animate() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Actualizar y dibujar cada partícula
    particles.forEach((p, i) => {
        p.update(w, h);
        p.draw();

        // Dibujar conexiones (plexus)
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            // Distancia de conexión (sutil)
            if (dist < 140) {
                // Opacidad basada en la distancia
                ctx.strokeStyle = `rgba(255, 102, 0, ${1 - dist / 140})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    });
    animationFrameId = requestAnimationFrame(animate);
}

// Iniciar
initParticles();
animate();


// ==========================================
// 2. GESTIÓN DEL PRELOADER (PANTALLA DE CARGA)
// ==========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        // Esperamos a que termine la transición de opacidad antes de quitarlo
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 1000); // 1 segundo de desvanecimiento
    }, 1500); // Espera 1.5 segundos antes de empezar a quitarlo
});


// ==========================================
// 3. LÓGICA DE FORMULARIO A WHATSAPP
// ==========================================
document.getElementById('contactForm').onsubmit = (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const tel = document.getElementById('tel').value;
    const msj = document.getElementById('msj').value;
    // URL Codificada para WhatsApp
    const textoWA = `*GESTORÍA LS ÉLITE*%0A*Nombre:* ${encodeURIComponent(nombre)}%0A*Tel:* ${encodeURIComponent(tel)}%0A*Trámite:* ${encodeURIComponent(msj)}`;
    window.open(`https://wa.me/5540701518?text=${textoWA}`, '_blank');
};