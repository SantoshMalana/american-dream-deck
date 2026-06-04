export function observeElements(selector, options = {}) {
  const defaults = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    once: true
  };
  const config = { ...defaults, ...options };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (config.once) observer.unobserve(entry.target);
        if (config.onVisible) config.onVisible(entry.target);
      } else if (!config.once) {
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: config.threshold,
    rootMargin: config.rootMargin
  });

  document.querySelectorAll(selector).forEach(el => observer.observe(el));
  return observer;
}
