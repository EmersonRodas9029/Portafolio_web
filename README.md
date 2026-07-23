# 💼 Portfolio — Emerson Eduardo Rodas López

Portafolio personal desarrollado en **HTML5, CSS3 y JavaScript vanilla** (sin frameworks ni bundler), con todo el contenido — habilidades, experiencia y proyectos — renderizado dinámicamente desde módulos de datos en JS.

🔗 **Sitio en producción:** [emersonrodas.dev](https://emersonrodas.dev)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.txt)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](#)

---

## 📑 Contenido

- [Sobre el proyecto](#-sobre-el-proyecto)
- [Características](#-características)
- [Tecnologías](#️-tecnologías)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Instalación y uso](#-instalación-y-uso)
- [Proyectos destacados](#-proyectos-destacados)
- [Contacto](#-contacto)
- [Licencia](#-licencia)

---

## 📌 Sobre el proyecto

`index.html` es la única página real del sitio; toda la información (habilidades, experiencia laboral y proyectos) vive como datos estructurados en `js/data/` y se inyecta en el DOM en tiempo de ejecución desde `js/main.js`. No hay build step obligatorio: el sitio corre directamente en el navegador.

## 🚀 Características

- Diseño 100% responsive (mobile-first)
- Modo oscuro/claro persistente (`localStorage`)
- Contenido dinámico: skills, experiencia y proyectos generados desde JS, no hardcodeados en el HTML
- Formulario de contacto funcional vía EmailJS
- Descarga de CV con tracking de evento
- Animaciones e íconos de tecnologías flotantes en el Hero (desktop)
- SEO on-page: meta tags, Open Graph y schema `Person` (JSON-LD)
- Accesibilidad cuidada (roles ARIA, foco visible, contraste)

## 🛠️ Tecnologías

**Sitio**
- HTML5 semántico
- CSS3 (variables, Grid, Flexbox, temas claro/oscuro)
- JavaScript ES6+ (módulos nativos, sin transpilar)
- [EmailJS](https://www.emailjs.com/) — envío del formulario de contacto

**Stack que domino** (mostrado en el propio sitio)
| Área | Tecnologías |
|---|---|
| Backend | Java, Spring / Spring Boot, .NET / .NET Core, NestJS, Node.js, C#, Python |
| Frontend | React, Next.js, Vue.js, Astro, Angular, TypeScript |
| Bases de datos | MySQL, PostgreSQL, Oracle Database, SQL Server, SQLite |
| Arquitectura | SOLID, Arquitectura Hexagonal, Arquitectura Limpia, API REST |
| Herramientas | Git/GitHub, Docker, IntelliJ IDEA, Visual Studio, Postman, Jira, Figma |

## 📁 Estructura del proyecto

```
Portafolio_web/
├── index.html              # Página principal (única página real)
├── 404.html
├── css/
│   ├── base.css             # Reset y variables globales
│   ├── layout.css           # Estructura y grid
│   ├── components.css       # Componentes reutilizables
│   ├── custom/               # Animaciones y estilos por sección
│   └── themes/                # light.css / dark.css
├── js/
│   ├── main.js               # Punto de entrada — orquesta la app
│   ├── theme.js               # Modo claro/oscuro
│   ├── navigation.js          # Menú y navegación
│   ├── animations.js, hero.js, floating-tech.js
│   ├── icons-config.js        # Mapeo centralizado de íconos por skill/tech
│   ├── contact.js + emailjs-config.js
│   ├── cv-download.js
│   ├── data/                  # Contenido del sitio (skills, experiencia, proyectos)
│   └── utils/                 # Validación de formularios y scroll reveal
├── img/
│   ├── icons/                 # SVGs de marcas/tecnologías
│   └── projects/               # Una carpeta por proyecto destacado
├── docs/                     # CV en PDF
└── pages/                    # Stubs (blog, contacto, proyectos) — aún sin contenido
```

## ⚙️ Instalación y uso

```bash
git clone https://github.com/EmersonRodas9029/Portafolio_web.git
cd Portafolio_web
npm install
npm run dev
```

`npm run dev` levanta el sitio con [`live-server`](https://www.npmjs.com/package/live-server) y recarga en caliente. No requiere build.

## ⭐ Proyectos destacados

Los proyectos se listan dinámicamente desde [`js/data/projects.js`](js/data/projects.js). Los más recientes:

- **[BudgEase — Sistema de Gestión Financiera](https://github.com/EmersonRodas9029/sistema_de_gestion_financiera_frontend)** — Finanzas personales/empresariales full-stack, 13 módulos, auth JWT y control de acceso por rol. `React · TypeScript · Vite · Tailwind CSS · Framer Motion`
- **Dashboard Analítico E-commerce** — Pipeline ETL propio y 7 KPIs comerciales sobre +100k registros. `Next.js · Node.js · PostgreSQL`
- **Sistema de Venta y Compra en Granja** — App de escritorio con inventario en CSV. `C# · Windows Forms`

## 📬 Contacto

- **GitHub:** [@EmersonRodas9029](https://github.com/EmersonRodas9029)
- **LinkedIn:** [Emerson Eduardo Rodas López](https://www.linkedin.com/in/emerson-eduardo-rodas-lopez-92732534a/)
- **Email:** emerson.rodas2004@gmail.com

## 📄 Licencia

Distribuido bajo licencia [MIT](LICENSE.txt).
