export type Lang = "en" | "es" | "fr" | "de" | "zh" | "ar";

export interface LanguageOption {
  code: Lang;
  label: string;
  nativeLabel: string;
  flag: string;
  dir: "ltr" | "rtl";
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English", flag: "🇺🇸", dir: "ltr" },
  { code: "es", label: "Spanish", nativeLabel: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "fr", label: "French", nativeLabel: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "de", label: "German", nativeLabel: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { code: "zh", label: "Chinese", nativeLabel: "中文", flag: "🇨🇳", dir: "ltr" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", flag: "🇸🇦", dir: "rtl" },
];

export interface Dictionary {
  refresh: string;
  heroLabel: string;
  errorMessage: string;
  copyLabel: string;
  statCity: string;
  statRegion: string;
  statPostal: string;
  statTimezone: string;
  statIsp: string;
  statAsn: string;
  mapLocating: string;
  mapUnavailable: string;
  footer: string;
}

export const translations: Record<Lang, Dictionary> = {
  en: {
    refresh: "Refresh",
    heroLabel: "Your public IP address",
    errorMessage: "Couldn't locate your IP right now. Please try again.",
    copyLabel: "Copy IP address",
    statCity: "City",
    statRegion: "Region",
    statPostal: "Postal",
    statTimezone: "Timezone",
    statIsp: "ISP",
    statAsn: "ASN",
    mapLocating: "Locating you on the map…",
    mapUnavailable: "Map unavailable",
    footer:
      "Location is approximate, derived from your IP address via public geolocation services.",
  },
  es: {
    refresh: "Actualizar",
    heroLabel: "Tu dirección IP pública",
    errorMessage:
      "No se pudo localizar tu IP en este momento. Inténtalo de nuevo.",
    copyLabel: "Copiar dirección IP",
    statCity: "Ciudad",
    statRegion: "Región",
    statPostal: "Código postal",
    statTimezone: "Zona horaria",
    statIsp: "ISP",
    statAsn: "ASN",
    mapLocating: "Ubicándote en el mapa…",
    mapUnavailable: "Mapa no disponible",
    footer:
      "La ubicación es aproximada, derivada de tu dirección IP mediante servicios públicos de geolocalización.",
  },
  fr: {
    refresh: "Actualiser",
    heroLabel: "Votre adresse IP publique",
    errorMessage:
      "Impossible de localiser votre IP pour le moment. Veuillez réessayer.",
    copyLabel: "Copier l'adresse IP",
    statCity: "Ville",
    statRegion: "Région",
    statPostal: "Code postal",
    statTimezone: "Fuseau horaire",
    statIsp: "FAI",
    statAsn: "ASN",
    mapLocating: "Localisation sur la carte…",
    mapUnavailable: "Carte indisponible",
    footer:
      "L'emplacement est approximatif, déterminé à partir de votre adresse IP via des services publics de géolocalisation.",
  },
  de: {
    refresh: "Aktualisieren",
    heroLabel: "Deine öffentliche IP-Adresse",
    errorMessage:
      "Deine IP konnte gerade nicht ermittelt werden. Bitte versuche es erneut.",
    copyLabel: "IP-Adresse kopieren",
    statCity: "Stadt",
    statRegion: "Region",
    statPostal: "Postleitzahl",
    statTimezone: "Zeitzone",
    statIsp: "ISP",
    statAsn: "ASN",
    mapLocating: "Standort wird auf der Karte ermittelt…",
    mapUnavailable: "Karte nicht verfügbar",
    footer:
      "Der Standort ist ungefähr und wird über öffentliche Geolokalisierungsdienste aus deiner IP-Adresse ermittelt.",
  },
  zh: {
    refresh: "刷新",
    heroLabel: "您的公网 IP 地址",
    errorMessage: "暂时无法定位您的 IP，请重试。",
    copyLabel: "复制 IP 地址",
    statCity: "城市",
    statRegion: "地区",
    statPostal: "邮编",
    statTimezone: "时区",
    statIsp: "网络运营商",
    statAsn: "ASN",
    mapLocating: "正在地图上定位…",
    mapUnavailable: "地图不可用",
    footer: "位置为大致范围，通过公共地理定位服务根据您的 IP 地址推算得出。",
  },
  ar: {
    refresh: "تحديث",
    heroLabel: "عنوان IP العام الخاص بك",
    errorMessage: "تعذر تحديد موقع عنوان IP الخاص بك الآن. يرجى المحاولة مرة أخرى.",
    copyLabel: "نسخ عنوان IP",
    statCity: "المدينة",
    statRegion: "المنطقة",
    statPostal: "الرمز البريدي",
    statTimezone: "المنطقة الزمنية",
    statIsp: "مزود الخدمة",
    statAsn: "ASN",
    mapLocating: "جارٍ تحديد موقعك على الخريطة…",
    mapUnavailable: "الخريطة غير متوفرة",
    footer:
      "الموقع تقريبي، ويُستخرج من عنوان IP الخاص بك عبر خدمات تحديد الموقع الجغرافي العامة.",
  },
};
