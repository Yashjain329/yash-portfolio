/* Portfolio JS — Yash Jain */

/* ── NAV: sticky + mobile menu ── */
const nav       = document.getElementById('mainNav');
const navMenu   = document.getElementById('navMenu');
const hamburger = document.getElementById('navHamburger');

window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 50);
}, { passive: true });

hamburger.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
});
navMenu.querySelectorAll('.nav-link').forEach(l =>
  l.addEventListener('click', () => navMenu.classList.remove('open'))
);

/* ── TYPED EFFECT ── */
const phrases = [
  'Flutter apps',
  'Android experiences',
  'AI-powered tools',
  'Firebase backends',
  'GCP deployments',
  'cross-platform UIs',
];
let pi = 0, ci = 0, deleting = false;
const typed = document.getElementById('roleTyped');

function tick() {
  const word = phrases[pi];
  if (!deleting) {
    typed.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(tick, 2000); return; }
  } else {
    typed.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(tick, deleting ? 40 : 70);
}
tick();

/* ── SCROLL ANIMATIONS ── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = +e.target.dataset.delay || 0;
      setTimeout(() => e.target.classList.add('in'), delay);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

function setupAnims() {
  const groups = [
    { sel: '.highlight',    stagger: 60  },
    { sel: '.skill-card',   stagger: 50  },
    { sel: '.proj-card',    stagger: 50  },
    { sel: '.tl-entry',     stagger: 80  },
    { sel: '.cert-list li', stagger: 50  },
    { sel: '.contact-link', stagger: 40  },
  ];
  groups.forEach(({ sel, stagger }) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('anim');
      el.dataset.delay = i * stagger;
      io.observe(el);
    });
  });
}
setupAnims();

/* ── ACTIVE NAV ── */
const sectionIds = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
const navLinks   = document.querySelectorAll('.nav-link');

function updateNav() {
  const mid = window.scrollY + window.innerHeight * 0.4;
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
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* ── PROJECT FILTER ── */
document.querySelectorAll('.flt-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.flt-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.f;
    document.querySelectorAll('.proj-card').forEach(c => {
      c.classList.toggle('proj-hidden', f !== 'all' && c.dataset.cat !== f);
    });
  });
});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.getElementById(a.getAttribute('href').slice(1));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
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
  setTimeout(() => {
    lbl.textContent = 'Send Message';
    succ.style.display = 'block';
    btn.disabled = false;
    e.target.reset();
    setTimeout(() => { succ.style.display = 'none'; }, 5000);
  }, 1000);
}
