Sleeman Breweries Modern Design SystemVersion 1.0 | 20251. Introduction & Brand PersonaThis design system translates Sleeman Breweries' "Notorious" heritage and modernized "Craftier Thinking" positioning into a cohesive UI/UX framework. The aesthetic balances premium heritage (1834 roots) with modern industrial sharpness.Core Principles:Bold & Unapologetic: Use high-contrast typography and colors.Crafted & Refined: Spacing and alignment must be precise; no "rough edges" unless intentional texture.Accessible: All designs must meet WCAG 2.0 Level AA standards.2. Color Palette2.1 Primary Brand ColorsThese form the core of the UI and must be used predominantly.Color NameHex CodeUsageSleeman Red#C8102EPrimary Call-to-Actions (CTA), Active States, Brand Accents.Brewer's Black#121212Main Background (Dark Mode), Footer, Headings, Secondary Buttons.Crisp White#FFFFFFCard Backgrounds, Main Text on Dark Backgrounds, Negative Space.2.2 Secondary & Premium AccentsUsed for borders, icons, or subtle background highlights to evoke liquid and heritage.Color NameHex CodeUsageCopper#B47E5BIcon highlights, timeline accents, secondary borders.Aged Gold#C5A065Premium badges, hover states for dark backgrounds, awards.Warm Grey#F4F4F4Page backgrounds, secondary section backgrounds.Charcoal#2C2C2CCard borders in dark mode, secondary text in dark mode.2.3 Functional ColorsSuccess Green: #2E7D32Error Red: #D32F2FWarning Amber: #FFA000Info Blue: #1976D22.4 Text ColorsPrimary Text: #212121 (Almost Black - never pure black on white)Secondary Text: #616161 (Dark Grey)Disabled Text: #9E9E9E (Light Grey)Inverted Text: #FFFFFF (White)3. Typography3.1 Font FamiliesHeadings: Oswald (Google Font)Style: Condensed, bold, uppercase. Reflects the industrial/label aesthetic.Fallback: Impact, Arial Narrow, sans-serif.Body: Open Sans (Google Font)Style: Clean, legible, friendly but professional.Fallback: Helvetica Neue, Arial, sans-serif.3.2 Type Scale (Desktop)Display H1: 64px / 72px Line Height / Oswald Bold / UppercaseH1: 48px / 56px Line Height / Oswald Bold / UppercaseH2: 36px / 44px Line Height / Oswald Medium / UppercaseH3: 24px / 32px Line Height / Oswald RegularBody Large: 18px / 28px Line Height / Open Sans RegularBody Regular: 16px / 24px Line Height / Open Sans RegularCaption/Label: 14px / 20px Line Height / Open Sans SemiBold / Uppercase (Tracking: 1px)4. Spacing & Grid System4.1 The 8pt GridAll spacing, sizing, and margins should be divisible by 8. This ensures vertical rhythm.Base Unit: 8pxxs: 4px (Half unit - use sparingly)sm: 8pxmd: 16pxlg: 24pxxl: 32px2xl: 48px3xl: 64pxSection Padding: 80px (Desktop), 40px (Mobile)4.2 Grid LayoutMax Container Width: 1280pxColumns: 12 (Desktop), 8 (Tablet), 4 (Mobile)Gutter: 24px (Desktop), 16px (Mobile)Alignment: Center aligned container.5. IconographyStyle: Minimal outline icons.Stroke Width: 2px (Consistent weight).Color: Primary Text #212121 or Copper #B47E5B for highlights.Shape: Slightly rounded corners (border-radius 2px) to match buttons.Library Recommendation: Lucide-React or Phosphor Icons (Duotone or Outline).6. Components6.1 ButtonsPrimary Button (CTA)Background: Sleeman Red #C8102EText: White #FFFFFF, Oswald Bold, Uppercase, Tracking 1pxBorder: NoneRadius: 2px (Slightly softened square - Industrial feel)Padding: 16px Vertical, 32px HorizontalHover: Darken Red #A00D25, subtle lift translateY(-1px)Secondary Button (Ghost)Background: TransparentBorder: 2px Solid Black #121212 (or White on dark bg)Text: Black #121212 (or White), Oswald Medium, UppercaseHover: Fill Background with Border Color, Text Inverts.Text LinkStyle: Underlined, Sleeman RedHover: Opacity 80%, underline thickens.6.2 Cards (Products/Brands)Background: WhiteShadow: 0px 4px 12px rgba(0,0,0,0.08) (Subtle lift)Border: 1px solid #E0E0E0Border Radius: 4pxLayout: Image top (aspect ratio 4:3 or 1:1), Title H3, Body Text, "Learn More" link.Hover Effect: Card lifts (translateY(-4px)), Shadow increases to 0px 8px 24px rgba(0,0,0,0.12).6.3 Navigation BarBackground: Brewer's Black #121212Height: 80px fixed.Logo: Left aligned, White/Red SVG.Links: White, Open Sans SemiBold, Uppercase, 14px.Active Item: Red Underline (2px thickness) placed 4px below text.Mobile: Hamburger menu icon (White). Slide-out drawer from right.6.4 FooterBackground: Brewer's Black #121212Text: White (Opacity 80%)Headings: Sleeman Red, Oswald, Uppercase.Disclaimer/Age Gate: 12px text, Opacity 60%.Social Icons: White, Hover to Copper #B47E5B.6.5 Forms & InputsBackground: #F4F4F4 (Light Grey)Border: 1px Solid #E0E0E0 (Bottom border only for modern look, or full border) -> Recommendation: Full border for clarity.Radius: 2pxPadding: 12px 16pxFocus: Border Color changes to Sleeman Red #C8102E.7. Responsive PrinciplesMobile First: Design all components for mobile width (375px) first, then expand.Touch Targets: All interactive elements (buttons, links, icons) must be at least 44x44px.Fluid Typography: Scale headings down by 1.2x on mobile screens (<768px).Images: Always width: 100%, height: auto within containers. Use object-fit: cover to maintain aspect ratios without distortion.Stacking: 12-column grid stacks to single column on mobile.8. Coding Guidelines for AgentsCSS Variables (Root)Use these variables to ensure consistency across the application.:root {
  /* Colors */
  --color-primary: #C8102E;
  --color-primary-dark: #A00D25;
  --color-black: #121212;
  --color-white: #FFFFFF;
  --color-copper: #B47E5B;
  --color-gold: #C5A065;
  --color-bg-light: #F4F4F4;
  
  /* Text */
  --color-text-main: #212121;
  --color-text-secondary: #616161;
  --color-text-inverted: #FFFFFF;
  
  /* Typography */
  --font-heading: 'Oswald', sans-serif;
  --font-body: 'Open Sans', sans-serif;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-section: 80px;
  
  /* UI Elements */
  --radius-sm: 2px;
  --radius-md: 4px;
  --shadow-card: 0px 4px 12px rgba(0,0,0,0.08);
  --shadow-card-hover: 0px 8px 24px rgba(0,0,0,0.12);
}
Accessibility ChecklistContrast: Ensure all text on images has a dark scrim/overlay (at least 40% opacity).Focus States: All buttons/inputs must have a visible focus ring (use --color-gold for brand alignment).Alt Text: Mandatory for all beer bottle/can images.Semantic HTML: Use <header>, <nav>, <main>, <footer>, <article> tags appropriately.