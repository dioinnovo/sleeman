import type { Config } from 'tailwindcss'
const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  darkMode: "class",
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'tablet': '820px', // iPad Mini
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Sleeman Breweries Brand Colors - Dark Brewery Theme
        sleeman: {
          // Primary Brand Colors
          dark: "#1C1812", // Signature dark background
          gold: "#D4A84B", // Amber/gold accent
          "gold-light": "#E8C76A", // Light gold for hover
          "gold-dark": "#8B6914", // Deep amber for emphasis
          blue: "#1863DC", // Blue accent for interactive elements
          brown: "#2C2416", // Dark brown for surfaces

          // UI Foundation Colors
          "ui-primary": "#D4A84B", // Gold for primary actions
          "ui-secondary": "#1863DC", // Blue for secondary actions
          "text-primary": "#1C1812", // Dark text on light backgrounds
          "text-light": "#F5F5F5", // Light text on dark backgrounds
          "text-secondary": "#6B7280", // Gray secondary text

          // Gray Scale (Professional Brewery Brand)
          "gray-900": "#111827",
          "gray-800": "#1F2937",
          "gray-700": "#374151",
          "gray-600": "#4B5563",
          "gray-500": "#6B7280",
          "gray-400": "#9CA3AF",
          "gray-300": "#D1D5DB",
          "gray-200": "#E5E7EB",
          "gray-100": "#F3F4F6",
          "gray-50": "#F9FAFB",

          // Semantic Colors (Brewery Context)
          success: "#10B981", // Emerald for positive outcomes
          warning: "#F59E0B", // Amber for alerts (matches gold)
          error: "#DC2626", // Red for issues
          info: "#1863DC", // Blue for information

          // Brewery-Specific Colors
          production: "#10B981", // Green for production metrics
          quality: "#8B5CF6", // Purple for quality scores
          equipment: "#F97316", // Orange for equipment health
          compliance: "#1863DC", // Blue for compliance/excise
        },
        // Legacy mapping for backwards compatibility during migration
        arthur: {
          blue: "#D4A84B", // Maps to Sleeman gold
          "blue-hover": "#8B6914", // Maps to Sleeman dark gold
          "blue-light": "#E8C76A", // Maps to Sleeman light gold
          "blue-lighter": "#FEF9E7", // Light gold background
          "ui-primary": "#D4A84B", // Gold for primary actions
          gray: "#6B7280",
          "gray-dark": "#1C1812",
          "gray-light": "#F9FAFB",
          "gray-900": "#111827",
          "gray-800": "#1F2937",
          "gray-700": "#374151",
          "gray-600": "#4B5563",
          "gray-500": "#6B7280",
          "gray-400": "#9CA3AF",
          "gray-300": "#D1D5DB",
          "gray-200": "#E5E7EB",
          "gray-100": "#F3F4F6",
          "gray-50": "#F9FAFB",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#DC2626",
          info: "#1863DC",
          care: "#D4A84B",
          risk: "#F59E0B"
        },
        // Legacy SCC mapping for compatibility
        scc: {
          red: "#D4A84B", // Maps to Sleeman gold
          "red-hover": "#8B6914",
          gray: "#6B7280",
          "gray-dark": "#1C1812",
          "gray-light": "#F9FAFB",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#DC2626",
          info: "#1863DC"
        },
      },
      fontFamily: {
        sans: ['Lato', 'Roboto', ...defaultTheme.fontFamily.sans],
        heading: ['Lato', ...defaultTheme.fontFamily.sans],
        body: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "siriOrbRotate": {
          "0%": { "--angle": "0deg" },
          "100%": { "--angle": "360deg" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "siri-orb": "siriOrbRotate 20s linear infinite",
      },
      padding: {
        'safe': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
