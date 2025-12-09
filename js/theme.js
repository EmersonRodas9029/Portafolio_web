// js/theme.js - VERSIÓN QUE FORZA MODO OSCURO
class ThemeManager {
  constructor() {
    // FORZAR MODO OSCURO SIEMPRE AL INICIO
    const savedTheme = localStorage.getItem('portfolio-theme');

    // Si hay tema guardado, usarlo; si no, usar oscuro
    this.theme = savedTheme || 'dark';

    // DEBUG: Verificar qué está pasando
    console.log('🎨 DEBUG ThemeManager:');
    console.log('- savedTheme:', savedTheme);
    console.log('- theme final:', this.theme);
    console.log('- localStorage tiene portfolio-theme?', !!savedTheme);

    this.lightStylesheet = document.getElementById('theme-stylesheet');
    this.darkStylesheet = document.getElementById('dark-theme-stylesheet');

    // DEBUG: Verificar hojas de estilo
    console.log('- lightStylesheet encontrado?', !!this.lightStylesheet);
    console.log('- darkStylesheet encontrado?', !!this.darkStylesheet);

    this.init();
  }

  init() {
    // APLICAR TEMA INMEDIATAMENTE
    this.applyTheme(this.theme);
    this.setupEventListeners();

    // DEBUG: Verificar HTML después de aplicar
    console.log('✅ Tema aplicado:', this.theme);
    console.log('✅ HTML data-theme:', document.documentElement.getAttribute('data-theme'));
    console.log('✅ localStorage:', localStorage.getItem('portfolio-theme'));
  }

  getSavedTheme() {
    return localStorage.getItem('portfolio-theme');
  }

  applyTheme(theme) {
    // DEBUG
    console.log('🔄 Aplicando tema:', theme);

    // 1. Forzar atributo en HTML
    document.documentElement.setAttribute('data-theme', theme);
    console.log('   - Atributo HTML establecido');

    // 2. Forzar localStorage
    localStorage.setItem('portfolio-theme', theme);
    console.log('   - localStorage actualizado');

    // 3. Forzar hojas de estilo
    this.toggleStylesheets(theme);
    console.log('   - Hojas de estilo actualizadas');

    // 4. Actualizar botón
    this.updateToggleButton(theme);
    console.log('   - Botón actualizado');

    // 5. Transición
    this.addThemeTransition();
    console.log('   - Transición aplicada');

    // 6. VERIFICACIÓN FINAL
    setTimeout(() => {
      console.log('🔍 VERIFICACIÓN FINAL:');
      console.log('   - HTML data-theme:', document.documentElement.getAttribute('data-theme'));
      console.log('   - lightStylesheet disabled?', this.lightStylesheet?.disabled);
      console.log('   - darkStylesheet disabled?', this.darkStylesheet?.disabled);
      console.log('   - Botón icon:', document.querySelector('.theme-toggle__icon')?.innerHTML);
    }, 100);
  }

  toggleStylesheets(theme) {
    if (this.lightStylesheet && this.darkStylesheet) {
      if (theme === 'light') {
        this.lightStylesheet.disabled = false;
        this.darkStylesheet.disabled = true;
        console.log('   - Activado: light.css, Desactivado: dark.css');
      } else {
        this.lightStylesheet.disabled = true;
        this.darkStylesheet.disabled = false;
        console.log('   - Activado: dark.css, Desactivado: light.css');
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
      console.log('   - Icono del botón:', newIcon);
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
    console.log('🔄 Usuario cambió tema manualmente');
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
      console.log('✅ Event listener del botón configurado');
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
  console.log('📄 DOM cargado, inicializando tema...');
  initializeTheme();
});
