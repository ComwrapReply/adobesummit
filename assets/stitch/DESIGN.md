# Design System Specification: Cinematic Neon Editorial

## 1. Overview & Creative North Star: "The Electric Curator"
This design system moves away from the cliché "dark mode" template and into the realm of high-end digital cinematography. The Creative North Star is **"The Electric Curator."** Imagine a premium gallery in the heart of a neon metropolis—it is sophisticated, expensive, and intentional, using light not just as a utility, but as a structural material.

To break the "standard" layout, we utilize **Intentional Asymmetry**. We reject the rigid, centered grid in favor of overlapping elements, editorial-style "white space" (which in this system is deep blue space), and high-contrast typography scales. The goal is to make the portfolio feel like a film’s title sequence—dynamic, layered, and premium.

## 2. Colors: Tonal Depth & The Neon Spectrum
The palette is rooted in a "Midnight Slate" foundation, allowing the vibrant accents to vibrate against the dark surfaces without causing eye strain.

### Surface Hierarchy & Nesting
We do not use borders to define space. We use **Tonal Layering**.
*   **Base Layer:** `surface` (#050d22) – The infinite backdrop.
*   **Sectioning:** `surface-container-low` (#09122a) – Use this for large structural blocks to create a subtle lift from the base.
*   **Interactive Components:** `surface-container-high` (#131e3b) – For cards and navigation elements.
*   **Floating Elements:** `surface-bright` (#1e2b4c) – Use for modals or elements that need to feel closest to the user.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to separate sections. Boundaries must be defined solely through background color shifts or the transition from a solid surface to a glassmorphic container.

### The "Glass & Gradient" Rule
To achieve a "Vegas Premium" look, all floating containers must utilize **Glassmorphism**:
*   **Fill:** `surface-variant` (#192543) at 60% opacity.
*   **Effect:** Backdrop blur of 12px–20px.
*   **Signature Texture:** Use a linear gradient for primary CTAs transitioning from `primary-dim` (#e30071) to `primary` (#ff89ab). This adds "soul" and mimics the way neon light dissipates.

## 3. Typography: The Modern Monolith
The typography pairs the geometric, tech-forward **Space Grotesk** with the humanistic, legible **Manrope**. This creates a tension between "The Future" and "The Professional."

*   **Display & Headlines (Space Grotesk):** These should be treated as graphic elements. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for hero sections. The high x-height of Space Grotesk provides a "monolithic" feel.
*   **Body & Titles (Manrope):** Manrope provides a grounding effect. Its clean, open apertures ensure readability against dark backgrounds.
*   **The Narrative Scale:** Use `label-md` in `secondary` (Cyan) all-caps for "eyebrow" text above headlines to establish a cinematic hierarchy.

## 4. Elevation & Depth: Atmospheric Layering
Depth in this system is not about "shadows," but about **Glow and Light Bleed.**

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. The contrast is felt, not seen as a line.
*   **Ambient Shadows:** Traditional black shadows are forbidden. Instead, use "Glow Shadows." For a floating pink button, use a shadow color of `primary` (#ff89ab) at 10% opacity with a 30px blur. This mimics the ambient light of a neon sign.
*   **The "Ghost Border" Fallback:** If a container needs more definition, use a 1px stroke of `outline-variant` at 15% opacity. This creates a "hairline" shimmer common in high-end watch photography.
*   **Glassmorphism Depth:** When stacking glass elements, increase the `surface-container` tier for each subsequent layer to maintain visual logic.

## 5. Components

### Buttons
*   **Primary (The Neon Pulse):** Background gradient of `primary` to `primary-container`. 0.5rem (Default) corner radius. Subtle outer glow using `primary` at 15% opacity.
*   **Secondary (The Cyan Ghost):** `secondary` (#00fbfb) `ghost-border` (15% opacity) with `on-surface` text. On hover, the border opacity increases to 100%.
*   **Tertiary (The Gold Accent):** Text-only using `tertiary` (#ffe792). Used for low-priority actions or "Editorial" links.

### Cards & Lists
*   **The Divider Ban:** Never use horizontal lines. Use 48px–64px of vertical space or a `surface-container-high` background to group list items.
*   **Editorial Cards:** Use `xl` (1.5rem) rounded corners. Images inside cards should have a subtle `surface-tint` overlay to harmonize with the midnight background.

### Input Fields
*   **State Logic:** Default state is `surface-container-highest` with no border. On focus, the field gains a `secondary` (Cyan) "Ghost Border" and a subtle cyan inner-glow to signify "Current."

### Chips
*   **Pill Shape:** Use `full` (9999px) roundness.
*   **Visuals:** Use `secondary-container` for background with `on-secondary-container` text for a "vibrant yet readable" tag system.

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical margins. If the left margin is 10%, try a right margin of 15% for a bespoke, editorial feel.
*   **Do** lean into the "Gold" (`tertiary`) for very small, high-value details like icons or bullet points.
*   **Do** use large, high-quality imagery with dark-point adjustments to match the `#050d22` background.

### Don't:
*   **Don't** use pure white (#FFFFFF) for body text. Use `on-background` (#dee5ff) to reduce vibration against the dark blue.
*   **Don't** use 100% opaque borders. They break the cinematic "glow" and make the UI look like a basic template.
*   **Don't** use standard "drop shadows." Use wide, diffused ambient glows that match the color of the element.
*   **Don't** clutter the screen. If an element isn't serving the "Electric Curator" vibe, increase the padding or remove it.