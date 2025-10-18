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

    console.log('🚀 Portfolio app initialized');
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
      // Datos de ejemplo - luego podemos mover a un archivo JSON
      const skills = [
        { name: 'HTML5', level: 'Avanzado', icon: '🔧', category: 'frontend' },
        { name: 'CSS3', level: 'Avanzado', icon: '🎨', category: 'frontend' },
        { name: 'JavaScript', level: 'Avanzado', icon: '⚡', category: 'frontend' },
        { name: 'Git', level: 'Intermedio', icon: '📚', category: 'tools' },
        { name: 'Responsive Design', level: 'Avanzado', icon: '📱', category: 'frontend' },
        { name: 'UI/UX', level: 'Intermedio', icon: '✨', category: 'design' }
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
          description: 'Portfolio desarrollado con HTML, CSS y JavaScript vanilla.',
          technologies: ['HTML5', 'CSS3', 'JavaScript'],
          image: 'img/projects/portfolio.webp',
          demoUrl: '#',
          codeUrl: 'https://github.com/tu-usuario/portfolio',
          featured: true
        },
        {
          title: 'Sistema de Gestión',
          description: 'Aplicación web para gestión de tareas y proyectos.',
          technologies: ['JavaScript', 'LocalStorage', 'CSS Grid'],
          image: 'img/projects/task-manager.webp',
          demoUrl: '#',
          codeUrl: '#',
          featured: true
        },
        {
          title: 'E-commerce Básico',
          description: 'Tienda online con carrito de compras funcional.',
          technologies: ['JavaScript', 'CSS', 'HTML5'],
          image: 'img/projects/ecommerce.webp',
          demoUrl: '#',
          codeUrl: '#',
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
                    <img src="${project.image}" alt="${project.title}" class="project-card__image" loading="lazy">
                    <div class="project-card__overlay">
                        <div class="project-card__links--overlay">
                            <a href="${project.demoUrl}" class="btn btn--primary" target="_blank" rel="noopener">Demo</a>
                            <a href="${project.codeUrl}" class="btn btn--secondary" target="_blank" rel="noopener">Código</a>
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
                        <a href="${project.demoUrl}" class="btn btn--primary" target="_blank" rel="noopener">Ver Demo</a>
                        <a href="${project.codeUrl}" class="btn btn--secondary" target="_blank" rel="noopener">Código</a>
                    </div>
                </div>
            </article>
        `).join('');
  }

  loadExperience() {
    // Para implementar luego
    console.log('Experience loading ready');
  }

  handleGlobalError(event) {
    console.error('Global error:', event.error);
    // Aquí podríamos enviar errores a un servicio de monitoring
  }

  monitorPerformance() {
    // Monitoring básico de performance
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`📊 Page loaded in ${loadTime}ms`);
    });
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

// Export para tests (si los agregamos después)
export default PortfolioApp;
