// ==========================================================================
// CONFIGURACIÓN DEL EVENTO — reemplaza estos valores antes de publicar
// ==========================================================================

/** Fecha y hora exacta del evento en formato ISO con offset de zona horaria.
 *  Domingo 4 de octubre de 2026 a las 19:00 hora Colombia (UTC-5). */
export const EVENT_DATE_ISO = "2026-10-04T19:00:00-05:00";

/** [HORA] tal como se muestra en la página */
export const EVENT_TIME_LABEL = "[HORA]";

/** [ZONA HORARIA] tal como se muestra en la página */
export const EVENT_TIMEZONE_LABEL = "[ZONA HORARIA]";

/** [PLATAFORMA] donde se transmite en vivo (Zoom, YouTube en vivo, etc.) */
export const EVENT_PLATFORM = "[PLATAFORMA]";

/** [WEBHOOK_URL] endpoint del CRM / ManyChat / email marketing */
export const WEBHOOK_URL = "[WEBHOOK_URL]";

/** [LINK_GRUPO_WHATSAPP] grupo de calentamiento previo al evento */
export const WHATSAPP_GROUP_URL = "[LINK_GRUPO_WHATSAPP]";

/** [REPETICIÓN] respuesta del FAQ sobre la grabación */
export const REPLAY_ANSWER =
  "[DEFINIR: ej. “Se enviará la repetición por tiempo limitado solo a las registradas.”]";

/** [redes/links placeholder] */
export const SOCIAL_LINKS = [
  { label: "Instagram", href: "[LINK_INSTAGRAM]" },
  { label: "WhatsApp", href: "[LINK_WHATSAPP]" },
  { label: "Contacto", href: "[LINK_CONTACTO]" },
];

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

/** Testimonios — reemplazar por testimonios reales. No inventar. */
export const TESTIMONIALS = [
  {
    placeholder: "[TESTIMONIO 1]",
    name: "[NOMBRE]",
    country: "[PAÍS]",
    text: "[Texto del testimonio real aquí]",
  },
  {
    placeholder: "[TESTIMONIO 2]",
    name: "[NOMBRE]",
    country: "[PAÍS]",
    text: "[Texto del testimonio real aquí]",
  },
  {
    placeholder: "[TESTIMONIO 3]",
    name: "[NOMBRE]",
    country: "[PAÍS]",
    text: "[Texto del testimonio real aquí]",
  },
];
