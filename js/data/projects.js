// js/data/projects.js
export const projects = [
  {
    title: 'Dashboard Analítico E-commerce',
    description: 'Dashboard full-stack con pipeline ETL (raw → clean → gold, +112k registros procesados) y 7 KPIs comerciales clave (GMV, Revenue, AOV, Cancel Rate, On-Time Delivery). Arquitectura hexagonal en el backend, consultas en menos de 2 segundos sobre +100k registros y 92% de cobertura de tests.',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'Recharts', 'Arquitectura Hexagonal'],
    image: 'img/projects/dashboard-ecommerce/cover.webp',
    demoUrl: 'https://datalysis-local.vercel.app/overview',
    codeUrl: 'https://github.com/EmersonRodas9029/datalysis-kpi-dashboard',
    featured: true
  },
  {
    title: 'Sistema de Gestión Financiera (BudgEase)',
    description: 'Plataforma full-stack de finanzas personales y empresariales construida desde cero, consumiendo una API REST real (Spring Boot + JWT) en lugar de datos simulados. Implementé 13 módulos de negocio interconectados (ingresos, gastos, presupuestos, metas de ahorro, reportes, etc.) con control de acceso por rol validado en servidor, arquitectura feature-based escalable y una experiencia de usuario cuidada: dashboard con widgets reordenables (drag-and-drop), animaciones fluidas y validación de formularios robusta.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Hook Form', 'Zod', 'Recharts', 'Axios'],
    image: 'img/projects/sistema-gestion-financiera/cover.webp',
    demoUrl: 'https://budg-ease-local.vercel.app/#/login',
    codeUrl: 'https://github.com/EmersonRodas9029/BudgEase-Frontend',
    featured: true,
    badge: 'En Venta'
  },
  {
    title: 'EstacionCafé',
    description: 'Sistema full-stack de punto de venta y administración para cafetería: mesas, cuentas, cobro, inventario, compras y reportes, con control de acceso por rol (admin, mesero, cajero). API REST en Node.js + PostgreSQL y frontend en React + TypeScript.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL'],
    image: 'img/projects/estacion-cafe/cover.webp',
    demoUrl: 'https://estacioncafe-local.vercel.app/',
    codeUrl: 'https://github.com/EmersonRodas9029/EstacionCafe',
    featured: true
  }
];
