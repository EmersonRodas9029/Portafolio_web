// js/cv-download.js - ACTUALIZADO SOLO CON ICONOS
class CVDownloadManager {
  constructor() {
    this.cvUrl = 'docs/Emerson_Eduardo_Rodas_Lopez_CV.pdf'; // Ruta del cv por defecto
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.checkCVAvailability();
    this.updateCVIcons(); // Nueva línea para actualizar iconos
  }

  updateCVIcons() {
    // Actualizar icono del botón en el hero
    const heroCvButton = document.getElementById('hero-cv-download');
    if (heroCvButton) {
      heroCvButton.innerHTML = `
        <i class="fas fa-download btn__icon"></i>
        Descargar CV
      `;
    }

    // Actualizar icono del enlace en navegación
    const navCvLink = document.getElementById('cv-download-link');
    if (navCvLink) {
      navCvLink.innerHTML = `
        <i class="fas fa-file-pdf nav__cv-icon"></i>
        CV
      `;
    }
  }

  setupEventListeners() {

    // Botón en el hero
    const heroCvButton = document.getElementById('hero-cv-download');

    if (heroCvButton) {
      heroCvButton.addEventListener('click', (e) => {
        this.downloadCV();
      });
    }

    // Enlace en la navegación
    const navCvLink = document.getElementById('cv-download-link');

    if (navCvLink) {
      navCvLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.downloadCV();
      });
    }

    // Atajo de teclado (Ctrl + D)
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        this.downloadCV();
      }
    });
  }

  async checkCVAvailability() {
    try {
      const response = await fetch(this.cvUrl, { method: 'HEAD' });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Error verificando CV:', error);
      this.handleCVNotFound();
    }
  }

  handleCVNotFound() {
    console.warn('⚠️ CV no encontrado en:', this.cvUrl);

    const cvButtons = [
      document.getElementById('hero-cv-download'),
      document.getElementById('cv-download-link')
    ];

    cvButtons.forEach(button => {
      if (button) {
        button.style.opacity = '0.6';
        button.style.cursor = 'not-allowed';
        button.title = 'CV no disponible temporalmente';

        const originalOnclick = button.onclick;
        button.onclick = (e) => {
          e.preventDefault();
          this.showMessage('El CV no está disponible en este momento.', 'error');
        };
      }
    });
  }

  async downloadCV() {
    try {
      this.showMessage('Preparando descarga...', 'info');

      // Verificar que el archivo existe
      const response = await fetch(this.cvUrl);
      if (!response.ok) {
        throw new Error(`CV no encontrado: ${response.status}`);
      }

      // Método directo - crear enlace y hacer click
      const link = document.createElement('a');
      link.href = this.cvUrl;
      link.download = 'CV-Emerson-Rodas-Desarrollador-Frontend.pdf';
      link.target = '_blank';

      // Agregar estilos invisibles
      link.style.display = 'none';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      this.showMessage('✅ CV descargado correctamente', 'success');
      this.trackDownloadEvent();

      // Limpiar mensaje después de 3 segundos
      setTimeout(() => {
        this.clearMessage();
      }, 3000);

    } catch (error) {
      console.error('❌ Error descargando CV:', error);
      this.showMessage('Error al descargar el CV. Verifica que el archivo existe.', 'error');

      // Limpiar mensaje de error después de 5 segundos
      setTimeout(() => {
        this.clearMessage();
      }, 5000);
    }
  }

  showMessage(text, type) {
    this.clearMessage();

    const messageElement = document.createElement('div');
    messageElement.className = `cv-message cv-message--${type}`;

    // Iconos para diferentes tipos de mensaje
    let iconClass = 'fas fa-info-circle';
    if (type === 'success') iconClass = 'fas fa-check-circle';
    if (type === 'error') iconClass = 'fas fa-exclamation-circle';

    messageElement.innerHTML = `
      <i class="${iconClass} cv-message__icon"></i>
      <span class="cv-message__text">${text}</span>
    `;

    messageElement.setAttribute('role', type === 'error' ? 'alert' : 'status');
    messageElement.setAttribute('aria-live', 'polite');

    // Colores según el tipo de mensaje
    const backgroundColor = type === 'error' ? '#ef4444' :
      type === 'success' ? '#10b981' :
        '#3b82f6';

    messageElement.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${backgroundColor};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      font-weight: 500;
      animation: slideInRight 0.3s ease-out;
      display: flex;
      align-items: center;
      gap: 8px;
    `;

    document.body.appendChild(messageElement);
  }

  clearMessage() {
    const existingMessages = document.querySelectorAll('.cv-message');
    existingMessages.forEach(msg => {
      msg.style.animation = 'slideInRight 0.3s ease-out reverse';
      setTimeout(() => msg.remove(), 300);
    });
  }

  trackDownloadEvent() {
    const downloadEvent = {
      event: 'cv_download',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      path: this.cvUrl
    };

    // Emitir evento personalizado para otros módulos
    document.dispatchEvent(new CustomEvent('cvDownloaded', {
      detail: downloadEvent
    }));
  }

  // Método para cambiar la URL del CV dinámicamente
  updateCVUrl(newUrl) {
    this.cvUrl = newUrl;
    this.checkCVAvailability();
  }
}

// Inicialización y export
let cvDownloadManager;

export function initializeCVDownload() {
  if (!cvDownloadManager) {
    cvDownloadManager = new CVDownloadManager();
  }
  return cvDownloadManager;
}

export function downloadCV() {
  return cvDownloadManager?.downloadCV();
}

export function updateCVUrl(newUrl) {
  return cvDownloadManager?.updateCVUrl(newUrl);
}
