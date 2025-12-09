// js/hero.js - Efectos para la sección Hero
export class HeroEffects {
  constructor() {
    this.typedTextElement = document.getElementById('typed-text');
    this.init();
  }

  init() {
    if (this.typedTextElement) {
      this.initTypedEffect();
    }

    this.initScrollIndicator();
    this.initFloatingElements();
    this.initParallaxEffect();
  }

  initTypedEffect() {
    const texts = [
      'Desarrollador Frontend',
      'Especialista en JavaScript',
      'Creador de Experiencias Web',
      'Apasionado por la Innovación'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const currentText = texts[textIndex];

      if (isDeleting) {
        // Borrando texto
        this.typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        // Escribiendo texto
        this.typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      // Cambiar estado
      if (!isDeleting && charIndex === currentText.length) {
        // Pausa al final
        isDeleting = true;
        typingSpeed = 1500;
      } else if (isDeleting && charIndex === 0) {
        // Cambiar al siguiente texto
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    };

    // Iniciar después de un delay
    setTimeout(type, 1000);
  }

  initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator__link');
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector('#sobre-mi');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');

    floatingElements.forEach(element => {
      // Agregar interacción al hover
      element.addEventListener('mouseenter', () => {
        element.style.transform = 'scale(1.2) rotate(15deg)';
        element.style.transition = 'transform 0.3s ease';
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = '';
      });

      // Agregar tooltip
      const iconClass = Array.from(element.querySelector('i').classList)
        .find(cls => cls.startsWith('fa-'));

      if (iconClass) {
        const tooltip = this.getTooltipForIcon(iconClass);
        element.setAttribute('title', tooltip);
      }
    });
  }

  getTooltipForIcon(iconClass) {
    const tooltips = {
      'fa-html5': 'HTML5 - Maquetación web semántica',
      'fa-css3-alt': 'CSS3 - Estilos y animaciones modernas',
      'fa-js': 'JavaScript - Interactividad y lógica',
      'fa-react': 'React - Librería para interfaces'
    };

    return tooltips[iconClass] || 'Tecnología web';
  }

  initParallaxEffect() {
    const bgElements = document.querySelectorAll('.bg-circle, .bg-shape');

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      bgElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        element.style.transform = `translateY(${rate * speed}px)`;
      });
    });
  }

  // Efecto de partículas opcional
  initParticles() {
    if (document.querySelector('.hero__particles')) {
      const particlesContainer = document.querySelector('.hero__particles');

      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          position: absolute;
          width: 2px;
          height: 2px;
          background: var(--primary-color);
          border-radius: 50%;
          opacity: 0.3;
          top: ${Math.random() * 100}%;
          left: ${Math.random() * 100}%;
          animation: particleFloat ${5 + Math.random() * 10}s infinite linear;
        `;

        particlesContainer.appendChild(particle);
      }
    }
  }
}

// Inicialización
export function initializeHeroEffects() {
  const heroEffects = new HeroEffects();
  return heroEffects;
}
