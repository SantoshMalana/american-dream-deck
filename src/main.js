import './styles/index.css';
import { Router } from './utils/router.js';
import { SidebarNav } from './components/sidebar-nav.js';
import { LoadingScreen } from './components/loading-screen.js';
import { StatCounter } from './components/stat-counter.js';

class App {
  constructor() {
    this.router = null;
    this.nav = null;
    this.loading = new LoadingScreen();
    this.animatedSections = new Set();
  }

  async init() {
    this.loading.show();
    await document.fonts.ready;

    this.router = new Router();
    this.nav = new SidebarNav(this.router);

    // Wrap the router callback so App also reacts
    const originalCb = this.router.onSectionChange;
    this.router.onSectionChange = (sectionId, prev) => {
      if (originalCb) originalCb(sectionId, prev);
      this.onSectionEnter(sectionId);
    };

    await this.loading.hide();
    this.onSectionEnter(this.router.currentSection || 'hero');
    this.initAIForm();
  }

  onSectionEnter(sectionId) {
    const section = document.querySelector(`[data-section="${sectionId}"]`);
    if (!section) return;

    // Stagger animate-in elements
    const elements = section.querySelectorAll('.animate-in');
    elements.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 80 + 150);
    });

    // Animate counters only once per section
    if (!this.animatedSections.has(sectionId)) {
      this.animatedSections.add(sectionId);
      setTimeout(() => {
        StatCounter.initAll(section).forEach(c => c.animate());
      }, 400);
    }
  }

  initAIForm() {
    const form = document.getElementById('ai-generator-form');
    if (!form) return;

    const btn = document.getElementById('ai-generate-btn');
    const resultContainer = document.getElementById('ai-result-container');
    const loadingEl = document.getElementById('ai-loading');
    const outputEl = document.getElementById('ai-output');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const brandName = document.getElementById('ai-brand-name').value.trim();
      if (!brandName) return;

      btn.disabled = true;
      btn.style.opacity = '0.5';
      resultContainer.style.display = 'block';
      outputEl.style.display = 'none';
      outputEl.style.color = '';
      loadingEl.style.display = 'block';

      try {
        const res = await fetch('/api/generate-brief', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ brandName })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Generation failed');
        outputEl.textContent = data.brief;
        loadingEl.style.display = 'none';
        outputEl.style.display = 'block';
      } catch (err) {
        loadingEl.style.display = 'none';
        outputEl.style.display = 'block';
        outputEl.textContent = 'Error: ' + err.message;
        outputEl.style.color = '#ff4d4f';
      } finally {
        btn.disabled = false;
        btn.style.opacity = '1';
      }
    });
  }
}

const app = new App();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}
