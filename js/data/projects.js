// js/data/projects.js
export const projects = [
  {
    title: 'Dashboard Analítico E-commerce',
    description: 'Dashboard full-stack con pipeline ETL (raw → clean → gold, +112k registros procesados) y 7 KPIs comerciales clave (GMV, Revenue, AOV, Cancel Rate, On-Time Delivery). Arquitectura hexagonal en el backend, consultas en menos de 2 segundos sobre +100k registros y 92% de cobertura de tests.',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'Recharts', 'Arquitectura Hexagonal'],
    image: 'img/projects/dashboard-ecommerce/cover.webp',
    demoUrl: '#',
    codeUrl: '#',
    featured: true
  },
  {
    title: 'Sistema de Gestión Financiera (BudgEase)',
    description: 'Plataforma full-stack de finanzas personales y empresariales construida desde cero, consumiendo una API REST real (Spring Boot + JWT) en lugar de datos simulados. Implementé 13 módulos de negocio interconectados (ingresos, gastos, presupuestos, metas de ahorro, reportes, etc.) con control de acceso por rol validado en servidor, arquitectura feature-based escalable y una experiencia de usuario cuidada: dashboard con widgets reordenables (drag-and-drop), animaciones fluidas y validación de formularios robusta.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Hook Form', 'Zod', 'Recharts', 'Axios'],
    image: 'img/projects/sistema-gestion-financiera/cover.webp',
    demoUrl: 'https://budg-ease-local.vercel.app/#/login',
    codeUrl: 'https://github.com/EmersonRodas9029/sistema_de_gestion_financiera_frontend',
    featured: true
  },
  {
    title: 'Sistema de Venta y Compra en Granja',
    description: 'Aplicación de escritorio para la gestión de venta de gallinas y huevos: cálculo automático de totales, inventario en CSV y soporte para múltiples unidades de venta. Redujo el tiempo de procesamiento de venta en un 20%.',
    technologies: ['C#', 'Windows Forms', 'CSV'],
    image: 'img/projects/granja-ventas/cover.webp',
    demoUrl: '#',
    codeUrl: '#',
    featured: true
  },
  {
    title: 'Portfolio Personal',
    description: 'Portfolio profesional desarrollado con HTML5, CSS3 y JavaScript vanilla. Incluye diseño responsive, modo oscuro/claro y optimización SEO.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'Responsive Design'],
    image: 'img/projects/portfolio/cover.webp',
    demoUrl: 'https://emersonrodas.dev',
    codeUrl: 'https://github.com/EmersonRodas9029/portfolio',
    featured: true
  }
];
