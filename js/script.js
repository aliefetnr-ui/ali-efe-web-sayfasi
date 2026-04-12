/* ============================================
   AURA AI — Main JavaScript
   ============================================ */

'use strict';

// ============================================
// PRELOADER
// ============================================
const preloader = document.querySelector('.preloader');
const preloaderBar = document.querySelector('.preloader__bar');

let preloaderHidden = false;

function hidePreloader() {
  if (preloaderHidden || !preloader) return;
  preloaderHidden = true;
  if (preloaderBar) preloaderBar.style.width = '100%';
  setTimeout(() => {
    preloader.classList.add('hidden');
    triggerHeroReveal();
  }, 300);
}

// Try on DOMContentLoaded (earlier, more reliable than window.load)
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(hidePreloader, 500);
});

// Also try on window.load
window.addEventListener('load', hidePreloader);

// Hard fallback — always fires
setTimeout(hidePreloader, 1500);

// ============================================
// HERO REVEAL
// ============================================
function triggerHeroReveal() {
  const heroRevealEls = document.querySelectorAll('.hero .reveal');
  heroRevealEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 80 + i * 90);
  });
}

// ============================================
// CUSTOM CURSOR
// ============================================
const cursorDot  = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
  let mX = -100, mY = -100;
  let rX = -100, rY = -100;
  let raf;

  document.addEventListener('mousemove', (e) => {
    mX = e.clientX;
    mY = e.clientY;
    cursorDot.style.left = mX + 'px';
    cursorDot.style.top  = mY + 'px';
  });

  function animateRing() {
    rX += (mX - rX) * 0.1;
    rY += (mY - rY) * 0.1;
    cursorRing.style.left = rX + 'px';
    cursorRing.style.top  = rY + 'px';
    raf = requestAnimationFrame(animateRing);
  }
  animateRing();

  document.addEventListener('mouseleave', () => document.body.classList.add('cursor-hidden'));
  document.addEventListener('mouseenter', () => document.body.classList.remove('cursor-hidden'));

  const hoverEls = document.querySelectorAll('a, button, .service-card, .process__step');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

// ============================================
// NAVIGATION — SCROLL STATE
// ============================================
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ============================================
// MOBILE MENU
// ============================================
const burger      = document.querySelector('.nav__burger');
const mobileMenu  = document.querySelector('.mobile-menu');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    burger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ============================================
// SCROLL REVEAL — IntersectionObserver
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Stagger children if container has data-stagger
      if (entry.target.dataset.stagger) {
        const children = entry.target.querySelectorAll('.reveal');
        children.forEach((child, i) => {
          setTimeout(() => child.classList.add('visible'), i * 80);
        });
      }
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  // Skip hero elements (handled by triggerHeroReveal)
  if (!el.closest('.hero')) {
    revealObserver.observe(el);
  }
});

// ============================================
// COUNTER ANIMATION
// ============================================
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start    = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value    = Math.floor(easeOutCubic(progress) * target);
    el.textContent = value;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

const statsBlock = document.querySelector('.about__stats');
if (statsBlock) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat__num[data-target]').forEach(animateCounter);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counterObserver.observe(statsBlock);
}

// ============================================
// HERO CANVAS — Neural Network Particles
// ============================================
const canvas = document.getElementById('heroCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const ACCENT_RGB = '6, 182, 212';
  const PARTICLE_COUNT = window.innerWidth < 768 ? 40 : 75;
  const MAX_DIST = 140;
  let W, H, particles = [], animId;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  }

  class Particle {
    constructor() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.r  = Math.random() * 1.2 + 0.4;
      this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ACCENT_RGB}, ${this.opacity})`;
      ctx.fill();
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${ACCENT_RGB}, ${alpha})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    animId = requestAnimationFrame(animate);
  }

  resize();
  animate();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });
}

// ============================================
// PAGE TRANSITIONS
// ============================================
const transitionOverlay = document.querySelector('.page-transition');
if (transitionOverlay) {
  // Fade in on load
  window.addEventListener('pageshow', () => {
    setTimeout(() => transitionOverlay.classList.add('hidden'), 50);
  });

  // Fade out on navigate
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      transitionOverlay.classList.remove('hidden');
      setTimeout(() => { window.location.href = href; }, 400);
    });
  });
}
