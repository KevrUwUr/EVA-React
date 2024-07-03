import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const getUserLanguageFromContext = async () => {
  const userContext = useContext(UserContext);
  const userLanguage = userContext.language;
  return userLanguage;
};


const initializeI18n = async () => {
  const userLanguage = await getUserLanguageFromContext();

  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: true,
      fallbackLng: 'en',
      lng: userLanguage, 
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
