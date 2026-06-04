export class SidebarNav {
  constructor(router) {
    this.router = router;
    this.sidebar = document.querySelector('.sidebar');
    this.navList = document.querySelector('.nav-list');
    this.progressFill = document.querySelector('.nav-progress-fill');
    this.isCollapsed = false;

    this.sections = [
      { id: 'hero', label: 'Overview', icon: 'home' },
      { id: 'why-property', label: 'Why American Dream', icon: 'map-pin' },
      { id: 'retail', label: 'Retail', icon: 'shopping-bag' },
      { id: 'luxury', label: 'The Avenue', icon: 'diamond' },
      { id: 'dining', label: 'Dining & Lifestyle', icon: 'utensils' },
      { id: 'entertainment', label: 'Entertainment', icon: 'star' },
      { id: 'events', label: 'Events & Venues', icon: 'calendar' },
      { id: 'partner', label: 'Partner With Us', icon: 'handshake' },
    ];

    this.render();
    this.bindEvents();
  }

  getIcon(name) {
    const icons = {
      'home': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
      'map-pin': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
      'shopping-bag': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
      'diamond': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9z"/><path d="M2 9h20"/><path d="M10 3l-4 6 6 13 6-13-4-6"/></svg>',
      'utensils': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>',
      'star': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
      'calendar': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
      'handshake': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 16.5l-4-4-6 6-4-4"/><path d="M2 12l4.5-4.5 4 4 6-6L21 10"/><path d="M14 7l3-3 4 4-3 3"/><path d="M3.5 14.5L7 11l-4-4 3.5 3.5"/></svg>'
    };
    return icons[name] || icons['home'];
  }

  render() {
    this.navList.innerHTML = this.sections.map(section => `
      <button class="nav-item" data-nav="${section.id}" aria-label="Navigate to ${section.label}">
        <span class="nav-icon">${this.getIcon(section.icon)}</span>
        <span class="nav-label">${section.label}</span>
      </button>
    `).join('');

    this.updateActive(this.router.currentSection || 'hero');
  }

  bindEvents() {
    // Nav item clicks
    this.navList.addEventListener('click', (e) => {
      const navItem = e.target.closest('.nav-item');
      if (!navItem) return;
      const sectionId = navItem.dataset.nav;
      window.location.hash = sectionId;
    });

    // Router section change callback
    this.router.onSectionChange = (sectionId) => {
      this.updateActive(sectionId);
      this.updateProgress();
    };

    // Toggle button
    const toggle = document.querySelector('.sidebar-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => this.toggleCollapse());
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        this.router.next();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        this.router.prev();
      }
    });
  }

  updateActive(sectionId) {
    this.navList.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.nav === sectionId);
    });
  }

  updateProgress() {
    const total = this.sections.length;
    const current = this.router.getCurrentIndex() + 1;
    const percent = (current / total) * 100;
    if (this.progressFill) {
      this.progressFill.style.width = `${percent}%`;
    }
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebar.classList.toggle('collapsed', this.isCollapsed);
    document.querySelector('.main-content').classList.toggle('sidebar-collapsed', this.isCollapsed);
  }
}
