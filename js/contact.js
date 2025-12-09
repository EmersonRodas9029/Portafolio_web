// js/contact.js - VERSIÓN FINAL CON TEMPLATE ID CORRECTO
import { initializeEmailJS, EmailJSConfig, sendEmail } from './emailjs-config.js';

class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.isEmailJSInitialized = false;
    this.init();
  }

  async init() {
    if (this.form) {
      console.log('📧 ContactForm inicializando...');
      console.log('Configuración EmailJS:', EmailJSConfig);

      try {
        // Inicializar EmailJS primero
        await initializeEmailJS();
        this.isEmailJSInitialized = true;
        console.log('✅ EmailJS listo para usar');

        // Configurar validación y envío
        this.setupValidation();
        this.setupSubmission();
        this.setupRealTimeValidation();

        console.log('✅ ContactForm configurado correctamente');

      } catch (error) {
        console.error('❌ Error inicializando ContactForm:', error);
        this.showInitializationError();
      }
    }
  }

  showInitializationError() {
    const submitButton = this.form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        Formulario no disponible
      `;
      submitButton.title = 'El formulario de contacto no está disponible temporalmente';
      submitButton.classList.add('btn--error');
    }

    // Mostrar mensaje de error al usuario
    this.showMessage(
      'El formulario de contacto no está disponible temporalmente. Por favor, contáctame directamente en emerson.rodas2004@gmail.com',
      'error',
      true
    );
  }

  setupValidation() {
    this.addValidators();
  }

  addValidators() {
    const fields = {
      name: this.validateName,
      email: this.validateEmail,
      message: this.validateMessage
    };

    Object.keys(fields).forEach(fieldName => {
      const field = this.form.querySelector(`[name="${fieldName}"]`);
      if (field) {
        field.addEventListener('blur', () => this.validateField(field, fields[fieldName]));
        field.addEventListener('input', () => this.clearFieldError(field));
      }
    });
  }

  validateField(field, validator) {
    const value = field.value.trim();
    const isValid = validator(value);

    if (!isValid) {
      this.showFieldError(field, this.getErrorMessage(field.name));
      return false;
    }

    this.showFieldSuccess(field);
    return true;
  }

  validateName(name) {
    return name.length >= 2 && name.length <= 50;
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateMessage(message) {
    return message.length >= 10 && message.length <= 1000;
  }

  getErrorMessage(fieldName) {
    const messages = {
      name: 'El nombre debe tener entre 2 y 50 caracteres',
      email: 'Por favor ingresa un email válido',
      message: 'El mensaje debe tener entre 10 y 1000 caracteres'
    };
    return messages[fieldName] || 'Campo inválido';
  }

  showFieldError(field, message) {
    this.clearFieldError(field);

    field.classList.add('form__input--error');

    const errorElement = document.createElement('span');
    errorElement.className = 'form__error-message';
    errorElement.textContent = message;
    errorElement.id = `${field.name}-error`;

    field.parentNode.appendChild(errorElement);
    field.setAttribute('aria-describedby', errorElement.id);
    field.setAttribute('aria-invalid', 'true');
  }

  showFieldSuccess(field) {
    this.clearFieldError(field);
    field.classList.remove('form__input--error');
    field.classList.add('form__input--success');
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
  }

  clearFieldError(field) {
    field.classList.remove('form__input--error', 'form__input--success');

    const existingError = field.parentNode.querySelector('.form__error-message');
    if (existingError) {
      existingError.remove();
    }
  }

  setupRealTimeValidation() {
    const emailField = this.form.querySelector('[name="email"]');
    if (emailField) {
      emailField.addEventListener('input', this.debounce(() => {
        if (emailField.value.trim()) {
          this.validateField(emailField, this.validateEmail);
        }
      }, 500));
    }
  }

  setupSubmission() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('📨 Envío de formulario iniciado...');
      console.log('EmailJS Config:', EmailJSConfig);

      if (!this.isEmailJSInitialized) {
        this.showErrorMessage('El servicio de email no está disponible. Por favor, intenta más tarde.');
        return;
      }

      if (await this.validateForm()) {
        await this.submitFormWithEmailJS();
      }
    });
  }

  async validateForm() {
    const fields = [
      { name: 'name', validator: this.validateName },
      { name: 'email', validator: this.validateEmail },
      { name: 'message', validator: this.validateMessage }
    ];

    let isValid = true;

    for (const field of fields) {
      const fieldElement = this.form.querySelector(`[name="${field.name}"]`);
      if (fieldElement && !this.validateField(fieldElement, field.validator)) {
        isValid = false;
      }
    }

    return isValid;
  }

  async submitFormWithEmailJS() {
    const submitButton = this.form.querySelector('button[type="submit"]');
    const originalHTML = submitButton.innerHTML;

    try {
      // Mostrar estado de carga
      this.setSubmitState(submitButton, 'loading', 'Enviando...');

      // Preparar datos para EmailJS
      const formData = new FormData(this.form);
      const templateParams = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        message: formData.get('message'),
        date: new Date().toLocaleString('es-ES'),
        user_agent: navigator.userAgent,
        page_url: window.location.href
      };

      console.log('📤 Enviando email con EmailJS...');
      console.log('Service ID:', EmailJSConfig.serviceId);
      console.log('Template ID:', EmailJSConfig.templateId);
      console.log('Datos:', templateParams);

      // Enviar con EmailJS usando la función del config
      const response = await sendEmail(templateParams);

      console.log('✅ Email enviado exitosamente:', response);

      // Éxito
      this.showSuccessMessage();
      this.form.reset();
      this.setSubmitState(submitButton, 'success', '¡Enviado!');

      // Track event
      this.trackFormSubmission(templateParams);

    } catch (error) {
      console.error('❌ Error enviando email:', error);

      let errorMessage = 'Error al enviar el mensaje. Por favor intenta nuevamente.';

      // Mensajes de error específicos
      if (error.status === 412) {
        errorMessage = 'Error de autenticación. Por favor reconecta tu cuenta de Gmail en EmailJS.';
      } else if (error.status === 400) {
        errorMessage = 'Datos del formulario inválidos. Por favor verifica los campos.';
      } else if (error.status === 429) {
        errorMessage = 'Límite de envíos excedido. Por favor intenta más tarde.';
      } else if (error.text && error.text.includes('template')) {
        errorMessage = 'Error en la plantilla. Verifica la configuración en EmailJS.';
      }

      this.showErrorMessage(errorMessage);
      this.setSubmitState(submitButton, 'error', 'Error');
    } finally {
      // Restaurar estado normal después de 3 segundos
      setTimeout(() => {
        this.setSubmitState(submitButton, 'idle', originalHTML);
      }, 3000);
    }
  }

  setSubmitState(button, state, text) {
    // Limpiar contenido
    button.innerHTML = '';

    // Agregar icono según el estado
    let iconClass = '';
    switch(state) {
      case 'loading':
        iconClass = 'fas fa-spinner fa-spin';
        break;
      case 'success':
        iconClass = 'fas fa-check-circle';
        break;
      case 'error':
        iconClass = 'fas fa-exclamation-circle';
        break;
      default:
        iconClass = 'fas fa-paper-plane';
    }

    button.innerHTML = `
      <i class="${iconClass} btn__icon"></i>
      <span class="btn__text">${text}</span>
    `;

    button.disabled = state !== 'idle';

    // Remover clases previas
    button.classList.remove(
      'btn--loading',
      'btn--success',
      'btn--error'
    );

    if (state !== 'idle') {
      button.classList.add(`btn--${state}`);
    }
  }

  showSuccessMessage() {
    this.showMessage(
      '<i class="fas fa-check-circle"></i> ¡Mensaje enviado con éxito! Te contactaré pronto.',
      'success'
    );

    // Evento de analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'contact_form_submit', {
        'event_category': 'engagement',
        'event_label': 'Formulario de contacto enviado'
      });
    }
  }

  showErrorMessage(message) {
    this.showMessage(
      `<i class="fas fa-exclamation-circle"></i> ${message}`,
      'error'
    );
  }

  showMessage(html, type, permanent = false) {
    // Remover mensajes previos
    this.removeExistingMessages();

    const messageElement = document.createElement('div');
    messageElement.className = `form__message form__message--${type}`;
    messageElement.innerHTML = html;
    messageElement.setAttribute('role', type === 'error' ? 'alert' : 'status');
    messageElement.setAttribute('aria-live', 'assertive');

    // Insertar después del título de la sección
    const sectionTitle = document.querySelector('#contact-title');
    if (sectionTitle) {
      sectionTitle.parentNode.insertBefore(messageElement, sectionTitle.nextSibling);
    } else {
      this.form.parentNode.insertBefore(messageElement, this.form);
    }

    // Auto-remover después de 5 segundos (excepto si es permanente)
    if (!permanent) {
      setTimeout(() => {
        if (messageElement.parentNode) {
          messageElement.style.opacity = '0';
          messageElement.style.transform = 'translateY(-10px)';
          setTimeout(() => {
            if (messageElement.parentNode) {
              messageElement.remove();
            }
          }, 300);
        }
      }, 5000);
    }
  }

  removeExistingMessages() {
    const existingMessages = document.querySelectorAll('.form__message');
    existingMessages.forEach(msg => {
      if (msg.parentNode) {
        msg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        msg.style.opacity = '0';
        msg.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          if (msg.parentNode) {
            msg.remove();
          }
        }, 300);
      }
    });
  }

  trackFormSubmission(data) {
    console.log('📊 Form submission tracked:', {
      ...data,
      timestamp: new Date().toISOString(),
      service: 'EmailJS',
      config: EmailJSConfig
    });

    // Emitir evento personalizado
    document.dispatchEvent(new CustomEvent('contactFormSubmitted', {
      detail: {
        formData: data,
        service: 'EmailJS',
        config: EmailJSConfig
      }
    }));
  }

  // Utilidad debounce
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Inicialización y export
let contactForm;

export function initializeContactForm() {
  if (!contactForm) {
    contactForm = new ContactForm();
  }
  return contactForm;
}

export function validateContactForm() {
  return contactForm?.validateForm();
}

export function submitContactForm() {
  return contactForm?.submitFormWithEmailJS();
}

export function getEmailJSStatus() {
  return contactForm ? {
    initialized: contactForm.isEmailJSInitialized,
    config: EmailJSConfig
  } : null;
}
