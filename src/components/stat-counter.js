import { animateCounter } from '../utils/animations.js';

export class StatCounter {
  constructor(element) {
    this.element = element;
    this.target = parseFloat(element.dataset.target) || 0;
    this.hasAnimated = false;
  }

  animate() {
    if (this.hasAnimated) return;
    this.hasAnimated = true;
    animateCounter(this.element, this.target, 2000);
  }

  static initAll(container = document) {
    const counters = [];
    container.querySelectorAll('[data-counter]').forEach(el => {
      counters.push(new StatCounter(el));
    });
    return counters;
  }
}
