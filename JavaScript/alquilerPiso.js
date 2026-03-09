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
  // 1. Ocultar todos los contenidos de las pestañas
  const contents = document.getElementsByClassName("tab-content");
  for (let content of contents) {
    content.classList.remove("active");
    content.style.display = "none"; // Aseguramos que se oculte
  }

  // 2. Quitar la clase active de todos los botones
  const buttons = document.getElementsByClassName("tab-button");
  for (let button of buttons) {
    button.classList.remove("active");
  }

  // 3. Mostrar la pestaña actual y marcar el botón como activo
  const activeTab = document.getElementById(tabName);
  activeTab.classList.add("active");
  activeTab.style.display = "block"; // Mostramos el div que contiene su formulario
  
  event.currentTarget.classList.add("active");
}