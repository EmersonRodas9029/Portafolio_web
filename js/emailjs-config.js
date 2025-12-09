// js/emailjs-config.js - CON TEMPLATE ID CORRECTO
export async function initializeEmailJS() {
  try {
    console.log('🔑 Inicializando EmailJS...');

    // Verificar que el SDK está cargado
    if (!window.emailjs) {
      throw new Error('EmailJS SDK no está cargado');
    }

    // Inicializar con tu Public Key
    emailjs.init('aM5Wb0eTPpfVuJkmx');

    console.log('✅ EmailJS inicializado correctamente');
    return true;

  } catch (error) {
    console.error('❌ Error inicializando EmailJS:', error);
    throw error;
  }
}

// Configuración de EmailJS
export const EmailJSConfig = {
  publicKey: 'aM5Wb0eTPpfVuJkmx',
  serviceId: 'service_51gssgi',
  templateId: 'template_cay9twa' // ← NUEVO TEMPLATE ID
};

// Función para enviar email
export async function sendEmail(templateParams) {
  try {
    console.log('📤 Enviando email con EmailJS...');
    console.log('Service ID:', EmailJSConfig.serviceId);
    console.log('Template ID:', EmailJSConfig.templateId);
    console.log('Template params:', templateParams);

    const response = await emailjs.send(
      EmailJSConfig.serviceId,
      EmailJSConfig.templateId,
      templateParams
    );

    console.log('✅ Email enviado exitosamente:', response);
    return response;

  } catch (error) {
    console.error('❌ Error enviando email:', error);
    console.error('Status:', error.status);
    console.error('Text:', error.text);
    console.error('Message:', error.message);

    throw error;
  }
}

export default initializeEmailJS;
