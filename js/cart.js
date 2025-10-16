// Simple shopping cart implementation
class ShoppingCart {
  constructor() {
    this.items = this.loadCart();
    this.updateCartDisplay();
  }

  loadCart() {
    const saved = localStorage.getItem('chiaCart');
    return saved ? JSON.parse(saved) : [];
  }

  saveCart() {
    localStorage.setItem('chiaCart', JSON.stringify(this.items));
  }

  addItem(productId, productName, productPrice) {
    const existingItem = this.items.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        id: productId,
        name: productName,
        price: parseFloat(productPrice),
        quantity: 1
      });
    }
    
    this.saveCart();
    this.updateCartDisplay();
    this.showNotification(`${productName} added to cart!`);
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
    this.updateCartDisplay();
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity = parseInt(quantity);
      if (item.quantity <= 0) {
        this.removeItem(productId);
      } else {
        this.saveCart();
        this.updateCartDisplay();
      }
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  updateCartDisplay() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const count = this.getItemCount();
    cartCountElements.forEach(element => {
      element.textContent = count;
      element.style.display = count > 0 ? 'inline' : 'none';
    });
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--primary-color, #0e6248);
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    this.updateCartDisplay();
  }
}

// Initialize cart
const cart = new ShoppingCart();

// Add event listeners to all add-to-cart buttons
document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('[data-add-to-cart]');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = button.getAttribute('data-product-id');
      const productName = button.getAttribute('data-product-name');
      const productPrice = button.getAttribute('data-product-price');
      
      if (productId && productName && productPrice) {
        cart.addItem(productId, productName, productPrice);
      }
    });
  });
});

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
