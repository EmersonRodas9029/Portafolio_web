// js/icons-config.js
// Configuración centralizada de todos los iconos del portfolio

export const IconsConfig = {
  // Iconos de habilidades
  skills: {
    'HTML5': 'fab fa-html5',
    'CSS3': 'fab fa-css3-alt',
    'JavaScript': 'fab fa-js-square',
    'React': 'fab fa-react',
    'Git & GitHub': 'fab fa-git-alt',
    'Responsive Design': 'fas fa-mobile-screen',
    'UI/UX Design': 'fas fa-palette',
    'Node.js': 'fab fa-node-js',
    'Bootstrap': 'fab fa-bootstrap',
    'SASS/SCSS': 'fab fa-sass',
    'Webpack': 'fab fa-webpack',
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
    'cv': 'fas fa-file-pdf'
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
    'light-mode': 'fas fa-sun'
  },

  // Iconos de tecnologías
  technologies: {
    'HTML5': 'fab fa-html5',
    'CSS3': 'fab fa-css3-alt',
    'JavaScript': 'fab fa-js-square',
    'Git': 'fab fa-git-alt',
    'Responsive Design': 'fas fa-mobile-alt',
    'LocalStorage': 'fas fa-database',
    'CSS Grid': 'fas fa-grip',
    'Flexbox': 'fas fa-th',
    'API REST': 'fas fa-cloud',
    'Async/Await': 'fas fa-sync',
    'Bootstrap': 'fab fa-bootstrap',
    'Figma': 'fab fa-figma'
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
