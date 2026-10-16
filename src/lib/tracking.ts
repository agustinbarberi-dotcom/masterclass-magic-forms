// Registro de eventos propios de la landing (visita, opt-in, gracias) con su origen.
// Nunca frena la página: si falla, se ignora.

type Attribution = {
  utm_source?: string | undefined;
  utm_medium?: string | undefined;
  utm_campaign?: string | undefined;
  utm_content?: string | undefined;
  fbclid?: boolean;
  referrer_host?: string | undefined;
};

const ATTR_KEY = "macasoul_attr";
const VISITOR_KEY = "macasoul_vid";

function safeGet(storage: Storage, key: string) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}
function safeSet(storage: Storage, key: string, value: string) {
  try {
    storage.setItem(key, value);
  } catch {
    /* ignorar */
  }
}

function visitorId() {
  let id = safeGet(localStorage, VISITOR_KEY);
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    safeSet(localStorage, VISITOR_KEY, id);
  }
  return id;
}

/** Guarda el origen de la visita. Una visita con UTM o fbclid reemplaza al origen anterior. */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const pick = (k: string) => params.get(k)?.trim().slice(0, 150) || undefined;
  let referrerHost: string | undefined;
  try {
    const ref = document.referrer ? new URL(document.referrer).hostname : "";
    if (ref && ref !== window.location.hostname) referrerHost = ref.slice(0, 150);
  } catch {
    /* ignorar */
  }
  const fresh: Attribution = {
    utm_source: pick("utm_source"),
    utm_medium: pick("utm_medium"),
    utm_campaign: pick("utm_campaign"),
    utm_content: pick("utm_content"),
    fbclid: params.has("fbclid"),
    referrer_host: referrerHost,
  };
  const tagged = Boolean(fresh.utm_source || fresh.utm_medium || fresh.fbclid);
  const existing = safeGet(localStorage, ATTR_KEY);
  if (tagged || !existing || (referrerHost && !JSON.parse(existing || "{}").utm_source)) {
    safeSet(localStorage, ATTR_KEY, JSON.stringify(fresh));
  }
}

function attribution(): Attribution {
  try {
    return JSON.parse(safeGet(localStorage, ATTR_KEY) || "{}");
  } catch {
    return {};
  }
}

/** Envía un evento. `oncePerSession` evita contar dos veces la misma página al recargar. */
export function trackEvent(event: "visita" | "optin" | "gracias", oncePerSession = false) {
  if (typeof window === "undefined") return;
  try {
    if (oncePerSession) {
      const flag = `macasoul_ev_${event}`;
      if (safeGet(sessionStorage, flag)) return;
      safeSet(sessionStorage, flag, "1");
    }
    fetch("/api/track", {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        visitor_id: visitorId(),
        path: window.location.pathname,
        ...attribution(),
      }),
    }).catch(() => {});
  } catch {
    /* nunca frenar */
  }
}
