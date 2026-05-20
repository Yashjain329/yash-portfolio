/* Portfolio JS — Yash Jain */

/* ── NAV ── */
const nav       = document.getElementById('mainNav');
const navMenu   = document.getElementById('navMenu');
const hamburger = document.getElementById('navHamburger');

window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 48);
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
    if (ci === word.length) { deleting = true; setTimeout(tick, 2200); return; }
  } else {
    typed.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(tick, deleting ? 38 : 68);
}
tick();

/* ── SCROLL REVEAL ── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = +e.target.dataset.delay || 0;
      setTimeout(() => e.target.classList.add('in'), delay);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

function addReveal(selector, stagger = 60) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    el.dataset.delay = i * stagger;
    io.observe(el);
  });
}

addReveal('.fact',        70);
addReveal('.skill-row',   55);
addReveal('.proj',        45);
addReveal('.tl-row',      80);
addReveal('.cert',        40);
addReveal('.clink',       50);
addReveal('.proj-featured', 0);

/* ── ACTIVE NAV ── */
const sectionIds = ['hero','about','skills','projects','experience','contact'];
const navLinks   = document.querySelectorAll('.nav-link');

function updateNav() {
  const mid = window.scrollY + window.innerHeight * 0.38;
  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (mid >= el.offsetTop && mid < el.offsetTop + el.offsetHeight) {
      navLinks.forEach(l => l.classList.remove('active'));
      document.querySelector(`.nav-link[data-section="${id}"]`)?.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* ── PROJECT FILTER ── */
const filterBtns = document.querySelectorAll('.flt');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.f;
    const featured = document.querySelector('.proj-featured');
    if (featured) {
      featured.style.display = (f === 'all' || featured.dataset.cat === f) ? '' : 'none';
    }
    document.querySelectorAll('.proj').forEach(c => {
      c.classList.toggle('proj-hidden', f !== 'all' && c.dataset.cat !== f);
    });
  });
});

// Init first button active
filterBtns[0]?.classList.add('active');

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
  }, 900);
}
