// ============================================
// FUNCIONES ESPECÍFICAS DE ALQUILER
// ============================================

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email')?.trim();

    if (!email) {
        showNotification('Por favor, introduce tu email', 'error');
        return;
    }

    console.log('Suscripción Newsletter:', email);
    showNotification('¡Gracias por suscribirte!', 'success');
    e.target.reset();
}

// INICIALIZACIÓN DE ESTA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    console.log('✅ Lógica de Alquiler activada');
});

function openTab(tabName) {
    // 1. Esconder todos los contenidos de las pestañas
    const contents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < contents.length; i++) {
        contents[i].classList.remove("active");
    }

    // 2. Quitar la clase 'active' de todos los botones
    const buttons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }

    // 3. Mostrar la pestaña actual y añadir clase 'active' al botón que hizo click
    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");
}