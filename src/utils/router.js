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
      // Give each section an ID so native hash routing works too, if desired
      el.id = el.dataset.section;
    });
    
    // Listen for hash changes from clicking nav links
    window.addEventListener('hashchange', () => this.handleRoute());
    
    // Handle initial route
    setTimeout(() => this.handleRoute(), 100);
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'hero';
    this.navigateTo(hash);
  }

  navigateTo(sectionId) {
    if (!this.sections.has(sectionId)) return;

    const targetSection = this.sections.get(sectionId);
    
    // Smooth scroll to the section
    targetSection.scrollIntoView({ behavior: 'smooth' });

    const prev = this.currentSection;
    this.currentSection = sectionId;

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
