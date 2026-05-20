/* ═══════════════════════════════════════════
   PORTFOLIO JS — Yash Jain
═══════════════════════════════════════════ */

/* ── SCROLL BAR ── */
const scrollBar = document.getElementById('scrollBar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  scrollBar.style.width = pct + '%';
}, { passive: true });

/* ── NAVBAR: sticky + hamburger ── */
const nav       = document.getElementById('mainNav');
const navMenu   = document.getElementById('navMenu');
const hamburger = document.getElementById('navHamburger');

window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 60);
}, { passive: true });

hamburger.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
});
navMenu.querySelectorAll('.nav-link').forEach(l =>
  l.addEventListener('click', () => navMenu.classList.remove('open'))
);

/* ── CURSOR BLOB ── */
const blob = document.getElementById('cursorBlob');
if (window.matchMedia('(pointer:fine)').matches) {
  document.addEventListener('mousemove', e => {
    blob.style.left = e.clientX + 'px';
    blob.style.top  = e.clientY + 'px';
  });
} else {
  blob.style.display = 'none';
}

/* ── TYPED EFFECT ── */
const phrases = [
  'Flutter Apps',
  'Android Experiences',
  'AI-Powered Tools',
  'Firebase Backends',
  'GCP Deployments',
  'Cross-Platform UIs',
];
let pi = 0, ci = 0, del = false;
const typed = document.getElementById('roleTyped');

function tick() {
  const w = phrases[pi];
  if (!del) {
    typed.textContent = w.slice(0, ++ci);
    if (ci === w.length) { del = true; setTimeout(tick, 2000); return; }
  } else {
    typed.textContent = w.slice(0, --ci);
    if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(tick, del ? 42 : 72);
}
tick();

/* ── SCROLL ANIMATIONS ── */
const animEls = document.querySelectorAll('.anim, .anim-left, .anim-right');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      const delay = +e.target.dataset.delay || 0;
      setTimeout(() => e.target.classList.add('in'), delay);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

animEls.forEach((el, i) => {
  if (!el.dataset.delay) el.dataset.delay = (i % 5) * 80;
  io.observe(el);
});

/* ── ACTIVE NAV HIGHLIGHT ── */
const sectionIds  = ['hero','about','skills','projects','experience','contact'];
const navLinks    = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const mid = window.scrollY + window.innerHeight / 2;
  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (mid >= el.offsetTop && mid < el.offsetTop + el.offsetHeight) {
      navLinks.forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.nav-link[data-section="${id}"]`);
      if (a) a.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* ── PROJECT FILTER ── */
const filterBtns  = document.querySelectorAll('.flt-btn');
const projCards   = document.querySelectorAll('.proj-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.f;

    projCards.forEach(c => {
      const match = f === 'all' || c.dataset.cat === f;
      c.classList.toggle('proj-hidden', !match);
    });
  });
});

/* ── SMOOTH SCROLL for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── CONTACT FORM ── */
function handleSubmit(e) {
  e.preventDefault();
  const btn  = document.getElementById('submitBtn');
  const lbl  = document.getElementById('btnLabel');
  const succ = document.getElementById('formSuccess');

  btn.disabled = true;
  lbl.textContent = 'Sending…';

  // Simulate — replace with EmailJS / Formspree in production
  setTimeout(() => {
    lbl.textContent = '✅ Sent!';
    succ.style.display = 'block';
    e.target.reset();
    setTimeout(() => {
      btn.disabled = false;
      lbl.textContent = 'Send Message';
      succ.style.display = 'none';
    }, 4500);
  }, 1200);
}

/* ── ADD ANIM CLASSES TO KEY ELEMENTS ── */
function setupAnims() {
  const targets = [
    { sel: '.callout',     cls: 'anim',       stagger: 90 },
    { sel: '.bento-card',  cls: 'anim',       stagger: 80 },
    { sel: '.proj-card',   cls: 'anim',       stagger: 60 },
    { sel: '.tl-card',     cls: 'anim-left',  stagger: 100 },
    { sel: '.cert-item',   cls: 'anim',       stagger: 70 },
    { sel: '.info-card',   cls: 'anim',       stagger: 80 },
    { sel: '.about-text-col', cls: 'anim-left', stagger: 0 },
    { sel: '.about-card-col', cls: 'anim-right', stagger: 100 },
  ];
  targets.forEach(({ sel, cls, stagger }) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      if (!el.classList.contains('anim') && !el.classList.contains('anim-left') && !el.classList.contains('anim-right')) {
        el.classList.add(cls);
        el.dataset.delay = i * stagger;
        io.observe(el);
      }
    });
  });
}
setupAnims();
