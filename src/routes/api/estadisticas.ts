import { createFileRoute } from "@tanstack/react-router";

type Row = {
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

const PAID = new Set(["paid", "cpc", "ppc", "ads", "paid_social", "paidsocial"]);

/** Clasifica el origen de un evento en un canal legible. */
function channel(r: Row): { canal: string; tipo: "Anuncios" | "Orgánico" | "Sin identificar" } {
  const src = (r.utm_source || "").toLowerCase();
  const med = (r.utm_medium || "").toLowerCase();
  if (PAID.has(med) || src.includes("ads")) return { canal: "Anuncios Meta", tipo: "Anuncios" };
  if (src) return { canal: `Orgánico · ${r.utm_source}`, tipo: "Orgánico" };
  if (r.fbclid) return { canal: "Instagram/Facebook sin etiquetar", tipo: "Sin identificar" };
  const ref = (r.referrer_host || "").toLowerCase();
  if (ref.includes("instagram")) return { canal: "Orgánico · Instagram", tipo: "Orgánico" };
  if (ref.includes("facebook")) return { canal: "Orgánico · Facebook", tipo: "Orgánico" };
  if (ref.includes("whatsapp")) return { canal: "Orgánico · WhatsApp", tipo: "Orgánico" };
  if (ref) return { canal: `Otro sitio · ${r.referrer_host}`, tipo: "Orgánico" };
  return { canal: "Directo / sin datos", tipo: "Sin identificar" };
}

type Counts = { visitas: number; optins: number; gracias: number };
const empty = (): Counts => ({ visitas: 0, optins: 0, gracias: 0 });

export const Route = createFileRoute("/api/estadisticas")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { isValidStatsKey } = await import("@/lib/stats-key.server");
        const key = new URL(request.url).searchParams.get("k");
        if (!isValidStatsKey(key)) return new Response("No autorizado", { status: 401 });

        const rows: Row[] = [];
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          for (let from = 0; from < 100000; from += 1000) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data, error } = await (supabaseAdmin as any)
              .from("landing_events")
              .select(
                "created_at,event,visitor_id,utm_source,utm_medium,utm_campaign,utm_content,fbclid,referrer_host",
              )
              .order("created_at", { ascending: true })
              .range(from, from + 999);
            if (error) return Response.json({ error: error.message }, { status: 500 });
            rows.push(...(data as Row[]));
            if (!data || data.length < 1000) break;
          }
        } catch (e) {
          return Response.json(
            { error: e instanceof Error ? e.message : "Error leyendo la base" },
            { status: 500 },
          );
        }

        const total = empty();
        const visitors = new Set<string>();
        const porCanal = new Map<string, Counts & { tipo: string }>();
        const porTipo = new Map<string, Counts>();
        const porAnuncio = new Map<string, Counts>();
        const porDia = new Map<string, Counts>();
        const field = { visita: "visitas", optin: "optins", gracias: "gracias" } as const;

        for (const r of rows) {
          const f = field[r.event];
          if (!f) continue;
          if (r.event === "visita" && r.visitor_id) visitors.add(r.visitor_id);
          total[f]++;
          const { canal, tipo } = channel(r);
          const c = porCanal.get(canal) ?? { ...empty(), tipo };
          c[f]++;
          porCanal.set(canal, c);
          const t = porTipo.get(tipo) ?? empty();
          t[f]++;
          porTipo.set(tipo, t);
          if (tipo === "Anuncios") {
            const ad =
              [r.utm_campaign, r.utm_content].filter(Boolean).join(" · ") ||
              "Sin nombre de anuncio";
            const a = porAnuncio.get(ad) ?? empty();
            a[f]++;
            porAnuncio.set(ad, a);
          }
          const dia = new Date(r.created_at).toLocaleDateString("es-CO", {
            timeZone: "America/Bogota",
            day: "2-digit",
            month: "2-digit",
          });
          const d = porDia.get(dia) ?? empty();
          d[f]++;
          porDia.set(dia, d);
        }

        const sorted = <T extends Counts>(m: Map<string, T>) =>
          [...m.entries()]
            .map(([nombre, v]) => ({ nombre, ...v }))
            .sort((a, b) => b.optins - a.optins || b.visitas - a.visitas);

        return Response.json(
          {
            desde: rows[0]?.created_at ?? null,
            total: { ...total, visitantes: visitors.size },
            porTipo: sorted(porTipo),
            porCanal: sorted(porCanal),
            porAnuncio: sorted(porAnuncio),
            porDia: [...porDia.entries()].map(([nombre, v]) => ({ nombre, ...v })),
          },
          { headers: { "Cache-Control": "no-store" } },
        );
      },
    },
  },
});
