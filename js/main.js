// js/main.js - ACTUALIZADO CON ORDENAMIENTO AUTOMÁTICO POR NIVEL
import { initializeTheme } from './theme.js';
import { initializeNavigation } from './navigation.js';
import { initializeAnimations } from './animations.js';
import { initializeContactForm } from './contact.js';
import { initializeScrollEffects } from './utils/scroll.js';
import { initializeCVDownload } from './cv-download.js';
import { IconsConfig, getIcon, renderIcon } from './icons-config.js';

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
      console.log('📄 CV descargado exitosamente:', event.detail);
    });

    // Escuchar errores de módulos
    window.addEventListener('unhandledrejection', (event) => {
      console.error('❌ Error no manejado:', event.reason);
    });
  }

  async loadSkills() {
    try {
      console.log('🛠️ Cargando habilidades organizadas por secciones y niveles...');

      const skillsSections = [
        {
          id: 'backend',
          title: 'Backend',
          description: 'Lenguajes y tecnologías del lado del servidor',
          skills: [
            { name: 'Java', level: 'Avanzado', category: 'backend' },
            { name: 'Node.js', level: 'Intermedio', category: 'backend' },
            { name: 'Python', level: 'Básico', category: 'backend' },
            { name: 'C#', level: 'Avanzado', category: 'backend' },
            { name: 'TypeScript', level: 'Intermedio', category: 'backend' }
          ]
        },
        {
          id: 'frontend',
          title: 'Frontend',
          description: 'Tecnologías del lado del cliente',
          skills: [
            { name: 'HTML5', level: 'Avanzado', category: 'frontend' },
            { name: 'CSS3', level: 'Avanzado', category: 'frontend' },
            { name: 'JavaScript', level: 'Avanzado', category: 'frontend' },
            { name: 'TypeScript', level: 'Intermedio', category: 'frontend' },
            { name: 'React', level: 'Intermedio', category: 'frontend' },
            { name: 'Vue.js', level: 'Básico', category: 'frontend' },
            { name: 'Astro', level: 'Intermedio', category: 'frontend' }
          ]
        },
        {
          id: 'database',
          title: 'Base de Datos',
          description: 'Sistemas de gestión de bases de datos',
          skills: [
            { name: 'MySQL', level: 'Intermedio', category: 'database' },
            { name: 'PostgreSQL', level: 'Intermedio', category: 'database' },
            { name: 'SQLite', level: 'Intermedio', category: 'database' },
            { name: 'Oracle Database', level: 'Intermedio', category: 'database' },
            { name: 'SQL Server', level: 'Intermedio', category: 'database' }
          ]
        },
        {
          id: 'tools',
          title: 'Herramientas e IDE',
          description: 'Herramientas de desarrollo, contenedores y entornos de programación',
          skills: [
            { name: 'Git', level: 'Intermedio', category: 'tools' },
            { name: 'GitHub', level: 'Intermedio', category: 'tools' },
            { name: 'Docker', level: 'Intermedio', category: 'tools' },
            { name: 'IntelliJ IDEA', level: 'Avanzado', category: 'tools' },
            { name: 'Visual Studio', level: 'Avanzado', category: 'tools' },
            { name: 'Visual Studio Code', level: 'Avanzado', category: 'tools' },
            { name: 'NetBeans', level: 'Avanzado', category: 'tools' },
            { name: 'Figma', level: 'Intermedio', category: 'tools' }
          ]
        }
      ];

      // Ordenar habilidades por nivel dentro de cada sección
      this.sortSkillsByLevel(skillsSections);

      this.renderSkillsSections(skillsSections);
      console.log('✅ Habilidades organizadas y ordenadas por nivel');

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

      console.log(`📊 ${section.title} ordenado:`, section.skills.map(s => `${s.name} (${s.level})`));
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

      const skillsHTML = section.skills.map((skill, index) => {
        const iconClass = getIcon(skill.name, 'skills');
        const iconHTML = renderIcon(iconClass, {
          size: 'fa-3x',
          className: 'skill-card__icon'
        });

        // Determinar clase CSS según el nivel
        const levelClass = this.getLevelClass(skill.level);

        return `
          <div class="skill-card reveal-item ${levelClass}" data-category="${skill.category}" data-skill="${skill.name.toLowerCase()}" data-level="${skill.level.toLowerCase()}">
            ${iconHTML}
            <h3 class="skill-card__name">${skill.name}</h3>
            <div class="skill-card__level-container">
              <span class="skill-card__level skill-card__level--${skill.level.toLowerCase()} skill-card__level--${skill.level.toLowerCase()}-${index}">
                ${skill.level}
              </span>
              ${this.getLevelIndicator(skill.level)}
            </div>
            <!-- Badge de posición por nivel -->
            <div class="skill-level-badge skill-level-badge--${skill.level.toLowerCase()}">
              ${this.getLevelPosition(index + 1, skill.level)}
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

  // Obtener posición por nivel
  getLevelPosition(position, level) {
    const levelIcons = {
      'Avanzado': '🏆',
      'Intermedio': '⭐',
      'Básico': '🌱'
    };

    return `${levelIcons[level] || '📊'} ${position}`;
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
          title: 'Aplicación con Docker',
          description: 'Proyecto de aplicación web containerizada con Docker, incluyendo Dockerfile y docker-compose.',
          technologies: ['Docker', 'Node.js', 'JavaScript', 'API REST'],
          image: 'img/projects/docker-app.webp',
          demoUrl: '#',
          codeUrl: 'https://github.com/EmersonRodas9029/docker-app',
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
      console.log('📈 Cargando experiencia...');

      const experience = [
        {
          period: '2023 - Presente',
          position: 'Desarrollador Frontend Freelance',
          company: 'Proyectos Independientes',
          description: 'Desarrollo de aplicaciones web responsive y sitios portfolio para clientes. Especializado en JavaScript vanilla y tecnologías modernas como Docker para containerización.',
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'Docker', 'Responsive Design']
        },
        {
          period: '2022 - 2023',
          position: 'Practicante Desarrollo Web',
          company: 'Proyectos Académicos',
          description: 'Desarrollo de proyectos académicos y personales utilizando diversos IDEs como IntelliJ IDEA, Visual Studio Code y NetBeans.',
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'IntelliJ IDEA', 'VS Code', 'Figma']
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
          const duration = 2000;
          const step = target / (duration / 16);
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

export default PortfolioApp;
