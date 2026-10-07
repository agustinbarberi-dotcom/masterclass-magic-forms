import { createFileRoute } from "@tanstack/react-router";

const SYSTEM = `Eres la asistente de Macarena Cárdenas (Macasoul), nutricionista clínica y experta en salud hormonal integrativa.
Una asistente a la clase magistral en vivo te describe sus objetivos y dudas sobre bienestar hormonal.
Genera entre 6 y 8 preguntas personalizadas, claras y concretas, que ella pueda llevar a la clase para aprovecharla al máximo.
Reglas: español latinoamericano neutro, tuteo cálido. Sin diagnósticos ni prescripciones médicas.
Formato: solo una lista numerada (1. 2. 3.), una pregunta por línea, sin introducción ni cierre.`;

export const Route = createFileRoute("/api/preguntas")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return new Response("Servicio no configurado.", { status: 500 });

        let texto = "";
        try {
          const body = (await request.json()) as { texto?: unknown };
          texto = typeof body.texto === "string" ? body.texto.trim().slice(0, 2000) : "";
        } catch {
          /* inválido */
        }
        if (texto.length < 10)
          return new Response("Cuéntame un poco más sobre tus objetivos y dudas.", { status: 400 });

        let upstream: Response;
        try {
          upstream = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
            method: "POST",
            signal: request.signal,
            headers: {
              "Content-Type": "application/json",
              "Lovable-API-Key": apiKey,
              "X-Lovable-AIG-SDK": "fetch",
            },
            body: JSON.stringify({
              model: "openai/gpt-6-astra",
              instructions: SYSTEM,
              input: texto,
              stream: true,
              store: false,
              reasoning: { effort: "low" },
            }),
          });
        } catch (e) {
          if (request.signal.aborted) return new Response(null, { status: 499 });
          throw e;
        }

        if (!upstream.ok || !upstream.body) {
          const msg =
            upstream.status === 429
              ? "Hay muchas consultas en este momento. Intenta en unos segundos."
              : upstream.status === 402
                ? "El servicio de IA no tiene créditos disponibles por ahora."
                : "No pudimos generar tus preguntas. Intenta nuevamente.";
          console.error("AI gateway", upstream.status, await upstream.text().catch(() => ""));
          return new Response(msg, { status: upstream.status });
        }

        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        let buffer = "";
        const transform = new TransformStream<Uint8Array, Uint8Array>({
          transform(chunk, controller) {
            buffer += decoder.decode(chunk, { stream: true });
            const frames = buffer.split("\n\n");
            buffer = frames.pop() ?? "";
            for (const frame of frames) {
              for (const line of frame.split("\n")) {
                if (!line.startsWith("data:")) continue;
                const data = line.slice(5).trim();
                if (!data || data === "[DONE]") continue;
                try {
                  const ev = JSON.parse(data);
                  if (ev.type === "response.output_text.delta" && ev.delta)
                    controller.enqueue(encoder.encode(ev.delta));
                  if (ev.type === "response.failed" || ev.type === "error")
                    controller.enqueue(encoder.encode("\n[No pudimos completar la respuesta.]"));
                } catch {
                  /* frame parcial */
                }
              }
            }
          },
        });

        return new Response(upstream.body.pipeThrough(transform), {
          headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache, no-transform" },
        });
      },
    },
  },
});
