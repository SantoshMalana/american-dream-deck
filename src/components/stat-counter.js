import { animateCounter } from '../utils/animations.js';

export class StatCounter {
  constructor(element) {
    this.element = element;
    this.target = parseFloat(element.dataset.target) || 0;
    this.hasAnimated = false;
    this.prefix = element.dataset.prefix || '';
    this.suffix = element.dataset.suffix || '';
    
    // Set fallback in case animation never fires
    this.fallbackTimeout = setTimeout(() => {
      if (!this.hasAnimated) {
        this.element.textContent = this.prefix + this.target.toLocaleString() + this.suffix;
      }
    }, 3000);
  }

  animate() {
    if (this.hasAnimated) return;
    this.hasAnimated = true;
    clearTimeout(this.fallbackTimeout);
    animateCounter(this.element, this.target, 2000);
  }

  static initAll() {
    const counters = [];
    
    // Use an observer so counters animate precisely when they scroll into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = counters.find(c => c.element === entry.target);
          if (counter) counter.animate();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('[data-counter]').forEach(el => {
      const counter = new StatCounter(el);
      counters.push(counter);
      observer.observe(el);
    });
    
    return counters;
  }
}
