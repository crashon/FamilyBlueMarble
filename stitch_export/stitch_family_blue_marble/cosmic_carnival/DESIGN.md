```markdown
# Design System Documentation: The Tactile Toybox

## 1. Overview & Creative North Star
**Creative North Star: "The Tactile Toybox"**
This design system moves away from the flat, sterile nature of standard mobile apps and embraces a high-end, "physical-digital" hybrid aesthetic. We are not just building a game interface; we are crafting a premium digital toy. 

To break the "template" look, we employ **intentional asymmetry** and **organic layering**. By overlapping property cards, using oversized "bubbly" typography, and allowing elements to float with soft, ambient depth, we create a sense of wonder. Every element should feel like it was hand-crafted from high-quality acrylic or polished wood, optimized for the expansive, touch-first canvas of the iPad.

---

## 2. Colors
Our palette is rooted in high-energy vibrancy, balanced by sophisticated neutral "breathing room" to prevent visual fatigue.

### Tonal Hierarchy
- **Primary (#005bc1):** The core of the experience. Used for "Hero" actions and the brand's vibrant blue energy.
- **Secondary (#705d00):** The "Sunny Yellow." Reserved for moments of high reward, "Golden Key" events, and secondary CTAs.
- **Tertiary (#006e1c):** The "Grass Green." Used specifically for property growth, financial gains, and positive game progression.
- **Error (#ba1a1a):** The "Friendly Red." Softened to remain approachable while indicating constraints or missed opportunities.

### The "No-Line" Rule
**Strict Mandate:** 1px solid borders are prohibited for sectioning. We define space through color logic.
- Use `surface-container-low` (#f2f4f6) for the main board background.
- Use `surface-container-highest` (#e0e3e5) for nested panels.
- Content must "pop" through tonal shifts, not outlines.

### The Glass & Gradient Rule
To achieve a "modern mobile board game" feel, use **Glassmorphism** for modal overlays and floating HUD elements. 
- **Effect:** Use `surface` (#f7f9fb) at 80% opacity with a 20px backdrop blur.
- **Signature Textures:** Apply a subtle linear gradient from `primary` (#005bc1) to `primary_container` (#d8e2ff) on main buttons to give them a rounded, 3D "lit from above" appearance.

---

## 3. Typography
We utilize a pairing of **Plus Jakarta Sans** for character and **Be Vietnam Pro** for utility.

- **Display (Plus Jakarta Sans):** These are our "Voice" tokens. `display-lg` (3.5rem) should be used for big win celebrations. The rounded terminals of Jakarta Sans communicate friendliness without appearing "juvenile."
- **Headline & Title (Plus Jakarta Sans):** Used for property names and event headers. High-contrast sizing (e.g., using `headline-lg` next to `body-md`) creates an editorial feel.
- **Body (Be Vietnam Pro):** Our "Workhorse" font. We use `body-lg` (1rem) as the standard for game rules and descriptions to ensure maximum legibility for younger players on iPad screens.

---

## 4. Elevation & Depth
Depth in this system is a product of **Tonal Layering**, not structural shadows.

- **The Layering Principle:** Stack surfaces to create hierarchy. 
  - *Base Layer:* `surface` (#f7f9fb)
  - *Mid Layer (Modules):* `surface-container-low` (#f2f4f6)
  - *Top Layer (Cards/Buttons):* `surface-container-lowest` (#ffffff)
- **Ambient Shadows:** When an element must "float" (like a property deed), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(25, 28, 30, 0.06);`. The shadow color is a low-opacity version of `on_surface`, creating a soft, natural lift.
- **The "Ghost Border":** If accessibility requires a container definition, use the `outline-variant` (#b7c9d9) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Bubbly Buttons (3D-ish)
- **Primary:** Background `primary` (#005bc1) with a 4px "bottom-heavy" inner shadow to simulate a physical button press. Border-radius must be `full` (9999px) or `xl` (3rem).
- **Feedback:** On press, scale the component down to 95% and shift the gradient intensity.

### Property Deed Cards
- **Structure:** Use `surface-container-lowest` (#ffffff) for the card body. 
- **Header:** A thick top-bar of the property's color (Primary, Secondary, or Tertiary).
- **Separation:** Forbid dividers. Use `title-md` and `body-sm` typography with generous vertical padding (32px) to separate "Rent" from "Mortgage" info.

### Whimsical Icons (Golden Key Events)
- Icons should never be flat. Use a "layered" icon style where the background is a `secondary_container` (#ffe170) circle and the glyph is `on_secondary_container` (#544600).

### Input Fields & Controls
- **Checkboxes/Radios:** Use `lg` (2rem) corner radius. The "Selected" state should use a high-contrast `primary` fill with a white `on_primary` checkmark.
- **Sizing:** All tap targets must be a minimum of 56x56px to accommodate younger users and rapid iPad play.

---

## 6. Do's and Don'ts

### Do:
- **Over-index on White Space:** Use the `xl` (3rem) corner radius and wide margins to make the UI feel "airy" and premium.
- **Use Intentional Asymmetry:** Rotate property cards by 1-2 degrees when they are "dealt" onto the screen to mimic a real board game.
- **Prioritize Motion:** Every button tap should result in a "squish" or "bounce" animation.

### Don't:
- **Don't use 100% Black:** Never use #000000. Use `on_surface` (#191c1e) for text to maintain a soft, high-end feel.
- **Don't use sharp corners:** Nothing in this system should be sharper than the `sm` (0.5rem) token. Sharpness kills the "family-friendly" vibe.
- **Don't use Dividers:** Avoid horizontal rules. If content needs to be separated, use a shift from `surface-container-lowest` to `surface-container-low`.

---
**Director's Note:** Remember, we are designing for the iPad. Every interaction should feel like you are touching a real object. If it looks like a standard website, you've gone too far toward the "digital" and lost the "toy." Lean into the bounce, the blur, and the bubble.```