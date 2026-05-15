// ==========================================
// 1. CONTROL DEL PRELOADER Y MÁQUINA DE ESCRIBIR
// ==========================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => { 
                preloader.style.display = 'none'; 
            }, 500);
        }
        startTypewriter();
    }, 2000);
});

function startTypewriter() {
    const text = "Gestión vehicular corporativa y soluciones eficientes.";
    const speed = 60;
    let i = 0;
    const target = document.getElementById("typewriter");
    
    if (!target) return; // Validación por si no encuentra el elemento

    function type() {
        if (i < text.length) {
            target.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// ==========================================
// 2. EFECTO DE APARICIÓN AL HACER SCROLL (SCROLL REVEAL)
// ==========================================
const observerOptions = {
    threshold: 0.1
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Aplicar animación a todas las tarjetas de servicios de gestoría
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease-out";
    cardObserver.observe(card);
});

// ==========================================
// 3. ACTIVACIÓN DE REDES SOCIALES EN CONTACTO
// ==========================================
const contactSection = document.querySelector('.contact');

/* ACTIVACIÓN POR INTERSECTION OBSERVER */
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            contactSection.classList.add('active');
        }
    });
}, {
    threshold: 0.05
});

if (contactSection) {
    contactObserver.observe(contactSection);
}

/* REFUERZO PARA MÓVIL */
window.addEventListener('scroll', () => {
    if (contactSection) {
        const contactTop = contactSection.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (contactTop < screenHeight - 120) {
            contactSection.classList.add('active');
        }
    }
});

// ==========================================
// 4. LÓGICA DE ENVÍO DE FORMULARIO (FORMSPREE + WHATSAPP)
// ==========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const miNumero = "5540701518"; 
        const formspreeID = "xaqvzprz"; 

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const tel = document.getElementById('telefono').value;
        const mensaje = document.getElementById('mensaje').value;

        // Envío asíncrono a Formspree de manera silenciosa
        fetch(`https://formspree.io/f/${formspreeID}`, {
            method: 'POST',
            body: new FormData(this),
            headers: { 'Accept': 'application/json' }
        }).catch(error => console.error("Error al enviar a Formspree:", error));

        // Redirección inmediata a WhatsApp con los datos limpios de la gestoría
        const msjWA = `*Nueva Consulta Gestoría LS*%0A%0A*Cliente/Empresa:* ${nombre}%0A*Correo:* ${email}%0A*Tel:* ${tel}%0A*Trámite:* ${mensaje}`;
        window.open(`https://wa.me/${miNumero}?text=${msjWA}`, '_blank');

        this.reset();
    });
}

console.log("Infraestructura de Gestoría LS cargada correctamente.");