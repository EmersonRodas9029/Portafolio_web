// js/cv-download.js
class CVDownloadManager {
  constructor() {
    this.cvUrl = 'docs/CV Emerson_Eduardo_ROdas_Lopez.pdf'; // Ruta del cv por defecto
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.checkCVAvailability();
  }

  setupEventListeners() {
    // Botón en el hero
    const heroCvButton = document.getElementById('hero-cv-download');
    if (heroCvButton) {
      heroCvButton.addEventListener('click', () => this.downloadCV());
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
        this.showDownloadMessage('¡Atajo de teclado! Descargando CV...');
      }
    });
  }

  async checkCVAvailability() {
    try {
      const response = await fetch(this.cvUrl, { method: 'HEAD' });
      if (!response.ok) {
        this.handleCVNotFound();
      }
    } catch (error) {
      this.handleCVNotFound();
    }
  }

  handleCVNotFound() {
    console.warn('CV no encontrado en:', this.cvUrl);

    // Deshabilitar botones si el CV no está disponible
    const cvButtons = [
      document.getElementById('hero-cv-download'),
      document.getElementById('cv-download-link')
    ];

    cvButtons.forEach(button => {
      if (button) {
        button.style.opacity = '0.6';
        button.style.cursor = 'not-allowed';
        button.title = 'CV no disponible temporalmente';

        // Reemplazar funcionalidad
        button.onclick = (e) => {
          e.preventDefault();
          this.showErrorMessage('El CV no está disponible en este momento.');
        };
      }
    });
  }

  async downloadCV() {
    try {
      // Mostrar estado de carga
      this.showDownloadMessage('Preparando descarga...');

      // Verificar si el archivo existe
      const response = await fetch(this.cvUrl);
      if (!response.ok) {
        throw new Error('CV no encontrado');
      }

      // Crear enlace de descarga
      const link = document.createElement('a');
      link.href = this.cvUrl;
      link.download = 'CV-Emerson-Rodas-Frontend.pdf';
      link.target = '_blank';

      // Agregar metadatos para analytics
      link.setAttribute('data-download', 'cv');
      link.setAttribute('data-timestamp', new Date().toISOString());

      // Simular clic en el enlace
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Mostrar mensaje de éxito
      this.showDownloadMessage('✅ CV descargado correctamente');

      // Track download event
      this.trackDownloadEvent();

      // Limpiar mensaje después de 3 segundos
      setTimeout(() => {
        this.clearDownloadMessage();
      }, 3000);

    } catch (error) {
      console.error('Error descargando CV:', error);
      this.showErrorMessage('Error al descargar el CV. Por favor intenta más tarde.');

      // Ofrecer alternativa
      this.offerAlternative();
    }
  }

  showDownloadMessage(message) {
    this.clearDownloadMessage();

    const messageElement = document.createElement('div');
    messageElement.className = 'cv-download-message';
    messageElement.textContent = message;
    messageElement.setAttribute('role', 'status');
    messageElement.setAttribute('aria-live', 'polite');

    // Estilos para el mensaje
    messageElement.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 12px 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            font-weight: 500;
            animation: slideInRight 0.3s ease-out;
        `;

    document.body.appendChild(messageElement);
  }

  showErrorMessage(message) {
    this.clearDownloadMessage();

    const messageElement = document.createElement('div');
    messageElement.className = 'cv-error-message';
    messageElement.textContent = message;
    messageElement.setAttribute('role', 'alert');
    messageElement.setAttribute('aria-live', 'assertive');

    messageElement.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--error-color);
            color: white;
            padding: 12px 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            font-weight: 500;
            animation: slideInRight 0.3s ease-out;
        `;

    document.body.appendChild(messageElement);

    // Auto-remover después de 5 segundos
    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.remove();
      }
    }, 5000);
  }

  clearDownloadMessage() {
    const existingMessages = document.querySelectorAll('.cv-download-message, .cv-error-message');
    existingMessages.forEach(msg => msg.remove());
  }

  offerAlternative() {
    // Podrías ofrecer un enlace alternativo o contacto
    setTimeout(() => {
      const shouldOffer = confirm('¿Deseas que te envíe el CV por email?');
      if (shouldOffer) {
        // Scroll a la sección de contacto
        document.getElementById('contacto')?.scrollIntoView({
          behavior: 'smooth'
        });

        // Pre-llenar el mensaje
        const messageTextarea = document.getElementById('message');
        if (messageTextarea) {
          messageTextarea.value = 'Hola Emerson, me interesa recibir tu CV. Por favor envíamelo a este correo.';
        }
      }
    }, 1000);
  }

  trackDownloadEvent() {
    // Aquí podrías integrar con Google Analytics
    const downloadEvent = {
      event: 'cv_download',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      path: this.cvUrl
    };

    console.log('CV Download Event:', downloadEvent);

    // Emitir evento personalizado
    document.dispatchEvent(new CustomEvent('cvDownloaded', {
      detail: downloadEvent
    }));
  }

  // Método para actualizar la URL del CV
  updateCVUrl(newUrl) {
    this.cvUrl = newUrl;
    this.checkCVAvailability();
  }

  // Método para obtener estadísticas (si las implementas después)
  getDownloadStats() {
    const stats = localStorage.getItem('cv_download_stats');
    return stats ? JSON.parse(stats) : { count: 0, lastDownload: null };
  }
}

// Inicialización y export
let cvDownloadManager;

export function initializeCVDownload() {
  cvDownloadManager = new CVDownloadManager();
  return cvDownloadManager;
}

export function downloadCV() {
  return cvDownloadManager?.downloadCV();
}

export function updateCVUrl(newUrl) {
  return cvDownloadManager?.updateCVUrl(newUrl);
}
