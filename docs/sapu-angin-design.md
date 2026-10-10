# ITS Team Sapuangin

## Mission
Create implementation-ready, token-driven UI guidance for ITS Team Sapuangin that is optimized for consistency, accessibility, and fast delivery across dashboard web app.

## Brand
- Product/brand: ITS Team Sapuangin
- URL: https://www.itsteamsapuangin.com/
- Audience: authenticated users and operators
- Product surface: dashboard web app

## Style Foundations
- Visual style: clean, functional, implementation-oriented
- Main font style: `font.family.primary=__DM_Sans_e64f39`, `font.family.stack=__DM_Sans_e64f39, __DM_Sans_Fallback_e64f39`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=24px`
- Typography scale: `font.size.xs=14px`, `font.size.sm=16px`, `font.size.md=18px`, `font.size.lg=20px`, `font.size.xl=32px`, `font.size.2xl=36px`, `font.size.3xl=42px`, `font.size.4xl=56px`
- Color palette: `color.surface.base=#000000`, `color.text.secondary=#ffffff`, `color.text.tertiary=#5d5d5d`, `color.text.inverse=oklab(0.999994 0.0000455677 0.0000200868 / 0.8)`, `color.surface.raised=#e50808`
- Spacing scale: `space.1=2px`, `space.2=8px`, `space.3=12px`, `space.4=16px`, `space.5=24px`, `space.6=32px`, `space.7=56px`, `space.8=80px`
- Radius/shadow/motion tokens: `radius.xs=6px`, `radius.sm=33554400px` | `shadow.1=rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px` | `motion.duration.instant=150ms`, `motion.duration.fast=300ms`, `motion.duration.normal=500ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: links (73), inputs (4), buttons (2), lists (2), navigation (1).

- Extraction diagnostics: Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
