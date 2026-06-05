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
    this.initContactForm();
    this.initCustomCursor();
    this.initMagneticButtons();
    this.initFilmstrip();
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
        // Mocking the AI response for the static Vercel deployment
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        const mockBrief = `OPPORTUNITY BRIEF: ${brandName.toUpperCase()} x AMERICAN DREAM

1. THE VISION
Position ${brandName} at the epicenter of global retail and entertainment. By anchoring your next flagship at American Dream, you aren't just opening a store—you are creating an immersive brand embassy accessible to 40M+ annual visitors.

2. THE ACTIVATION
Leverage our 1M+ sq ft of activation space. Imagine a ${brandName} takeover of the DreamWorks Water Park for a VIP product launch, seamlessly bridging experiential marketing with direct retail conversion.

3. THE AUDIENCE
Tap into a highly affluent, captive audience with a dwell time 3x higher than traditional retail centers. 

Next Step: Let's schedule a site tour to view the premier corner-cap locations in The Avenue.`;

        outputEl.textContent = mockBrief;
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
  initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      
      // Visual feedback
      btn.innerHTML = 'Sent Successfully <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
      btn.style.background = 'var(--color-success)';
      btn.style.color = '#fff';
      
      // Reset form
      contactForm.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.color = '';
      }, 3000);
    });
  }

  initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    if (!cursor || !cursorDot) return;

    // Only enable if hover is supported
    if (window.matchMedia('(hover: hover)').matches) {
      document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
      });

      // Add hover states to interactable elements
      const hoverTargets = document.querySelectorAll('a, button, select, input, textarea, .card, .tier-card, .attraction-hero-card, .featured-card');
      
      hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
          cursor.classList.add('hovering');
        });
        target.addEventListener('mouseleave', () => {
          cursor.classList.remove('hovering');
        });
      });
    }
  }

  initMagneticButtons() {
    const buttons = document.querySelectorAll('.cta-button');
    
    // Only enable if hover is supported
    if (window.matchMedia('(hover: hover)').matches) {
      buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          // Pull the button towards the cursor
          btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
          // Snap back to center
          btn.style.transform = 'translate(0px, 0px)';
        });
      });
    }
  }

  initFilmstrip() {
    const wrapper = document.querySelector('.filmstrip-wrapper');
    const btnLeft = document.querySelector('.filmstrip-arrow-left');
    const btnRight = document.querySelector('.filmstrip-arrow-right');
    
    if (!wrapper || !btnLeft || !btnRight) return;

    const updateButtons = () => {
      // Small threshold (5px) to avoid precision issues
      const isAtStart = wrapper.scrollLeft <= 5;
      const isAtEnd = wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth - 5;
      
      btnLeft.disabled = isAtStart;
      btnRight.disabled = isAtEnd;
    };

    wrapper.addEventListener('scroll', updateButtons, { passive: true });
    
    // Initial check
    updateButtons();

    // Scroll amount is roughly one card + gap
    const scrollAmount = 400 + 48;

    btnLeft.addEventListener('click', () => {
      wrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    btnRight.addEventListener('click', () => {
      wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }
}

const app = new App();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}
