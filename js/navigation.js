/**
 * Navigation module for handling mobile menu and scroll behavior
 */

// DOM elements
let navToggle;
let navMenu;
let navLinks;

/**
 * Initialize navigation functionality
 */
const initNavigation = () => {
  // Get DOM elements
  navToggle = $('.nav-toggle');
  navMenu = $('#nav-menu');
  navLinks = $$('#nav-menu a');
  
  if (!navToggle || !navMenu) return;
  
  // Set up mobile navigation toggle
  navToggle.addEventListener('click', toggleMobileNav);
  
  // Close mobile nav when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('is-active') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
      closeMobileNav();
    }
  });
  
  // Close mobile nav when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        closeMobileNav();
      }
    });
  });
  
  // Initialize scroll spy
  initScrollSpy();
};

/**
 * Toggle mobile navigation menu
 */
const toggleMobileNav = () => {
  if (navMenu.classList.contains('is-active')) {
    closeMobileNav();
  } else {
    openMobileNav();
  }
};

/**
 * Open mobile navigation menu
 */
const openMobileNav = () => {
  navToggle.setAttribute('aria-expanded', 'true');
  navMenu.classList.add('is-animated'); // Enable transitions
  
  // Use setTimeout to ensure the animation works properly
  setTimeout(() => {
    navMenu.classList.add('is-active');
    document.body.classList.add('nav-open');
  }, 10);
};

/**
 * Close mobile navigation menu
 */
const closeMobileNav = () => {
  navToggle.setAttribute('aria-expanded', 'false');
  navMenu.classList.remove('is-active');
  document.body.classList.remove('nav-open');
};

/**
 * Initialize scroll spy functionality to highlight active navigation links
 */
const initScrollSpy = () => {
  // Get all sections that should be tracked by scroll spy
  const sections = $$('section[id]');
  
  if (!sections.length) return;
  
  // Filter out nav links that don't point to sections
  const validNavLinks = Array.from(navLinks).filter(link => {
    const href = link.getAttribute('href');
    return href && href.startsWith('#') && href !== '#' && $(href);
  });
  
  // Update active link on scroll
  const updateActiveLink = () => {
    // Get current scroll position with a small offset for better UX
    const scrollPosition = window.scrollY + 100;
    
    // Find the current section
    let currentSection = null;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.id;
      }
    });
    
    // Update active class on navigation links
    validNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${currentSection}`);
    });
  };
  
  // Listen for scroll events (with debounce for performance)
  window.addEventListener('scroll', debounce(updateActiveLink, 100));
  
  // Initial update
  updateActiveLink();
};

// Make navigation functions available globally
window.initNavigation = initNavigation;
window.toggleMobileNav = toggleMobileNav;
window.openMobileNav = openMobileNav;
window.closeMobileNav = closeMobileNav;
window.initScrollSpy = initScrollSpy;