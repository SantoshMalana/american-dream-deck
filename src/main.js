import { Router } from './utils/router.js';
import { SidebarNav } from './components/sidebar-nav.js';
import { LoadingScreen } from './components/loading-screen.js';
import { StatCounter } from './components/stat-counter.js';

class App {
  constructor() {
    this.router = null;
    this.nav = null;
    this.loading = new LoadingScreen();
  }

  async init() {
    // Show loading screen
    this.loading.show();

    // Wait for fonts to load
    await document.fonts.ready;

    // Initialize router
    this.router = new Router();

    // Initialize navigation
    this.nav = new SidebarNav(this.router);

    // Wrap the router's onSectionChange callback set by SidebarNav
    // so the App can also react to section transitions
    const originalCallback = this.router.onSectionChange;
    this.router.onSectionChange = (sectionId, prev) => {
      if (originalCallback) originalCallback(sectionId, prev);
      this.onSectionEnter(sectionId);
    };

    // Hide loading screen
    await this.loading.hide();

    // Trigger initial section animations
    this.onSectionEnter(this.router.currentSection || 'hero');

    console.log('American Dream Interactive Deck initialized');
  }

  onSectionEnter(sectionId) {
    // Trigger animate-in elements in the active section
    const section = document.querySelector(`[data-section="${sectionId}"]`);
    if (section) {
      const animateElements = section.querySelectorAll('.animate-in');
      animateElements.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 100 + 200);
      });
      
      // Initialize counters
      setTimeout(() => {
        const counters = StatCounter.initAll(section);
        counters.forEach(c => c.animate());
      }, 500);
    }
  }
}

// Initialize when DOM is ready
const app = new App();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}

// AI Generator Logic
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('ai-generator-form');
  const btn = document.getElementById('ai-generate-btn');
  const resultContainer = document.getElementById('ai-result-container');
  const loadingIndicator = document.getElementById('ai-loading');
  const outputEl = document.getElementById('ai-output');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const brandName = document.getElementById('ai-brand-name').value;
      
      if (!brandName) return;

      // Update UI
      btn.disabled = true;
      btn.style.opacity = '0.5';
      resultContainer.style.display = 'block';
      outputEl.style.display = 'none';
      loadingIndicator.style.display = 'block';

      try {
        const response = await fetch('/api/generate-brief', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ brandName })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to generate');
        }

        outputEl.textContent = data.brief;
        loadingIndicator.style.display = 'none';
        outputEl.style.display = 'block';
      } catch (err) {
        loadingIndicator.style.display = 'none';
        outputEl.style.display = 'block';
        outputEl.textContent = 'Error: ' + err.message;
        outputEl.style.color = '#ff4d4f';
      } finally {
        btn.disabled = false;
        btn.style.opacity = '1';
      }
    });
  }
});
