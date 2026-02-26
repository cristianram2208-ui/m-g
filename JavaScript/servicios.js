/**
 * MyG Inmobiliaria - JavaScript Principal
 * Funcionalidades: navegación, animaciones, WhatsApp, formularios
 */

// ============================================
// 6. EVENT LISTENERS
// ============================================

function initEventListeners() {
    // Scroll
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav')) {
            closeMenu();
        }
        
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown.active').forEach(d => {
                d.classList.remove('active');
            });
        }
    });
    
    // Cerrar al redimensionar a desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
    
    // Tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
    
    // Formulario newsletter si existe
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

// ============================================
// 8. INICIALIZACIÓN
// ============================================

function init() {
    injectDynamicStyles();
    createWhatsAppButton();
    initScrollAnimations();
    initEventListeners();
    handleHeaderScroll();
    
    console.log('✅ MyG Inmobiliaria - Web cargada correctamente');
}

// Iniciar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}