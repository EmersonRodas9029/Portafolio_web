// js/main.js - ACTUALIZADO CON ORDENAMIENTO AUTOMÁTICO POR NIVEL

// En main.js, al inicio del archivo
document.addEventListener('DOMContentLoaded', () => {
  // Marcar tema como cargado
  document.body.classList.add('theme-loaded');
});
import { initializeTheme } from './theme.js';
import { initializeNavigation } from './navigation.js';
import { initializeAnimations } from './animations.js';
import { initializeContactForm } from './contact.js';
import { initializeScrollEffects } from './utils/scroll.js';
import { initializeCVDownload } from './cv-download.js';
import { IconsConfig, getIcon, renderIcon } from './icons-config.js';
import { initializeHeroEffects } from './hero.js';
import { initializeFloatingTech } from './floating-tech.js';
import { skillsSections } from './data/skills.js';
import { projects } from './data/projects.js';
import { experience } from './data/experience.js';

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

  }

  initializeModules() {

    initializeTheme();
    initializeNavigation();
    initializeAnimations();
    initializeScrollEffects();
    initializeCVDownload();
    initializeContactForm();
    initializeHeroEffects();
    initializeFloatingTech();

  }

  loadDynamicContent() {

    // Cargar habilidades con nuevas secciones y niveles actualizados
    this.loadSkills();

    // Cargar proyectos
    this.loadProjects();

    // Cargar experiencia
    this.loadExperience();

    // Cargar stats animados
    this.animateStats();

    // Actualizar iconos de navegación
    this.updateNavigationIcons();

    // Actualizar iconos sociales
    this.updateSocialIcons();
  }

  setupGlobalEvents() {
    // Error handling global
    window.addEventListener('error', this.handleGlobalError);

    // Performance monitoring
    this.monitorPerformance();

    // Escuchar evento personalizado de CV descargado
    document.addEventListener('cvDownloaded', (event) => {
    });

    // Escuchar errores de módulos
    window.addEventListener('unhandledrejection', (event) => {
      console.error('❌ Error no manejado:', event.reason);
    });
  }

  async loadSkills() {
    try {
      // Ordenar habilidades por nivel dentro de cada sección
      this.sortSkillsByLevel(skillsSections);

      this.renderSkillsSections(skillsSections);

    } catch (error) {
      console.error('❌ Error loading skills:', error);
    }
  }

  // Método para ordenar habilidades por nivel
  sortSkillsByLevel(sections) {
    const levelOrder = {
      'Avanzado': 3,
      'Intermedio': 2,
      'Básico': 1
    };

    sections.forEach(section => {
      section.skills.sort((a, b) => {
        // Primero ordenar por nivel (descendente: Avanzado primero)
        const levelComparison = levelOrder[b.level] - levelOrder[a.level];

        // Si tienen el mismo nivel, ordenar alfabéticamente
        if (levelComparison === 0) {
          return a.name.localeCompare(b.name);
        }

        return levelComparison;
      });

    });
  }

  renderSkillsSections(sections) {
    const skillsContainer = document.querySelector('.skills__grid');
    if (!skillsContainer) {
      console.warn('⚠️ No se encontró el contenedor de habilidades');
      return;
    }

    skillsContainer.className = 'skills-container';
    skillsContainer.innerHTML = sections.map(section => {
      const sectionIcon = getIcon(section.id, 'navigation');
      const iconHTML = renderIcon(sectionIcon, {
        className: 'skills-section__icon',
        size: 'fa-lg'
      });

      // Contadores de nivel por sección
      const levelCounts = this.countLevelsBySection(section.skills);
      const levelSummary = this.getLevelSummary(levelCounts);

      const skillsHTML = section.skills.map((skill) => {
        const iconClass = getIcon(skill.name, 'skills');
        const iconHTML = renderIcon(iconClass, {
          size: 'fa-2x',
          className: 'skill-card__icon'
        });

        // Determinar clase CSS según el nivel
        const levelClass = this.getLevelClass(skill.level);

        return `
          <div class="skill-card reveal-item ${levelClass}" data-category="${skill.category}" data-skill="${skill.name.toLowerCase()}" data-level="${skill.level.toLowerCase()}">
            ${iconHTML}
            <h3 class="skill-card__name">${skill.name}</h3>
            <div class="skill-card__level-container">
              <span class="skill-card__level skill-card__level--${skill.level.toLowerCase()}">
                ${skill.level}
              </span>
              ${this.getLevelIndicator(skill.level)}
            </div>
          </div>
        `;
      }).join('');

      return `
        <section class="skills-section skills-section--${section.id}" aria-labelledby="${section.id}-title">
          <div class="skills-section__header">
            <div class="skills-section__title-row">
              <h3 id="${section.id}-title" class="skills-section__title">
                ${iconHTML} ${section.title}
              </h3>
              <div class="skills-section__stats">
                ${levelSummary}
              </div>
            </div>
            <p class="skills-section__description">${section.description}</p>
            <div class="skills-section__level-breakdown">
              ${this.getLevelBreakdownHTML(levelCounts)}
            </div>
          </div>
          <div class="skills-grid">
            ${skillsHTML}
          </div>
        </section>
      `;
    }).join('');
  }

  // Contar niveles por sección
  countLevelsBySection(skills) {
    const counts = {
      'Avanzado': 0,
      'Intermedio': 0,
      'Básico': 0
    };

    skills.forEach(skill => {
      if (counts[skill.level] !== undefined) {
        counts[skill.level]++;
      }
    });

    return counts;
  }

  // Obtener resumen de niveles
  getLevelSummary(counts) {
    const total = counts.Avanzado + counts.Intermedio + counts.Básico;
    return `
      <span class="level-summary">
        <span class="level-summary__item level-summary__item--advanced">${counts.Avanzado} Avanzado</span>
        <span class="level-summary__item level-summary__item--intermediate">${counts.Intermedio} Intermedio</span>
        <span class="level-summary__item level-summary__item--basic">${counts.Básico} Básico</span>
      </span>
    `;
  }

  // Obtener desglose de niveles
  getLevelBreakdownHTML(counts) {
    const total = counts.Avanzado + counts.Intermedio + counts.Básico;

    return `
      <div class="level-breakdown">
        <div class="level-breakdown__bar">
          <div class="level-breakdown__segment level-breakdown__segment--advanced" style="width: ${(counts.Avanzado / total) * 100}%"></div>
          <div class="level-breakdown__segment level-breakdown__segment--intermediate" style="width: ${(counts.Intermedio / total) * 100}%"></div>
          <div class="level-breakdown__segment level-breakdown__segment--basic" style="width: ${(counts.Básico / total) * 100}%"></div>
        </div>
      </div>
    `;
  }

  getLevelClass(level) {
    const levelMap = {
      'Avanzado': 'skill-card--advanced',
      'Intermedio': 'skill-card--intermediate',
      'Básico': 'skill-card--basic'
    };
    return levelMap[level] || '';
  }

  getLevelIndicator(level) {
    const indicators = {
      'Avanzado': '<div class="level-indicator level-indicator--advanced"></div>',
      'Intermedio': '<div class="level-indicator level-indicator--intermediate"></div>',
      'Básico': '<div class="level-indicator level-indicator--basic"></div>'
    };
    return indicators[level] || '';
  }

  async loadProjects() {
    try {
      this.renderProjects(projects);

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

    projectsGrid.innerHTML = featuredProjects.map(project => {
      const demoIcon = renderIcon('fas fa-external-link-alt');
      const codeIcon = renderIcon('fas fa-code');

      // Icono especial para proyectos con Docker
      const dockerIcon = project.technologies.includes('Docker')
        ? renderIcon('fab fa-docker', { size: 'fa-xs' })
        : '';

      const technologiesHTML = project.technologies.map(tech => {
        const techIcon = getIcon(tech, 'technologies');
        const iconHTML = techIcon ? renderIcon(techIcon, { size: 'fa-xs' }) : '';

        return `
          <span class="project-card__tag">
            ${iconHTML} ${tech}
          </span>
        `;
      }).join('');

      return `
        <article class="project-card reveal-item">
          <div class="project-card__image-container">
            <img src="${project.image}" alt="${project.title} - Desarrollado por Emerson Rodas" class="project-card__image" loading="lazy">
            <div class="project-card__overlay">
              <div class="project-card__links--overlay">
                ${project.demoUrl !== '#' ? `
                  <a href="${project.demoUrl}" class="btn btn--primary" target="_blank" rel="noopener noreferrer" aria-label="Ver demo de ${project.title}">
                    ${demoIcon} Demo
                  </a>
                ` : ''}
                <a href="${project.codeUrl}" class="btn btn--secondary" target="_blank" rel="noopener noreferrer" aria-label="Ver código de ${project.title}">
                  ${codeIcon} Código
                </a>
              </div>
            </div>
          </div>
          <div class="project-card__content">
            <h3 class="project-card__title">
              ${project.title}
              ${project.technologies.includes('Docker') ? dockerIcon : ''}
            </h3>
            <p class="project-card__description">${project.description}</p>
            <div class="project-card__tags">
              ${technologiesHTML}
            </div>
            <div class="project-card__links">
              ${project.demoUrl !== '#' ? `
                <a href="${project.demoUrl}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">
                  ${demoIcon} Ver Demo
                </a>
              ` : ''}
              <a href="${project.codeUrl}" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">
                ${codeIcon} Ver Código
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  updateNavigationIcons() {
    // Agregar iconos a la navegación
    const navItems = {
      '#inicio': 'fas fa-home',
      '#sobre-mi': 'fas fa-user',
      '#habilidades': 'fas fa-code',
      '#proyectos': 'fas fa-briefcase',
      '#contacto': 'fas fa-envelope'
    };

    Object.entries(navItems).forEach(([href, iconClass]) => {
      const navLink = document.querySelector(`.nav__link[href="${href}"]`);
      if (navLink) {
        const iconHTML = renderIcon(iconClass, { className: 'nav__icon' });
        navLink.innerHTML = `${iconHTML} ${navLink.textContent}`;
      }
    });

    // Icono para CV en navegación
    const cvLink = document.getElementById('cv-download-link');
    if (cvLink) {
      const cvIcon = renderIcon('fas fa-file-pdf', { className: 'nav__cv-icon' });
      cvLink.innerHTML = `${cvIcon} CV`;
    }
  }

  updateSocialIcons() {
    // Actualizar iconos de redes sociales
    const socialLinks = {
      'github': 'fab fa-github',
      'linkedin': 'fab fa-linkedin'
    };

    Object.entries(socialLinks).forEach(([platform, iconClass]) => {
      const socialLink = document.querySelector(`.social-link[href*="${platform}"]`);
      if (socialLink) {
        const iconHTML = renderIcon(iconClass, {
          size: 'fa-lg',
          className: 'social-icon'
        });
        socialLink.innerHTML = iconHTML;
      }
    });
  }

  async loadExperience() {
    try {
      // Nota: `experience` aún no se renderiza en el DOM (ver js/data/experience.js)
      void experience;
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

    // Agregar iconos a las tarjetas de estadísticas
    this.addStatIcons();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumber = entry.target;
          const target = parseInt(statNumber.getAttribute('data-count'));
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);

              // Agregar efecto de confeti después de la animación
              if (target > 10) {
                setTimeout(() => this.addConfettiEffect(statNumber), 300);
              }
            }
            statNumber.textContent = Math.floor(current);
          }, 16);

          observer.unobserve(statNumber);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
  }

  addStatIcons() {
    const statCards = document.querySelectorAll('.stat-card');

    statCards.forEach((card, index) => {
      let iconClass = 'fas fa-check-circle';

      switch(index) {
        case 0:
          iconClass = 'fas fa-rocket';
          break;
        case 1:
          iconClass = 'fas fa-calendar-alt';
          break;
        case 2:
          iconClass = 'fas fa-code';
          break;
        default:
          iconClass = 'fas fa-chart-line';
      }

      const statNumber = card.querySelector('.stat-number');
      if (statNumber) {
        const icon = document.createElement('i');
        icon.className = `stat-icon ${iconClass}`;
        statNumber.parentNode.insertBefore(icon, statNumber);
      }

      card.setAttribute('data-tooltip', 'Haz hover para ver el efecto');
    });
  }

  addConfettiEffect(element) {
    const card = element.closest('.stat-card');
    if (!card) return;

    const confetti = document.createElement('div');
    confetti.className = 'stat-confetti';
    confetti.innerHTML = '✨';
    confetti.style.cssText = `
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      font-size: 1.5rem;
      opacity: 0;
      animation: confettiFall 0.5s ease-out;
      z-index: 3;
    `;

    card.appendChild(confetti);

    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.remove();
      }
    }, 500);
  }

  handleGlobalError(event) {
    console.error('🌍 Error global:', event.error);
  }

  monitorPerformance() {
    window.addEventListener('load', () => {
      if (performance.getEntriesByType('navigation').length > 0) {
        const navEntry = performance.getEntriesByType('navigation')[0];
        const loadTime = navEntry.loadEventEnd - navEntry.navigationStart;

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

  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

// Manejar el evento de antes de descargar la página
window.addEventListener('beforeunload', () => {
});

export default PortfolioApp;
