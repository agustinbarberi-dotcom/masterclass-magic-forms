import { createFileRoute } from "@tanstack/react-router";

const EVENTS = new Set(["visita", "optin", "gracias"]);
const str = (v: unknown, max = 150) =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;

export const Route = createFileRoute("/api/track")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: {
          event?: unknown; visitor_id?: unknown; utm_source?: unknown; utm_medium?: unknown;
          utm_campaign?: unknown; utm_content?: unknown; fbclid?: unknown; referrer_host?: unknown; path?: unknown;
        } = {};
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return new Response(null, { status: 400 });
        }
        const event = str(body.event, 20);
        if (!event || !EVENTS.has(event)) return new Response(null, { status: 400 });
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { error } = await (supabaseAdmin as any).from("landing_events").insert({
            event,
            visitor_id: str(body.visitor_id, 60),
            utm_source: str(body.utm_source),
            utm_medium: str(body.utm_medium),
            utm_campaign: str(body.utm_campaign),
            utm_content: str(body.utm_content),
            fbclid: body.fbclid === true,
            referrer_host: str(body.referrer_host),
            path: str(body.path, 100),
          });
          if (error) {
            console.error("track", error.message);
            return new Response(null, { status: 500 });
          }
        } catch (e) {
          console.error("track", e);
          return new Response(null, { status: 500 });
        }
        return new Response(null, { status: 204 });
      },
    },
  },
});
