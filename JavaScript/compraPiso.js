/**
 * MyG Inmobiliaria - JavaScript Principal
 * Funcionalidades: navegación, animaciones, WhatsApp, formularios, filtros
 */

// ============================================
// 5. FILTROS DE PROPIEDADES (compraPiso.html)
// ============================================

function filterProperties() {
    const tipo = document.getElementById('filterTipo')?.value;
    const zona = document.getElementById('filterZona')?.value;
    const precio = document.getElementById('filterPrecio')?.value;
    const habs = document.getElementById('filterHabs')?.value;
    
    const cards = document.querySelectorAll('.property-card');
    if (cards.length === 0) return;
    
    let visibleCount = 0;
    
    cards.forEach(card => {
        const cardTipo = card.getAttribute('data-tipo');
        const cardZona = card.getAttribute('data-zona');
        const cardPrecio = parseInt(card.getAttribute('data-precio'));
        const cardHabs = parseInt(card.getAttribute('data-habs'));
        
        let show = true;
        
        if (tipo && tipo !== 'todos' && cardTipo !== tipo) show = false;
        if (zona && zona !== 'todas' && cardZona !== zona) show = false;
        if (precio && precio !== 'todos' && cardPrecio > parseInt(precio)) show = false;
        if (habs && habs !== 'todos' && cardHabs < parseInt(habs)) show = false;
        
        if (show) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Mostrar/ocultar mensaje de no resultados
    const noResults = document.getElementById('noResults');
    if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
}

function resetFilters() {
    const filterTipo = document.getElementById('filterTipo');
    const filterZona = document.getElementById('filterZona');
    const filterPrecio = document.getElementById('filterPrecio');
    const filterHabs = document.getElementById('filterHabs');
    
    if (filterTipo) filterTipo.value = 'todos';
    if (filterZona) filterZona.value = 'todas';
    if (filterPrecio) filterPrecio.value = 'todos';
    if (filterHabs) filterHabs.value = 'todos';
    
    filterProperties();
    return false; // Prevenir navegación del enlace
}

function contactar(propiedad) {
    const mensaje = `Hola, estoy interesado en la propiedad: ${propiedad}. ¿Podrían darme más información?`;
    window.location.href = `contacto.html?mensaje=${encodeURIComponent(mensaje)}`;
}

// ============================================
// 7. EVENT LISTENERS
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
// 9. INICIALIZACIÓN
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