# Cart Management System Documentation

## Overview
This document describes the client-side cart management system implemented using localStorage for the Earth Heart Foundation website.

## Files

### JavaScript Files
- **js/cart.js** - Main cart management module
- **js/main.js** - Contains the `updateCartBadge()` helper function

### HTML Pages
- **index.html** - Home page (includes cart badge)
- **products.html** - Product listing page
- **product-detail.html** - Individual product details
- **cart.html** - Shopping cart page
- **checkout.html** - Checkout/donation completion page

## Data Attributes

The cart system relies on specific data attributes to identify and interact with DOM elements. These attributes are used by the JavaScript code to wire up event listeners and update content dynamically.

### Product Display Attributes

#### `[data-product-item]`
Marks a container element that holds product information and controls.
- **Used in**: products.html, product-detail.html
- **Purpose**: Scopes quantity inputs and feedback messages to a specific product

#### `[data-product-id]`
Specifies the unique product ID for cart operations.
- **Used on**: Buttons (`add-to-cart`, `remove-item`, `update-quantity`)
- **Value**: Integer product ID
- **Example**: `data-product-id="1"`

#### `[data-quantity]`
Identifies quantity input fields for products.
- **Used in**: Product cards and cart items
- **Purpose**: Reads the quantity value when adding to cart or updating cart items
- **Example**: `<input type="number" data-quantity value="1" min="1">`

#### `[data-cart-feedback]`
Container for displaying temporary feedback messages after cart actions.
- **Used in**: Product cards
- **Purpose**: Shows "Added to cart!" confirmation
- **Auto-hide**: Disappears after 2 seconds

### Cart Badge Attribute

#### `[data-cart-badge]`
Displays the total number of items in the cart.
- **Used in**: Navigation on all pages
- **Updated by**: `updateCartBadge()` function in main.js
- **Behavior**: 
  - Hidden when count is 0
  - Visible with count when items exist in cart
  - Updates automatically on cart changes

### Cart Page Attributes

#### `[data-cart-items]`
Container where individual cart items are rendered.
- **Used in**: cart.html
- **Purpose**: Dynamically populated with cart item HTML

#### `[data-cart-empty]`
Empty cart message container.
- **Used in**: cart.html
- **Behavior**: 
  - Displayed when cart is empty
  - Hidden when cart has items

#### `[data-cart-content]`
Main cart content container (includes items and totals).
- **Used in**: cart.html
- **Behavior**:
  - Hidden when cart is empty
  - Displayed when cart has items

#### `[data-cart-subtotal]`
Displays the cart subtotal.
- **Used in**: cart.html
- **Updates**: Automatically when cart changes
- **Format**: `$XX.XX`

#### `[data-cart-total]`
Displays the cart total.
- **Used in**: cart.html
- **Updates**: Automatically when cart changes
- **Format**: `$XX.XX`

### Checkout Attribute

#### `[data-checkout-summary]`
Container for the order summary on checkout page.
- **Used in**: checkout.html
- **Purpose**: Displays all cart items and totals before donation completion

### Action Attributes

#### `[data-action="add-to-cart"]`
Button to add a product to the cart.
- **Required attributes**: `data-product-id`
- **Optional**: Reads `data-quantity` from nearest `[data-product-item]` container
- **Behavior**: 
  - Adds item to cart
  - Updates badge
  - Shows feedback message

#### `[data-action="update-quantity"]`
Input field for updating cart item quantities.
- **Required attributes**: `data-product-id`
- **Event**: `change`
- **Behavior**: Updates cart and re-renders items

#### `[data-action="remove-item"]`
Button to remove an item from the cart.
- **Required attributes**: `data-product-id`
- **Behavior**: Removes item and re-renders cart

## Product Catalog

The product catalog is defined in `js/cart.js` in the `CART.products` array. Each product has:
- `id` (integer) - Unique identifier
- `name` (string) - Product name
- `price` (number) - Price in dollars
- `description` (string) - Product description
- `image` (string) - Path to product image

## localStorage Structure

### Storage Key
`ehf_cart` - The key used to store cart data in localStorage

### Data Format
Array of cart item objects:
```json
[
  {
    "productId": 1,
    "quantity": 2,
    "name": "Tree Planting Kit",
    "price": 25.00,
    "image": "images/photo.webp"
  }
]
```

## API Methods

### CART.getProduct(id)
Returns product object by ID or undefined if not found.

### CART.loadCart()
Returns array of cart items from localStorage. Returns empty array if cart doesn't exist or on error.

### CART.saveCart(cart)
Saves cart array to localStorage and updates the badge.

### CART.addItem(productId, quantity)
Adds a product to the cart or increments quantity if already exists.
- **Parameters**: 
  - `productId` (integer) - Product ID
  - `quantity` (integer, default: 1) - Quantity to add
- **Returns**: Updated cart array

### CART.updateQuantity(productId, quantity)
Updates the quantity of a cart item. Removes item if quantity <= 0.
- **Parameters**:
  - `productId` (integer) - Product ID
  - `quantity` (integer) - New quantity
- **Returns**: Updated cart array

### CART.removeItem(productId)
Removes an item from the cart completely.
- **Parameters**: `productId` (integer)
- **Returns**: Updated cart array

### CART.clearCart()
Removes all items from the cart.

### CART.getItemCount()
Returns total number of items in cart (sum of all quantities).

### CART.getSubtotal()
Returns subtotal of all items (price × quantity).

### CART.getTotal()
Returns total amount (currently same as subtotal, can be extended for taxes/shipping).

### CART.updateBadge()
Updates the cart badge display. Calls `updateCartBadge()` from main.js if available.

## Event Listeners

All event listeners are automatically wired up on `DOMContentLoaded`:

1. **Add to Cart buttons** - Listens for clicks on `[data-action="add-to-cart"]`
2. **Cart badge** - Updated on page load and after any cart modification
3. **Cart items** - Rendered if `[data-cart-items]` container exists
4. **Checkout summary** - Rendered if `[data-checkout-summary]` container exists

## Adding Cart Functionality to New Pages

To add cart functionality to a new page:

1. **Include the scripts** in the HTML:
   ```html
   <script src="js/main.js"></script>
   <script src="js/cart.js"></script>
   ```

2. **Add cart badge** to navigation:
   ```html
   <li class="list__items">
     <a href="cart.html" style="position: relative; display: inline-block;">
       Cart
       <span data-cart-badge style="display: none; position: absolute; top: -8px; right: -12px; background: #e63946; color: white; border-radius: 50%; width: 20px; height: 20px; font-size: 12px; line-height: 20px; text-align: center;">0</span>
     </a>
   </li>
   ```

3. **For product listings**, use:
   ```html
   <div data-product-item>
     <input type="number" data-quantity value="1" min="1">
     <button data-action="add-to-cart" data-product-id="1">Add to Cart</button>
     <p data-cart-feedback style="display: none;">Added to cart!</p>
   </div>
   ```

## Error Handling

The cart system includes graceful error handling:
- localStorage errors are caught and logged to console
- Invalid product IDs are logged as errors
- Empty carts display user-friendly messages
- Missing DOM elements are checked before operations

## Browser Compatibility

- Requires localStorage support (available in all modern browsers)
- Uses ES6 features (arrow functions, template literals, const/let)
- Compatible with IE11+ with appropriate polyfills
