/**
 * Chia Commerce - Main JavaScript Module
 * Handles navigation toggle and cart badge updates
 */

// ============================================
// Mobile Navigation Toggle
// ============================================

const initNavigation = () => {
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  const navList = document.getElementById('nav-list');
  
  if (!navToggle || !nav || !navList) {
    console.warn('Navigation elements not found');
    return;
  }

  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    
    // Toggle expanded state
    nav.classList.toggle('nav--expanded');
    
    // Update aria-expanded for accessibility
    navToggle.setAttribute('aria-expanded', !isExpanded);
    
    // Trap focus within mobile menu when open
    if (!isExpanded) {
      trapFocus(navList);
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
    const isClickInside = nav.contains(event.target);
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    
    if (!isClickInside && isExpanded) {
      nav.classList.remove('nav--expanded');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close mobile menu on escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        nav.classList.remove('nav--expanded');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    }
  });

  // Close mobile menu when window is resized to desktop view
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      nav.classList.remove('nav--expanded');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
};

/**
 * Trap focus within an element (for mobile menu accessibility)
 */
const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return;
  
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
  element.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    
    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  });
};

// ============================================
// Cart Badge Management
// ============================================

/**
 * Update the cart badge count
 * @param {number} count - The number of items in the cart
 */
const updateCartBadge = (count) => {
  const cartBadge = document.getElementById('cart-count');
  
  if (!cartBadge) {
    console.warn('Cart badge element not found');
    return;
  }
  
  const numericCount = parseInt(count, 10);
  
  if (isNaN(numericCount) || numericCount < 0) {
    console.error('Invalid cart count:', count);
    return;
  }
  
  // Update the badge text
  cartBadge.textContent = numericCount;
  
  // Show or hide the badge based on count
  if (numericCount > 0) {
    cartBadge.classList.remove('cart-badge__count--hidden');
    cartBadge.setAttribute('aria-label', `${numericCount} item${numericCount !== 1 ? 's' : ''} in cart`);
  } else {
    cartBadge.classList.add('cart-badge__count--hidden');
    cartBadge.removeAttribute('aria-label');
  }
};

/**
 * Get current cart count from localStorage
 * @returns {number} The current cart count
 */
const getCartCount = () => {
  try {
    const cartData = localStorage.getItem('cart');
    if (!cartData) return 0;
    
    const cart = JSON.parse(cartData);
    return Array.isArray(cart) ? cart.reduce((total, item) => total + (item.quantity || 0), 0) : 0;
  } catch (error) {
    console.error('Error reading cart data:', error);
    return 0;
  }
};

/**
 * Initialize cart badge with current count
 */
const initCartBadge = () => {
  const currentCount = getCartCount();
  updateCartBadge(currentCount);
  
  // Listen for storage events (cart updates from other tabs)
  window.addEventListener('storage', (event) => {
    if (event.key === 'cart') {
      const newCount = getCartCount();
      updateCartBadge(newCount);
    }
  });
};

// ============================================
// Collapsible Component (Generic)
// ============================================

/**
 * Initialize collapsible components (for backward compatibility)
 */
const initCollapsibles = () => {
  const collapsibles = document.querySelectorAll('.collapsible');
  
  collapsibles.forEach((item) => {
    item.addEventListener('click', function(event) {
      // Don't toggle if clicking on a link or button inside
      if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON') {
        return;
      }
      
      this.classList.toggle('collapsible--expanded');
      
      // Update aria-expanded if present
      const content = this.querySelector('.collapsible__content');
      if (content) {
        const isExpanded = this.classList.contains('collapsible--expanded');
        content.setAttribute('aria-expanded', isExpanded);
      }
    });
  });
};

// ============================================
// Initialization
// ============================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCartBadge();
    initCollapsibles();
  });
} else {
  // DOM is already ready
  initNavigation();
  initCartBadge();
  initCollapsibles();
}

// ============================================
// Public API - Expose functions for use by other modules
// ============================================

window.ChiaCommerce = {
  updateCartBadge,
  getCartCount
};
