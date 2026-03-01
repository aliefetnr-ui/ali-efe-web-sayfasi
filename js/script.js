// ========================================
// DOSYA: js/script.js (AURA AI - FIXED)
// ========================================

// DOMContentLoaded - Sayfa tamamen yüklendikten sonra çalıştır
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // AOS (Animate On Scroll) Initialization
    // ========================================
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });

    // ========================================
    // Navbar Scroll Effect
    // ========================================
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }
    });

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('show');
        });
    }

});
