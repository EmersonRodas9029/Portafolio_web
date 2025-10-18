// js/main.js
import { initializeTheme } from './theme.js';
import { initializeNavigation } from './navigation.js';
import { initializeAnimations } from './animations.js';
import { initializeContactForm } from './contact.js';
import { initializeScrollEffects } from './utils/scroll.js';

// Inicialización de la aplicación
class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    // Inicializar módulos
    this.initializeModules();

    // Cargar datos dinámicos
    this.loadDynamicContent();

    // Configurar event listeners globales
    this.setupGlobalEvents();

    console.log('🚀 Portfolio app initialized - Emerson Rodas');
  }

  initializeModules() {
    initializeTheme();
    initializeNavigation();
    initializeAnimations();
    initializeContactForm();
    initializeScrollEffects();
  }

  loadDynamicContent() {
    // Cargar habilidades
    this.loadSkills();

    // Cargar proyectos
    this.loadProjects();

    // Cargar experiencia
    this.loadExperience();
  }

  setupGlobalEvents() {
    // Error handling global
    window.addEventListener('error', this.handleGlobalError);

    // Performance monitoring
    this.monitorPerformance();
  }

  async loadSkills() {
    try {
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
    } catch (error) {
      console.error('Error loading skills:', error);
    }
  }

  renderSkills(skills) {
    const skillsGrid = document.querySelector('.skills__grid');
    if (!skillsGrid) return;

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
      const projects = [
        {
          title: 'Portfolio Personal',
          description: 'Portfolio profesional desarrollado con HTML5, CSS3 y JavaScript vanilla. Incluye diseño responsive, modo oscuro/claro y optimización SEO.',
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'Responsive Design'],
          image: 'img/projects/portfolio.webp',
          demoUrl: 'https://emersonrodas.dev',
          codeUrl: 'https://github.com/emersonrodas/portfolio',
          featured: true
        },
        {
          title: 'Sistema de Gestión de Tareas',
          description: 'Aplicación web para gestión de tareas con LocalStorage, filtros dinámicos y persistencia de datos.',
          technologies: ['JavaScript', 'LocalStorage', 'CSS Grid', 'Flexbox'],
          image: 'img/projects/task-manager.webp',
          demoUrl: '#',
          codeUrl: 'https://github.com/emersonrodas/task-manager',
          featured: true
        },
        {
          title: 'E-commerce Moderno',
          description: 'Tienda online con carrito de compras, filtros de productos y diseño completamente responsive.',
          technologies: ['JavaScript', 'CSS3', 'HTML5', 'Responsive Design'],
          image: 'img/projects/ecommerce.webp',
          demoUrl: '#',
          codeUrl: 'https://github.com/emersonrodas/ecommerce',
          featured: true
        },
        {
          title: 'Weather App',
          description: 'Aplicación del clima con API integration, geolocalización y interfaz intuitiva.',
          technologies: ['JavaScript', 'API REST', 'Async/Await', 'CSS3'],
          image: 'img/projects/weather-app.webp',
          demoUrl: '#',
          codeUrl: 'https://github.com/emersonrodas/weather-app',
          featured: false
        },
        {
          title: 'Blog Personal',
          description: 'Blog desarrollado con JavaScript vanilla, sistema de comentarios y diseño minimalista.',
          technologies: ['JavaScript', 'CSS3', 'HTML5', 'LocalStorage'],
          image: 'img/projects/blog.webp',
          demoUrl: '#',
          codeUrl: 'https://github.com/emersonrodas/blog',
          featured: false
        }
      ];

      this.renderProjects(projects);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  }

  renderProjects(projects) {
    const projectsGrid = document.querySelector('.projects__grid');
    if (!projectsGrid) return;

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

      // Esta función puede ser extendida para mostrar experiencia en una nueva sección
      console.log('Experience data loaded:', experience);
    } catch (error) {
      console.error('Error loading experience:', error);
    }
  }

  handleGlobalError(event) {
    console.error('Global error:', event.error);
    // Aquí podríamos enviar errores a un servicio de monitoring
    // Por ejemplo: this.sendErrorToAnalytics(event.error);
  }

  monitorPerformance() {
    // Monitoring básico de performance
    window.addEventListener('load', () => {
      if (performance.getEntriesByType('navigation').length > 0) {
        const navEntry = performance.getEntriesByType('navigation')[0];
        const loadTime = navEntry.loadEventEnd - navEntry.navigationStart;
        console.log(`📊 Page loaded in ${loadTime}ms - Emerson Rodas Portfolio`);

        // Podemos enviar estas métricas a un servicio de analytics
        this.trackPerformanceMetrics(loadTime);
      }
    });
  }

  trackPerformanceMetrics(loadTime) {
    // Aquí podrías integrar con Google Analytics o otro servicio
    const metrics = {
      loadTime: loadTime,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };

    console.log('Performance Metrics:', metrics);
  }

  // Método adicional para futuras expansiones
  async loadTestimonials() {
    // Para implementar cuando tengas testimonios de clientes
    console.log('Testimonials section ready for implementation');
  }

  // Método para cargar certificaciones
  async loadCertifications() {
    // Para implementar cuando tengas certificaciones
    console.log('Certifications section ready for implementation');
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

// Manejar el evento de antes de descargar la página (para analytics)
window.addEventListener('beforeunload', () => {
  // Aquí podrías enviar datos de analytics de salida
  console.log('User leaving portfolio - Emerson Rodas');
});

// Export para tests (si los agregamos después)
export default PortfolioApp;
