export class Router {
  constructor() {
    this.currentSection = null;
    this.sections = new Map();
    this.onSectionChange = null;
    this.init();
  }

  init() {
    document.querySelectorAll('[data-section]').forEach(el => {
      this.sections.set(el.dataset.section, el);
    });
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'hero';
    this.navigateTo(hash);
  }

  navigateTo(sectionId) {
    if (sectionId === this.currentSection) return;
    if (!this.sections.has(sectionId)) return;

    // Hide current
    if (this.currentSection) {
      const current = this.sections.get(this.currentSection);
      current.classList.remove('active');
      // Reset animate-in elements so they re-animate on re-entry
      current.querySelectorAll('.animate-in.visible').forEach(el => {
        el.classList.remove('visible');
      });
    }

    // Show next
    const next = this.sections.get(sectionId);
    next.classList.add('active');
    // Scroll to top of new section
    next.scrollTop = 0;

    const prev = this.currentSection;
    this.currentSection = sectionId;

    if (window.location.hash.slice(1) !== sectionId) {
      history.replaceState(null, '', `#${sectionId}`);
    }

    if (this.onSectionChange) {
      this.onSectionChange(sectionId, prev);
    }
  }

  getSectionIds() {
    return Array.from(this.sections.keys());
  }

  getCurrentIndex() {
    return this.getSectionIds().indexOf(this.currentSection);
  }

  next() {
    const ids = this.getSectionIds();
    const idx = this.getCurrentIndex();
    if (idx < ids.length - 1) {
      window.location.hash = ids[idx + 1];
    }
  }

  prev() {
    const ids = this.getSectionIds();
    const idx = this.getCurrentIndex();
    if (idx > 0) {
      window.location.hash = ids[idx - 1];
    }
  }
}
