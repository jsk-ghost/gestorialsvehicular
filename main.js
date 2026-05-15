// 1. ANIMACIÓN PLEXUS (FONDO NARANJA)
const canvas = document.getElementById('plexus-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.update();
        ctx.fillStyle = '#FF6600';
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.2, 0, Math.PI*2); ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 130) {
                ctx.strokeStyle = `rgba(255, 102, 0, ${1 - dist/130})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
            }
        }
    });
    requestAnimationFrame(animate);
}

for(let i=0; i<85; i++) particles.push(new Particle());
init(); animate();
window.onresize = init;

// 2. PRELOADER
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 500);
    }, 2000);
});

// 3. ENVÍO WHATSAPP
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const tel = document.getElementById('telefono').value;
    const msj = document.getElementById('mensaje').value;
    
    const textoWA = `*GESTORÍA LS ÉLITE*%0A*Nombre:* ${nombre}%0A*Email:* ${email}%0A*Tel:* ${tel}%0A*Trámite:* ${msj}`;
    window.open(`https://wa.me/5540701518?text=${textoWA}`, '_blank');
});