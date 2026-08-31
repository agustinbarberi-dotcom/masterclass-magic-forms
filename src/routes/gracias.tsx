import { createFileRoute } from "@tanstack/react-router";
import {
  EVENT_DATE_LABEL,
  EVENT_TIME_LABEL,
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
          "Tu lugar en el evento exclusivo de Macasoul está reservado. Unite al grupo de WhatsApp para recibir el acceso.",
      },
      { property: "og:title", content: "Registro confirmado · Macasoul" },
      {
        property: "og:description",
        content:
          "Tu lugar en el evento exclusivo de Macasoul está reservado. Unite al grupo de WhatsApp para recibir el acceso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function FourPointStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 64"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 0L28 24L48 24L30 36L36 60L24 48L12 60L18 36L0 24L20 24L24 0Z" />
    </svg>
  );
}

function ProgressBar({ value = 80 }: { value?: number }) {
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-gold-soft/60">
      <div
        className="h-full rounded-full bg-gradient-gold transition-all duration-1000 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function GraciasPage() {
  const eventMeta = `Evento exclusivo  ·  Domingo 4 de octubre  ·  Única vez en el año`;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-warm text-foreground">
      {/* Header */}
      <header className="w-full border-b border-gold-soft/60 bg-cream/80 px-4 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-xl items-center justify-center">
          <p className="text-center text-xs font-semibold tracking-[0.16em] text-gold">
            {eventMeta}
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 flex-col items-center justify-center px-5 py-12 text-center sm:py-16">
        <div className="mx-auto w-full max-w-md">
          <FourPointStar className="mx-auto h-12 w-9 text-gold" />

          <h1 className="mt-7 font-serif text-[2.35rem] font-black leading-[1.05] tracking-tight text-forest sm:text-[2.85rem]">
            ¡Ya estás adentro. Solo falta un paso.
          </h1>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-olive">
            Tu registro: 80% completado
          </p>

          <div className="mt-3">
            <ProgressBar value={80} />
          </div>

          <p className="mx-auto mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
            El acceso, los recordatorios y el material exclusivo de Macarena
            llegan por WhatsApp. Unite al grupo ahora para no perderte nada.
          </p>

          <a
            href={WHATSAPP_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-6 py-4 text-sm font-bold uppercase tracking-wider text-whatsapp-foreground shadow-lg shadow-whatsapp/25 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
            Unirme al grupo de WhatsApp
            <span aria-hidden="true">→</span>
          </a>

          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-olive/80">
            <span aria-hidden="true">⚠️</span>
            Si no lo hacés ahora, podrías quedarte sin el acceso y los
            materiales.
          </p>
        </div>
      </main>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
