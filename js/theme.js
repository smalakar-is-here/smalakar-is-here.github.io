/**
 * Theme management module for handling dark/light mode
 */

// Theme values
const THEMES = {
  SYSTEM: 'system',
  LIGHT: 'light',
  DARK: 'dark'
};

// DOM elements
let themeToggle;
let themeIcons;

/**
 * Initialize theme functionality
 */
const initTheme = () => {
  themeToggle = $('#theme-toggle');
  
  if (!themeToggle) return;
  
  // Create theme icons
  themeToggle.innerHTML = `
    <span class="theme-icon theme-icon--system" aria-hidden="true">⚙️</span>
    <span class="theme-icon theme-icon--light" aria-hidden="true">☀️</span>
    <span class="theme-icon theme-icon--dark" aria-hidden="true">🌙</span>
    <span class="sr-only">Toggle theme</span>
  `;
  
  themeIcons = {
    system: $('.theme-icon--system'),
    light: $('.theme-icon--light'),
    dark: $('.theme-icon--dark')
  };
  
  // Apply saved theme or default to system
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
    setTheme(savedTheme);
  } else {
    setTheme(THEMES.SYSTEM);
  }
  
  // Add event listener for theme toggle
  themeToggle.addEventListener('click', cycleTheme);
  
  // Add transition class after initial load to prevent transition on page load
  setTimeout(() => {
    document.body.classList.add('theme-transition');
  }, 300);
};

/**
 * Set the theme
 * @param {string} theme - Theme to set (system, light, dark)
 */
const setTheme = (theme) => {
  // Remove any existing theme
  document.documentElement.removeAttribute('data-theme');
  
  // Apply the selected theme
  if (theme === THEMES.LIGHT) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else if (theme === THEMES.DARK) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    // System theme - check user preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (localStorage.getItem('theme') === THEMES.SYSTEM) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });
  }
  
  // Save theme preference
  localStorage.setItem('theme', theme);
  
  // Update active icon
  updateActiveIcon(theme);
};

/**
 * Update the active theme icon
 * @param {string} theme - Current theme
 */
const updateActiveIcon = (theme) => {
  if (!themeIcons) return;
  
  // Remove active class from all icons
  Object.values(themeIcons).forEach(icon => {
    if (icon) icon.classList.remove('active');
  });
  
  // Add active class to current theme icon
  const currentIcon = themeIcons[theme];
  if (currentIcon) currentIcon.classList.add('active');
};

/**
 * Cycle through themes (system -> light -> dark -> system)
 */
const cycleTheme = () => {
  const currentTheme = localStorage.getItem('theme') || THEMES.SYSTEM;
  
  switch (currentTheme) {
    case THEMES.SYSTEM:
      setTheme(THEMES.LIGHT);
      break;
    case THEMES.LIGHT:
      setTheme(THEMES.DARK);
      break;
    case THEMES.DARK:
    default:
      setTheme(THEMES.SYSTEM);
      break;
  }
};

// Make theme functions available globally
window.initTheme = initTheme;
window.setTheme = setTheme;
window.updateActiveIcon = updateActiveIcon;
window.cycleTheme = cycleTheme;