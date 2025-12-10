// js/navigation.js
class NavigationManager {
  constructor() {
    this.currentSection = 'inicio';
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupScrollSpy();
    this.setupMobileMenu();
    this.setupSmoothScroll();
  }

  setupNavigation() {
    // EXCLUIR el enlace de CV de la navegación suave
    const navLinks = document.querySelectorAll('.nav__link:not(.nav__link--cv)');

    console.log('🔗 Enlaces de navegación encontrados:', navLinks.length);

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        console.log('📍 Navegando a sección:', targetId);
        this.navigateToSection(targetId);
      });
    });

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileMenu();
      }
    });
  }

  setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link:not(.nav__link--cv)');

    console.log('👀 Configurando ScrollSpy para secciones:', sections.length);

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.currentSection = entry.target.id;
          this.updateActiveNavLink(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  updateActiveNavLink(activeSection) {
    const navLinks = document.querySelectorAll('.nav__link:not(.nav__link--cv)');

    navLinks.forEach(link => {
      const linkSection = link.getAttribute('href').substring(1);
      if (linkSection === activeSection) {
        link.classList.add('nav__link--active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('nav__link--active');
        link.removeAttribute('aria-current');
      }
    });
  }

  setupMobileMenu() {
    // Crear botón de menú móvil si no existe
    if (!document.querySelector('.nav__toggle')) {
      this.createMobileToggle();
    }

    const toggle = document.querySelector('.nav__toggle');
    const menu = document.querySelector('.nav__menu');

    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        console.log('📱 Toggle menú móvil:', !isExpanded);
        this.toggleMobileMenu(!isExpanded);
      });

      // Cerrar menú al hacer clic en enlaces del menú (IMPORTANTE PARA FIX)
      const menuLinks = menu.querySelectorAll('.nav__link');
      menuLinks.forEach(link => {
        link.addEventListener('click', () => {
          this.closeMobileMenu();
        });
      });

      // Cerrar menú al hacer clic fuera
      document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
          this.closeMobileMenu();
        }
      });

      // Cerrar menú con tecla Escape (ya está arriba, pero por si acaso)
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeMobileMenu();
        }
      });
    }
  }

  createMobileToggle() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const toggle = document.createElement('button');
    toggle.className = 'nav__toggle';
    toggle.setAttribute('aria-label', 'Abrir menú de navegación');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = `
      <span class="nav__toggle-bar"></span>
      <span class="nav__toggle-bar"></span>
      <span class="nav__toggle-bar"></span>
    `;

    // Insertar antes del menú
    const menu = document.querySelector('.nav__menu');
    if (menu) {
      menu.parentNode.insertBefore(toggle, menu);
    }

    // Agregar estilos CSS para el toggle móvil
    this.injectMobileMenuStyles();
  }

  injectMobileMenuStyles() {
    const styles = `
      .nav__toggle {
        display: none;
        flex-direction: column;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        cursor: pointer;
        padding: var(--spacing-sm);
        gap: 4px;
        transition: all var(--transition-normal);
      }

      .nav__toggle:hover {
        background: var(--bg-tertiary);
        border-color: var(--primary-color);
      }

      .nav__toggle-bar {
        width: 25px;
        height: 3px;
        background: var(--text-primary);
        transition: all 0.3s ease;
      }

      @media (max-width: 768px) {
        .nav__toggle {
          display: flex;
        }

        .nav__menu {
          position: fixed; /* Cambiado de absolute a fixed */
          top: 80px; /* Debajo del header */
          left: 0;
          right: 0;
          background: var(--bg-primary);
          border-top: 1px solid var(--border-color);
          flex-direction: column;
          padding: var(--spacing-lg);
          transform: translateY(-20px);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          max-height: calc(100vh - 80px); /* Altura máxima */
          overflow-y: auto; /* Scroll interno si es necesario */
          z-index: 1000;
          box-shadow: var(--shadow-lg);
        }

        .nav__menu--open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .nav__toggle[aria-expanded="true"] .nav__toggle-bar:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .nav__toggle[aria-expanded="true"] .nav__toggle-bar:nth-child(2) {
          opacity: 0;
        }

        .nav__toggle[aria-expanded="true"] .nav__toggle-bar:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        /* Clase para controlar el scroll del body */
        body.menu-open {
          overflow: hidden !important;
          position: fixed;
          width: 100%;
          height: 100%;
        }

        body:not(.menu-open) {
          overflow: auto !important;
          position: static;
        }
      }
    `;

    if (!document.querySelector('#mobile-menu-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'mobile-menu-styles';
      styleSheet.textContent = styles;
      document.head.appendChild(styleSheet);
    }
  }

  toggleMobileMenu(show) {
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.querySelector('.nav__menu');

    if (toggle && menu) {
      toggle.setAttribute('aria-expanded', show.toString());
      menu.classList.toggle('nav__menu--open', show);

      // FIX: Usar clase en lugar de style directo para mejor control
      if (show) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
        // Asegurar que el overflow se restablezca
        document.body.style.overflow = '';
      }

      console.log('🔄 Menú móvil:', show ? 'abierto' : 'cerrado');
    }
  }

  closeMobileMenu() {
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.querySelector('.nav__menu');

    if (toggle && menu) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('nav__menu--open');

      // FIX CRÍTICO: Restaurar scroll del body
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
      document.body.style.position = '';

      console.log('✅ Menú móvil cerrado, scroll restaurado');
    }
  }

  setupSmoothScroll() {
    // Smooth scroll para enlaces internos (excluir CV)
    document.querySelectorAll('a[href^="#"]:not(.nav__link--cv)').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        if (href !== '#' && href !== '#cv') {
          e.preventDefault();
          this.scrollToElement(href.substring(1));
        }
      });
    });
  }

  navigateToSection(sectionId) {
    this.scrollToElement(sectionId);
    this.closeMobileMenu(); // Asegurar que se cierra el menú
    this.updateActiveNavLink(sectionId);
  }

  scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const elementPosition = element.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });

      // Actualizar URL sin recargar
      history.pushState(null, null, `#${elementId}`);
    }
  }

  getCurrentSection() {
    return this.currentSection;
  }
}

// Inicialización y export
let navigationManager;

export function initializeNavigation() {
  navigationManager = new NavigationManager();
  return navigationManager;
}

export function navigateToSection(sectionId) {
  return navigationManager?.navigateToSection(sectionId);
}

export function getCurrentSection() {
  return navigationManager?.getCurrentSection();
}
