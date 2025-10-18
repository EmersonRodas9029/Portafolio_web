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
        this.showMessage('¡Atajo de teclado! Descargando CV...', 'success');
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

    const cvButtons = [
      document.getElementById('hero-cv-download'),
      document.getElementById('cv-download-link')
    ];

    cvButtons.forEach(button => {
      if (button) {
        button.style.opacity = '0.6';
        button.style.cursor = 'not-allowed';
        button.title = 'CV no disponible temporalmente';

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

      const response = await fetch(this.cvUrl);
      if (!response.ok) {
        throw new Error('CV no encontrado');
      }

      const link = document.createElement('a');
      link.href = this.cvUrl;
      link.download = 'CV-Emerson-Rodas-Frontend.pdf';
      link.target = '_blank';

      link.setAttribute('data-download', 'cv');
      link.setAttribute('data-timestamp', new Date().toISOString());

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      this.showMessage('✅ CV descargado correctamente', 'success');
      this.trackDownloadEvent();

      setTimeout(() => {
        this.clearMessage();
      }, 3000);

    } catch (error) {
      console.error('Error descargando CV:', error);
      this.showMessage('Error al descargar el CV. Por favor intenta más tarde.', 'error');
    }
  }

  showMessage(text, type) {
    this.clearMessage();

    const messageElement = document.createElement('div');
    messageElement.className = `cv-message cv-message--${type}`;
    messageElement.textContent = text;
    messageElement.setAttribute('role', type === 'error' ? 'alert' : 'status');
    messageElement.setAttribute('aria-live', 'polite');

    const backgroundColor = type === 'error' ? 'var(--error-color)' :
      type === 'success' ? 'var(--success-color)' :
        'var(--primary-color)';

    messageElement.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${backgroundColor};
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

  clearMessage() {
    const existingMessages = document.querySelectorAll('.cv-message');
    existingMessages.forEach(msg => msg.remove());
  }

  trackDownloadEvent() {
    const downloadEvent = {
      event: 'cv_download',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      path: this.cvUrl
    };

    console.log('CV Download Event:', downloadEvent);

    document.dispatchEvent(new CustomEvent('cvDownloaded', {
      detail: downloadEvent
    }));
  }

  updateCVUrl(newUrl) {
    this.cvUrl = newUrl;
    this.checkCVAvailability();
  }
}

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
