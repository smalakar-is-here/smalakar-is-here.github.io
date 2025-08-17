/**
 * Main application entry point
 */

/**
 * Set the current year in the footer
 */
const setFooterYear = () => {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
};

/**
 * Initialize all application features
 */
const initApp = () => {
  // Set footer year
  setFooterYear();
  
  // Initialize theme
  initTheme();
  
  // Initialize navigation
  initNavigation();
  
  // Initialize animations
  initSectionAnimations();
  initSmoothScroll();
  
  // Initialize research
  initResearch();
  
  // Initialize projects
  initProjects();
  
  // Add loaded class to body for initial animations
  document.body.classList.add('is-loaded');
};

// Initialize app when DOM is ready
onReady(initApp);

// Make app functions available globally
window.setFooterYear = setFooterYear;
window.initApp = initApp;
