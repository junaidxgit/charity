const CART = {
  storageKey: 'ehf_cart',
  
  products: [
    {
      id: 1,
      name: 'Tree Planting Kit',
      price: 25.00,
      description: 'Complete kit for planting and nurturing young trees',
      image: 'images/photo.webp'
    },
    {
      id: 2,
      name: 'Water Conservation Package',
      price: 50.00,
      description: 'Help provide clean water solutions for rural communities',
      image: 'images/photo.webp'
    },
    {
      id: 3,
      name: 'Sustainable Agriculture Set',
      price: 75.00,
      description: 'Support sustainable farming practices in Cebu',
      image: 'images/photo.webp'
    },
    {
      id: 4,
      name: 'Education Sponsorship',
      price: 100.00,
      description: 'Sponsor environmental education programs',
      image: 'images/photo.webp'
    },
    {
      id: 5,
      name: 'Community Garden Support',
      price: 40.00,
      description: 'Help establish community gardens',
      image: 'images/photo.webp'
    },
    {
      id: 6,
      name: 'Wildlife Protection Fund',
      price: 60.00,
      description: 'Contribute to local wildlife conservation efforts',
      image: 'images/photo.webp'
    }
  ],

  getProduct(id) {
    return this.products.find(p => p.id === parseInt(id));
  },

  loadCart() {
    try {
      const cart = localStorage.getItem(this.storageKey);
      return cart ? JSON.parse(cart) : [];
    } catch (e) {
      console.error('Error loading cart:', e);
      return [];
    }
  },

  saveCart(cart) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(cart));
      this.updateBadge();
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  },

  addItem(productId, quantity = 1) {
    const cart = this.loadCart();
    const product = this.getProduct(productId);
    
    if (!product) {
      console.error('Product not found:', productId);
      return;
    }

    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId: productId,
        quantity: quantity,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
    
    this.saveCart(cart);
    return cart;
  },

  updateQuantity(productId, quantity) {
    const cart = this.loadCart();
    const item = cart.find(item => item.productId === productId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveCart(cart);
      }
    }
    
    return cart;
  },

  removeItem(productId) {
    let cart = this.loadCart();
    cart = cart.filter(item => item.productId !== productId);
    this.saveCart(cart);
    return cart;
  },

  clearCart() {
    this.saveCart([]);
  },

  getItemCount() {
    const cart = this.loadCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  getSubtotal() {
    const cart = this.loadCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getTotal() {
    return this.getSubtotal();
  },

  updateBadge() {
    if (typeof updateCartBadge === 'function') {
      updateCartBadge(this.getItemCount());
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  CART.updateBadge();
  
  const addToCartButtons = document.querySelectorAll('[data-action="add-to-cart"]');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = parseInt(button.getAttribute('data-product-id'));
      const quantityInput = button.closest('[data-product-item]')?.querySelector('[data-quantity]');
      const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
      
      CART.addItem(productId, quantity);
      
      const feedback = button.closest('[data-product-item]')?.querySelector('[data-cart-feedback]');
      if (feedback) {
        feedback.textContent = 'Added to cart!';
        feedback.style.display = 'block';
        setTimeout(() => {
          feedback.style.display = 'none';
        }, 2000);
      }
    });
  });

  const cartItemsContainer = document.querySelector('[data-cart-items]');
  if (cartItemsContainer) {
    renderCartItems();
  }

  const checkoutSummary = document.querySelector('[data-checkout-summary]');
  if (checkoutSummary) {
    renderCheckoutSummary();
  }
});

function renderCartItems() {
  const container = document.querySelector('[data-cart-items]');
  const emptyMessage = document.querySelector('[data-cart-empty]');
  const cartContent = document.querySelector('[data-cart-content]');
  const cart = CART.loadCart();

  if (cart.length === 0) {
    if (emptyMessage) emptyMessage.style.display = 'block';
    if (cartContent) cartContent.style.display = 'none';
    return;
  }

  if (emptyMessage) emptyMessage.style.display = 'none';
  if (cartContent) cartContent.style.display = 'block';

  container.innerHTML = cart.map(item => `
    <div class="cart-item" data-product-id="${item.productId}">
      <img src="${item.image}" alt="${item.name}" class="cart-item__image">
      <div class="cart-item__details">
        <h3 class="cart-item__name">${item.name}</h3>
        <p class="cart-item__price">$${item.price.toFixed(2)}</p>
      </div>
      <div class="cart-item__quantity">
        <label for="quantity-${item.productId}">Qty:</label>
        <input 
          type="number" 
          id="quantity-${item.productId}"
          class="input" 
          value="${item.quantity}" 
          min="1" 
          data-action="update-quantity"
          data-product-id="${item.productId}"
        >
      </div>
      <div class="cart-item__total">
        <p>$${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <button 
        class="btn btn--danger" 
        data-action="remove-item"
        data-product-id="${item.productId}"
      >
        Remove
      </button>
    </div>
  `).join('');

  const subtotalElement = document.querySelector('[data-cart-subtotal]');
  if (subtotalElement) {
    subtotalElement.textContent = `$${CART.getSubtotal().toFixed(2)}`;
  }

  const totalElement = document.querySelector('[data-cart-total]');
  if (totalElement) {
    totalElement.textContent = `$${CART.getTotal().toFixed(2)}`;
  }

  container.querySelectorAll('[data-action="update-quantity"]').forEach(input => {
    input.addEventListener('change', (e) => {
      const productId = parseInt(input.getAttribute('data-product-id'));
      const quantity = parseInt(input.value) || 1;
      CART.updateQuantity(productId, quantity);
      renderCartItems();
    });
  });

  container.querySelectorAll('[data-action="remove-item"]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = parseInt(button.getAttribute('data-product-id'));
      CART.removeItem(productId);
      renderCartItems();
    });
  });
}

function renderCheckoutSummary() {
  const container = document.querySelector('[data-checkout-summary]');
  const cart = CART.loadCart();

  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty. <a href="products.html">Continue shopping</a></p>';
    return;
  }

  container.innerHTML = `
    <div class="checkout-summary">
      <h3>Order Summary</h3>
      <div class="checkout-items">
        ${cart.map(item => `
          <div class="checkout-item">
            <span>${item.name} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        `).join('')}
      </div>
      <div class="checkout-totals">
        <div class="checkout-subtotal">
          <span>Subtotal:</span>
          <span>$${CART.getSubtotal().toFixed(2)}</span>
        </div>
        <div class="checkout-total">
          <strong>Total:</strong>
          <strong>$${CART.getTotal().toFixed(2)}</strong>
        </div>
      </div>
    </div>
  `;
}
