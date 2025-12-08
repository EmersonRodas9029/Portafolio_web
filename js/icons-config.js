// js/icons-config.js
// Configuración centralizada de todos los iconos del portfolio

export const IconsConfig = {
  // Iconos de habilidades
  skills: {
    // Backend
    'Java': 'fab fa-java',
    'Node.js': 'fab fa-node-js',
    'Python': 'fab fa-python',
    'C#': 'fab fa-windows',
    'TypeScript': 'fab fa-js-square',

    // Frontend
    'HTML5': 'fab fa-html5',
    'CSS3': 'fab fa-css3-alt',
    'JavaScript': 'fab fa-js-square',
    'React': 'fab fa-react',
    'Vue.js': 'fab fa-vuejs',
    'Astro': 'fas fa-rocket',

    // Database
    'MySQL': 'fas fa-database',
    'PostgreSQL': 'fas fa-database',
    'SQLite': 'fas fa-database',
    'Oracle Database': 'fas fa-database',
    'SQL Server': 'fas fa-database',

    // Herramientas e IDE - ACTUALIZADO
    'Git': 'fab fa-git-alt',
    'GitHub': 'fab fa-github',
    'Docker': 'fab fa-docker',
    'IntelliJ IDEA': 'fas fa-lightbulb',
    'Visual Studio': 'fas fa-code',
    'Visual Studio Code': 'fas fa-code',
    'NetBeans': 'fas fa-cube',
    'Figma': 'fab fa-figma'
  },

  // Iconos de redes sociales
  social: {
    'github': 'fab fa-github',
    'linkedin': 'fab fa-linkedin',
    'email': 'fas fa-envelope',
    'whatsapp': 'fab fa-whatsapp'
  },

  // Iconos de secciones y navegación
  navigation: {
    'home': 'fas fa-home',
    'about': 'fas fa-user',
    'skills': 'fas fa-code',
    'projects': 'fas fa-briefcase',
    'contact': 'fas fa-envelope',
    'cv': 'fas fa-file-pdf',
    'backend': 'fas fa-server',
    'frontend': 'fas fa-laptop-code',
    'database': 'fas fa-database',
    'tools': 'fas fa-tools',
    'docker': 'fab fa-docker'
  },

  // Iconos de proyectos y características
  features: {
    'download': 'fas fa-download',
    'external-link': 'fas fa-external-link-alt',
    'code': 'fas fa-code',
    'demo': 'fas fa-play-circle',
    'responsive': 'fas fa-mobile-alt',
    'seo': 'fas fa-search',
    'dark-mode': 'fas fa-moon',
    'light-mode': 'fas fa-sun',
    'container': 'fab fa-docker'
  },

  // Iconos de tecnologías
  technologies: {
    'HTML5': 'fab fa-html5',
    'CSS3': 'fab fa-css3-alt',
    'JavaScript': 'fab fa-js-square',
    'Git': 'fab fa-git-alt',
    'Docker': 'fab fa-docker',
    'Responsive Design': 'fas fa-mobile-alt',
    'LocalStorage': 'fas fa-database',
    'CSS Grid': 'fas fa-grip',
    'Flexbox': 'fas fa-th',
    'API REST': 'fas fa-cloud',
    'Async/Await': 'fas fa-sync',
    'Bootstrap': 'fab fa-bootstrap',
    'Figma': 'fab fa-figma',
    'IntelliJ IDEA': 'fas fa-lightbulb',
    'Visual Studio': 'fas fa-code',
    'Visual Studio Code': 'fas fa-code',
    'NetBeans': 'fas fa-cube'
  }
};

// Función para obtener icono por nombre
export function getIcon(iconName, type = 'skills') {
  return IconsConfig[type]?.[iconName] || 'fas fa-question-circle';
}

// Función para renderizar icono
export function renderIcon(iconClass, options = {}) {
  const {
    size = '',
    color = '',
    spin = false,
    pulse = false,
    className = ''
  } = options;

  const classes = [
    iconClass,
    size,
    spin ? 'fa-spin' : '',
    pulse ? 'fa-pulse' : '',
    className
  ].filter(Boolean).join(' ');

  return `<i class="${classes}" style="${color ? `color: ${color};` : ''}"></i>`;
}

export default IconsConfig;
