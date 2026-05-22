/* ═══════════════════════════════════════════
   PORTFOLIO JS — Yash Jain
   Snap-scroll site inspired by rishabh-upadhyay.com
═══════════════════════════════════════════ */

/* ── SECTION IDs IN ORDER ── */
const sections = ['home','p1','p2','work','about','p3','contact'];

/* ── INTRO ANIMATION ── */
function runIntro() {
  const letters = document.querySelectorAll('.il');
  const intro   = document.getElementById('intro');
  const nav     = document.getElementById('mainNav');

  // Stagger letters in
  letters.forEach((l, i) => {
    setTimeout(() => l.classList.add('show'), 80 + i * 55);
  });

  // Hold, then fade out overlay
  setTimeout(() => {
    intro.style.transition = 'opacity .7s ease';
    intro.style.opacity = '0';
    setTimeout(() => {
      intro.style.display = 'none';
      // Animate in content for first section
      activateSection('home');
    }, 700);
  }, 1800);

  // Show nav after intro
  setTimeout(() => nav.classList.add('visible'), 2000);
}

/* ── ACTIVATE SECTION (fade in corner quotes + bottom text) ── */
function activateSection(id) {
  const sec = document.getElementById(id);
  if (!sec) return;
  sec.querySelectorAll('.corner-quote, .bottom-text').forEach(el => {
    el.classList.add('show');
  });
}

/* ── SCROLL DETECTION ── */
const scroller = document.getElementById('scroller');
let currentIdx = 0;

function getVisibleSection() {
  const scrollTop = scroller.scrollTop;
  const height    = window.innerHeight;
  return Math.round(scrollTop / height);
}

scroller.addEventListener('scroll', () => {
  const idx = getVisibleSection();
  if (idx !== currentIdx) {
    currentIdx = idx;
    const id = sections[idx];

    // Update nav active
    document.querySelectorAll('.fnav-link').forEach(l => {
      l.classList.toggle('active', l.dataset.s === id || (idx < 3 && l.dataset.s === 'home') || (idx === 3 && l.dataset.s === 'work') || (idx === 4 && l.dataset.s === 'about') || (idx === 6 && l.dataset.s === 'contact'));
    });

    // Update dots
    document.querySelectorAll('.sec-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });

    // Animate section content in
    activateSection(id);
  }
}, { passive: true });

/* ── HERO PARTICLE CANVAS ── */
function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Create particles
  const NUM = window.innerWidth < 600 ? 60 : 120;
  for (let i = 0; i < NUM; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.4 + 0.1,
    });
  }

  let mouse = { x: W / 2, y: H / 2 };
  canvas.parentElement.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${0.06 * (1 - d / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      // Mouse repulsion
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 100) {
        p.vx -= (dx / d) * 0.08;
        p.vy -= (dy / d) * 0.08;
      }

      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.99;
      p.vy *= 0.99;

      // Wrap
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.o})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
}

/* ── SECTION DOTS ── */
function buildDots() {
  const container = document.createElement('div');
  container.className = 'sec-dots';
  sections.forEach((id, i) => {
    const d = document.createElement('div');
    d.className = 'sec-dot' + (i === 0 ? ' active' : '');
    d.title = id;
    d.addEventListener('click', () => {
      scroller.scrollTo({ top: i * window.innerHeight, behavior: 'smooth' });
    });
    container.appendChild(d);
  });
  document.body.appendChild(container);
}

/* ── NAV LINK CLICK ── */
document.querySelectorAll('.fnav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id  = link.dataset.s;
    const idx = sections.indexOf(id);
    if (idx !== -1) {
      scroller.scrollTo({ top: idx * window.innerHeight, behavior: 'smooth' });
    }
  });
});

/* ── PROJECT FILTER ── */
const filterBtns = document.querySelectorAll('.wf');
filterBtns[0]?.classList.add('active');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.f;
    document.querySelectorAll('.proj-row').forEach(row => {
      row.classList.toggle('hidden', f !== 'all' && row.dataset.cat !== f);
    });
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
    lbl.textContent = 'Send →';
    succ.style.display = 'block';
    btn.disabled = false;
    e.target.reset();
    setTimeout(() => { succ.style.display = 'none'; }, 5000);
  }, 900);
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  buildDots();
  initCanvas();
  runIntro();
});
