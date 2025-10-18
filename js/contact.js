// js/contact.js
class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.init();
  }

  init() {
    if (this.form) {
      this.setupValidation();
      this.setupSubmission();
      this.setupRealTimeValidation();
    }
  }

  setupValidation() {
    // Agregar validadores a los campos
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
    // Validación en tiempo real para campos críticos
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

      if (await this.validateForm()) {
        await this.submitForm();
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

  async submitForm() {
    const submitButton = this.form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    try {
      // Mostrar estado de carga
      this.setSubmitState(submitButton, 'loading', 'Enviando...');

      // Simular envío (en un proyecto real, aquí iría fetch/axios)
      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData);

      // Simular delay de red
      await this.simulateNetworkRequest();

      // Éxito
      this.showSuccessMessage();
      this.form.reset();
      this.setSubmitState(submitButton, 'success', '¡Enviado!');

      // Enviar evento de analytics
      this.trackFormSubmission(data);

    } catch (error) {
      this.showErrorMessage('Error al enviar el mensaje. Por favor intenta nuevamente.');
      this.setSubmitState(submitButton, 'error', 'Error');
      console.error('Form submission error:', error);
    } finally {
      // Restaurar estado normal después de 3 segundos
      setTimeout(() => {
        this.setSubmitState(submitButton, 'idle', originalText);
      }, 3000);
    }
  }

  setSubmitState(button, state, text) {
    button.textContent = text;
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

  async simulateNetworkRequest() {
    // Simular delay de red (1-3 segundos)
    const delay = Math.random() * 2000 + 1000;
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  showSuccessMessage() {
    this.showMessage('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
  }

  showErrorMessage(message) {
    this.showMessage(message, 'error');
  }

  showMessage(text, type) {
    // Remover mensajes previos
    this.removeExistingMessages();

    const messageElement = document.createElement('div');
    messageElement.className = `form__message form__message--${type}`;
    messageElement.textContent = text;
    messageElement.setAttribute('role', 'alert');
    messageElement.setAttribute('aria-live', 'polite');

    // Insertar antes del formulario
    this.form.parentNode.insertBefore(messageElement, this.form);

    // Auto-remover después de 5 segundos
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  }

  removeExistingMessages() {
    const existingMessages = this.form.parentNode.querySelectorAll('.form__message');
    existingMessages.forEach(msg => msg.remove());
  }

  trackFormSubmission(data) {
    // Aquí podrías integrar con Google Analytics, etc.
    console.log('Form submitted:', {
      ...data,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });

    // Emitir evento personalizado
    document.dispatchEvent(new CustomEvent('contactFormSubmitted', {
      detail: { formData: data }
    }));
  }

  // Utilidad debounce para performance
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
  contactForm = new ContactForm();
  return contactForm;
}

export function validateContactForm() {
  return contactForm?.validateForm();
}

export function submitContactForm() {
  return contactForm?.submitForm();
}
