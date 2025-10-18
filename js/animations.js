// js/animations.js
class AnimationManager {
  constructor() {
    this.observers = [];
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupHoverAnimations();
    this.setupLoadingAnimations();
    this.setupIntersectionObservers();
  }

  setupScrollAnimations() {
    // Efectos de parallax básicos
    window.addEventListener('scroll', this.throttle(() => {
      this.applyScrollEffects();
    }, 16));

    // Smooth reveal para elementos
    this.setupRevealAnimations();
  }

  setupRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal-item');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');

          // Agregar delay escalonado basado en data-attribute
          const delay = entry.target.dataset.revealDelay || '0';
          entry.target.style.animationDelay = `${delay}ms`;
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '-50px'
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }

  setupHoverAnimations() {
    // Efectos hover para tarjetas
    const hoverCards = document.querySelectorAll('.card, .project-card, .skill-card');

    hoverCards.forEach(card => {
      card.addEventListener('mouseenter', this.debounce(() => {
        card.style.transform = 'translateY(-8px)';
      }, 10));

      card.addEventListener('mouseleave', this.debounce(() => {
        card.style.transform = 'translateY(0)';
      }, 10));
    });

    // Efectos hover para botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.05)';
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
      });
    });
  }

  setupLoadingAnimations() {
    // Animaciones de carga para imágenes
    const images = document.querySelectorAll('img[loading="lazy"]');

    images.forEach(img => {
      img.addEventListener('load', () => {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
      });

      img.style.opacity = '0';
      img.style.transform = 'scale(0.95)';
      img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Loading states para contenido dinámico
    this.setupContentLoadingStates();
  }

  setupContentLoadingStates() {
    // Simular carga de contenido
    const loadingElements = document.querySelectorAll('[data-loading]');

    loadingElements.forEach(element => {
      element.classList.add('loading');

      // Simular fin de carga después de un delay
      setTimeout(() => {
        element.classList.remove('loading');
        element.classList.add('loaded');
      }, parseInt(element.dataset.loading) || 1000);
    });
  }

  setupIntersectionObservers() {
    // Observer para animaciones de progreso
    const progressBars = document.querySelectorAll('.progress-fill');

    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const width = progressBar.dataset.width || '100%';

          progressBar.style.width = width;
          progressBar.style.animation = `progressFill 1.5s ease-out forwards`;
        }
      });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
      progressObserver.observe(bar);
    });
  }

  applyScrollEffects() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const yPos = -(scrolled * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });

    // Efecto de fade en header al hacer scroll
    const header = document.querySelector('.header');
    if (header) {
      if (scrolled > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
      }
    }
  }

  // Utilidades para performance
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Métodos públicos para controlar animaciones
  animateElement(element, animationClass) {
    element.classList.add(animationClass);

    // Remover clase después de la animación
    element.addEventListener('animationend', () => {
      element.classList.remove(animationClass);
    }, { once: true });
  }

  fadeIn(element, duration = 500) {
    element.style.transition = `opacity ${duration}ms ease`;
    element.style.opacity = '0';
    element.style.display = 'block';

    requestAnimationFrame(() => {
      element.style.opacity = '1';
    });
  }

  fadeOut(element, duration = 500) {
    element.style.transition = `opacity ${duration}ms ease`;
    element.style.opacity = '0';

    setTimeout(() => {
      element.style.display = 'none';
    }, duration);
  }
}

// Inicialización y export
let animationManager;

export function initializeAnimations() {
  animationManager = new AnimationManager();
  return animationManager;
}

export function animateElement(element, animationClass) {
  return animationManager?.animateElement(element, animationClass);
}

export function fadeIn(element, duration) {
  return animationManager?.fadeIn(element, duration);
}

export function fadeOut(element, duration) {
  return animationManager?.fadeOut(element, duration);
}
