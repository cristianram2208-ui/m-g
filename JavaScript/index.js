/**
 * MyG Inmobiliaria - JavaScript Principal
 * Maneja navegación, animaciones y funcionalidades interactivas
 */

// ============================================
// 6. LAZY LOADING MEJORADO
// ============================================

/**
 * Añade clase 'loaded' a imágenes cuando terminan de cargar
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
            
            img.addEventListener('error', () => {
                console.warn('Error cargando imagen:', img.src);
                img.classList.add('error');
            });
        }
    });
}

// ============================================
// 7. EVENT LISTENERS
// ============================================


  window.addEventListener('message', event => {
    if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormReady') {
      // Buscamos el iframe de HubSpot
      const hubspotIframe = document.querySelector('.hs-form-iframe');
      if (hubspotIframe) {
        const style = document.createElement('style');
        style.textContent = '.hs-back-link { display: none !important; }';
        hubspotIframe.contentDocument.head.appendChild(style);
      }
    }
  });


/**
 * Inicializa todos los event listeners
 */
function initEventListeners() {
    // Scroll para header
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav')) {
            closeMenu();
        }
    });
    
    // Cerrar menú al redimensionar a desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
            // Limpiar clases active de dropdowns
            document.querySelectorAll('.dropdown.active').forEach(d => {
                d.classList.remove('active');
            });
        }
    });
    
    // Tecla Escape para cerrar menús
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
            document.querySelectorAll('.dropdown.active').forEach(d => {
                d.classList.remove('active');
            });
        }
    });
}

// ============================================
// 8. INICIALIZACIÓN
// ============================================

/**
 * Inicializa todas las funcionalidades cuando el DOM está listo
 */
function init() {
    // Crear botón WhatsApp
    createWhatsAppButton();
    
    // Inicializar animaciones
    initScrollAnimations();
    
    // Inicializar lazy loading
    initLazyLoading();
    
    // Configurar event listeners
    initEventListeners();
    
    // Verificar scroll inicial (por si se recarga estando abajo)
    handleHeaderScroll();
    
    console.log('MyG Inmobiliaria - Web cargada correctamente');
}

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============================================
// 9. CSS DINÁMICO PARA NOTIFICACIONES
// ============================================

const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .notification {
        font-family: var(--font-main, 'Segoe UI', sans-serif);
    }
`;
document.head.appendChild(notificationStyles);