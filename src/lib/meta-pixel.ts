import { META_PIXEL_ID } from "./event-config";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Código base del píxel de Meta: carga fbevents.js, inicializa y registra la primera PageView. */
export const META_PIXEL_SNIPPET = META_PIXEL_ID
  ? `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`
  : "";

export const META_PIXEL_NOSCRIPT_SRC = META_PIXEL_ID
  ? `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`
  : "";

/** Evento estándar de Meta (Lead, PageView…). Nunca frena la página si el píxel está bloqueado. */
export function trackPixel(event: string) {
  try {
    window.fbq?.("track", event);
  } catch {
    /* ignorar */
  }
}

/** Evento personalizado, sin parámetros: no se envían respuestas del formulario a Meta. */
export function trackPixelCustom(event: string) {
  try {
    window.fbq?.("trackCustom", event);
  } catch {
    /* ignorar */
  }
}
