// js/utils/scroll.js
class ScrollManager {
  constructor() {
    this.scrollPosition = 0;
    this.init();
  }

  init() {
    this.setupScrollEvents();
    this.setupScrollToTop();
  }

  setupScrollEvents() {
    let ticking = false;

    const updateScrollPosition = () => {
      this.scrollPosition = window.pageYOffset;
      this.handleScrollEffects();
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  handleScrollEffects() {
    // Efecto de fade en header
    this.updateHeaderOnScroll();

    // Mostrar/ocultar botón "scroll to top"
    this.toggleScrollToTop();

    // Efectos de parallax
    this.applyParallaxEffects();
  }

  updateHeaderOnScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    if (this.scrollPosition > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.backdropFilter = 'blur(10px)';
      header.style.boxShadow = 'var(--shadow-sm)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.backdropFilter = 'blur(10px)';
      header.style.boxShadow = 'none';
    }
  }

  setupScrollToTop() {
    // Crear botón si no existe
    if (!document.querySelector('.scroll-to-top')) {
      this.createScrollToTopButton();
    }

    const scrollButton = document.querySelector('.scroll-to-top');
    if (scrollButton) {
      scrollButton.addEventListener('click', () => {
        this.scrollToTop();
      });
    }
  }

  createScrollToTopButton() {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.setAttribute('aria-label', 'Volver al inicio');
    button.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 20L12 4M12 4L5 11M12 4L19 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;

    // Agregar estilos
    this.injectScrollToTopStyles();

    document.body.appendChild(button);
  }

  injectScrollToTopStyles() {
    const styles = `
            .scroll-to-top {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                width: 3rem;
                height: 3rem;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transform: translateY(1rem);
                transition: all 0.3s ease;
                z-index: 1000;
                box-shadow: var(--shadow-md);
            }

            .scroll-to-top:hover {
                background: var(--secondary-color);
                transform: translateY(-0.25rem);
            }

            .scroll-to-top--visible {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            .scroll-to-top svg {
                width: 1.5rem;
                height: 1.5rem;
            }

            @media (max-width: 768px) {
                .scroll-to-top {
                    bottom: 1rem;
                    right: 1rem;
                    width: 2.5rem;
                    height: 2.5rem;
                }
            }
        `;

    if (!document.querySelector('#scroll-to-top-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'scroll-to-top-styles';
      styleSheet.textContent = styles;
      document.head.appendChild(styleSheet);
    }
  }

  toggleScrollToTop() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (!scrollButton) return;

    if (this.scrollPosition > 300) {
      scrollButton.classList.add('scroll-to-top--visible');
    } else {
      scrollButton.classList.remove('scroll-to-top--visible');
    }
  }

  applyParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const yPos = -(this.scrollPosition * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  scrollToElement(element, offset = 0) {
    const target = typeof element === 'string'
      ? document.querySelector(element)
      : element;

    if (target) {
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const targetPosition = target.offsetTop - headerHeight - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  getScrollPosition() {
    return this.scrollPosition;
  }

  isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

// Inicialización y export
let scrollManager;

export function initializeScrollEffects() {
  scrollManager = new ScrollManager();
  return scrollManager;
}

export function scrollToTop() {
  return scrollManager?.scrollToTop();
}

export function scrollToElement(element, offset) {
  return scrollManager?.scrollToElement(element, offset);
}

export function getScrollPosition() {
  return scrollManager?.getScrollPosition();
}
