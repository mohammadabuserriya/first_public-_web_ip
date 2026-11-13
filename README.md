# IP TEAM — Innovation Pioneers Team

A bilingual (English / Arabic) front-end prototype for a university student team website.
Built with **plain HTML5, CSS3 and vanilla JavaScript** — no frameworks, no build step, no backend.

> **Status:** V1 static prototype. Every repeated block is rendered from a JS data file, so the
> site can later be pointed at a real API without touching the markup.

---

## 1. Running the project

The pages use `fetch`-free rendering but do rely on separate JS/CSS files and relative URLs,
so they should be served over HTTP rather than opened with `file://`.

### Option A — VS Code + Live Server (recommended)

1. Open the `ipweb` folder in VS Code.
2. Install the **Live Server** extension (`ritwickdey.LiveServer`) if you do not have it.
3. Right-click `index.html` → **Open with Live Server**.

### Option B — any local static server

```bash
# Node (no dependencies)
npx serve .

# or Python
python -m http.server 8099

# or PHP
php -S localhost:8099
```

Then open <http://localhost:8099/>.

---

## 2. Project structure

```
ipweb/
├── index.html              Home — hero, about preview, stats, events, members,
│                           achievements, gallery, contact form, CTA, footer
├── about.html              Purpose, vision & mission, pillars, activities, values
├── team.html               Leadership (President / VP) + full roster by role
├── events.html             Filterable event list (category × status × keyword)
├── event.html?id=EVENT_ID  Full event detail — rules, schedule, venue, registration
├── achievements.html       Award / participation / milestone cards, filterable
├── 404.html                Custom not-found page
├── logo.jpeg               Copy of the official logo at the project root (see §5)
│
├── css/
│   ├── base.css            Design tokens, reset, typography, buttons, forms, motion
│   ├── layout.css          Navbar, language switcher, footer, page hero, 404
│   └── pages.css           Section + component styles (cards, modals, filters…)
│
├── js/
│   ├── i18n.js             Language engine: EN/AR, dir=rtl, localStorage, title/meta
│   ├── icons.js            Inline SVG icon set (no icon font / no CDN)
│   ├── ui.js               Modal open/close, focus trap, toasts, image fallbacks
│   ├── render.js           Card, chip, badge, modal and form builders (shared)
│   ├── main.js             Nav behaviour, mobile menu, footer, delegated events
│   ├── data/
│   │   ├── config.js       Site settings, stats, contact info, social links, gallery
│   │   ├── members.js      16 members across the 11 team positions
│   │   ├── events.js       9 events covering every status/category/registration mode
│   │   ├── achievements.js 8 achievements (awards, participation, milestones)
│   │   └── translations.js 308 EN + AR string pairs (flat key → value)
│   └── pages/
│       ├── home.js  about.js  team.js  events.js
│       ├── event-detail.js  achievements.js
│       └── (each exposes window.IPPageInit / window.IPPageRender)
│
└── assets/images/
    ├── logo.jpeg           Official logo — never modify, distort or recolour
    └── placeholders/       44 local SVG placeholders (no external requests)
```

**Script load order** (fixed in every HTML page):

`config → members → events → achievements → translations → icons → i18n → ui → render → main → pages/<page>`

---

## 3. Bilingual EN / AR

- `AR / EN` switcher in the navbar; default language is **English**.
- The choice is persisted in `localStorage` under the key **`ip_lang`** — this is the *only*
  thing the site stores locally. Nothing else is written to storage.
- Switching sets `<html lang>` and `dir="rtl"` / `dir="ltr"`, re-renders all dynamic content,
  and rewrites `document.title` + the meta description.
- Fonts: **Space Grotesk** (display), **Inter** (body), **Cairo** (Arabic) from Google Fonts,
  with a `[dir="rtl"]` font swap so Arabic always renders in an Arabic-capable face.
- Text is addressed through `data-i18n`, `data-i18n-html`, `data-i18n-ph`,
  `data-i18n-aria` and `data-i18n-title` attributes against flat keys in `translations.js`.

---

## 4. Data architecture (how to swap in a real API)

All content lives in `js/data/*.js` as plain arrays/objects on `window`:

| Global | File | Contents |
| --- | --- | --- |
| `IP_CONFIG` | `config.js` | brand, stats, contact info, social links, gallery |
| `IP_MEMBERS` | `members.js` | members, roles, order, `featured` flag |
| `IP_EVENTS` | `events.js` | events incl. rules, schedule, registration config |
| `IP_ACHIEVEMENTS` | `achievements.js` | awards, dates, categories |
| `IP_TRANSLATIONS` | `translations.js` | EN + AR strings |

Page controllers (`js/pages/*.js`) only read these globals and hand HTML to `IPRender`.
To go live, replace the arrays with `fetch()` results (keeping the same object shape) and
re-run the render pass — no markup changes required.

---

## 5. Logo note

The brief refers to `assets/images/logo.png`, but the project ships **`assets/images/logo.jpeg`**
(and an identical copy at the project root). The `.png` file does not exist.

- The real file is referenced as-is everywhere: `assets/images/logo.jpeg`.
- The logo has a pure black background, so the navbar renders it inside a dark "logo plate"
  chip to avoid a white box around it.
- **The logo was not modified, recoloured, distorted or replaced.** Drop in a true
  `logo.png` and update the `src` in `js/data/config.js` (plus `index.html` / `404.html`)
  if you receive one.

---

## 6. Sample data — what is demo-only and needs a backend

Everything marked with a **"Sample data"** chip is placeholder content. Nothing has been
invented as fact: no real awards, statistics, email addresses, phone numbers or social
accounts are claimed.

| Feature | Current behaviour | What a backend must provide |
| --- | --- | --- |
| **Event registration** (internal mode) | Front-end form with validation, then an honest confirmation that says the data was *not* transmitted | Endpoint to receive and store registrations |
| **Contact form** | Validates, then shows "nothing was transmitted" | Mailing endpoint / form service (Formspree, Netlify Forms, …) |
| **External registration** | Renders a real link only when `registrationUrl` is set in `events.js`; otherwise an explanatory toast — **never a dead link** | Confirmed Google Forms URL per event |
| **Stats** (25+ members, 12+ events…) | Sample figures, labelled as such | Real counters |
| **Members / events / achievements / gallery** | Sample records in `js/data/*.js` | CMS or API |
| **Social links** | Unconfigured links render as a *button* + toast, not `href="#"` | Real account URLs in `config.js` |
| **Contact info** | Sample email/address; phone entry hidden until a real number is set | Real details |
| **Language preference** | Saved in `localStorage` (`ip_lang`) | — (client-side is fine) |

There is **no authentication, no admin dashboard and no database in V1**, by design.

---

## 7. Accessibility & QA

Verified in-browser across all seven pages:

- **Lighthouse: Accessibility 100 · Best Practices 100 · SEO 100** (index, team, events, event detail).
- No console errors or warnings on any page; the only 404 console entry is the intentional
  test of the custom `404.html`.
- Heading order has no skipped levels on any page (`h1 → h2 → h3 …`).
- Text/background pairs meet **WCAG AA** contrast in both light and dark sections.
- Mobile menu opens/closes with **Escape**, focus is trapped inside modals and returned on close.
- Forms have associated labels, inline validation and `aria-live` status messages.
- `prefers-reduced-motion` disables reveal animations and smooth scrolling; content is
  visible by default if JavaScript fails (`html:not(.js-ready)` fallback).
- Responsive at 360 / 390 / 768 / 912 / 1024 / 1440 px; `grid-3` collapses to 2 columns
  below ~940 px (so three cards can leave one empty cell — expected behaviour).

---

## 8. Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Uses CSS custom properties,
Grid, `color-mix()`, `:is()` and `IntersectionObserver`.
