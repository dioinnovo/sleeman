import { BrandConfig } from '../types/brand'
import { SLEEMAN_PRIMARY, SLEEMAN_SECONDARY, SLEEMAN_ACCENT, SLEEMAN_SUCCESS } from './colors'

export const SLEEMAN_BRAND: BrandConfig = {
  name: 'Sleeman Breweries',
  logo: '/sleeman-logo.png',
  colors: {
    primary: SLEEMAN_PRIMARY, // #1C1812 - Dark brewery background
    secondary: SLEEMAN_SECONDARY, // #D4A84B - Amber/gold accent
    accent: SLEEMAN_ACCENT, // #1863DC - Blue for interactive elements
    success: SLEEMAN_SUCCESS // #10B981 - Green for positive outcomes
  },
  ai: {
    name: 'John',
    persona: 'John is your AI data analyst for Sleeman Breweries, specializing in brewery operations intelligence. Expert at querying production data, quality metrics, equipment health, and compliance reporting across all four facilities: Guelph, Chambly, Vernon, and Calgary. Transforms complex data questions into instant insights using natural language SQL queries.'
  }
}

// Legacy exports for backwards compatibility during migration
export const SHIPSTICKS_BRAND: BrandConfig = SLEEMAN_BRAND
export const ARTHUR_BRAND: BrandConfig = SLEEMAN_BRAND
export const SCC_BRAND: BrandConfig = SLEEMAN_BRAND
