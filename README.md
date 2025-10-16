# Chia Commerce

Premium organic chia seeds and natural superfood products e-commerce platform.

## Overview

Chia Commerce is a modern, responsive e-commerce website built with HTML5, CSS3, and vanilla JavaScript. The site features a clean, natural aesthetic with a focus on organic products and sustainability.

## Features

- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Accessible Navigation**: WCAG compliant with full keyboard navigation
- **Shopping Cart**: Dynamic cart badge with localStorage integration
- **Modern UI**: Clean, professional design with smooth animations
- **Performance**: Optimized CSS and lazy-loaded images

## Project Structure

```
.
├── css/
│   ├── normalize.css       # CSS reset
│   └── styles.css          # Main stylesheet with design system
├── images/
│   ├── chia-logo.svg       # Brand logo
│   ├── chia-product-*.webp # Product images
│   └── ...                 # Additional assets
├── js/
│   └── main.js             # Navigation and cart functionality
├── index.html              # Homepage
├── components.html         # Component showcase
└── package.json            # Project metadata
```

## Design System

### Color Palette
- **Primary**: `#4a5d3e` - Earthy Green
- **Accent**: `#d4a574` - Golden Tan
- **Secondary**: `#f5f3f0` - Warm Beige
- **Text**: `#2c2c2c` - Dark Gray

### Typography
- **Font**: Lato (Google Fonts)
- **Weights**: 400 (Regular), 600 (Semi-Bold), 700 (Bold)

### Spacing Scale
```css
--spacing-xs: 0.5rem   /* 8px */
--spacing-sm: 1rem     /* 16px */
--spacing-md: 1.5rem   /* 24px */
--spacing-lg: 2rem     /* 32px */
--spacing-xl: 3rem     /* 48px */
--spacing-xxl: 4rem    /* 64px */
```

## JavaScript API

### Cart Badge Management

```javascript
// Update cart badge count
window.ChiaCommerce.updateCartBadge(5);

// Get current cart count from localStorage
const count = window.ChiaCommerce.getCartCount();
```

### Navigation

The navigation system automatically handles:
- Mobile menu toggle
- Keyboard navigation (Tab, Escape)
- Focus management
- ARIA attributes
- Responsive behavior

## Development

### Prerequisites
- Node.js (for PostCSS/cssnano optimization)
- Modern web browser

### Setup
```bash
npm install
```

### Structure
- No build process required for development
- Optional PostCSS for production CSS optimization
- Static HTML files for easy deployment

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

The site follows WCAG 2.1 Level AA guidelines:
- Semantic HTML5
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader friendly
- High contrast ratios

## Performance

- Mobile-first CSS
- Responsive images with srcset
- Minimal JavaScript
- No external dependencies (runtime)

## Assets

See `ASSETS_README.md` for detailed asset requirements and guidelines.

## Documentation

- `CHANGELOG.md` - Complete change history
- `IMPLEMENTATION_SUMMARY.md` - Technical implementation details
- `ASSETS_README.md` - Asset guidelines and requirements

## License

ISC

## Contributing

This is a client project. Contact the project maintainer for contribution guidelines.

---

**Note**: This project was re-themed from Earth Heart Foundation to Chia Commerce. See `CHANGELOG.md` for complete migration details.
