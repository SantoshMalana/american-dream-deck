export class LoadingScreen {
  constructor() {
    this.element = document.querySelector('.loading-screen');
  }

  show() {
    // Element already exists in HTML
  }

  async hide() {
    if (!this.element) return;
    const fill = this.element.querySelector('.loading-bar-fill');
    if (fill) fill.style.width = '100%';
    await new Promise(r => setTimeout(r, 400));
    this.element.classList.add('fade-out');
    await new Promise(r => setTimeout(r, 600));
    this.element.remove();
    this.element = null;
  }
}
