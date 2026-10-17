// Guarda los eventos de la landing en el almacenamiento de archivos de Lovable Cloud.
// No necesita tablas: cada evento es un archivo vacío cuyo nombre lleva los datos codificados,
// así las estadísticas se leen listando nombres, sin descargar nada.

const BUCKET = "landing-stats";

export type StatEvent = {
  created_at: string;
  event: "visita" | "optin" | "gracias";
  visitor_id: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  fbclid: boolean;
  referrer_host: string | null;
};

async function client() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

const b64 = (s: string) => Buffer.from(s, "utf8").toString("base64url");
const unb64 = (s: string) => Buffer.from(s, "base64url").toString("utf8");

let bucketReady = false;
async function ensureBucket() {
  if (bucketReady) return;
  const sb = await client();
  const { error } = await sb.storage.createBucket(BUCKET, { public: false });
  if (error && !/exist/i.test(error.message)) throw new Error(error.message);
  bucketReady = true;
}

export async function recordEvent(e: Omit<StatEvent, "created_at">) {
  await ensureBucket();
  const sb = await client();
  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  const cut = (v: string | null, n: number) => (v ? v.slice(0, n) : "");
  const data = [
    e.event,
    cut(e.visitor_id, 40),
    cut(e.utm_source, 60),
    cut(e.utm_medium, 40),
    cut(e.utm_campaign, 100),
    cut(e.utm_content, 100),
    e.fbclid ? "1" : "",
    cut(e.referrer_host, 80),
  ];
  const name = `${day}/${now.getTime()}-${Math.random().toString(36).slice(2, 8)}~${b64(JSON.stringify(data))}`;
  const { error } = await sb.storage
    .from(BUCKET)
    .upload(name, new Blob(["1"], { type: "text/plain" }), { upsert: false });
  if (error) throw new Error(error.message);
}

async function listAll(prefix: string) {
  const sb = await client();
  const out: string[] = [];
  for (let offset = 0; offset < 200000; offset += 1000) {
    const { data, error } = await sb.storage
      .from(BUCKET)
      .list(prefix, { limit: 1000, offset, sortBy: { column: "name", order: "asc" } });
    if (error) throw new Error(error.message);
    out.push(...(data ?? []).map((f) => f.name));
    if (!data || data.length < 1000) break;
  }
  return out;
}

export async function readEvents(): Promise<StatEvent[]> {
  await ensureBucket();
  const days = (await listAll("")).filter((n) => /^\d{4}-\d{2}-\d{2}$/.test(n));
  const events: StatEvent[] = [];
  for (const day of days) {
    for (const name of await listAll(day)) {
      const [head, payload] = name.split("~");
      if (!head || !payload) continue;
      try {
        const [event, vid, us, um, uc, uct, fb, ref] = JSON.parse(unb64(payload)) as string[];
        if (event !== "visita" && event !== "optin" && event !== "gracias") continue;
        events.push({
          created_at: new Date(Number(head.split("-")[0])).toISOString(),
          event,
          visitor_id: vid || null,
          utm_source: us || null,
          utm_medium: um || null,
          utm_campaign: uc || null,
          utm_content: uct || null,
          fbclid: fb === "1",
          referrer_host: ref || null,
        });
      } catch {
        /* archivo ajeno o dañado */
      }
    }
  }
  return events.sort((a, b) => a.created_at.localeCompare(b.created_at));
}
