/* ══════════════════════════════════════════════════════════
   DARK MODE — Toggle Mode Gelap / Terang
   ══════════════════════════════════════════════════════════ */

const DarkMode = {
  STORAGE_KEY: 'informatika_darkmode',

  init() {
    // Check saved preference or system preference
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.enable();
    }
    this._renderToggle();
  },

  _renderToggle() {
    // Add toggle button to header
    const header = document.querySelector('.main-header');
    if (!header || document.getElementById('darkModeToggle')) return;

    const toggle = document.createElement('button');
    toggle.id = 'darkModeToggle';
    toggle.className = 'btn-dark-toggle';
    toggle.title = 'Mode Gelap/Terang';
    toggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    toggle.onclick = () => this.toggle();

    // Insert before h1
    const h1 = header.querySelector('h1');
    if (h1) {
      header.insertBefore(toggle, h1);
    } else {
      header.appendChild(toggle);
    }
  },

  toggle() {
    if (document.body.classList.contains('dark-mode')) {
      this.disable();
    } else {
      this.enable();
    }
  },

  enable() {
    document.body.classList.add('dark-mode');
    localStorage.setItem(this.STORAGE_KEY, 'dark');
    const btn = document.getElementById('darkModeToggle');
    if (btn) btn.innerHTML = '☀️';
  },

  disable() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem(this.STORAGE_KEY, 'light');
    const btn = document.getElementById('darkModeToggle');
    if (btn) btn.innerHTML = '🌙';
  }
};
