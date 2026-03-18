// ===========================================
// BAJA CONTROL DE PLAGAS — main.js
// ===========================================

// ===========================================
// 1. CONFIGURACIÓN
// ===========================================
const CONFIG = {
  phone:    '6862031217',
  whatsapp: '526862031217',
  email:    'contacto@bajacontroldeplagas.com'
};

// ===========================================
// 2. MENÚ MOBILE
// ===========================================
function initMenu() {
  const burger     = document.querySelector('.header__burger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!burger || !mobileMenu) return;

  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  });

  // Cerrar al hacer clic en cualquier link del menú
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });

  // Cerrar con Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      burger.focus();
    }
  });
}

// ===========================================
// 3. FAQ ACCORDION
// ===========================================
function initFAQ() {
  const questions = document.querySelectorAll('.faq__question');
  if (!questions.length) return;

  questions.forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Cerrar todos primero
      questions.forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const ans = b.nextElementSibling;
        if (ans) ans.style.maxHeight = null;
      });

      // Abrir el actual si estaba cerrado
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        const answer = btn.nextElementSibling;
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// ===========================================
// 4. SCROLL REVEAL
// ===========================================
function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Fallback sin IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.10,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// ===========================================
// 5. HEADER SCROLL SHADOW
// ===========================================
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.55)';
    } else {
      header.style.boxShadow = 'none';
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

// ===========================================
// 6. INICIALIZACIÓN
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initFAQ();
  initReveal();
  initHeaderScroll();
});
