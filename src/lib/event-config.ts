// ==========================================================================
// CONFIGURACIÓN DEL EVENTO — reemplaza estos valores antes de publicar
// ==========================================================================

/** Fecha y hora exacta del evento en formato ISO con offset de zona horaria.
 *  Domingo 18 de octubre de 2026 a las 11:30 hora Colombia (UTC-5). */
export const EVENT_DATE_ISO = "2026-10-18T11:30:00-05:00";

/** Fecha legible para mostrar en la página y enviar al CRM. */
export const EVENT_DATE_LABEL = "Domingo 18 de octubre de 2026";

/** Fecha corta para titulares y encabezados. */
export const EVENT_DAY_LABEL = "Domingo 18 de octubre";

/** [HORA] tal como se muestra en la página */
export const EVENT_TIME_LABEL = "11:30 AM";

/** [ZONA HORARIA] tal como se muestra en la página */
export const EVENT_TIMEZONE_LABEL = "Hora Colombia";

/** [PLATAFORMA] donde se transmite en vivo (Zoom, YouTube en vivo, etc.) */
export const EVENT_PLATFORM = "Online";

/** Endpoint de Google Apps Script que recibe los registros. */
export const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyN1YjJZwBJyA2y6_HyItwp5_zlnnGkqIy7iZqm_ImR2EebRkMXdnBOO5FGTLZj-uQDBQ/exec";

/** ID del píxel de Meta (cuenta publicitaria de Maca). Vacío = sin píxel. */
export const META_PIXEL_ID = "1729816064767279";

/** Grupo de WhatsApp del evento. */
export const WHATSAPP_GROUP_URL =
  "https://chat.whatsapp.com/J4tuxHRyRFDBbL9PCjMdHN?mode=gi_t";

/** [REPETICIÓN] respuesta del FAQ sobre la grabación */
export const REPLAY_ANSWER =
  "[DEFINIR: ej. “Se enviará la repetición por tiempo limitado solo a las registradas.”]";

/** Links del footer. Vacío = no se muestra ninguno. */
export const SOCIAL_LINKS: { label: string; href: string }[] = [];

export const COUNTRIES = [
  "Argentina",
  "Bolivia",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Cuba",
  "Ecuador",
  "El Salvador",
  "España",
  "Estados Unidos",
  "Guatemala",
  "Honduras",
  "México",
  "Nicaragua",
  "Panamá",
  "Paraguay",
  "Perú",
  "Puerto Rico",
  "República Dominicana",
  "Uruguay",
  "Venezuela",
  "Otro país",
];

export const COUNTRY_CODES: Record<string, string> = {
  Argentina: "+54",
  Bolivia: "+591",
  Chile: "+56",
  Colombia: "+57",
  "Costa Rica": "+506",
  Cuba: "+53",
  Ecuador: "+593",
  "El Salvador": "+503",
  España: "+34",
  "Estados Unidos": "+1",
  Guatemala: "+502",
  Honduras: "+504",
  México: "+52",
  Nicaragua: "+505",
  Panamá: "+507",
  Paraguay: "+595",
  Perú: "+51",
  "Puerto Rico": "+1",
  "República Dominicana": "+1",
  Uruguay: "+598",
  Venezuela: "+58",
  "Otro país": "",
};

export const COUNTRY_FLAGS: Record<string, string> = {
  Argentina: "🇦🇷",
  Bolivia: "🇧🇴",
  Chile: "🇨🇱",
  Colombia: "🇨🇴",
  "Costa Rica": "🇨🇷",
  Cuba: "🇨🇺",
  Ecuador: "🇪🇨",
  "El Salvador": "🇸🇻",
  España: "🇪🇸",
  "Estados Unidos": "🇺🇸",
  Guatemala: "🇬🇹",
  Honduras: "🇭🇳",
  México: "🇲🇽",
  Nicaragua: "🇳🇮",
  Panamá: "🇵🇦",
  Paraguay: "🇵🇾",
  Perú: "🇵🇪",
  "Puerto Rico": "🇵🇷",
  "República Dominicana": "🇩🇴",
  Uruguay: "🇺🇾",
  Venezuela: "🇻🇪",
  "Otro país": "🌎",
};
