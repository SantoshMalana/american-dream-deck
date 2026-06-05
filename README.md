# American Dream Interactive Sales Deck

A bespoke, non-linear interactive sales deck built for the American Dream property. Designed to replace fragmented pitch materials (PDFs, YouTube links, spreadsheets) with a single, high-impact web experience for prospective retail tenants, sponsors, and event partners.

## 🚀 Live Demo
**[https://american-dream-deck-chi.vercel.app/](https://american-dream-deck-chi.vercel.app/)**

## 💡 The Vision
The world's largest shopping malls are no longer just malls—they are mixed-use destinations operating like small cities. This tool was built to convey the scale, energy, and commercial opportunity of the American Dream within the first 10 seconds. 

It draws visual inspiration from luxury brands (Hermès, Apple) and experiential destinations (Disney) to create a cinematic, confident, and impossible-to-ignore pitch.

## 🛠 Tech Stack
- **Frontend Framework:** Vanilla JavaScript & HTML5
- **Build Tool:** Vite (for rapid HMR and optimized production bundling)
- **Styling:** Vanilla CSS (CSS Grid, Flexbox, Custom Properties, `:has()` selectors)
- **Architecture:** Custom hash-based overlay router (`src/utils/router.js`) for non-linear navigation.
- **Deployment:** Vercel

## ✨ Key Features
- **Immersive Continuous Scroll:** Replaces rigid slide-decks with a full-bleed, cinematic scroll experience.
- **Non-Linear Navigation:** A sleek overlay menu allows the presenter (or the prospect) to jump to any section instantly.
- **Unique UI Components:**
  - *The Hover Reveal:* A high-end, Awwwards-style interaction for Signature Brands.
  - *Editorial Masonry:* An asymmetrical, magazine-style layout for Dining.
  - *Cinematic Filmstrip:* A native horizontal scroll for Event Capabilities.
- **AI Opportunity Generator:** A built-in mock AI tool that generates custom pitch briefs instantly based on an inputted brand name.
- **Performance Optimized:** Achieves a 90+ Lighthouse score via lazy-loading and minimal dependencies.

## 🤖 AI Integration
Generative AI was used extensively to accelerate the design and asset creation for this deck:
1. **Visual Assets:** Adobe Firefly and DALL-E were used to generate the high-end architectural imagery (The Avenue luxury wing, the Dream Live concert venue, and the retail interiors) where public assets were low-resolution.
2. **Code Assistance:** AI was leveraged to rapidly prototype the custom vanilla JS router, generate the staggered CSS keyframe animations, and write the punchy, confident copywriting that replaces traditional marketing fluff.

## ⚙️ Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/american-dream-deck.git
   cd american-dream-deck
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Build for production:**
   ```bash
   npm run build
   ```

## 🏗 Expandable Architecture
The codebase was designed specifically for Phase 2 expansion. By utilizing the `[data-section]` attribute pattern in `index.html` and the dynamic `router.js`, developers can easily drop in new HTML sections (e.g., Sponsorship Tiers, Leasing Paths) without rewriting the core navigation logic.
