/**
 * Utility functions for the portfolio website
 */

/**
 * Shorthand for document.querySelector
 * @param {string} selector - CSS selector
 * @returns {Element|null} - The first matching element or null
 */
const $ = (selector) => document.querySelector(selector);

/**
 * Shorthand for document.querySelectorAll
 * @param {string} selector - CSS selector
 * @returns {NodeList} - All matching elements
 */
const $$ = (selector) => document.querySelectorAll(selector);

/**
 * Execute a callback when the DOM is fully loaded
 * @param {Function} callback - Function to execute
 */
const onReady = (callback) => {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
};

/**
 * Escape HTML to prevent XSS
 * @param {string} unsafe - Unsafe string that might contain HTML
 * @returns {string} - Escaped string
 */
const escapeHTML = (unsafe) => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} - Debounced function
 */
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Check if an element is in the viewport
 * @param {Element} element - DOM element to check
 * @returns {boolean} - True if element is in viewport
 */
const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Make utilities available globally
window.$ = $;
window.$$ = $$;
window.onReady = onReady;
window.escapeHTML = escapeHTML;
window.debounce = debounce;
window.isInViewport = isInViewport;