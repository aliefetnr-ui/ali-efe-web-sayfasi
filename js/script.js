// ========================================
// DOSYA: js/script.js
// ========================================

// Fade-in animations on scroll
document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in, .service-card, .feature-card, .reference-card');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('show');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Gönderiliyor...';
            submitBtn.classList.add('loading');
            
            // Simulate form submission (replace with actual API call)
            setTimeout(function() {
                submitBtn.innerHTML = '✓ Gönderildi';
                submitBtn.classList.remove('loading');
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.textContent = '✓ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.';
                contactForm.appendChild(successMsg);
                
                // Reset form
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(function() {
                    submitBtn.innerHTML = originalText;
                    successMsg.remove();
                }, 3000);
            }, 1500);
        });
    }

    // Service card "Detayları Gör" button functionality
    const serviceButtons = document.querySelectorAll('.service-card button');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Demo versiyonu: Bu özellik yakında aktif olacak!');
        });
    });

    // Add parallax effect to hero section background orbs
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.absolute.w-72, .absolute.w-96');
        
        parallaxElements.forEach((el, index) => {
            const speed = (index + 1) * 0.1;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.text-5xl');
    stats.forEach(stat => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue(stat, 0, parseInt(stat.textContent), 2000);
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(stat);
    });

    function animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        const timer = setInterval(function() {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
        }, 16);
    }

    // Add active state to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('text-cyan-400', 'font-semibold');
        }
    });

    console.log('BotMatik - Yapay Zeka Destekli Otomasyon Sistemleri');
});
```

---

**KULLANIM TALİMATLARI:**

1. Yukarıdaki kodları aşağıdaki klasör yapısıyla kaydedin:
```
project/
├── index.html
├── hizmetler.html
├── iletisim.html
├── css/
│   └── style.css
└── js/
    └── script.js
