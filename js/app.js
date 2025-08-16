/* Utility: qs/qsa */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* Safe DOM ready */
const onReady = (fn) => {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn, { once: true });
  else fn();
};

onReady(() => {
  setYear();
  initMobileNav();
  initScrollSpy();
  initThemeToggle();
  renderCertificates();
});

/* Footer year */
function setYear() {
  const y = new Date().getFullYear();
  const el = $("#year");
  if (el) el.textContent = y;
}

/* Mobile nav toggle */
function initMobileNav() {
  const btn = $(".nav-toggle");
  const menu = $("#nav-menu");
  if (!btn || !menu) return;

  const close = () => {
    menu.dataset.open = "false";
    btn.setAttribute("aria-expanded", "false");
  };
  const open = () => {
    menu.dataset.open = "true";
    btn.setAttribute("aria-expanded", "true");
  };

  btn.addEventListener("click", () => {
    const isOpen = menu.dataset.open === "true";
    isOpen ? close() : open();
  });

  // Close on link click (mobile)
  $$("#nav-menu a").forEach((a) => a.addEventListener("click", () => {
    if (getComputedStyle(btn).display !== "none") close();
  }));

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* ScrollSpy to highlight current section in nav */
function initScrollSpy() {
  const sections = $$("main section[id]");
  const navLinks = new Map($$("#nav-menu a").map(a => [a.getAttribute("href").slice(1), a]));

  if (!sections.length || !navLinks.size) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const link = navLinks.get(id);
      if (!link) return;
      if (entry.isIntersecting) {
        $$("#nav-menu a").forEach(a => {
          a.classList.remove("is-active");
          a.removeAttribute("aria-current");
        });
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 });

  sections.forEach(sec => obs.observe(sec));
}

/* Theme toggle: system/light/dark with localStorage */
function initThemeToggle() {
  const btn = $("#theme-toggle");
  if (!btn) return;

  const KEY = "theme-preference"; // "system" | "light" | "dark"

  const getPreference = () => localStorage.getItem(KEY) || "system";
  const apply = (pref) => {
    document.documentElement.setAttribute("data-theme", pref);
    btn.textContent = pref === "system" ? "Theme: System" : `Theme: ${pref[0].toUpperCase() + pref.slice(1)}`;
  };

  // Init
  apply(getPreference());

  btn.addEventListener("click", () => {
    const order = ["system", "light", "dark"];
    const current = getPreference();
    const next = order[(order.indexOf(current) + 1) % order.length];
    localStorage.setItem(KEY, next);
    apply(next);
  });
}

/* Certificates render */
function renderCertificates() {
  const mount = $("#cert-grid");
  if (!mount) return;

  const certs = [
    { title: "CCNA: Introduction to Networks", file: "ccna-itn-swagotam-malakar.pdf" },
    { title: "Introduction to Cybersecurity", file: "introduction-to-cybersecurity.pdf" },
    { title: "Cybersecurity Essentials", file: "cybersecurity-essentials.pdf" },
    { title: "Cybersecurity for Engineers", file: "cybersecurity-for-engineers.pdf" },
    { title: "DevOps for Engineers", file: "devops-for-engineers.pdf" },
    { title: "NDG Linux Essentials", file: "ndg-linux-essentials.pdf" },
    { title: "C Programming: CLA Essentials", file: "cla-programming-essentials-in-c.pdf" },
    { title: "C Language: Entry Level (CLE)", file: "cle-entry-level-c.pdf" },
    { title: "C Essentials 1", file: "c-essentials-1.pdf" },
    { title: "C Essentials 2", file: "c-essentials-2.pdf" },
    { title: "HackerRank Python (Basic)", file: "hackerrank-python-basic.pdf" },
    { title: "Red Hat RH124", file: "red-hat-rh124.pdf" },
    { title: "Red Hat RH134", file: "red-hat-rh134.pdf" },
    { title: "RH104 Attendance", file: "rh104-attendance.pdf" },
    { title: "Udemy: Python Complete for Beginners", file: "udemy-python-complete-beginners.pdf" },
    { title: "Udemy: Python Basics to Advanced", file: "udemy-python-basics-to-advanced.pdf" },
    { title: "Udemy: Python Bootcamp 2022", file: "udemy-python-bootcamp-2022.pdf" },
    { title: "Udemy: Java Beginner to Advanced", file: "udemy-java-beginner-to-advanced.pdf" },
    { title: "Udemy: LeetCode Top Interview (Java)", file: "udemy-leetcode-top-interview-java.pdf" }
  ];

  const frag = document.createDocumentFragment();

  certs.forEach(({ title, file }) => {
    const url = `assets/certificates/${file}`;
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${escapeHTML(title)}</h3>
      <p class="muted">${escapeHTML(file)}</p>
      <p><a class="button button--sm" href="${url}" target="_blank" rel="noopener">View PDF</a></p>
    `;
    frag.appendChild(card);
  });

  mount.appendChild(frag);
}

/* Minimal HTML escaper */
function escapeHTML(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
