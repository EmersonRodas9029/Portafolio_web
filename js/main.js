// js/main.js
import { initializeTheme } from './theme.js';
import { initializeNavigation } from './navigation.js';
import { initializeAnimations } from './animations.js';
import { initializeContactForm } from './contact.js';
import { initializeScrollEffects } from './utils/scroll.js';
import { initializeCVDownload } from './cv-download.js';

// Inicialización de la aplicación
class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    console.log('🚀 Iniciando Portfolio App - Emerson Rodas');

    // Inicializar módulos
    this.initializeModules();

    // Cargar datos dinámicos
    this.loadDynamicContent();

    // Configurar event listeners globales
    this.setupGlobalEvents();

    console.log('✅ Portfolio app inicializada correctamente');
  }

  initializeModules() {
    console.log('🔧 Inicializando módulos...');

    initializeTheme();
    initializeNavigation();
    initializeAnimations();
    initializeContactForm();
    initializeScrollEffects();
    initializeCVDownload();

    console.log('✅ Todos los módulos inicializados');
  }

  loadDynamicContent() {
    console.log('📦 Cargando contenido dinámico...');

    // Cargar habilidades
    this.loadSkills();

    // Cargar proyectos
    this.loadProjects();

    // Cargar experiencia
    this.loadExperience();

    // Cargar stats animados
    this.animateStats();
  }

  setupGlobalEvents() {
    // Error handling global
    window.addEventListener('error', this.handleGlobalError);

    // Performance monitoring
    this.monitorPerformance();

    // Escuchar evento personalizado de CV descargado
    document.addEventListener('cvDownloaded', (event) => {
      console.log('📄 CV descargado exitosamente:', event.detail);
    });

    // Escuchar errores de módulos
    window.addEventListener('unhandledrejection', (event) => {
      console.error('❌ Error no manejado:', event.reason);
    });
  }

  async loadSkills() {
    try {
      console.log('🛠️ Cargando habilidades...');

      const skills = [
        { name: 'HTML5', level: 'Avanzado', icon: '⚡', category: 'frontend' },
        { name: 'CSS3', level: 'Avanzado', icon: '🎨', category: 'frontend' },
        { name: 'JavaScript', level: 'Avanzado', icon: '💻', category: 'frontend' },
        { name: 'React', level: 'Intermedio', icon: '⚛️', category: 'frontend' },
        { name: 'Git & GitHub', level: 'Intermedio', icon: '📚', category: 'tools' },
        { name: 'Responsive Design', level: 'Avanzado', icon: '📱', category: 'frontend' },
        { name: 'UI/UX Design', level: 'Intermedio', icon: '✨', category: 'design' },
        { name: 'Node.js', level: 'Básico', icon: '🟢', category: 'backend' },
        { name: 'Bootstrap', level: 'Intermedio', icon: '🎯', category: 'frontend' },
        { name: 'SASS/SCSS', level: 'Intermedio', icon: '🔄', category: 'frontend' },
        { name: 'Webpack', level: 'Básico', icon: '📦', category: 'tools' },
        { name: 'Figma', level: 'Intermedio', icon: '🎨', category: 'design' }
      ];

      this.renderSkills(skills);
      console.log('✅ Habilidades cargadas:', skills.length);

    } catch (error) {
      console.error('❌ Error loading skills:', error);
    }
  }

  renderSkills(skills) {
    const skillsGrid = document.querySelector('.skills__grid');
    if (!skillsGrid) {
      console.warn('⚠️ No se encontró el contenedor de habilidades');
      return;
    }

    skillsGrid.innerHTML = skills.map(skill => `
      <div class="skill-card reveal-item" data-category="${skill.category}">
        <div class="skill-card__icon">${skill.icon}</div>
        <h3 class="skill-card__name">${skill.name}</h3>
        <p class="skill-card__level">${skill.level}</p>
      </div>
    `).join('');
  }

  async loadProjects() {
    try {
      console.log('💼 Cargando proyectos...');

      const projects = [
        {
          title: 'Portfolio Personal',
          description: 'Portfolio profesional desarrollado con HTML5, CSS3 y JavaScript vanilla. Incluye diseño responsive, modo oscuro/claro y optimización SEO.',
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'Responsive Design'],
          image: 'img/projects/portfolio.webp',
          demoUrl: 'https://emersonrodas.dev',
          codeUrl: 'https://github.com/EmersonRodas9029/portfolio',
          featured: true
        },
        {
          title: 'Sistema de Gestión de Tareas',
          description: 'Aplicación web para gestión de tareas con LocalStorage, filtros dinámicos y persistencia de datos.',
          technologies: ['JavaScript', 'LocalStorage', 'CSS Grid', 'Flexbox'],
          image: 'img/projects/task-manager.webp',
          demoUrl: '#',
          codeUrl: 'https://github.com/EmersonRodas9029/task-manager',
          featured: true
        },
        {
          title: 'E-commerce Moderno',
          description: 'Tienda online con carrito de compras, filtros de productos y diseño completamente responsive.',
          technologies: ['JavaScript', 'CSS3', 'HTML5', 'Responsive Design'],
          image: 'img/projects/ecommerce.webp',
          demoUrl: '#',
          codeUrl: 'https://github.com/EmersonRodas9029/ecommerce',
          featured: true
        }
      ];

      this.renderProjects(projects);
      console.log('✅ Proyectos cargados:', projects.length);

    } catch (error) {
      console.error('❌ Error loading projects:', error);
    }
  }

  renderProjects(projects) {
    const projectsGrid = document.querySelector('.projects__grid');
    if (!projectsGrid) {
      console.warn('⚠️ No se encontró el contenedor de proyectos');
      return;
    }

    const featuredProjects = projects.filter(project => project.featured);

    projectsGrid.innerHTML = featuredProjects.map(project => `
      <article class="project-card reveal-item">
        <div class="project-card__image-container">
          <img src="${project.image}" alt="${project.title} - Desarrollado por Emerson Rodas" class="project-card__image" loading="lazy">
          <div class="project-card__overlay">
            <div class="project-card__links--overlay">
              ${project.demoUrl !== '#' ? `
                <a href="${project.demoUrl}" class="btn btn--primary" target="_blank" rel="noopener noreferrer" aria-label="Ver demo de ${project.title}">
                  Demo
                </a>
              ` : ''}
              <a href="${project.codeUrl}" class="btn btn--secondary" target="_blank" rel="noopener noreferrer" aria-label="Ver código de ${project.title}">
                Código
              </a>
            </div>
          </div>
        </div>
        <div class="project-card__content">
          <h3 class="project-card__title">${project.title}</h3>
          <p class="project-card__description">${project.description}</p>
          <div class="project-card__tags">
            ${project.technologies.map(tech => `
              <span class="project-card__tag">${tech}</span>
            `).join('')}
          </div>
          <div class="project-card__links">
            ${project.demoUrl !== '#' ? `
              <a href="${project.demoUrl}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">
                Ver Demo
              </a>
            ` : ''}
            <a href="${project.codeUrl}" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">
              Ver Código
            </a>
          </div>
        </div>
      </article>
    `).join('');
  }

  async loadExperience() {
    try {
      console.log('📈 Cargando experiencia...');

      const experience = [
        {
          period: '2023 - Presente',
          position: 'Desarrollador Frontend Freelance',
          company: 'Proyectos Independientes',
          description: 'Desarrollo de aplicaciones web responsive y sitios portfolio para clientes. Especializado en JavaScript vanilla y mejores prácticas de desarrollo web.',
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'Responsive Design']
        },
        {
          period: '2022 - 2023',
          position: 'Practicante Desarrollo Web',
          company: 'Proyectos Académicos',
          description: 'Desarrollo de proyectos académicos y personales para fortalecer habilidades en desarrollo frontend y mejores prácticas de código.',
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Figma']
        }
      ];

      console.log('✅ Experiencia cargada:', experience.length);

    } catch (error) {
      console.error('❌ Error loading experience:', error);
    }
  }

  animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    if (statNumbers.length === 0) {
      console.warn('⚠️ No se encontraron estadísticas para animar');
      return;
    }

    console.log('📊 Animando estadísticas:', statNumbers.length);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumber = entry.target;
          const target = parseInt(statNumber.getAttribute('data-count'));
          const duration = 2000; // 2 seconds
          const step = target / (duration / 16); // 60fps
          let current = 0;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            statNumber.textContent = Math.floor(current);
          }, 16);

          observer.unobserve(statNumber);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
  }

  handleGlobalError(event) {
    console.error('🌍 Error global:', event.error);
  }

  monitorPerformance() {
    window.addEventListener('load', () => {
      if (performance.getEntriesByType('navigation').length > 0) {
        const navEntry = performance.getEntriesByType('navigation')[0];
        const loadTime = navEntry.loadEventEnd - navEntry.navigationStart;
        console.log(`📊 Página cargada en ${loadTime}ms`);

        this.trackPerformanceMetrics(loadTime);
      }
    });
  }

  trackPerformanceMetrics(loadTime) {
    const metrics = {
      loadTime: loadTime,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };

    console.log('📈 Métricas de performance:', metrics);
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  console.log('📄 DOM cargado, iniciando aplicación...');
  new PortfolioApp();
});

// Manejar el evento de antes de descargar la página
window.addEventListener('beforeunload', () => {
  console.log('👋 Usuario saliendo del portfolio');
});

// Export para tests
export default PortfolioApp;
