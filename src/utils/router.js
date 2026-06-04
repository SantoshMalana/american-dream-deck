// Manages section visibility based on URL hash
// Sections are identified by data-section attribute
// Default section is 'hero'

export class Router {
  constructor() {
    this.currentSection = null;
    this.sections = new Map();
    this.onSectionChange = null; // callback
    this.init();
  }

  init() {
    // Discover all sections
    document.querySelectorAll('[data-section]').forEach(el => {
      this.sections.set(el.dataset.section, el);
    });

    // Listen for hash changes
    window.addEventListener('hashchange', () => this.handleRoute());

    // Initial route
    this.handleRoute();
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'hero';
    this.navigateTo(hash);
  }

  navigateTo(sectionId) {
    if (sectionId === this.currentSection) return;
    if (!this.sections.has(sectionId)) return;

    // Hide current section
    if (this.currentSection) {
      const current = this.sections.get(this.currentSection);
      current.classList.remove('active');
      current.classList.add('section-exit');
      // After animation, fully hide
      setTimeout(() => current.classList.remove('section-exit'), 500);
    }

    // Show new section
    const next = this.sections.get(sectionId);
    next.classList.add('active');

    // Update hash without triggering hashchange
    const previousSection = this.currentSection;
    this.currentSection = sectionId;
    if (window.location.hash.slice(1) !== sectionId) {
      history.replaceState(null, '', `#${sectionId}`);
    }

    // Callback
    if (this.onSectionChange) {
      this.onSectionChange(sectionId, previousSection);
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
      this.navigateTo(ids[idx + 1]);
      window.location.hash = ids[idx + 1];
    }
  }

  prev() {
    const ids = this.getSectionIds();
    const idx = this.getCurrentIndex();
    if (idx > 0) {
      this.navigateTo(ids[idx - 1]);
      window.location.hash = ids[idx - 1];
    }
  }
}
