export const fallbackLng = "en";
export const locales = [fallbackLng, "fr", "es", "de", "ja"];
export type LocaleTypes = (typeof locales)[number];
export const defaultNS = "common";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: locales,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
