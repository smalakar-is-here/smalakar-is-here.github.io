/**
 * Animations module for handling section animations and smooth scrolling
 */

// Animation options
const ANIMATION_OFFSET = 100;
const ANIMATION_DELAY_BASE = 100;
const ANIMATION_DELAY_INCREMENT = 100;

/**
 * Initialize section animations
 */
const initSectionAnimations = () => {
  // Get all sections
  const sections = $$('section');
  
  if (!sections.length) return;
  
  // Add animation classes to sections
  sections.forEach((section, index) => {
    section.classList.add('animate-on-scroll');
    section.style.setProperty('--animation-order', index);
  });
  
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    initIntersectionObserver();
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    initScrollAnimationFallback();
  }
};

/**
 * Initialize IntersectionObserver for section animations
 */
const initIntersectionObserver = () => {
  const elements = $$('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const delay = ANIMATION_DELAY_BASE + (parseInt(element.style.getPropertyValue('--animation-order')) * ANIMATION_DELAY_INCREMENT);
        
        setTimeout(() => {
          element.classList.add('is-visible');
        }, delay);
        
        // Stop observing once the animation has been triggered
        observer.unobserve(element);
      }
    });
  }, {
    root: null, // viewport
    rootMargin: `0px 0px -${ANIMATION_OFFSET}px 0px`,
    threshold: 0.1
  });
  
  // Start observing elements
  elements.forEach(element => observer.observe(element));
};

/**
 * Fallback animation method using scroll event
 */
const initScrollAnimationFallback = () => {
  const elements = $$('.animate-on-scroll');
  
  const checkElementsInViewport = () => {
    elements.forEach(element => {
      if (!element.classList.contains('is-visible') && isInViewport(element, ANIMATION_OFFSET)) {
        const delay = ANIMATION_DELAY_BASE + (parseInt(element.style.getPropertyValue('--animation-order')) * ANIMATION_DELAY_INCREMENT);
        
        setTimeout(() => {
          element.classList.add('is-visible');
        }, delay);
      }
    });
  };
  
  // Check on scroll
  window.addEventListener('scroll', debounce(checkElementsInViewport, 50));
  
  // Initial check
  checkElementsInViewport();
};

/**
 * Initialize smooth scrolling for anchor links
 */
const initSmoothScroll = () => {
  const anchorLinks = $$('a[href^="#"]:not([href="#"])');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Get the target element
      const targetId = this.getAttribute('href');
      const targetElement = $(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Calculate header height for offset
        const headerHeight = $('.site-header')?.offsetHeight || 0;
        
        // Calculate the target position with offset
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
};

// Make animation functions available globally
window.initSectionAnimations = initSectionAnimations;
window.initIntersectionObserver = initIntersectionObserver;
window.initScrollAnimationFallback = initScrollAnimationFallback;
window.initSmoothScroll = initSmoothScroll;