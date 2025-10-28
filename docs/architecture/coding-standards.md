# Coding Standards - Ship Sticks Platform

## Overview
These are the coding standards for the Ship Sticks Intelligence Platform. Follow these patterns consistently.

## Technology Stack
- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript 5.x
- **UI Library**: React 19.1.1
- **Styling**: Tailwind CSS 3.4.17 with CSS custom properties
- **Components**: shadcn/ui with Radix UI primitives
- **State**: React hooks (useState, useReducer, useContext)

## Code Style Guidelines

### TypeScript
- Use TypeScript strict mode
- Prefer interfaces over types for object shapes
- Export types/interfaces from the file where they're primarily used
- Use explicit return types for functions

### React Components
- Use functional components with hooks
- Use `'use client'` directive only when needed
- Keep components small and focused (single responsibility)
- Place components in logical folders within `components/`

### File Naming
- Components: PascalCase (e.g., `ScottChat.tsx`)
- Utilities: camelCase (e.g., `formatCurrency.ts`)
- Config/Constants: kebab-case (e.g., `scc-config.ts`)
- Types/Interfaces: PascalCase with descriptive names

### Imports
- Use absolute imports with `@/` prefix
- Group imports: React, Next, third-party, local components, utils, types
- Keep imports organized and remove unused ones

### Tailwind CSS
- Use Tailwind utility classes as primary styling method
- Use `cn()` utility for conditional classes
- Keep custom CSS minimal (only in globals.css)
- Use Ship Sticks brand colors: `scc-red` (green), `scc-gray`, `scc-success`
- For active/interactive states, prefer the darker green `#4fab55`

### Component Structure
```typescript
'use client' // Only if needed

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ComponentProps } from '@/types'

interface MyComponentProps {
  // Props definition
}

export function MyComponent({ prop1, prop2 }: MyComponentProps) {
  // Hooks first
  const [state, setState] = useState()

  // Event handlers
  const handleClick = () => {
    // Logic
  }

  // Render
  return (
    <div className={cn('base-classes', conditional && 'conditional-classes')}>
      {/* Content */}
    </div>
  )
}
```

### API Routes
- Use Next.js App Router conventions
- Place in `app/api/` directory
- Return proper status codes
- Handle errors gracefully

### Error Handling
- Use try-catch blocks for async operations
- Provide meaningful error messages
- Log errors appropriately
- Show user-friendly error states

### Performance
- Use dynamic imports for large components
- Implement proper loading states
- Optimize images with Next.js Image component
- Use React.memo() for expensive components when needed

## Ship Sticks Brand Requirements

### Brand Colors
- **Primary Green**: `#5fd063` - Main brand color for headers, CTAs, and key elements
- **Accent Green (Darker)**: `#4fab55` - Interactive states (hover, active, selected) - **Recommended for navigation**
- **Secondary Light Green**: `#7FE083` - Secondary highlights and accents
- **Light Green Background**: `#E6F9E7` - Subtle backgrounds and panels
- **Navy**: `#231f20` - Professional text and dark elements
- **Gray**: `#707070` - Secondary text and neutral elements

### Usage Guidelines
- **Active Navigation States**: Use `#4fab55` (darker green) for better contrast
- **Hover States**: Use `#4fab55` for interactive elements
- **Success Messages**: Use `#5fd063` (primary green)
- **Buttons & CTAs**: Use `#5fd063` with `#4fab55` hover state
- **Text on Green**: Use white (`#FFFFFF`) for optimal contrast

### Typography
- **Primary Font**: Lato (weights: 400, 700, 900)
- **Secondary Font**: Roboto (weights: 300, 400, 500, 700)

### Brand Identity
- **AI Assistant**: Sticks (not Arthur, Chip, or Ship Sticks Travel Assistant)
- **Full Title**: Sticks - Your Ship Sticks AI Assistant
- **Focus**: Golf equipment shipping, travel logistics, partner golf courses
- **Tone**: Professional, golf-focused, travel-oriented, friendly

## Testing Approach
- Test critical user paths
- Ensure brand consistency
- Validate form inputs
- Check responsive design
- Test dark/light modes

## Accessibility
- Use semantic HTML
- Include proper ARIA labels
- Ensure keyboard navigation
- Maintain color contrast ratios
- Provide alt text for images

## Git Conventions
- Clear, descriptive commit messages
- Feature branches from main
- Test before committing
- No console.logs in production code