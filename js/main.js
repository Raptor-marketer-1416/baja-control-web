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
  const burger = document.querySelector('.header__burger');
  const nav    = document.querySelector('.header__nav');
  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.querySelector('span').textContent = isOpen ? '✕' : '☰';
  });

  // Cerrar al hacer clic en links (excepto padres de dropdown en mobile)
  nav.querySelectorAll('a:not(.nav__item--has-dropdown > a)').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.querySelector('span').textContent = '☰';
    });
  });

  // Acordeón dropdown en móvil
  document.querySelectorAll('.nav__item--has-dropdown > a').forEach(link => {
    link.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.closest('.nav__item--has-dropdown').classList.toggle('open');
      }
    });
  });

  // Cerrar con Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.querySelector('span').textContent = '☰';
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
// 4. TEXT FILL ON SCROLL — palabra por palabra
// ===========================================
function initTextFill() {
  const titles = document.querySelectorAll('.section-title');
  if (!titles.length) return;

  // Envuelve cada palabra en un span con delay escalonado
  function wrapWords(el) {
    let wordIndex = 0;

    function processNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const parts = node.textContent.split(/(\s+)/);
        const frag  = document.createDocumentFragment();
        parts.forEach(part => {
          if (part.trim().length) {
            const span = document.createElement('span');
            span.className = 'fill-word';
            span.style.setProperty('--wd', `${wordIndex * 90}ms`);
            span.textContent = part;
            frag.appendChild(span);
            wordIndex++;
          } else {
            frag.appendChild(document.createTextNode(part));
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'BR') {
        [...node.childNodes].forEach(processNode);
      }
    }

    [...el.childNodes].forEach(processNode);
  }

  titles.forEach(wrapWords);

  // Fallback sin IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    titles.forEach(t => t.classList.add('fill-active'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('fill-active'), 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });

  titles.forEach(t => observer.observe(t));
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
// 5. BOTONES DE CONVERSIÓN FLOTANTES
// ===========================================
const CONVERSION_CONFIG = {
  phone:       '+526862031217',
  whatsapp:    '526862031217',
  companyName: 'Baja Control de Plagas'
};

function initBotonesConversion() {
  // ── WHATSAPP ──────────────────────────────
  const waModal    = document.getElementById('wa-modal');
  const waForm     = document.getElementById('wa-form');
  const waCloseBtns = document.querySelectorAll('.open-wa-modal, .wa-modal-close');

  const openWaModal  = () => { waModal.classList.add('active');    document.body.style.overflow = 'hidden'; };
  const closeWaModal = () => { waModal.classList.remove('active'); document.body.style.overflow = ''; };

  document.querySelectorAll('.open-wa-modal').forEach(btn => btn.addEventListener('click', e => { e.preventDefault(); openWaModal(); }));
  document.querySelector('.wa-modal-close')?.addEventListener('click', closeWaModal);
  waModal?.addEventListener('click', e => { if (e.target === waModal) closeWaModal(); });

  waForm?.addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('wa-name').value.trim();
    const service = document.getElementById('wa-service').value;
    if (!name || !service) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'whatsapp_lead', lead_name: name, lead_service: service });

    const msg = `Hola, soy ${name}. Me interesa: ${service}.`;
    window.open(`https://wa.me/${CONVERSION_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    closeWaModal();
    waForm.reset();
  });

  // ── LLAMADA ───────────────────────────────
  const callModal      = document.getElementById('call-modal');
  const confirmCallBtn = document.getElementById('confirm-call-btn');
  const cancelCallBtn  = document.getElementById('cancel-call-btn');

  const openCallModal  = e => { e.preventDefault(); callModal.classList.add('active');    document.body.style.overflow = 'hidden'; };
  const closeCallModal = ()  => { callModal.classList.remove('active'); document.body.style.overflow = ''; };

  document.querySelectorAll('.open-call-modal').forEach(btn => btn.addEventListener('click', e => { e.preventDefault(); openCallModal(e); }));
  cancelCallBtn?.addEventListener('click', closeCallModal);
  callModal?.addEventListener('click', e => { if (e.target === callModal) closeCallModal(); });

  confirmCallBtn?.addEventListener('click', () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'call_confirmed', destination_number: CONVERSION_CONFIG.phone });
    window.location.href = 'tel:' + CONVERSION_CONFIG.phone;
    closeCallModal();
  });
}

// ===========================================
// 6. INICIALIZACIÓN
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initTextFill();
  initFAQ();
  initReveal();
  initBotonesConversion();
});
