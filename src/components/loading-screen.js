export class LoadingScreen {
  constructor() {
    this.element = document.querySelector('.loading-screen');
    this.progress = 0;
  }

  show() {
    if (!this.element) this.create();
    this.element.classList.add('active');
  }

  create() {
    this.element = document.createElement('div');
    this.element.className = 'loading-screen';
    this.element.innerHTML = `
      <div class="loading-content">
        <div class="loading-logo">AMERICAN DREAM</div>
        <div class="loading-tagline">Interactive Experience</div>
        <div class="loading-bar">
          <div class="loading-bar-fill"></div>
        </div>
      </div>
    `;
    document.body.appendChild(this.element);
  }

  async hide() {
    if (!this.element) return;
    // Fill the progress bar
    const fill = this.element.querySelector('.loading-bar-fill');
    if (fill) fill.style.width = '100%';

    // Wait, then fade out
    await new Promise(r => setTimeout(r, 600));
    this.element.classList.add('fade-out');
    await new Promise(r => setTimeout(r, 500));
    this.element.remove();
    this.element = null;
  }
}
