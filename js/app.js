// Theme: prefers-color-scheme + memory
(function themeManager() {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  if (stored) {
    apply(stored);
  } else {
    apply(prefersDark ? 'dark' : 'light');
  }

  toggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    apply(current === 'dark' ? 'light' : 'dark');
  });

  // Keep in sync if user changes OS theme
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) apply(e.matches ? 'dark' : 'light');
  });
})();

// Mobile nav toggle
(function mobileNav() {
  const btn = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  btn?.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
  });
})();

// Scroll progress
(function scrollProgress() {
  const bar = document.getElementById('scrollBar');
  function update() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    bar.style.width = pct + '%';
  }
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
})();

// Reveal on scroll
(function revealOnScroll() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('is-visible');
    });
  }, { threshold: 0.15 });

  els.forEach(el => io.observe(el));
})();

// Scroll‑spy active links
(function scrollSpy() {
  const links = [...document.querySelectorAll('.nav__link')];
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  function activateCurrent() {
    const pos = window.scrollY + 120; // offset for sticky header
    let current = null;
    for (const sec of sections) {
      if (sec.offsetTop <= pos) current = sec;
    }
    links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + (current?.id || '')));
  }

  activateCurrent();
  window.addEventListener('scroll', activateCurrent, { passive: true });
  window.addEventListener('resize', activateCurrent);
})();

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
