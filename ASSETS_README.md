# Chia Commerce - Asset Requirements

## Brand Assets

### Logo
- **File**: `images/chia-logo.svg`
- **Format**: SVG (vector)
- **Usage**: Header navigation, footer
- **Dimensions**: Scalable, recommended display height: 40px

### Product Images
The following product images are required for the homepage:

1. **Organic Black Chia Seeds**
   - `images/chia-product-1.webp` (400x400px)
   - `images/chia-product-1@2x.webp` (800x800px)
   - `images/chia-product-1@3x.webp` (1200x1200px)

2. **Organic White Chia Seeds**
   - `images/chia-product-2.webp` (400x400px)
   - `images/chia-product-2@2x.webp` (800x800px)
   - `images/chia-product-2@3x.webp` (1200x1200px)

3. **Chia Seeds Variety Pack**
   - `images/chia-product-3.webp` (400x400px)
   - `images/chia-product-3@2x.webp` (800x800px)
   - `images/chia-product-3@3x.webp` (1200x1200px)

### Background Images
- **File**: `images/chia-seeds-pattern.webp`
- **Format**: WebP
- **Usage**: Hero section background overlay (subtle texture)
- **Dimensions**: 1920x1080px recommended
- **Note**: Should be a subtle, low-opacity texture/pattern

## Image Guidelines

### Photography Style
- Clean, professional product photography
- White or natural background
- Consistent lighting across all products
- High-quality, sharp focus
- Show product packaging clearly

### Format Specifications
- **WebP** format for optimal web performance
- Provide @2x and @3x versions for retina displays
- Optimize file sizes for web (aim for <200KB per image)
- Use responsive `srcset` attribute for adaptive loading

### Placeholder Note
Currently, placeholder files exist for these assets. Replace them with actual product photography before production deployment.

## Color Palette

The Chia Commerce brand uses the following color scheme:

- **Primary**: `#4a5d3e` (Earthy Green)
- **Primary Dark**: `#3a4a31`
- **Primary Light**: `#6b8059`
- **Secondary**: `#f5f3f0` (Warm Beige)
- **Accent**: `#d4a574` (Golden Tan)
- **Accent Dark**: `#b8864f`

## Typography

- **Font Family**: Lato (Google Fonts)
- **Weights Used**: 400 (Regular), 600 (Semi-Bold), 700 (Bold)
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif

## Asset Maintenance

When adding new product images:
1. Follow the naming convention: `chia-product-N.webp`
2. Always provide @2x and @3x versions
3. Optimize for web delivery
4. Update the product cards in `index.html` or product pages accordingly
5. Ensure alt text is descriptive and accessible
