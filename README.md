# Westforce Career Care

A responsive Westforce Career Care landing page, built with semantic HTML, CSS, and vanilla JavaScript. Its centered hero, section flow, and responsive navigation are informed by the PSW Career Compass reference; the page keeps the existing Westforce wordmark, Inter typography, green design tokens, and copy.

## Run locally

Open `index.html` in a browser. The page has no build step or runtime package dependencies. The Inter font is loaded from Google Fonts when a network connection is available.

## Project structure

- `index.html` — landing page content and semantic structure
- `styles/tokens.css` — extracted color and layout tokens
- `styles/global.css` — component styling and responsive rules
- `scripts/main.js` — readiness quiz and care-scenario interactions

## Scope and verification

The reference's pricing content and the entire "See How PSW Career Compass Supports You" section are intentionally excluded. The Westforce page retains its existing readiness quiz, care scenario, tool cards, career-stage cards, and footer. Navigation targets existing sections; there are no account or backend integrations in this project, so no sign-in links or backend-dependent features are claimed.

The "Almost there" quiz result was observable during reference inspection. The other result bands reuse career-stage copy already present on the page; their scoring thresholds and exact original behavior remain unverified.

Browser checks covered 320, 390, 430, 768, 1024, and 1440 px widths with no horizontal overflow, along with mobile menu keyboard/anchor behavior and the quiz and scenario interactions. No automated test or production-build configuration is present.
