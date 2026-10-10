# Anargya Research Team — Figma Website Design Instructions

## 1. Project Overview

I am applying for the Research Team division of Anargya and completing a special task involving website design and development.

Before implementing the website in Next.js, I want to create a complete, high-fidelity, professional website design in Figma.

My primary inspiration is the Sapu Angin Research Team website. I particularly like its overall layout, visual composition, typography hierarchy, components, spacing, navigation, animations, and user experience.

However, the final website must follow Anargya's official design system and brand identity.

**Your objective is to create a complete, editable Anargya website design in Figma that closely follows Sapu Angin's structural and compositional design patterns while maintaining Anargya's own visual identity.**

Do not create a generic university engineering team template.

Do not simply copy Sapu Angin and replace its logo.

Study both design systems and adapt the reference thoughtfully.

## 2. Reference Materials

You will receive three primary references.

### Reference A — Anargya Design System

File: `docs/anargya-design.md`

This is the authoritative design system for the entire project.

Use it for:

- Brand identity and visual guidelines
- Primary, secondary, and accent colors
- Background and text colors
- Font families and typography
- Typography sizes, weights, and line heights
- Component styling
- Buttons and navigation styling
- Spacing rules
- Grid constraints
- Border radius
- Borders and shadows
- Icons
- Interaction states
- Responsive design rules

When a property is explicitly defined in Anargya's design system, follow it.

### Reference B — Sapu Angin Design System

File: `docs/sapu-angin-design.md`

This is the reference design system.

Analyze it to understand:

- Overall website architecture
- Layout patterns
- Grid systems
- Component architecture
- Hero composition
- Navigation layout
- Section structure
- Card arrangements
- Typography hierarchy
- Spacing and whitespace
- Image positioning
- Responsive patterns
- Animation and interaction specifications

Use this file as a reference for structure and presentation, not as the authority for Anargya's branding.

### Reference C — Sapu Angin Website

Website URL: `[PASTE SAPU ANGIN WEBSITE URL HERE]`

Inspect the live website thoroughly.

Analyze all relevant accessible pages, including the homepage, navigation, hero section, content sections, project displays, team pages, footer, and responsive states.

Compare the live implementation with the provided Sapu Angin design system.

If browser access is unavailable, rely on the provided design system and explicitly identify which details could not be verified.

Do not claim to have inspected pages or interactions that you could not access.

---

## 3. Design Priorities

Apply this priority order throughout the project:

1. Anargya's official design system
2. Anargya's website content and special-task requirements
3. Sapu Angin's design system for visual and structural inspiration
4. Sapu Angin's live website for observable layout and interaction patterns
5. General UI/UX best practices

### Conflict Resolution

If Sapu Angin uses a different color palette, use Anargya's colors.

If Sapu Angin uses different fonts, use Anargya's typography.

If Sapu Angin uses particular button styles but Anargya specifies its own, follow Anargya.

If Sapu Angin has a compelling layout or component arrangement that does not conflict with Anargya, adapt it.

If Anargya does not define a required design property, propose a consistent extension and document it as an assumption.

**Do not merge the two design systems indiscriminately.**

## 4. Phase 1 — Analyze Sapu Angin

Before creating any Figma designs, perform a detailed analysis of Sapu Angin's design system and live website.

### A. Website Structure

Identify:

- Overall page structure
- Navigation and header
- Hero section
- Section order
- Container widths
- Content alignment
- Grid layouts
- Section heights
- Horizontal and vertical spacing
- Image and text proportions
- Background treatments
- Footer organization
- Responsive behavior

### B. Component Inventory

Identify all relevant UI components, including:

- Navbar
- Navigation links
- Dropdown menus
- Primary and secondary buttons
- Icon buttons
- Cards
- Project cards
- Team member cards
- Statistic components
- Section headings
- Badges and tags
- Image containers
- Dividers
- Footer elements
- Social links
- Decorative visual elements

For each component, analyze:

- Width and height
- Padding and margins
- Alignment
- Typography
- Borders and radius
- Shadows
- Colors
- Interactive states
- Responsive behavior

Prefer documented values from Sapu Angin's design system over guesses.

Clearly label any estimated measurements.

### C. Typography

Analyze the reference website's:

- Font families
- Font weights
- Heading hierarchy
- Body typography
- Line heights
- Letter spacing
- Text transformations
- Alignment and spacing

Understand how the typography contributes to the overall visual hierarchy.

The final design must use Anargya's official typography wherever defined.

### D. Layout Geometry

Pay special attention to:

- Hero dimensions
- Navbar proportions
- Content container widths
- Section padding
- Text-to-image ratios
- Grid columns
- Card proportions
- Whitespace distribution
- Content flow
- Image aspect ratios

I want the final design to preserve the distinctive layout characteristics of Sapu Angin, where appropriate.

Do not replace its unique compositions with generic layout templates.

### E. Interactions and Animations

Analyze observable:

- Hover effects
- Button transitions
- Navigation interactions
- Scroll animations
- Section reveal animations
- Interactive cards
- Responsive menu behavior

Recreate appropriate interactions in Figma prototyping when supported.

Document interactions that require code implementation.

## 5. Phase 2 — Analyze Anargya's Design System

Read `docs/anargya-design.md` completely.

Extract and organize:

### Colors
- Primary and secondary colors
- Accent colors
- Surface and background colors
- Text colors
- Borders
- Semantic state colors

### Typography
- Font families
- Font weights
- Display and heading styles
- Body text
- Captions
- Button labels

### Layout
- Spacing scale
- Container widths
- Grid rules
- Section padding
- Breakpoints

### Components
- Buttons
- Navigation
- Cards
- Tags
- Image containers
- Any other defined components

### Visual Properties
- Border radius
- Shadows
- Effects
- Iconography
- Motion guidelines

Use these specifications to establish the Figma design foundations.

Avoid introducing unnecessary new tokens.

## 6. Phase 3 — Design System Mapping

Create a comparison between Anargya and Sapu Angin.

Prepare a Design System Mapping Table containing:

| Element | Sapu Angin Reference | Anargya Specification | Final Decision |
|---|---|---|---|
| Colors | Reference palette | Official palette | Follow Anargya |
| Fonts | Reference typography | Official typography | Follow Anargya |
| Navbar | Reference structure | Anargya styling | Adapt |
| Hero | Reference composition | Anargya identity | Adapt |
| Buttons | Reference patterns | Official components | Follow Anargya |
| Cards | Reference arrangements | Anargya tokens | Adapt |
| Layout Grid | Reference geometry | Official constraints | Reconcile |
| Footer | Reference structure | Anargya content | Adapt |

Extend the table to include all meaningful design decisions.

For each significant component, explain:

1. What is being adopted from Sapu Angin.
2. Which Anargya tokens are being used.
3. What modifications are required.
4. Why those modifications are appropriate.

Save the analysis as:

`docs/design-analysis.md`

This document should become the primary reference for later design iterations.

**Complete this analysis before starting Figma creation.**

## 7. Phase 4 — Define the Anargya Website Architecture

Create a proposed page structure based on Anargya's actual requirements.

Potential sections include:

- Navbar
- Hero
- About Anargya
- Research and Development
- Projects and Vehicle Showcase
- Achievements
- Team Members
- Sponsors and Partners
- News and Updates
- Contact
- Footer

These sections are suggestions rather than mandatory requirements.

Use the supplied content and project requirements to decide which sections are appropriate.

Do not invent factual achievements, sponsors, team members, or vehicle specifications.

Use clearly labeled placeholders when official content is unavailable.

Map each selected Anargya section to an appropriate Sapu Angin layout pattern.

## 8. Phase 5 — Create the Figma Design Foundations

Create an organized Figma file using editable native Figma elements.

### Page 01 — Reference Analysis

Include:

- Sapu Angin website breakdown
- Layout observations
- Component inventory
- Design system mapping
- Important adaptation decisions

### Page 02 — Design Foundations

Include:

- Anargya color palette
- Semantic color tokens
- Typography scale
- Font styles
- Spacing system
- Layout grids
- Border radius
- Shadows
- Icons
- Component guidelines

Use Figma variables and styles when supported.

### Page 03 — Component Library

Create reusable UI components for:

- Desktop navigation
- Mobile navigation
- Primary buttons
- Secondary buttons
- Outlined buttons
- Navigation links
- Project cards
- Team cards
- Section headings
- Tags and badges
- Statistic blocks
- Image containers
- Footer
- Social media links
- Other required interface elements

Use component variants for interactive states where appropriate.

### Component Rules

Prefer:

- Auto Layout
- Reusable components
- Component instances
- Design variables
- Text styles
- Consistent naming
- Responsive constraints

Avoid unnecessary absolute positioning.

Do not flatten the entire design into images.

## 9. Phase 6 — Create the Desktop Website

Create the complete Anargya desktop website in Figma.

Target desktop width: **1440px**.

Use Anargya's official design tokens for all visual styling.

Use Sapu Angin's website as inspiration for:

- Navigation composition
- Hero layout
- Section order
- Text and image arrangement
- Grid structure
- Card organization
- Whitespace
- Footer presentation
- Overall visual rhythm

The design should be technically sophisticated, visually polished, and suitable for a university engineering and research team.

Keep all text editable.

Use Anargya-specific imagery and content where available.

Do not use Sapu Angin's logos, proprietary artwork, or team-specific content as Anargya's assets.

## 10. Phase 7 — Responsive Design

Create responsive versions at the following widths:

- Desktop: 1440px
- Tablet: 768px
- Mobile: 390px

Adapt:

- Grid columns
- Navbar behavior
- Typography sizes
- Hero composition
- Section spacing
- Card stacking
- Images
- Footer layout

Do not simply shrink the desktop design.

Follow Anargya's responsive specifications where defined, and adapt compatible reference patterns from Sapu Angin.

## 11. Phase 8 — Figma Prototyping

Create meaningful interactions where supported:

- Navigation between designed pages
- Button hover states
- Mobile menu interactions
- Component state changes
- Clickable cards
- Appropriate transitions

Follow observable Sapu Angin behavior when compatible with Anargya.

Document any animations or behaviors that require frontend development.

## 12. Phase 9 — Figma Organization

Use the following file structure where supported:

- `01 — Reference Analysis`
- `02 — Design Foundations`
- `03 — Component Library`
- `04 — Desktop`
- `05 — Tablet`
- `06 — Mobile`
- `07 — Prototype & Handoff`

Use meaningful names for layers and components.

Examples:

- `Navigation/Desktop`
- `Navigation/Mobile`
- `Button/Primary`
- `Button/Secondary`
- `Card/Project`
- `Card/Team`
- `Section/Hero`
- `Section/About`
- `Section/Projects`
- `Footer/Desktop`

The design must be practical to implement later using Next.js, React, TypeScript, and Tailwind CSS.

## 13. Quality Assurance

Before completing the task, verify:

### Brand Compliance

- Anargya's official colors are respected.
- Typography follows Anargya.
- Existing component rules are followed.
- No Sapu Angin branding appears in the finished design.
- Any proposed design-system extensions are documented.

### Reference Fidelity

- Layout proportions reflect the reference.
- Hero composition is intentionally adapted.
- Component arrangements preserve compatible reference patterns.
- Spacing and visual rhythm remain cohesive.
- The design is not a generic template.

### Figma Quality

- Text is editable.
- Components are reusable.
- Auto Layout is used appropriately.
- Layers are organized and named.
- Responsive frames are complete.
- Prototype interactions function where implemented.

### Usability

- Text contrast is adequate.
- Navigation is clear.
- Mobile layouts are usable.
- Interactive controls have appropriate dimensions.
- Content hierarchy is understandable.

Correct identified issues before delivering the final design.

## 14. Final Deliverables

Deliver:

1. A complete editable Anargya website design in Figma.
2. Design foundations based on Anargya's design system.
3. A reusable UI component library.
4. Complete desktop website layouts.
5. Responsive tablet and mobile designs.
6. A Design System Mapping Table.
7. Reference analysis explaining the Sapu Angin inspiration.
8. Prototype interactions where supported.
9. Developer handoff notes for future Next.js implementation.

Provide the Figma file link if the integration supports creating and sharing files.

If direct Figma creation is unavailable, clearly explain the limitation. Do not pretend that an editable file has been produced.

## 15. Execution Rules

Follow these rules throughout the project:

1. Read the reference files before beginning design work.
2. Do not repeat previously completed analysis unnecessarily.
3. Save findings to `docs/design-analysis.md`.
4. Work incrementally.
5. Build reusable components before assembling full pages.
6. Prefer targeted updates rather than recreating complete layouts.
7. Preserve Anargya's brand identity.
8. Avoid inventing unavailable project content.
9. Create actual editable Figma elements when tools permit.
10. Do not modify the Next.js application code until explicitly requested.

### Work in Distinct Phases

Do not execute every phase in a single attempt.

Begin with **Phase 1 through Phase 3 only**:

- Analyze the references.
- Extract the design systems.
- Create the comparison and mapping.
- Save your findings to `docs/design-analysis.md`.

Then report the findings and wait for my approval before creating anything in Figma.

Once approved, proceed incrementally through the Figma design phases.

This staged workflow is important because I want to review design decisions, avoid unnecessary rework, and use Codex efficiently.

## 16. Final Design Objective

The finished website should have the visual sophistication, strong composition, and professional presentation of Sapu Angin's website.

However, it must be unmistakably Anargya.

The design should feel:

- Innovative
- Technical
- Modern
- Professional
- Visually compelling
- Cohesive
- Brand-consistent
- Appropriate for a research and engineering team

**Core principle:**

Sapu Angin provides the structural inspiration.

Anargya provides the visual identity.

Figma is the design deliverable.

Next.js implementation will come after the Figma design is approved.

**Start by analyzing both design systems and the Sapu Angin website. Save the analysis, explain your design decisions, and wait for approval before proceeding to Figma creation.**