// ============================================
// 1. NAVEGACIÓN Y MENÚ
// ============================================
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!navLinks || !mobileMenu) return;
    const isActive = navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileMenu.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!navLinks || !mobileMenu) return;
    navLinks.classList.remove('active');
    mobileMenu.classList.remove('active');
    mobileMenu.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

function toggleDropdown(e) {
    if (window.innerWidth > 768) return;
    e.preventDefault();
    e.stopPropagation();
    const dropdown = e.target.closest('.dropdown');
    if (!dropdown) return;
    const isActive = dropdown.classList.contains('active');
    document.querySelectorAll('.dropdown').forEach(d => { if (d !== dropdown) d.classList.remove('active'); });
    dropdown.classList.toggle('active', !isActive);
}

// ============================================
// 2. SCROLL Y CABECERA
// ============================================
function handleHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    if (window.pageYOffset > 50) { header.classList.add('scrolled'); } 
    else { header.classList.remove('scrolled'); }
}

let ticking = false;
function throttledScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleHeaderScroll();
            ticking = false;
        });
        ticking = true;
    }
}

// ============================================
// 3. WHATSAPP Y ANIMACIONES
// ============================================
function createWhatsAppButton() {
    if (document.querySelector('.whatsapp-float')) return;
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = `https://wa.me/34676123456?text=${encodeURIComponent('Hola, me interesa una propiedad')}`;
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.target = '_blank';
    whatsappBtn.innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png" width="35" height="35">';
    document.body.appendChild(whatsappBtn);
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));
}

// ============================================
// 4. UTILIDADES (Notificaciones / Estilos)
// ============================================
function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    const n = document.createElement('div');
    n.className = `notification notification-${type}`;
    n.textContent = message;
    n.style.cssText = `position:fixed; top:100px; right:20px; padding:1rem; border-radius:8px; color:white; z-index:10001; background:${type === 'success' ? '#27ae60' : '#e74c3c'}; animation: slideInRight 0.3s ease;`;
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 4000);
}

function injectDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }`;
    document.head.appendChild(style);
}

// ============================================
// INICIALIZACIÓN COMÚN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    injectDynamicStyles();
    createWhatsAppButton();
    initScrollAnimations();
    handleHeaderScroll();
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav')) closeMenu();
    });
});