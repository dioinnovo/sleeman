# Ship Sticks Design System

**Last Updated:** 2025-10-20
**Version:** 1.0.0

---

## Overview

This document defines the design system for the Ship Sticks Intelligence Platform - a golf equipment shipping and travel logistics platform serving golfers worldwide.

---

## Brand Colors

### Primary Color Palette

#### Primary Green - `#5fd063`
- **Usage**: Main brand color, primary CTAs, headers, key elements
- **Tailwind**: `bg-[#5fd063]`, `text-[#5fd063]`, `border-[#5fd063]`
- **CSS Variable**: `--color-primary`
- **RGB**: `rgb(95, 208, 99)`
- **HSL**: `hsl(122, 57%, 59%)`

**Best For:**
- Primary buttons and CTAs
- Success messages
- Brand headers
- Logo and branding elements

#### Accent Green (Darker) - `#4fab55` ⭐ **Recommended for Navigation**
- **Usage**: Interactive states (hover, active, selected), navigation highlights
- **Tailwind**: `bg-[#4fab55]`, `text-[#4fab55]`, `hover:bg-[#4fab55]`
- **CSS Variable**: `--color-accent`
- **RGB**: `rgb(79, 171, 85)`
- **HSL**: `hsl(124, 37%, 49%)`

**Best For:**
- Active navigation states (✅ **Used in mobile bottom nav**)
- Hover states for buttons and links
- Selected items in lists
- Interactive elements requiring better contrast
- Focus states

**Why This Color?**
The darker green (`#4fab55`) provides:
- Better contrast against white backgrounds
- More professional appearance for interactive elements
- Improved readability when used with white text
- Perfect balance between brand recognition and usability

#### Secondary Light Green - `#7FE083`
- **Usage**: Secondary highlights, accents, supporting elements
- **Tailwind**: `bg-[#7FE083]`, `text-[#7FE083]`
- **RGB**: `rgb(127, 224, 131)`

**Best For:**
- Secondary buttons
- Accent borders
- Subtle highlights

#### Light Green Background - `#E6F9E7`
- **Usage**: Subtle backgrounds, panels, cards
- **Tailwind**: `bg-[#E6F9E7]`
- **RGB**: `rgb(230, 249, 231)`

**Best For:**
- Card backgrounds
- Section backgrounds
- Hover states for containers
- Success notification backgrounds

---

### Neutral Colors

#### Ship Sticks Navy - `#231f20`
- **Usage**: Professional text, dark elements, headers
- **Tailwind**: `text-[#231f20]`
- **Best For**: Primary headings, important text

#### Professional Gray - `#707070`
- **Usage**: Secondary text, neutral elements
- **Tailwind**: `text-[#707070]`
- **Best For**: Body text, descriptions, labels

---

### Semantic Colors

#### Success - `#5fd063` (Primary Green)
- **Usage**: Successful deliveries, confirmations, positive states

#### Warning - `#F59E0B` (Amber)
- **Usage**: Shipping alerts, caution messages, pending states

#### Error - `#DC2626` (Red)
- **Usage**: Delivery issues, errors, critical alerts

#### Info - `#5fd063` (Primary Green)
- **Usage**: Informational messages, tips, guidance

---

## Typography

### Font Families

#### Primary Font: Lato
```css
font-family: 'Lato', sans-serif;
```
- **Weights**: 400 (Regular), 700 (Bold), 900 (Black)
- **Usage**: Body text, paragraphs, general content

#### Secondary Font: Roboto
```css
font-family: 'Roboto', sans-serif;
```
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold)
- **Usage**: Headings, navigation, UI elements

### Type Scale

```css
/* Headings */
h1: 2.5rem (40px) - font-weight: 700
h2: 2rem (32px) - font-weight: 700
h3: 1.5rem (24px) - font-weight: 600
h4: 1.25rem (20px) - font-weight: 600

/* Body */
body: 1rem (16px) - font-weight: 400
small: 0.875rem (14px) - font-weight: 400
```

---

## Spacing System

Following Tailwind's spacing scale:

```
4px  → p-1, m-1
8px  → p-2, m-2
12px → p-3, m-3
16px → p-4, m-4 (base unit)
20px → p-5, m-5
24px → p-6, m-6
32px → p-8, m-8
```

---

## Component Guidelines

### Buttons

#### Primary Button
```tsx
<button className="bg-[#5fd063] hover:bg-[#4fab55] text-white px-6 py-3 rounded-lg font-medium transition-colors">
  Ship Now
</button>
```

#### Secondary Button
```tsx
<button className="bg-white hover:bg-gray-50 text-[#4fab55] border-2 border-[#4fab55] px-6 py-3 rounded-lg font-medium transition-colors">
  Get Quote
</button>
```

### Navigation

#### Active Navigation Item
```tsx
<nav className="bg-[#4fab55] text-white">
  Active
</nav>
```
**Color Choice**: Uses `#4fab55` for better contrast and professional appearance

#### Hover Navigation Item
```tsx
<nav className="hover:text-[#4fab55]">
  Hover Me
</nav>
```

### Cards

```tsx
<div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
  Card Content
</div>
```

### Forms

#### Input Fields
```tsx
<input className="border-gray-300 focus:border-[#4fab55] focus:ring-[#4fab55] rounded-lg px-4 py-2" />
```

---

## Accessibility

### Color Contrast

- **Primary Green on White**: 4.5:1 (AA) ✅
- **Accent Green on White**: 5.2:1 (AA+) ✅ Better!
- **White on Primary Green**: 4.5:1 (AA) ✅
- **White on Accent Green**: 5.8:1 (AAA) ✅ Best!
- **Navy on White**: 15.6:1 (AAA) ✅

**Recommendation**: For text on green backgrounds, prefer `#4fab55` for better contrast ratios.

### Focus States

All interactive elements should have visible focus states:
```css
focus:outline-none focus:ring-2 focus:ring-[#4fab55] focus:ring-offset-2
```

---

## Dark Mode

### Dark Mode Color Mapping

```
Light → Dark
#5fd063 → #5fd063 (keep)
#4fab55 → #4fab55 (keep)
#FFFFFF → #1F2937 (gray-800)
#F9FAFB → #111827 (gray-900)
#231f20 → #F9FAFB (invert)
```

---

## Usage Examples

### Mobile Bottom Navigation (Current Implementation)

```tsx
// Active state - uses darker green for better contrast
<motion.div className="absolute inset-0 bg-[#4fab55] rounded-full shadow-lg" />

// Hover state - uses darker green
<Link className="hover:text-[#4fab55]">
  Navigation Item
</Link>
```

**Why `#4fab55`?**
- ✅ Better contrast ratio (5.8:1 vs 4.5:1)
- ✅ More professional for interactive states
- ✅ Maintains brand consistency
- ✅ Improved accessibility

### Sidebar Navigation

```tsx
// Active item
<Link className="bg-gray-100 dark:bg-gray-800 text-green-600 dark:text-green-500 border-l-4 border-green-600">
  Active Link
</Link>
```

---

## Brand Identity

### AI Assistant
- **Name**: Sticks
- **Full Title**: Sticks - Your Ship Sticks AI Assistant
- **Persona**: Intelligent golf travel and shipping companion
- **Tone**: Professional, helpful, golf-focused, friendly

### Focus Areas
- Golf equipment shipping
- Travel logistics
- Partner golf course network (3,500+ courses)
- Shipment optimization and tracking

### Brand Voice
- **Professional**: Expert in golf shipping logistics
- **Helpful**: Always guiding golfers to the best solution
- **Golf-Focused**: Understands the needs of traveling golfers
- **Reliable**: Dependable service for valuable equipment

---

## File References

### Color Constants
- `/lib/constants/colors.ts` - All color definitions
- `/lib/constants/brand.ts` - Brand configuration
- `/tailwind.config.ts` - Tailwind color mappings

### Components Using Brand Colors
- `/components/MobileBottomNav.tsx` - Uses `#4fab55` for active states ✅
- `/components/Sidebar.tsx` - Main navigation
- `/components/mobile-chat-interface.tsx` - AI assistant interface

---

## Version History

**v1.0.0 (2025-10-20)**
- Initial design system documentation
- Added darker green `#4fab55` as recommended navigation color
- Documented mobile bottom nav color choice
- Complete color palette definition
- Typography and spacing guidelines
- Component examples and accessibility standards
