// js/utils/validateForm.js
export class FormValidator {
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePhone(phone) {
    const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  static validateURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static validateRequired(value) {
    return value.trim().length > 0;
  }

  static validateMinLength(value, min) {
    return value.length >= min;
  }

  static validateMaxLength(value, max) {
    return value.length <= max;
  }

  static validateRange(value, min, max) {
    const num = Number(value);
    return !isNaN(num) && num >= min && num <= max;
  }

  static validatePattern(value, pattern) {
    const regex = new RegExp(pattern);
    return regex.test(value);
  }

  static sanitizeInput(input) {
    return input
      .trim()
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&#39;')
      .replace(/"/g, '&#34;');
  }

  static formatPhone(phone) {
    return phone.replace(/\D/g, '');
  }

  static getValidationMessage(field, rule, options = {}) {
    const messages = {
      email: 'Por favor ingresa un email válido',
      phone: 'Por favor ingresa un número de teléfono válido',
      url: 'Por favor ingresa una URL válida',
      required: 'Este campo es requerido',
      minLength: `Debe tener al menos ${options.min} caracteres`,
      maxLength: `No puede tener más de ${options.max} caracteres`,
      range: `Debe estar entre ${options.min} y ${options.max}`,
      pattern: 'El formato no es válido'
    };

    return messages[rule] || 'Campo inválido';
  }
}

// Utilidades de validación para campos específicos
export const FieldValidators = {
  name: (value) => {
    return FormValidator.validateRequired(value) &&
      FormValidator.validateMinLength(value, 2) &&
      FormValidator.validateMaxLength(value, 50);
  },

  email: (value) => {
    return FormValidator.validateRequired(value) &&
      FormValidator.validateEmail(value);
  },

  phone: (value) => {
    if (!value.trim()) return true; // Opcional
    return FormValidator.validatePhone(value);
  },

  website: (value) => {
    if (!value.trim()) return true; // Opcional
    return FormValidator.validateURL(value);
  },

  message: (value) => {
    return FormValidator.validateRequired(value) &&
      FormValidator.validateMinLength(value, 10) &&
      FormValidator.validateMaxLength(value, 1000);
  }
};

export default FormValidator;
