---
name: EduTech Lumina
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#43474f'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737780'
  outline-variant: '#c3c6d0'
  surface-tint: '#3e5f90'
  primary: '#001836'
  on-primary: '#ffffff'
  primary-container: '#002d5b'
  on-primary-container: '#7696ca'
  inverse-primary: '#a7c8ff'
  secondary: '#8a5100'
  on-secondary: '#ffffff'
  secondary-container: '#fe9800'
  on-secondary-container: '#643900'
  tertiary: '#061e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#0f3500'
  on-tertiary-container: '#57a730'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a7c8ff'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#254776'
  secondary-fixed: '#ffdcbd'
  secondary-fixed-dim: '#ffb86f'
  on-secondary-fixed: '#2c1600'
  on-secondary-fixed-variant: '#693c00'
  tertiary-fixed: '#a2f877'
  tertiary-fixed-dim: '#87db5e'
  on-tertiary-fixed: '#072100'
  on-tertiary-fixed-variant: '#1c5200'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
  glass-surface: rgba(255, 255, 255, 0.7)
  glass-border: rgba(255, 255, 255, 0.4)
  deep-navy: '#001E3D'
  vibrant-orange: '#FFB84D'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Outfit
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Outfit
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: Outfit
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  cta:
    fontFamily: Outfit
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 1.5rem
  section-padding-v: 5rem
  stack-sm: 0.75rem
  stack-md: 1.5rem
  stack-lg: 3rem
---

## Brand & Style
The design system is engineered for a technology consultancy that bridges the gap between complex digital infrastructure and educational environments. The brand personality is **Professional, Academic, and Future-Forward**. It must evoke a sense of "Reliable Innovation"—balancing the high-trust requirements of institutional stakeholders with the progressive nature of modern web solutions.

The visual style is **Corporate Glassmorphism**. This aesthetic uses clean, translucent layers and soft background blurs to suggest clarity and "lightness" in technology. It is a refined evolution of corporate design, moving away from flat, heavy blocks toward an airy, multi-dimensional workspace that feels premium and technically sophisticated. 

The UI should feel:
*   **Structured:** Reflecting the logic of technological implementation.
*   **Accessible:** Prioritizing legibility for administrators and educators.
*   **Premium:** Using subtle depth and high-quality finishes to differentiate from generic IT services.

## Colors
The palette is anchored by **Navy Blue (#002D5B)**, representing institutional stability and digital expertise. This is paired with a high-energy **Orange (#FF9900)** used exclusively for calls to action and critical interactive highlights, ensuring a clear conversion path.

**Glass-specific tokens** are essential for this system:
*   **Primary Surface:** Uses a highly desaturated neutral background (#F8FAFC) to allow the Navy text and Glass components to pop.
*   **Glass Layers:** Utilize `rgba(255, 255, 255, 0.7)` with a significant backdrop-blur (12px–20px).
*   **Accents:** Success states use the inherited **Green (#6BBD44)**, applied with professional restraint.

## Typography
**Outfit** is the sole typeface for the design system. Its geometric construction aligns with technological precision, while its open apertures provide the friendliness required for the educational sector.

Hierarchy is established through weight and scale rather than font switching. 
*   **Display text** uses tight letter-spacing and heavy weights to command attention in Hero sections.
*   **Body text** maintains a generous line height (1.6) to ensure long-form service descriptions remain readable for rectors and academic directors.
*   **Labels** use uppercase styling with increased letter spacing to create a clean, "architectural" feel for categories and metadata.

## Layout & Spacing
The design system employs a **12-column Fixed Grid** for desktop, ensuring content remains readable and centered. 

*   **Rhythm:** A 4px/8px base unit system is used.
*   **Sectioning:** High vertical padding (80px–120px) is utilized to create "breathing room" between complex service offerings, preventing cognitive overload.
*   **Breakpoints:** 
    *   **Desktop (1024px+):** Full 12-column layout, 24px gutters.
    *   **Tablet (768px - 1023px):** 8-column layout, 16px gutters, margins reduced to 32px.
    *   **Mobile (Below 768px):** Single column stack, 16px margins, fluid typography for display headings.

## Elevation & Depth
Depth is conveyed through **Glassmorphism** and **Soft Ambient Shadows** rather than stark borders.

*   **Level 1 (Base):** Flat neutral surface.
*   **Level 2 (Cards):** Subsurface glass effect. Semi-transparent white background with a 1px white border at 40% opacity. A very soft, large-spread shadow (Blur: 30px, Opacity: 4% Navy) is applied to ground the element.
*   **Level 3 (Interactive/Floating):** Higher opacity glass with a more pronounced shadow (Blur: 40px, Opacity: 8% Navy) to indicate a "lifted" state, such as the Hero glass card or active dropdowns.
*   **Backdrop Filter:** All elevated surfaces must apply a `blur(16px)` to any background imagery or content passing beneath them.

## Shapes
The shape language is **Rounded**, favoring approachable curves over sharp institutional corners.

*   **Containers/Cards:** 1rem (16px) radius to provide a modern, "app-like" feel.
*   **Buttons:** Standard buttons use a `pill` (full round) shape to maximize contrast against the structured grid and rectangular card containers.
*   **Inputs:** 0.5rem (8px) radius to maintain a professional, balanced appearance.
*   **Icons:** Contained within rounded-square enclosures or circular glass backings.

## Components
### Buttons
*   **Primary:** Solid Orange (#FF9900) with white text. Pill-shaped. Subtle inner glow on hover.
*   **Secondary/Outline:** Navy border (2px) or glass-background with Navy text.
*   **Glass Action:** Transparent white background with blur, used for secondary actions on top of imagery.

### Cards (Service & Blog)
*   **Structure:** White glass base, 1px internal white stroke.
*   **Interaction:** On hover, the card should lift slightly (-4px Y-axis) and the shadow should deepen.
*   **Icons:** 2px stroke weight, Navy blue, placed inside a soft-tinted circle.

### Input Fields
*   **Style:** Minimalist with a light grey border (#E2E8F0).
*   **Focus State:** Border changes to Navy Blue with a subtle 4px outer glow in light blue.
*   **Labels:** Floating or top-aligned using the `label-bold` typographic token.

### Navigation
*   **Header:** Sticky glass bar with a bottom border (1px white 20%).
*   **Active Link:** Indicated by a small orange dot or underline beneath the text, mirroring the accent color.

### WhatsApp FAB
*   **Style:** Circular, Deep Navy or Brand Green. Floating at the bottom-right with a high-depth shadow to ensure visibility over any background.