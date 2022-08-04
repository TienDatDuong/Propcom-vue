import { createI18n } from 'vue-i18n';

import en from './en/main';
import vi from './vi/main';

import enLocale from 'element-plus/lib/locale/lang/en';
import viLocale from 'element-plus/lib/locale/lang/vi';

const messages = {
  en: {
    ...en,
    ...enLocale,
  },
  vi: {
    ...vi,
    ...viLocale,
  },
};

const i18n = createI18n({
  locale: 'vi',
  fallbackLocale: 'en',
  messages,
});

export default i18n;
