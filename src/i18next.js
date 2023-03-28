const Backend = require('i18next-node-fs-backend');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-express-middleware');
i18next
    .use(i18nextMiddleware.LanguageDetector)
    .use(Backend)
    .init({
    backend: {
        loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json'
    },
    debug: false,
    detection: {
        order: ['querystring', 'cookie'],
        caches: ['cookie']
    },
    preload: ['en', 'nep'],
    saveMissing: true,
    fallbackLng: 'en',
});
//# sourceMappingURL=i18next.js.map