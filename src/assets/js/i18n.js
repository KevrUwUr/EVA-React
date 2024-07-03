import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

const loadUserLanguage = async () => {
  

  // Por ejemplo, asumiendo que tienes una función para obtener el idioma del usuario
  const userLanguage = await getUserLanguageFromDatabase(); // Esta función debería devolver 'en', 'es', 'it', 'pr', etc.

  return userLanguage;
};

const initializeI18n = async () => {
  const userLanguage = await loadUserLanguage();

  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: true,
      fallbackLng: 'en',
      lng: userLanguage, // Establece el idioma según lo obtenido de la base de datos
      backend: {
        loadPath: '/locale/{{lng}}/translation.json',
      },
      interpolation: {
        escapeValue: false,
      },
    });
};

initializeI18n();

export default i18n;
