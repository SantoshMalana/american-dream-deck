// Animate counting up a number
export function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();
  const suffix = element.dataset.suffix || '';
  const prefix = element.dataset.prefix || '';

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out quart
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = Math.round(start + (target - start) * eased);

    element.textContent = prefix + current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Stagger animation delay for children
export function staggerChildren(parent, delayMs = 100) {
  const children = parent.querySelectorAll('.animate-in');
  children.forEach((child, index) => {
    child.style.transitionDelay = `${index * delayMs}ms`;
  });
}

// Typewriter effect
export function typewriter(element, text, speed = 50) {
  return new Promise(resolve => {
    let i = 0;
    element.textContent = '';
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    }
    type();
  });
}
