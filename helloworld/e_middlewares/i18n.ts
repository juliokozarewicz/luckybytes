import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import path from 'path';

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en', 'pt'],
    backend: {
      loadPath: path.join(__dirname, '../locales/{{lng}}/translation.yaml'),
    },
    detection: {
      order: ['header', 'querystring', 'cookie', 'session'],
      caches: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export const i18nMiddleware = i18nextMiddleware.handle(i18next);