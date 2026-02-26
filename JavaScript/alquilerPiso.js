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