# Design System Strategy: The Digital Curator

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Curator."** 

Unlike standard SaaS dashboards that prioritize "density at all costs," this system treats the interface as a high-end gallery space. We are not building a spreadsheet; we are building a private viewing room. The aesthetic moves away from the rigid, boxed-in nature of traditional dashboards, instead utilizing **intentional asymmetry** and **tonal layering** to guide the eye. 

To break the "template" look, we leverage high-contrast typography scales—where massive, elegant serif headers meet functional, understated sans-serif metadata. The layout should feel like a premium editorial spread: breathable, authoritative, and sophisticated.

---

## 2. Colors
Our palette is rooted in a "Muted Opulence." We use deep Burgundies (`primary: #51131d`) and Ochre Golds (`secondary: #765a2c`) set against a sophisticated range of warm neutrals.

### The "No-Line" Rule
Standard UI relies on 1px borders to separate content. **In this design system, 1px solid borders are prohibited for sectioning.** Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` sidebar sitting against a `surface` main content area provides a clear but soft structural division that feels architectural rather than "coded."

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine cotton paper. 
- Use `surface-container-lowest` (#ffffff) for the most prominent interactive cards.
- Use `surface-container` (#eeeeee) or `surface-dim` (#dadada) for background environments.
- By nesting a "Lowest" tier card inside a "Low" tier section, we create depth through tone alone.

### The "Glass & Gradient" Rule
To elevate the experience, use **Glassmorphism** for floating elements (like pop-overs or navigation bars). Use semi-transparent versions of `surface` with a `backdrop-blur` of 12px-20px. 

### Signature Textures
Main CTAs and Hero sections should avoid flat color. Apply a subtle linear gradient transitioning from `primary` (#51131d) to `primary_container` (#6d2932) at a 45-degree angle. This adds "visual soul" and a tactile, velvet-like quality to the interface.

---

## 3. Typography
The typographic soul of this system is the juxtaposition between the intellectual **Noto Serif** (Display/Headline) and the utilitarian **Public Sans** (Body/Labels).

- **Display & Headlines (Noto Serif):** These are your "Gallery Labels." Use `display-lg` for total focus moments, such as a featured artist's name. The serif carries the weight of history and luxury.
- **Titles & Body (Public Sans):** These are for the "Catalog Data." Public Sans provides a neutral, modern counter-balance. 
- **Hierarchy as Identity:** Always maintain a significant scale jump. If a headline is `headline-lg`, the supporting text should skip two levels down to `body-md`. This high-contrast scale creates the "Editorial" feel.

---

## 4. Elevation & Depth
We eschew the "Material" look of heavy drop shadows in favor of **Tonal Layering**.

### The Layering Principle
Depth is achieved by stacking `surface-container` tiers. 
- **Base:** `surface`
- **Mid-ground:** `surface-container-low`
- **Foreground:** `surface-container-lowest`

### Ambient Shadows
When an element must "float" (e.g., a modal), use an **Extra-Diffused Ambient Shadow**. 
- **Blur:** 32px to 64px.
- **Opacity:** 4%–8%.
- **Color:** Use a tinted version of `on_surface` (#1b1b1b) rather than pure black to ensure the shadow feels like natural light passing through a room.

### The "Ghost Border" Fallback
If an element requires a container for accessibility but tonal shifts aren't enough, use a **Ghost Border**. This is a 1px stroke using `outline_variant` at **15% opacity**. Never use 100% opaque borders.

---

## 5. Components

### Buttons
- **Primary:** Gradient from `primary` to `primary_container`. Text in `on_primary`. Corner radius: `md` (0.375rem).
- **Secondary:** Surface-only with a "Ghost Border." 
- **Tertiary:** Text-only in `primary` with an underlined hover state.

### Input Fields
Avoid the "boxed" look. Use a `surface-container-low` background with a `sm` (0.125rem) bottom-only accent in `secondary` when focused. Labels must always use `label-md` in `on_surface_variant`.

### Cards & Lists
**Forbid the use of divider lines.** 
- To separate list items, use vertical white space (Spacing `4` or `5`).
- For cards, rely on the `surface-container-lowest` fill against a `surface-container` background.

### Custom Component: The "Provenance Chip"
Used for art status (e.g., "In Gallery," "Private Collection"). Use `secondary_container` (#fed79e) with `on_secondary_container` (#785c2e) text. These should be pill-shaped (`full` rounding) to contrast against the architectural squareness of the dashboard.

### Brand Presentation: The Integrated Curation Seal
To achieve a high-fashion, clean, and integrated aesthetic, the primary brand logo sits elegantly inside the glassmorphic header bar, positioned on the far left.
- **The Concept:** The logo serves as a curation seal, anchored on the left side of the navigation flow, perfectly balanced by the clean, minimal links and call-to-actions aligned to the right.
- **Visual Scale:** Sized at `52px` height on desktop, providing a prominent, readable, and stately presence without bloating the vertical height of the header row (retaining a total header height of `84px` including padding).
- **Tonal Depth:** Enhanced with a subtle, premium drop-shadow (`filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4))`) that lifts the white logo off dark obsidian background flows.
- **Responsive Adaptability:** On tablet and mobile viewports, the logo height scales gracefully to `44px` and `38px` respectively, ensuring fluid layout scaling and absolute clarity on all screens.

---

## 6. Do's and Don'ts

### Do:
- **Use Asymmetry:** Place a `display-md` heading off-center to create a dynamic, curated feel.
- **Embrace White Space:** Use the Spacing Scale `16` (5.5rem) or `20` (7rem) for section margins. Luxury is defined by the space you *don't* fill.
- **Use Subtle Motion:** Interactive elements should transition using a soft `cubic-bezier(0.4, 0, 0.2, 1)`.

### Don't:
- **Don't use pure black for text:** Use `on_surface` (#1b1b1b) for a softer, more organic read.
- **Don't use "loud" shadows:** If a shadow is immediately "visible" to the user, it is too heavy.
- **Don't crowd the navigation:** Limit top-level navigation to 4-5 high-level items to maintain the "Exclusive" atmosphere.

### Accessibility Note
While we prioritize aesthetics, ensure the contrast between `on_surface` and `surface` remains high enough for readability. The `outline` token (#867273) should be used for focus states to ensure keyboard navigability is never sacrificed for style.