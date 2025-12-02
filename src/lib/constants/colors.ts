// Sleeman Breweries Brand Colors (Dark Brewery Theme)
export const SLEEMAN_PRIMARY = '#1C1812' // Dark background - signature brewery dark
export const SLEEMAN_SECONDARY = '#D4A84B' // Amber/gold - craft beer inspired
export const SLEEMAN_ACCENT = '#1863DC' // Blue accent - professional, trustworthy
export const SLEEMAN_TERTIARY = '#2C2416' // Dark brown - secondary dark surfaces

// Light Variants
export const SLEEMAN_GOLD_LIGHT = '#E8C76A' // Light gold for hover states
export const SLEEMAN_GOLD_DARK = '#8B6914' // Deep amber for emphasis

// UI Foundation Colors
export const SLEEMAN_UI_PRIMARY = '#D4A84B' // Gold for primary actions
export const SLEEMAN_UI_SECONDARY = '#1863DC' // Blue for secondary actions
export const SLEEMAN_TEXT_PRIMARY = '#1C1812' // Dark text on light backgrounds
export const SLEEMAN_TEXT_LIGHT = '#F5F5F5' // Light text on dark backgrounds
export const SLEEMAN_TEXT_SECONDARY = '#6B7280' // Gray text for secondary content
export const SLEEMAN_BACKGROUND = '#F9FAFB' // Light background
export const SLEEMAN_BACKGROUND_DARK = '#1C1812' // Dark mode background
export const SLEEMAN_SURFACE = '#FFFFFF' // White for cards (light mode)
export const SLEEMAN_SURFACE_DARK = '#2C2416' // Dark brown for cards (dark mode)
export const SLEEMAN_BORDER = '#E5E7EB' // Light gray borders
export const SLEEMAN_BORDER_DARK = '#3D352A' // Dark borders

// Gray Scale for UI Foundation
export const SLEEMAN_GRAY_900 = '#111827' // Darkest
export const SLEEMAN_GRAY_800 = '#1F2937'
export const SLEEMAN_GRAY_700 = '#374151'
export const SLEEMAN_GRAY_600 = '#4B5563'
export const SLEEMAN_GRAY_500 = '#6B7280'
export const SLEEMAN_GRAY_400 = '#9CA3AF'
export const SLEEMAN_GRAY_300 = '#D1D5DB'
export const SLEEMAN_GRAY_200 = '#E5E7EB'
export const SLEEMAN_GRAY_100 = '#F3F4F6'
export const SLEEMAN_GRAY_50 = '#F9FAFB' // Lightest

// Sleeman Semantic Colors
export const SLEEMAN_SUCCESS = '#10B981' // Emerald green for positive outcomes
export const SLEEMAN_WARNING = '#F59E0B' // Amber for alerts (matches brand gold)
export const SLEEMAN_ERROR = '#DC2626' // Red for issues
export const SLEEMAN_INFO = '#1863DC' // Blue for information (matches accent)

// Brewery-Specific Semantic Colors
export const SLEEMAN_PRODUCTION = '#10B981' // Green for production metrics
export const SLEEMAN_QUALITY = '#8B5CF6' // Purple for quality scores
export const SLEEMAN_EQUIPMENT = '#F97316' // Orange for equipment health
export const SLEEMAN_COMPLIANCE = '#1863DC' // Blue for compliance/excise

// Exported color object for easier access
export const SLEEMAN_COLORS = {
  // Brand Colors
  brand: {
    primary: SLEEMAN_PRIMARY,
    secondary: SLEEMAN_SECONDARY,
    accent: SLEEMAN_ACCENT,
    tertiary: SLEEMAN_TERTIARY,
    goldLight: SLEEMAN_GOLD_LIGHT,
    goldDark: SLEEMAN_GOLD_DARK
  },
  // UI Foundation
  ui: {
    primary: SLEEMAN_UI_PRIMARY,
    secondary: SLEEMAN_UI_SECONDARY,
    textPrimary: SLEEMAN_TEXT_PRIMARY,
    textLight: SLEEMAN_TEXT_LIGHT,
    textSecondary: SLEEMAN_TEXT_SECONDARY,
    background: SLEEMAN_BACKGROUND,
    backgroundDark: SLEEMAN_BACKGROUND_DARK,
    surface: SLEEMAN_SURFACE,
    surfaceDark: SLEEMAN_SURFACE_DARK,
    border: SLEEMAN_BORDER,
    borderDark: SLEEMAN_BORDER_DARK
  },
  // Gray Scale
  gray: {
    900: SLEEMAN_GRAY_900,
    800: SLEEMAN_GRAY_800,
    700: SLEEMAN_GRAY_700,
    600: SLEEMAN_GRAY_600,
    500: SLEEMAN_GRAY_500,
    400: SLEEMAN_GRAY_400,
    300: SLEEMAN_GRAY_300,
    200: SLEEMAN_GRAY_200,
    100: SLEEMAN_GRAY_100,
    50: SLEEMAN_GRAY_50
  },
  // Semantic Colors
  semantic: {
    success: SLEEMAN_SUCCESS,
    warning: SLEEMAN_WARNING,
    error: SLEEMAN_ERROR,
    info: SLEEMAN_INFO
  },
  // Brewery-Specific
  brewery: {
    production: SLEEMAN_PRODUCTION,
    quality: SLEEMAN_QUALITY,
    equipment: SLEEMAN_EQUIPMENT,
    compliance: SLEEMAN_COMPLIANCE
  }
}

// Legacy compatibility exports (mapped to Sleeman equivalents)
// These maintain backwards compatibility during migration
export const SHIPSTICKS_PRIMARY = SLEEMAN_SECONDARY
export const SHIPSTICKS_PRIMARY_HOVER = SLEEMAN_GOLD_DARK
export const SHIPSTICKS_SECONDARY = SLEEMAN_GOLD_LIGHT
export const SHIPSTICKS_TERTIARY = SLEEMAN_TERTIARY
export const ARTHUR_PRIMARY = SLEEMAN_SECONDARY
export const ARTHUR_PRIMARY_HOVER = SLEEMAN_GOLD_DARK
export const ARTHUR_SECONDARY = SLEEMAN_GOLD_LIGHT
export const ARTHUR_TERTIARY = SLEEMAN_TERTIARY
export const ARTHUR_UI_PRIMARY = SLEEMAN_UI_PRIMARY
export const ARTHUR_UI_SECONDARY = SLEEMAN_UI_SECONDARY
export const ARTHUR_TEXT_PRIMARY = SLEEMAN_TEXT_PRIMARY
export const ARTHUR_TEXT_SECONDARY = SLEEMAN_TEXT_SECONDARY
export const ARTHUR_BACKGROUND = SLEEMAN_BACKGROUND
export const ARTHUR_SURFACE = SLEEMAN_SURFACE
export const ARTHUR_BORDER = SLEEMAN_BORDER
export const ARTHUR_GRAY_900 = SLEEMAN_GRAY_900
export const ARTHUR_GRAY_800 = SLEEMAN_GRAY_800
export const ARTHUR_GRAY_700 = SLEEMAN_GRAY_700
export const ARTHUR_GRAY_600 = SLEEMAN_GRAY_600
export const ARTHUR_GRAY_500 = SLEEMAN_GRAY_500
export const ARTHUR_GRAY_400 = SLEEMAN_GRAY_400
export const ARTHUR_GRAY_300 = SLEEMAN_GRAY_300
export const ARTHUR_GRAY_200 = SLEEMAN_GRAY_200
export const ARTHUR_GRAY_100 = SLEEMAN_GRAY_100
export const ARTHUR_GRAY_50 = SLEEMAN_GRAY_50
export const ARTHUR_SUCCESS = SLEEMAN_SUCCESS
export const ARTHUR_WARNING = SLEEMAN_WARNING
export const ARTHUR_ERROR = SLEEMAN_ERROR
export const ARTHUR_INFO = SLEEMAN_INFO
export const ARTHUR_CARE = SLEEMAN_SECONDARY
export const ARTHUR_RISK = SLEEMAN_WARNING
export const ARTHUR_COLORS = SLEEMAN_COLORS
