import { observeElements } from '../utils/intersection.js';
import { staggerChildren } from '../utils/animations.js';

export class SectionBase {
  constructor(sectionId) {
    this.sectionId = sectionId;
    this.element = document.querySelector(`[data-section="${sectionId}"]`);
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized || !this.element) return;
    this.render();
    this.setupAnimations();
    this.bindEvents();
    this.isInitialized = true;
  }

  render() {
    // Override in subclass
  }

  setupAnimations() {
    if (this.element) {
      observeElements('.animate-in', {
        root: this.element
      });
      const containers = this.element.querySelectorAll('.stagger-container');
      containers.forEach(c => staggerChildren(c, 100));
    }
  }

  bindEvents() {
    // Override in subclass
  }

  onEnter() {
    // Called when section becomes active
    if (!this.isInitialized) this.init();
  }

  onLeave() {
    // Called when section becomes inactive
  }
}
