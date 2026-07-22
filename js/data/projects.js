// js/data/projects.js
export const projects = [
  {
    title: 'Dashboard Analítico E-commerce',
    description: 'Dashboard full-stack con pipeline ETL (raw → clean → gold, +112k registros procesados) y 7 KPIs comerciales clave (GMV, Revenue, AOV, Cancel Rate, On-Time Delivery). Arquitectura hexagonal en el backend, consultas en menos de 2 segundos sobre +100k registros y 92% de cobertura de tests.',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'Recharts', 'Arquitectura Hexagonal'],
    image: 'img/projects/dashboard-ecommerce.webp',
    demoUrl: '#',
    codeUrl: '#',
    featured: true
  },
  {
    title: 'Sistema de Gestión Financiera',
    description: 'Aplicación de finanzas personales y empresariales con 13 módulos interconectados: ingresos y gastos con soporte fiscal, presupuestos por periodo, metas de ahorro/inversión y gastos recurrentes. Dashboard en tiempo real con Framer Motion, estado global con Zustand y arquitectura feature-based.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'Framer Motion'],
    image: 'img/projects/finanzas-app.webp',
    demoUrl: '#',
    codeUrl: '#',
    featured: true
  },
  {
    title: 'Sistema de Venta y Compra en Granja',
    description: 'Aplicación de escritorio para la gestión de venta de gallinas y huevos: cálculo automático de totales, inventario en CSV y soporte para múltiples unidades de venta. Redujo el tiempo de procesamiento de venta en un 20%.',
    technologies: ['C#', 'Windows Forms', 'CSV'],
    image: 'img/projects/granja-ventas.webp',
    demoUrl: '#',
    codeUrl: '#',
    featured: true
  },
  {
    title: 'Portfolio Personal',
    description: 'Portfolio profesional desarrollado con HTML5, CSS3 y JavaScript vanilla. Incluye diseño responsive, modo oscuro/claro y optimización SEO.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'Responsive Design'],
    image: 'img/projects/portfolio.webp',
    demoUrl: 'https://emersonrodas.dev',
    codeUrl: 'https://github.com/EmersonRodas9029/portfolio',
    featured: true
  }
];
