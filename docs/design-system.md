# Sleeman BrewMind Design System

**Version 2.0 | December 2025**

This design system documents the UI/UX framework for the Sleeman BrewMind application. It serves as the single source of truth for AI agents and developers working on this codebase.

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing System](#4-spacing-system)
5. [Layout Architecture](#5-layout-architecture)
6. [Component Guidelines](#6-component-guidelines)
7. [Responsive Design](#7-responsive-design)
8. [AI Agent Instructions](#8-ai-agent-instructions)

---

## 1. Design Principles

### Core Philosophy

- **Clean & Minimal**: Prioritize whitespace and visual breathing room
- **Transparent Containers**: Avoid visual clutter from unnecessary borders, shadows, and backgrounds
- **8pt Grid**: All spacing uses multiples of 8px for consistency
- **Internal ≤ External**: Space within elements should be less than or equal to space around them

### Visual Hierarchy Rules

1. **Headings separated by space, not cards** - Page titles and section headers should NOT have backgrounds, borders, or shadows
2. **Content cards are exceptions** - Only use card styling for distinct content blocks (KPIs, data displays)
3. **Consistent gutters** - Maintain uniform spacing between sidebar and content

---

## 2. Color System

### 2.1 Semantic Tokens (Tailwind)

The application uses shadcn/ui semantic color tokens that adapt to light/dark mode:

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `bg-background` | White | Slate 950 | Page background |
| `bg-muted` | Slate 100 | Slate 800 | Sidebar, secondary sections |
| `bg-card` | White | Slate 900 | Card backgrounds |
| `bg-accent` | Slate 100 | Slate 800 | Hover states, active items |
| `bg-primary` | Green 500 | Green 500 | Primary buttons, highlights |
| `text-foreground` | Slate 950 | Slate 50 | Primary text |
| `text-muted-foreground` | Slate 500 | Slate 400 | Secondary text |
| `border-border` | Slate 200 | Slate 700 | Borders |

### 2.2 Brand Colors

| Name | Value | Usage |
|------|-------|-------|
| Sleeman Green | `#22c55e` | Primary accent, CTAs |
| Amber | `#f59e0b` | Secondary accent, warnings |
| Dark Slate | `#1e293b` | Dark mode backgrounds |

### 2.3 Text Color Opacity

For softer text colors without harsh contrast:

```
text-foreground      → Full opacity (default)
text-foreground/80   → 80% opacity (selected nav items)
text-foreground/70   → 70% opacity (hover states)
text-muted-foreground → Muted color (descriptions, secondary)
```

---

## 3. Typography

### 3.1 Font Stack

- **Primary**: System font stack (Inter, SF Pro, Segoe UI)
- **Monospace**: For code blocks and SQL queries

### 3.2 Type Scale

| Element | Mobile | Desktop | Weight | Tracking |
|---------|--------|---------|--------|----------|
| Page Title (H1) | 24px (`text-2xl`) | 30px (`text-3xl`) | Bold | Tight |
| Section Header (H2) | 20px (`text-xl`) | 24px (`text-2xl`) | Semibold | Normal |
| Card Title (H3) | 16px (`text-base`) | 18px (`text-lg`) | Medium | Normal |
| Body | 14px (`text-sm`) | 16px (`text-base`) | Normal | Normal |
| Caption | 12px (`text-xs`) | 14px (`text-sm`) | Normal | Normal |

### 3.3 Typography Spacing Rules

Based on Red Hat Design System and Atlassian guidelines:

| Relationship | Spacing | Tailwind |
|--------------|---------|----------|
| Title → Description | 8px | `mt-2` |
| Title → Body content | 16px | `mt-4` |
| Section → Section | 32-48px | `mt-8` to `mt-12` |
| Heading → Card grid | 24px | `mt-6` |

---

## 4. Spacing System

### 4.1 The 8pt Grid

All spacing values are multiples of 8px (with 4px half-step for fine adjustments):

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| xs | 4px | `p-1`, `gap-1` | Icon-to-text, tight grouping |
| sm | 8px | `p-2`, `gap-2` | Small component padding |
| md | 16px | `p-4`, `gap-4` | Standard padding, gutters |
| lg | 24px | `p-6`, `gap-6` | Section padding |
| xl | 32px | `p-8`, `gap-8` | Large section spacing |
| 2xl | 48px | `p-12`, `gap-12` | Major section breaks |
| 3xl | 64px | `p-16` | Page-level spacing |

### 4.2 Internal ≤ External Rule

**Principle**: Space inside elements (padding) should be ≤ space around them (margin/gap).

```
Card internal padding: 16px (p-4)
Card external gap: 16px or more (gap-4+)

Button padding: 8-12px
Button spacing: 8-16px
```

### 4.3 Layout Spacing Tokens

| Context | Mobile | Tablet | Desktop | Tailwind |
|---------|--------|--------|---------|----------|
| Content from sidebar | 16px | 16px | 16px | `gap-4` (handled by layout) |
| Page header top padding | 24px | 32px | 32px | `pt-6 sm:pt-8` |
| Page header bottom padding | 16px | 24px | 24px | `pb-4 sm:pb-6` |
| Page header horizontal padding | 16px | 24px | 32px | `px-4 sm:px-6 lg:px-8` |
| Section spacing | 24px | 32px | 32px | `space-y-6 sm:space-y-8` |
| Card grid gap | 16px | 16px | 24px | `gap-4 lg:gap-6` |

---

## 5. Layout Architecture

### 5.1 Dashboard Shell Structure

```
┌─────────────────────────────────────────────────────────┐
│ flex h-screen bg-background md:p-2 gap-4               │
│ ┌──────────┐  ┌────────────────────────────────────────┐│
│ │          │  │ Main Content Area                      ││
│ │ Sidebar  │  │ ┌────────────────────────────────────┐ ││
│ │ w-64     │  │ │ PageHeader (transparent)           │ ││
│ │ (or w-20)│  │ │ pt-6 pb-4 px-4 sm:pt-8 sm:pb-6    │ ││
│ │          │  │ │ sm:px-6 lg:px-8                    │ ││
│ │ bg-muted │  │ └────────────────────────────────────┘ ││
│ │ rounded  │  │ ┌────────────────────────────────────┐ ││
│ │ shadow   │  │ │ Page Content                       │ ││
│ │          │  │ │ Uses same horizontal padding       │ ││
│ └──────────┘  │ └────────────────────────────────────┘ ││
│               └────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### 5.2 Key Layout Rules

1. **Sidebar**: Has card styling (bg-muted, rounded-2xl, shadow, border)
2. **Main content area**: Transparent background, no border/shadow
3. **Gap between sidebar and content**: Fixed at 16px (`gap-4`)
4. **Content padding**: Matches across all pages for alignment

### 5.3 File References

| Component | File | Purpose |
|-----------|------|---------|
| Dashboard Layout | `src/app/dashboard/layout.tsx` | Shell with sidebar + content |
| Sidebar | `src/components/Sidebar.tsx` | Navigation sidebar |
| PageHeader | `src/components/ui/page-header.tsx` | Page title component |
| Mobile Nav | `src/components/MobileBottomNav.tsx` | Mobile bottom navigation |

---

## 6. Component Guidelines

### 6.1 PageHeader Component

**Purpose**: Display page title and description without visual clutter.

**Styling**:
- Background: Transparent (NO bg-muted, bg-card)
- Border: None
- Shadow: None
- Rounded corners: None

**Spacing**:
```tsx
className="pt-6 pb-4 sm:pt-8 sm:pb-6 px-4 sm:px-6 lg:px-8"
```

**Usage**:
```tsx
<PageHeader
  title="Page Title"
  description="Optional description text"
/>
```

### 6.2 Section Headers

**For content sections within a page**:

```tsx
<div className="px-4 sm:px-6 lg:px-8">
  <h2 className="text-xl font-semibold text-foreground">Section Title</h2>
  <p className="text-sm text-muted-foreground mt-1">Description</p>
  <div className="mt-6">
    {/* Section content */}
  </div>
</div>
```

### 6.3 Cards

**When to use cards**:
- KPI displays
- Data tables
- Distinct content blocks
- Interactive elements

**Card styling**:
```tsx
className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-border p-4"
```

### 6.4 Sidebar Navigation

**Active state**:
```tsx
className="bg-accent text-foreground/80 font-semibold border-l-4 border-primary pl-2"
```

**Hover state**:
```tsx
className="hover:bg-accent/50 text-muted-foreground hover:text-foreground/70"
```

---

## 7. Responsive Design

### 7.1 Breakpoints

| Breakpoint | Min Width | Device |
|------------|-----------|--------|
| Default | 0px | Mobile phones |
| `sm:` | 640px | Large phones, small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large screens |

### 7.2 Layout Behavior

| Element | Mobile (<640px) | Tablet (640-1023px) | Desktop (≥1024px) |
|---------|-----------------|---------------------|-------------------|
| Sidebar | Hidden (bottom nav) | Visible, collapsible | Visible, full |
| Content padding | 16px | 24px | 32px |
| Card grid | 1 column | 2 columns | 3-4 columns |
| PageHeader | Smaller text | Standard | Standard |

### 7.3 Mobile Bottom Navigation

Only visible on screens < 640px (`sm:hidden`). Replaces sidebar navigation.

---

## 8. AI Agent Instructions

### 8.1 Critical Rules

When working on this codebase, AI agents MUST follow these rules:

1. **Never add card styling to page headers**
   - PageHeader component must remain transparent
   - No bg-muted, bg-card, shadow, border, or rounded on headers

2. **Maintain consistent horizontal padding**
   - All page content uses: `px-4 sm:px-6 lg:px-8`
   - This ensures alignment across all pages

3. **Use the 8pt grid**
   - All spacing values must be multiples of 4 or 8
   - Tailwind classes: p-1, p-2, p-4, p-6, p-8, etc.

4. **Preserve the gap-4 between sidebar and content**
   - This is set in layout.tsx and should not be changed

5. **Use semantic color tokens**
   - Never use raw hex values
   - Use Tailwind semantic classes (bg-muted, text-foreground, etc.)

### 8.2 Common Patterns

**Adding a new dashboard page**:
```tsx
export default function NewPage() {
  return (
    <div>
      <PageHeader
        title="Page Title"
        description="Page description"
      />
      <div className="px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Page content */}
      </div>
    </div>
  )
}
```

**Creating a card grid**:
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
  {items.map(item => (
    <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-border p-4">
      {/* Card content */}
    </div>
  ))}
</div>
```

### 8.3 What NOT to Do

- Do NOT add backgrounds to PageHeader
- Do NOT use inconsistent padding values across pages
- Do NOT add borders/shadows to transparent containers
- Do NOT use text-foreground for selected nav items (use text-foreground/80)
- Do NOT change the layout gap between sidebar and content
- Do NOT use bg-card for the main content area wrapper

### 8.4 File Modification Checklist

Before modifying UI components:

1. Check if the component follows this design system
2. Verify spacing uses 8pt grid values
3. Ensure responsive classes are applied
4. Test in both light and dark modes
5. Confirm PageHeader remains transparent

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | Dec 2025 | Added comprehensive spacing guidelines, layout architecture, AI agent instructions |
| 1.0 | 2025 | Initial design system |
