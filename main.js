const canvas = document.getElementById('plexus-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let lastWidth = window.innerWidth; 

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    lastWidth = window.innerWidth;
    
    particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        ctx.fillStyle = '#FF6600';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
            let p2 = particles[j];
            let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 120) {
                ctx.strokeStyle = `rgba(255, 102, 0, ${1 - dist / 120})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    if (window.innerWidth !== lastWidth) {
        initCanvas();
    }
});

initCanvas();
animate();

// Lógica del Preloader
// NUEVO PRELOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => preloader.style.display = 'none', 800);
  }, 2000); // tiempo visible antes de desaparecer
});


// Formulario de WhatsApp
const form = document.getElementById('contactForm');

if(form){

    form.addEventListener('submit', async (e) => {

        e.preventDefault();

        const n = document.getElementById('nombre').value;
        const t = document.getElementById('tel').value;
        const m = document.getElementById('msj').value;

        const formData = new FormData(form);

        try {

            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if(response.ok){

                // ===== ABRIR WHATSAPP =====
                const textoWA =
`*GESTORÍA LS*%0A
*Nombre:* ${n}%0A
*Tel:* ${t}%0A
*Trámite:* ${m}`;

                window.open(
                    `https://wa.me/5540701518?text=${textoWA}`,
                    '_blank'
                );

                form.reset();

            } else {

                alert('Error enviando formulario');

            }

        } catch(error){

            alert('Error al enviar solicitud');

        }

    });

}