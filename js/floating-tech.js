// js/floating-tech.js - VERSIÓN MODIFICADA
// Sistema de elementos flotantes animados SOLO EN HERO

export class FloatingTech {
  constructor() {
    this.techElements = [];
    this.container = null;
    this.heroSection = null;
    this.init();
  }

  init() {
    console.log('🚀 Inicializando elementos flotantes tecnológicos para Hero...');

    // Obtener la sección Hero
    this.heroSection = document.querySelector('.hero');
    if (!this.heroSection) {
      console.error('❌ No se encontró la sección Hero');
      return;
    }

    // Crear contenedor DENTRO del Hero
    this.createContainer();

    // Definir tecnologías (5 por cada lado)
    const backendTechs = this.getBackendTechs();
    const frontendTechs = this.getFrontendTechs();

    // Crear elementos (5 de cada)
    this.createTechElements(backendTechs.slice(0, 5), 'backend');
    this.createTechElements(frontendTechs.slice(0, 5), 'frontend');

    // Iniciar animaciones
    this.startAnimations();

    // Configurar eventos
    this.setupEvents();

    console.log('✅ Elementos flotantes creados en Hero:', this.techElements.length);
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.className = 'floating-tech-container';
    this.container.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    `;

    // Agregar al Hero, no al body
    this.heroSection.appendChild(this.container);
  }

  getBackendTechs() {
    return [
      { name: 'Java', icon: 'fab fa-java', color: '#007396', level: 'avanzado' },
      { name: 'Node.js', icon: 'fab fa-node-js', color: '#339933', level: 'intermedio' },
      { name: 'Python', icon: 'fab fa-python', color: '#3776AB', level: 'básico' },
      { name: 'C#', icon: 'fab fa-windows', color: '#239120', level: 'avanzado' },
      { name: 'TypeScript', icon: 'fab fa-js-square', color: '#3178C6', level: 'intermedio' },
      { name: 'MySQL', icon: 'fas fa-database', color: '#00758F', level: 'avanzado' },
      { name: 'PostgreSQL', icon: 'fas fa-database', color: '#336791', level: 'básico' }
    ];
  }

  getFrontendTechs() {
    return [
      { name: 'HTML5', icon: 'fab fa-html5', color: '#E34F26', level: 'avanzado' },
      { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#1572B6', level: 'avanzado' },
      { name: 'JavaScript', icon: 'fab fa-js-square', color: '#F7DF1E', level: 'avanzado' },
      { name: 'React', icon: 'fab fa-react', color: '#61DAFB', level: 'intermedio' },
      { name: 'Vue.js', icon: 'fab fa-vuejs', color: '#4FC08D', level: 'básico' },
      { name: 'Astro', icon: 'fas fa-rocket', color: '#FF5D01', level: 'intermedio' },
      { name: 'Bootstrap', icon: 'fab fa-bootstrap', color: '#7952B3', level: 'intermedio' }
    ];
  }

  createTechElements(techs, category) {
    techs.forEach((tech, index) => {
      const element = this.createTechElement(tech, category, index);
      this.techElements.push(element);
      this.container.appendChild(element);
    });
  }

  createTechElement(tech, category, index) {
    const element = document.createElement('div');
    element.className = `floating-tech floating-tech--${category}`;

    // Posiciones específicas para 5 elementos por lado
    const positions = this.getPositionsForCategory(category, index);

    element.style.cssText = `
      position: absolute;
      top: ${positions.top}%;
      ${category === 'backend' ? 'left' : 'right'}: ${positions.side}%;
      animation-delay: ${index * 0.3}s;
      z-index: ${index + 1};
    `;

    // Crear el elemento de tecnología
    const techElement = document.createElement('div');
    techElement.className = `tech-element tech-${tech.name.toLowerCase().replace('.', '').replace('#', 'sharp').replace('++', 'plusplus')}`;
    techElement.innerHTML = `<i class="${tech.icon}"></i>`;

    // Tooltip con nivel
    const tooltip = document.createElement('div');
    tooltip.className = 'tech-tooltip';
    tooltip.innerHTML = `
      <strong>${tech.name}</strong>
      <div class="tech-level tech-level--${tech.level}">${tech.level}</div>
    `;

    techElement.appendChild(tooltip);
    element.appendChild(techElement);

    // Agregar datos para referencia
    element.dataset.tech = tech.name;
    element.dataset.category = category;
    element.dataset.level = tech.level;

    return element;
  }

  getPositionsForCategory(category, index) {
    // 5 posiciones estratégicas para cada lado
    const positions = [
      { top: 15, side: 10 },  // Arriba
      { top: 30, side: 15 },  // Medio-alto
      { top: 50, side: 10 },  // Centro
      { top: 70, side: 15 },  // Medio-bajo
      { top: 85, side: 10 }   // Abajo
    ];

    return positions[index] || { top: 50, side: 10 };
  }

  startAnimations() {
    // Animaciones diferentes para variedad
    this.techElements.forEach((element, index) => {
      const techElement = element.querySelector('.tech-element');
      const animations = [
        { name: 'techFloat', duration: 6 },
        { name: 'techBounce', duration: 4 },
        { name: 'techWave', duration: 8 }
      ];

      const randomAnim = animations[index % animations.length];

      // Aplicar animación
      techElement.style.animation = `
        ${randomAnim.name} ${randomAnim.duration}s ease-in-out infinite
      `;

      // Delay escalonado
      techElement.style.animationDelay = `${index * 0.2}s`;

      // Rotación inicial aleatoria
      const rotation = Math.random() * 20 - 10; // Entre -10 y 10 grados
      techElement.style.transform = `rotate(${rotation}deg)`;

      // Tamaño variado
      const size = 50 + (index % 3) * 10; // 50px, 60px, 70px
      techElement.style.width = `${size}px`;
      techElement.style.height = `${size}px`;

      // Color de borde específico
      const techColor = this.getTechColor(element.dataset.tech);
      techElement.style.borderColor = `${techColor}40`; // Con transparencia
    });
  }

  getTechColor(techName) {
    const colorMap = {
      'Java': '#007396',
      'Node.js': '#339933',
      'Python': '#3776AB',
      'C#': '#239120',
      'TypeScript': '#3178C6',
      'HTML5': '#E34F26',
      'CSS3': '#1572B6',
      'JavaScript': '#F7DF1E',
      'React': '#61DAFB',
      'Vue.js': '#4FC08D',
      'Astro': '#FF5D01',
      'Bootstrap': '#7952B3',
      'MySQL': '#00758F',
      'PostgreSQL': '#336791'
    };

    return colorMap[techName] || '#3b82f6';
  }

  setupEvents() {
    // Solo habilitar interacción en desktop
    if (window.innerWidth > 768) {
      this.techElements.forEach(element => {
        const techElement = element.querySelector('.tech-element');

        techElement.style.pointerEvents = 'auto';

        techElement.addEventListener('mouseenter', () => {
          this.onTechHover(element);
        });

        techElement.addEventListener('mouseleave', () => {
          this.onTechLeave(element);
        });
      });
    }

    // Observer para pausar cuando no está visible
    this.setupIntersectionObserver();
  }

  onTechHover(element) {
    const techElement = element.querySelector('.tech-element');
    const techName = element.dataset.tech;
    const level = element.dataset.level;

    // Pausar animación principal
    techElement.style.animationPlayState = 'paused';

    // Efecto de elevación
    techElement.style.transform = 'scale(1.3) rotate(0deg)';
    techElement.style.transition = 'transform 0.3s ease';
    techElement.style.zIndex = '100';

    // Resaltar con sombra
    const techColor = this.getTechColor(techName);
    techElement.style.boxShadow = `
      0 0 30px ${techColor}80,
      0 0 60px ${techColor}40
    `;

    // Efecto de pulso
    techElement.classList.add('tech-pulsing');

    console.log(`🎯 ${techName} (${level})`);
  }

  onTechLeave(element) {
    const techElement = element.querySelector('.tech-element');

    // Reanudar animación
    techElement.style.animationPlayState = 'running';

    // Restaurar transformación
    techElement.style.transform = '';
    techElement.style.transition = '';
    techElement.style.zIndex = '';
    techElement.style.boxShadow = '';

    // Remover pulso
    techElement.classList.remove('tech-pulsing');
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.techElements.forEach(element => {
          const techElement = element.querySelector('.tech-element');
          if (techElement) {
            if (entry.isIntersecting) {
              techElement.style.opacity = '1';
              techElement.style.animationPlayState = 'running';
            } else {
              techElement.style.opacity = '0';
              techElement.style.animationPlayState = 'paused';
            }
          }
        });
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    observer.observe(this.heroSection);
  }

  // Destruir elementos (por si acaso)
  destroy() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.techElements = [];
  }
}

// Inicialización y export
let floatingTech;

export function initializeFloatingTech() {
  // Solo crear si estamos en el Hero y en desktop
  if (window.innerWidth > 768 && document.querySelector('.hero')) {
    if (!floatingTech) {
      floatingTech = new FloatingTech();
    }
    return floatingTech;
  }
  return null;
}

export function getFloatingTech() {
  return floatingTech;
}
