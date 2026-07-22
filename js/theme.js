// js/theme.js - VERSIÓN QUE FORZA MODO OSCURO
class ThemeManager {
  constructor() {
    // FORZAR MODO OSCURO SIEMPRE AL INICIO
    const savedTheme = localStorage.getItem('portfolio-theme');

    // Si hay tema guardado, usarlo; si no, usar oscuro
    this.theme = savedTheme || 'dark';

    // DEBUG: Verificar qué está pasando

    this.lightStylesheet = document.getElementById('theme-stylesheet');
    this.darkStylesheet = document.getElementById('dark-theme-stylesheet');

    // DEBUG: Verificar hojas de estilo

    this.init();
  }

  init() {
    // APLICAR TEMA INMEDIATAMENTE
    this.applyTheme(this.theme);
    this.setupEventListeners();

    // DEBUG: Verificar HTML después de aplicar
  }

  getSavedTheme() {
    return localStorage.getItem('portfolio-theme');
  }

  applyTheme(theme) {
    // DEBUG

    // 1. Forzar atributo en HTML
    document.documentElement.setAttribute('data-theme', theme);

    // 2. Forzar localStorage
    localStorage.setItem('portfolio-theme', theme);

    // 3. Forzar hojas de estilo
    this.toggleStylesheets(theme);

    // 4. Actualizar botón
    this.updateToggleButton(theme);

    // 5. Transición
    this.addThemeTransition();

    // 6. VERIFICACIÓN FINAL
    setTimeout(() => {
    }, 100);
  }

  toggleStylesheets(theme) {
    if (this.lightStylesheet && this.darkStylesheet) {
      if (theme === 'light') {
        this.lightStylesheet.disabled = false;
        this.darkStylesheet.disabled = true;
      } else {
        this.lightStylesheet.disabled = true;
        this.darkStylesheet.disabled = false;
      }
    } else {
      console.error('❌ No se encontraron las hojas de estilo');
    }
  }

  updateToggleButton(theme) {
    const toggleButton = document.querySelector('.theme-toggle');
    if (!toggleButton) {
      console.error('❌ No se encontró el botón theme-toggle');
      return;
    }

    const icon = toggleButton.querySelector('.theme-toggle__icon');
    if (icon) {
      const newIcon = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      icon.innerHTML = newIcon;
    }

    toggleButton.setAttribute('aria-label',
      theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    toggleButton.title = theme === 'dark' ? 'Modo claro' : 'Modo oscuro';
  }

  addThemeTransition() {
    document.documentElement.classList.add('theme-transition');
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.theme);

    document.dispatchEvent(new CustomEvent('themeChanged', {
      detail: { theme: this.theme }
    }));
  }

  setupEventListeners() {
    const toggleButton = document.querySelector('.theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => this.toggleTheme());
    }

    // Atajos de teclado
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        this.toggleTheme();
      }
      if (e.key === 't' && e.altKey) {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  getCurrentTheme() {
    return this.theme;
  }

  setTheme(theme) {
    if (['light', 'dark'].includes(theme)) {
      this.theme = theme;
      this.applyTheme(theme);
      return true;
    }
    return false;
  }
}

// Inicialización y export
let themeManager;

export function initializeTheme() {
  if (!themeManager) {
    themeManager = new ThemeManager();
  }
  return themeManager;
}

export function getCurrentTheme() {
  return themeManager?.getCurrentTheme();
}

export function toggleTheme() {
  return themeManager?.toggleTheme();
}

export function setTheme(theme) {
  return themeManager?.setTheme(theme);
}

// FORZAR INICIALIZACIÓN TEMPRANA
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
});
