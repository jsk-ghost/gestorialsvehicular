// Efecto de aparición al hacer scroll (Scroll Reveal)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Aplicar animación a todas las tarjetas de servicios
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease-out";
    observer.observe(card);
});

console.log("Página del Despacho Contable cargada correctamente.");
// Activar redes sociales al entrar en contacto

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

contactObserver.observe(contactSection);

/* REFUERZO PARA MÓVIL */

window.addEventListener('scroll', () => {

    const contactTop = contactSection.getBoundingClientRect().top;

    const screenHeight = window.innerHeight;

    if (contactTop < screenHeight - 120) {

        contactSection.classList.add('active');

    }

});