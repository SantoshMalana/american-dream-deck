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
    StatCounter.initAll(); // Initialize counters globally using IntersectionObserver
    this.initAIForm();
    this.initScrollObserver();
  }

  initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          const sectionId = entry.target.dataset.section;
          
          // Update hash without jumping
          if (window.location.hash.slice(1) !== sectionId) {
            history.replaceState(null, '', `#${sectionId}`);
            
            // Update router internal state and trigger sidebar update
            this.router.currentSection = sectionId;
            if (this.nav) {
              this.nav.updateActive(sectionId);
              this.nav.updateProgress();
            }
            
            // Trigger animation
            this.onSectionEnter(sectionId);
          }
        }
      });
    }, {
      threshold: 0.3 // Trigger when 30% of the section is visible
    });

    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section);
    });
  }

  onSectionEnter(sectionId) {
    const section = document.querySelector(`[data-section="${sectionId}"]`);
    if (!section) return;

    // Stagger animate-in elements
    const elements = section.querySelectorAll('.animate-in:not(.visible)');
    elements.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 80 + 150);
    });
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
