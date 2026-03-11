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

document.addEventListener('DOMContentLoaded', () => {
  cargarPisos();
});

function cargarPisos() {
  // 1. Llamamos al archivo JSON
  fetch('pisos.json')
    .then(respuesta => respuesta.json())
    .then(pisos => {
      const contenedor = document.getElementById('propertiesGrid');
      contenedor.innerHTML = ''; // Limpiamos por si acaso

      // 2. Por cada piso en el JSON, creamos su tarjeta HTML
      pisos.forEach(piso => {
        const tarjetaHtml = `
          <article 
            class="property-card animate-on-scroll" 
            data-tipo="${piso.tipo}" 
            data-zona="${piso.zona}" 
            data-precio="${piso.precioFiltro}" 
            data-habs="${piso.habitaciones}">
            
            <div class="property-image">
              <img src="${piso.imagen}" alt="${piso.titulo}" loading="lazy" 
                   onerror="this.src='https://via.placeholder.com/400x300/667eea/ffffff?text=Imagen+No+Disponible'">
              <span class="property-badge">${piso.estado}</span>
              <div class="property-price">${piso.precioDisplay}</div>
            </div>
            
            <div class="property-content">
              <h3 class="property-title">${piso.titulo}</h3>
              <div class="property-location">${piso.ubicacion}</div>
              
              <div class="property-features">
                <span class="feature">${piso.metros}</span>
                <span class="feature">${piso.distribucion}</span>
                <span class="feature">${piso.banos}</span>
                <span class="feature">${piso.extras}</span>
              </div>
              
              <p class="property-description">${piso.descripcion}</p>
              
              <div class="property-footer" style="display: flex; gap: 10px; margin-top: 15px">
                <a href="${piso.enlaceIdealista}" target="_blank" class="btn-primary">Ver ficha</a>
                <button class="btn-secondary" onclick="document.getElementById('seccion-formulario').scrollIntoView({ behavior: 'smooth' })">
                  Me interesa
                </button>
              </div>
            </div>
          </article>
        `;
        
        // 3. Añadimos la tarjeta al contenedor
        contenedor.innerHTML += tarjetaHtml;
      });

      // --- LO NUEVO VA AQUÍ ABAJO ---

      // 4. Aplicar animaciones a las tarjetas recién creadas
      if (typeof initScrollAnimations === 'function') {
        initScrollAnimations();
      }

      // 5. Ejecutar los filtros para que cuente cuántos pisos hay visibles al cargar
      filterProperties();
      
    })
    .catch(error => console.error('Error cargando los pisos:', error));
}