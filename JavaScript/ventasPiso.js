/**
 * MyG Inmobiliaria - JavaScript Principal
 * Funcionalidades: navegación, animaciones, WhatsApp, formularios
 */

// ============================================
// 6. EVENT LISTENERS
// ============================================

function initEventListeners() {
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
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
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
    
    // Formulario de propiedad (ventasPiso.html)
    const propertyForm = document.getElementById('propertyForm');
    if (propertyForm) {
        propertyForm.addEventListener('submit', handlePropertyFormSubmit);
    }
    
    // Formulario de contacto
    const contactoForm = document.getElementById('contactoForm');
    if (contactoForm) {
        contactoForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Newsletter
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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}