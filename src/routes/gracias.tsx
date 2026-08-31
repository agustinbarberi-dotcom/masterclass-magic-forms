import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Sparkles, MessageCircle, Calendar } from "lucide-react";
import {
  EVENT_DATE_LABEL,
  EVENT_TIME_LABEL,
  EVENT_TIMEZONE_LABEL,
  EVENT_PLATFORM,
  WHATSAPP_GROUP_URL,
} from "@/lib/event-config";

export const Route = createFileRoute("/gracias")({
  component: GraciasPage,
  head: () => ({
    meta: [
      { title: "Registro confirmado · Macasoul" },
      {
        name: "description",
        content:
          "Tu lugar en el evento exclusivo de Macasoul está reservado. Revisa tu WhatsApp para recibir el acceso.",
      },
      { property: "og:title", content: "Registro confirmado · Macasoul" },
      {
        property: "og:description",
        content:
          "Tu lugar en el evento exclusivo de Macasoul está reservado. Revisa tu WhatsApp para recibir el acceso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function GraciasPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-5 py-16 text-center">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cream via-cream to-gold/10" />

      <div className="mx-auto w-full max-w-xl">
        <Sparkles className="mx-auto h-10 w-10 text-gold" aria-hidden="true" />

        <h1 className="mt-8 font-serif text-[2.5rem] font-black leading-[1.05] tracking-tight text-forest sm:text-[3.25rem]">
          ¡Ya estás adentro!
        </h1>

        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
          Tu lugar para el evento exclusivo está reservado. En minutos recibirás en tu WhatsApp el acceso,
          los recordatorios y el material de bienvenida.
        </p>

        <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-medium text-forest">
          <Calendar className="h-4 w-4 text-gold" aria-hidden="true" />
          <span>{EVENT_DATE_LABEL}</span>
          <span className="text-gold" aria-hidden="true">
            ·
          </span>
          <span>
            {EVENT_TIME_LABEL} ({EVENT_TIMEZONE_LABEL})
          </span>
          <span className="text-gold" aria-hidden="true">
            ·
          </span>
          <span>{EVENT_PLATFORM}</span>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {WHATSAPP_GROUP_URL.startsWith("http") ? (
            <a
              href={WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-7 py-4 text-sm font-bold tracking-wide text-forest-foreground shadow-soft transition-transform hover:scale-[1.02] sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Unirme al grupo de WhatsApp
            </a>
          ) : null}

          <Link
            to="/"
            className="inline-flex w-full items-center justify-center rounded-full border border-forest/30 px-7 py-4 text-sm font-bold tracking-wide text-forest transition-colors hover:bg-forest/5 sm:w-auto"
          >
            Volver al inicio
          </Link>
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          Si no ves el mensaje en WhatsApp, revisa tu carpeta de spam o escríbenos directamente.
        </p>
      </div>
    </main>
  );
}
