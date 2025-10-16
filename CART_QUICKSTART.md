# Cart System Quick Start Guide

## Pages to Visit

1. **Products Page**: `products.html` - Browse all donation packages
2. **Cart Page**: `cart.html` - View and manage cart items
3. **Checkout Page**: `checkout.html` - Complete donation (demo mode)

## Testing the Cart

### Quick Test Flow
1. Open `products.html` in a browser
2. Select a quantity and click "Add to Cart"
3. Notice the cart badge update in navigation (if present on page)
4. Click on a product's "View Details" link
5. Add more items from the detail page
6. Visit `cart.html` to see all items
7. Try updating quantities or removing items
8. Click "Proceed to Checkout"
9. Fill in the form and complete the donation

### Automated Test
Open `test-cart.html` in a browser to run automated unit tests that verify:
- Product catalog loading
- Add/update/remove operations
- localStorage persistence
- Calculation accuracy

## Key Features

### 1. Persistent Cart
- Cart data stored in browser's localStorage
- Survives page refreshes and browser restarts
- Key: `ehf_cart`

### 2. Real-time Updates
- Cart badge shows item count
- Instant updates when adding/removing items
- No page reloads required

### 3. Product Catalog
6 pre-configured donation packages:
- Tree Planting Kit ($25)
- Water Conservation Package ($50)
- Sustainable Agriculture Set ($75)
- Education Sponsorship ($100)
- Community Garden Support ($40)
- Wildlife Protection Fund ($60)

### 4. Quantity Management
- Select quantity before adding to cart
- Update quantity in cart page
- Remove individual items
- Clear entire cart on checkout

### 5. Mobile Responsive
- Works on all device sizes
- Uses existing grid system
- Touch-friendly controls

## For Developers

### Adding Cart to a New Page

**Minimal Setup:**
```html
<!-- In <head> or before </body> -->
<script src="js/main.js"></script>
<script src="js/cart.js"></script>

<!-- Cart badge in navigation -->
<a href="cart.html" style="position: relative; display: inline-block;">
  Cart
  <span data-cart-badge style="display: none; position: absolute; top: -8px; right: -12px; background: #e63946; color: white; border-radius: 50%; width: 20px; height: 20px; font-size: 12px; line-height: 20px; text-align: center;">0</span>
</a>
```

**Add to Cart Button:**
```html
<div data-product-item>
  <input type="number" data-quantity value="1" min="1">
  <button data-action="add-to-cart" data-product-id="1">
    Add to Cart
  </button>
  <p data-cart-feedback style="display: none;">Added to cart!</p>
</div>
```

### JavaScript API

```javascript
// Get a product by ID
const product = CART.getProduct(1);

// Add item to cart
CART.addItem(productId, quantity);

// Update quantity
CART.updateQuantity(productId, newQuantity);

// Remove item
CART.removeItem(productId);

// Get cart contents
const cart = CART.loadCart();

// Get totals
const itemCount = CART.getItemCount();
const subtotal = CART.getSubtotal();
const total = CART.getTotal();

// Clear cart
CART.clearCart();
```

## File Structure

```
/home/engine/project/
├── js/
│   ├── main.js           # Navigation + badge helper
│   └── cart.js           # Cart logic and catalog
├── products.html         # Product listing
├── product-detail.html   # Single product view
├── cart.html            # Shopping cart
├── checkout.html        # Checkout form
├── index.html           # Home (with cart badge)
├── CART_DOCUMENTATION.md     # Full technical docs
├── CART_IMPLEMENTATION.md    # Implementation summary
└── CART_QUICKSTART.md       # This file
```

## Data Attributes Reference

| Attribute | Purpose | Used On |
|-----------|---------|---------|
| `data-cart-badge` | Cart item count | Navigation link |
| `data-product-id` | Product identifier | Buttons, inputs |
| `data-quantity` | Quantity input | Number input |
| `data-action="add-to-cart"` | Add button | Button |
| `data-cart-feedback` | Success message | Paragraph |
| `data-cart-items` | Cart items container | Div |
| `data-cart-empty` | Empty cart message | Div |
| `data-cart-subtotal` | Subtotal display | Span |
| `data-cart-total` | Total display | Span |

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills)
- Requires localStorage support

## Limitations

- Front-end only (no backend/database)
- No payment processing (demo mode)
- Cart data stored locally (not shared between devices)
- No user accounts or order history
- No email notifications

## Next Steps

For production use, consider adding:
- Backend API integration
- Payment gateway (Stripe, PayPal, etc.)
- Order confirmation emails
- User account system
- Inventory management
- Analytics tracking
- SEO optimization

## Support

For detailed documentation, see:
- `CART_DOCUMENTATION.md` - Complete technical reference
- `CART_IMPLEMENTATION.md` - Implementation details

## Testing

Run the test suite by opening `test-cart.html` in a browser.
All tests should pass if the implementation is working correctly.
