// js/theme.js
class ThemeManager {
  constructor() {
    this.theme = this.getSavedTheme() || this.getSystemTheme();
    this.init();
  }

  init() {
    this.applyTheme(this.theme);
    this.setupEventListeners();
  }

  getSavedTheme() {
    return localStorage.getItem('portfolio-theme');
  }

  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    this.updateToggleButton(theme);
  }

  updateToggleButton(theme) {
    const toggleButton = document.querySelector('.theme-toggle');
    if (!toggleButton) return;

    const icon = toggleButton.querySelector('.theme-toggle__icon');
    if (icon) {
      icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    // Actualizar aria-label
    toggleButton.setAttribute('aria-label',
      `Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`);
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.theme);

    // Emitir evento personalizado
    document.dispatchEvent(new CustomEvent('themeChanged', {
      detail: { theme: this.theme }
    }));
  }

  setupEventListeners() {
    // Toggle button
    const toggleButton = document.querySelector('.theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => this.toggleTheme());
    }

    // Escuchar cambios del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('portfolio-theme')) {
        this.theme = e.matches ? 'dark' : 'light';
        this.applyTheme(this.theme);
      }
    });

    // Atajos de teclado
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  getCurrentTheme() {
    return this.theme;
  }
}

// Inicialización y export
let themeManager;

export function initializeTheme() {
  themeManager = new ThemeManager();
  return themeManager;
}

export function getCurrentTheme() {
  return themeManager?.getCurrentTheme();
}

export function toggleTheme() {
  return themeManager?.toggleTheme();
}
