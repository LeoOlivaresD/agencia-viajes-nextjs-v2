import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import commonEs from "./locales/es/common.json";
import solicitudEs from "./locales/es/solicitud.json";
import commonEn from "./locales/en/common.json";
import solicitudEn from "./locales/en/solicitud.json";

const resources = {
  es: {
    common: commonEs,
    solicitud: solicitudEs,
  },
  en: {
    common: commonEn,
    solicitud: solicitudEn,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es",
  fallbackLng: "es",
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;