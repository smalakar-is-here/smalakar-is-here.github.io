// Theme toggle
(function themeToggle() {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  if (saved) root.setAttribute('data-theme', saved);
  updateThemeIcon();

  function toggle() {
    const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', current);
    localStorage.setItem('theme', current);
    updateThemeIcon();
  }
  function updateThemeIcon() {
    const isDark = root.getAttribute('data-theme') === 'dark';
    document.querySelector('.icon-moon').style.display = isDark ? 'block' : 'none';
    document.querySelector('.icon-sun').style.display = isDark ? 'none' : 'block';
  }
  if (btn) btn.addEventListener('click', toggle);
})();

// Mobile nav
(function mobileNav() {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  menu.addEventListener('click', e => {
    if (e.target.tagName === 'A') menu.classList.remove('open');
  });
})();

// Smooth scroll
(function smoothScroll() {
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', `#${id}`);
    }
  });
})();

// Scroll progress + back to top
(function scrollUX() {
  const bar = document.querySelector('.scroll-progress__bar');
  const topBtn = document.getElementById('back-to-top');
  const docH = () => document.documentElement.scrollHeight - window.innerHeight;

  function onScroll() {
    const pct = (window.scrollY / Math.max(docH(), 1)) * 100;
    if (bar) bar.style.width = `${pct}%`;
    if (topBtn) {
      if (window.scrollY > 400) topBtn.classList.add('show');
      else topBtn.classList.remove('show');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  topBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// Reveal on scroll
(function reveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

// Filters
(function filters() {
  const controls = document.querySelectorAll('.filter');
  const items = document.querySelectorAll('.project');
  if (!controls.length || !items.length) return;

  controls.forEach(btn => {
    btn.addEventListener('click', () => {
      controls.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('is-active'); btn.setAttribute('aria-selected', 'true');

      const tag = btn.dataset.filter;
      items.forEach(item => {
        const tags = item.dataset.tags.split(' ');
        const show = tag === 'all' || tags.includes(tag);
        item.style.display = show ? '' : 'none';
      });
    });
  });
})();

(function projectModal() {
  const modal = document.getElementById('project-modal');
  const openBtns = document.querySelectorAll('[data-open-project]');
  const closeBtns = modal?.querySelectorAll('[data-close-modal]');
  const title = modal?.querySelector('#modal-title');
  const desc = modal?.querySelector('.modal__desc');
  const gallery = modal?.querySelector('.modal__gallery');
  const links = modal?.querySelector('.modal__links');

  if (!modal || !openBtns.length) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.project');
      const name = card.querySelector('.card__title')?.textContent || 'Project';
      const description = card.querySelector('.card__desc')?.textContent || '';
      const imgSrc = card.querySelector('img')?.getAttribute('src') || '';
      const imgAlt = card.querySelector('img')?.getAttribute('alt') || '';

      title.textContent = name;
      desc.textContent = description;
      gallery.innerHTML = `<img src="${imgSrc}" alt="${imgAlt}" />`;
      links.innerHTML = `
        <a href="#" class="btn btn--primary" target="_blank" rel="noopener">Live demo</a>
        <a href="#" class="btn btn--ghost" target="_blank" rel="noopener">Source</a>
      `;

      modal.setAttribute('aria-hidden', 'false');
      modal.setAttribute('aria-modal', 'true');
      modal.querySelector('.modal__dialog').focus();
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.setAttribute('aria-hidden', 'true');
      modal.setAttribute('aria-modal', 'false');
    });
  });

  // Close on backdrop click
  modal.addEventListener('click', e => {
    if (e.target.classList.contains('modal__backdrop')) {
      modal.setAttribute('aria-hidden', 'true');
      modal.setAttribute('aria-modal', 'false');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      modal.setAttribute('aria-hidden', 'true');
      modal.setAttribute('aria-modal', 'false');
    }
  });
})();
