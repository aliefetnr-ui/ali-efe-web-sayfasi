// ========================================
// DOSYA: js/script.js (GÜNCELLENMIŞ)
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

    // ==========================================
    // CONTACT FORM HANDLING - PROFESSIONAL
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Form validation function
        function validateForm() {
            let isValid = true;
            
            // Get form fields
            const fullName = document.getElementById('fullName');
            const email = document.getElementById('email');
            const company = document.getElementById('company');
            const message = document.getElementById('message');
            const kvkk = document.getElementById('kvkk');
            
            // Get error elements
            const fullNameError = document.getElementById('fullNameError');
            const emailError = document.getElementById('emailError');
            const companyError = document.getElementById('companyError');
            const messageError = document.getElementById('messageError');
            const kvkkError = document.getElementById('kvkkError');
            
            // Reset errors
            fullNameError.classList.add('hidden');
            emailError.classList.add('hidden');
            companyError.classList.add('hidden');
            messageError.classList.add('hidden');
            kvkkError.classList.add('hidden');
            
            // Validate Full Name
            if (fullName.value.trim().length < 3) {
                fullNameError.classList.remove('hidden');
                fullName.classList.add('border-red-500');
                isValid = false;
            } else {
                fullName.classList.remove('border-red-500');
            }
            
            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                emailError.classList.remove('hidden');
                email.classList.add('border-red-500');
                isValid = false;
            } else {
                email.classList.remove('border-red-500');
            }
            
            // Validate Company
            if (company.value.trim().length < 2) {
                companyError.classList.remove('hidden');
                company.classList.add('border-red-500');
                isValid = false;
            } else {
                company.classList.remove('border-red-500');
            }
            
            // Validate Message
            if (message.value.trim().length < 10) {
                messageError.classList.remove('hidden');
                message.classList.add('border-red-500');
                isValid = false;
            } else {
                message.classList.remove('border-red-500');
            }
            
            // Validate KVKK
            if (!kvkk.checked) {
                kvkkError.classList.remove('hidden');
                isValid = false;
            }
            
            return isValid;
        }
        
        // Form submit handler
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm()) {
                // Scroll to first error
                const firstError = contactForm.querySelector('.border-red-500');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }
            
            // Get form data
            const formData = {
                fullName: document.getElementById('fullName').value.trim(),
                email: document.getElementById('email').value.trim(),
                company: document.getElementById('company').value.trim(),
                message: document.getElementById('message').value.trim(),
                timestamp: new Date().toISOString()
            };
            
            // Get button elements
            const submitBtn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            const originalBtnText = btnText.textContent;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-70', 'cursor-not-allowed');
            btnText.innerHTML = '<svg class="animate-spin h-5 w-5 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Gönderiliyor...';
            
            // Simulate AJAX request (Replace with real API call)
            setTimeout(function() {
                // Log data to console (for demo purposes)
                console.log('Form Data Submitted:', formData);
                
                // Show success notification
                showSuccessNotification();
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
                btnText.textContent = originalBtnText;
                
                // Optional: Send to actual backend
                /*
                fetch('https://your-api-endpoint.com/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    showSuccessNotification();
                    contactForm.reset();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Bir hata oluştu. Lütfen tekrar deneyin.');
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
                    btnText.textContent = originalBtnText;
                });
                */
                
            }, 1500); // Simulate network delay
        });
    }
    
    // ==========================================
    // SUCCESS NOTIFICATION FUNCTION
    // ==========================================
    function showSuccessNotification() {
        const notification = document.getElementById('successNotification');
        const overlay = document.getElementById('overlay');
        
        // Show overlay and notification
        overlay.classList.remove('hidden');
        notification.classList.remove('hidden');
        
        // Add fade-in animation
        notification.style.opacity = '0';
        overlay.style.opacity = '0';
        
        setTimeout(() => {
            notification.style.transition = 'opacity 0.5s ease-in-out';
            overlay.style.transition = 'opacity 0.5s ease-in-out';
            notification.style.opacity = '1';
            overlay.style.opacity = '1';
        }, 10);
        
        // Auto-hide after 4 seconds
        setTimeout(() => {
            hideSuccessNotification();
        }, 4000);
    }
    
    function hideSuccessNotification() {
        const notification = document.getElementById('successNotification');
        const overlay = document.getElementById('overlay');
        
        // Fade out
        notification.style.opacity = '0';
        overlay.style.opacity = '0';
        
        // Hide after animation
        setTimeout(() => {
            notification.classList.add('hidden');
            overlay.classList.add('hidden');
        }, 500);
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
