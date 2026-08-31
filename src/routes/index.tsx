import { createFileRoute } from "@tanstack/react-router";
import { Countdown } from "@/components/Countdown";
import { Reveal } from "@/components/Reveal";
import { RegistrationForm } from "@/components/RegistrationForm";
import {
  EVENT_PLATFORM,
  EVENT_TIME_LABEL,
  SOCIAL_LINKS,
} from "@/lib/event-config";
import heroRoots from "@/assets/hero-roots.jpg";
import macaPortraitAsset from "@/assets/maca-portrait.jpg.asset.json";
import { Calendar } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Un encuentro en vivo · 4 de octubre | Macasoul",
      },
      {
        name: "description",
        content:
          "Una clase íntima y en vivo con Macarena Cárdenas para mujeres que están cansadas de seguir cansadas. Cupos limitados · Domingo 4 de octubre de 2026.",
      },
      {
        property: "og:title",
        content: "Un encuentro en vivo · 4 de octubre | Macasoul",
      },
      {
        property: "og:description",
        content:
          "Inflamada, agotada y sin respuestas. Una clase en vivo, con cupos limitados, para empezar a sanar desde la raíz.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const painPoints = [
  'Vas de médico en médico. Te dicen que "todo está normal". Y tú sabes que no es normal sentirse así.',
  "Probaste dietas, suplementos, rutinas, reposos. Nada te queda. Nada te dura.",
  "Te miras al espejo y no te reconoces: inflamada, agotada, con un cuerpo que ya no sientes tuyo.",
  "Empiezas con toda la intención… y a los pocos días lo abandonas. Y te culpas. Otra vez.",
];

const learnings = [
  'Por qué "hacer todo bien" no te está funcionando —y qué mirar en su lugar.',
  "El mapa completo: cómo se conectan tus hormonas, tu inflamación, tu digestión y tu energía.",
  "Los primeros pasos para desinflamar y recuperar tu energía desde la raíz.",
  "Por qué empiezas y abandonas —y cómo cambiarlo sin depender de la fuerza de voluntad.",
];

const credentials = [
  "Nutrición Clínica",
  "Salud Hormonal y Menopausia",
  "Medicina Integrativa",
  "Biodescodificación",
  "Ayurveda",
];

function GoldButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href="#registro"
      className={`inline-flex items-center justify-center rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-bold tracking-wide text-gold-foreground transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${className}`}
    >
      {children}
    </a>
  );
}

function EventMeta({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-sm font-semibold tracking-wide text-forest ${className}`}
    >
      <span className="inline-flex items-center gap-1.5">
        <Calendar className="h-4 w-4 text-gold" aria-hidden="true" />
        Domingo 4 de Octubre
      </span>
      <span className="text-gold/70" aria-hidden="true">·</span>
      <span>{EVENT_TIME_LABEL}</span>
      <span className="text-gold/70" aria-hidden="true">·</span>
      <span>{EVENT_PLATFORM}</span>
      <span className="text-gold/70" aria-hidden="true">·</span>
      <span>Gratuito</span>
      <span className="text-gold/70" aria-hidden="true">·</span>
      <span className="rounded-full border border-gold/40 px-2.5 py-0.5 text-xs font-bold tracking-wider text-gold uppercase">
        Cupos limitados
      </span>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* HEADER FIJO */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto grid max-w-5xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 py-3">
          <div />
          <div className="flex flex-col items-center text-center">
            {/* [LOGO] */}
            <span className="font-serif text-xl tracking-[0.2em] text-forest uppercase">
              Macasoul
            </span>
          </div>
          <div className="flex justify-end">
            <a
              href="#registro"
              className="rounded-full border border-forest/25 px-4 py-2 text-xs font-semibold tracking-wide text-forest transition-colors hover:bg-forest hover:text-forest-foreground sm:px-5 sm:text-sm"
            >
              Reservar mi lugar
            </a>
          </div>
        </div>
      </header>


      {/* HERO — promesa principal */}
      <section className="relative overflow-hidden pt-28 pb-24 sm:pt-32 sm:pb-28">
        <img
          src={heroRoots}
          alt="Raíces de un árbol iluminadas por luz dorada en un bosque"
          width={1600}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-warm opacity-90" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">
              Evento exclusivo · Domingo 4 de octubre · Única vez en el año · Cupos limitados
            </p>
            <h1 className="mt-6 text-[2.2rem] font-black leading-[0.98] tracking-tight text-forest sm:text-5xl lg:text-[3.6rem]">
              Estás cansada de estar cansada. Y nadie te ha dado una respuesta real.
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-base text-muted-foreground sm:text-lg">
              Esta clase no es para todas. Es para la mujer que ya probó de todo, que sigue
              inflamada, sin energía y sin respuestas —y que está lista, por fin, de sanar desde
              la raíz. Un evento exclusivo. En vivo. Una sola vez al año. Conmigo.
            </p>

            <div className="mt-8 flex justify-center">
              <EventMeta />
            </div>

            <div className="mt-8 flex justify-center">
              <Countdown />
            </div>

            <div className="mt-10">
              <a
                href="#registro"
                className="inline-flex rounded-full bg-forest px-8 py-3.5 text-sm font-semibold tracking-wide text-forest-foreground shadow-soft transition-colors hover:bg-forest/90"
              >
                Reservar mi lugar
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* REGISTRO — segunda sección: promesa + formulario */}
      <section id="registro" className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 bg-gradient-warm opacity-90" aria-hidden="true" />
        <div className="relative mx-auto max-w-xl px-5 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl font-black tracking-tight text-forest sm:text-4xl">
              Reserva tu lugar
            </h2>
            <div className="mt-5 flex justify-center">
              <EventMeta />
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-9 text-left">
            <RegistrationForm id="registro-form" />
          </Reveal>
        </div>
      </section>


      {/* DOLOR */}
      <section className="border-t border-border/60 py-24">
        <div className="mx-auto max-w-2xl px-5">
          <Reveal>
            <p className="eyebrow">Te entiendo</p>
            <h2 className="mt-4 text-3xl text-forest sm:text-4xl">
              Yo también estuve ahí. Sé lo que se siente.
            </h2>
          </Reveal>
          <ul className="mt-12 space-y-8">
            {painPoints.map((text, i) => (
              <Reveal as="li" key={text} delay={i * 80}>
                <p className="border-l border-gold pl-6 text-lg font-medium text-foreground/90">
                  {text}
                </p>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={140}>
            <p className="mt-16 text-center font-serif text-2xl font-bold leading-snug text-forest sm:text-3xl">
              No es falta de voluntad.
              <br />
              Te enseñaron a mirar las ramas, no la raíz.
            </p>
          </Reveal>
        </div>
      </section>

      {/* LA CLASE */}
      <section className="bg-secondary/50 py-24">
        <div className="mx-auto max-w-2xl px-5">
          <Reveal>
            <p className="eyebrow">La clase</p>
            <h2 className="mt-4 text-3xl text-forest sm:text-4xl">
              Lo que te voy a contar en una hora juntas
            </h2>
          </Reveal>
          <ol className="mt-12 space-y-8">
            {learnings.map((text, i) => (
              <Reveal as="li" key={text} delay={i * 80}>
                <div className="flex gap-6">
                  <span className="font-serif text-2xl font-bold text-gold" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg font-medium text-foreground/90">{text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={120}>
            <p className="mt-12 text-base text-muted-foreground">
              Sin humo. Sin recetas milagro. Solo lo que yo aprendí, validé en cientos de mujeres y
              hoy te comparto.
            </p>
          </Reveal>
          <Reveal delay={160} className="mt-10">
            <GoldButton>Quiero mi lugar gratis</GoldButton>
          </Reveal>
        </div>
      </section>

      {/* QUIÉN SOY */}
      <section className="bg-forest py-24 text-forest-foreground">
        <div className="mx-auto max-w-3xl px-5">
          <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:gap-10 sm:text-left">
            <Reveal className="shrink-0 sm:mt-6">
              {/* [FOTO DE MACA] — reemplazar por retrato real */}
              <img
                src={macaPortraitAsset.url}
                alt="Retrato de Macarena Cárdenas"
                width={1008}
                height={1312}
                loading="lazy"
                className="h-32 w-32 rounded-full border-2 border-gold/50 object-cover sm:h-40 sm:w-40"
              />
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-3xl font-black tracking-tight sm:text-4xl">
                Macarena Cárdenas
              </h2>
              <p className="mt-3 text-[0.68rem] font-semibold tracking-[0.2em] text-gold uppercase">
                Colombiana · Nutrición clínica · Salud hormonal · Medicina integrativa
              </p>
              <p className="mt-6 text-base text-forest-foreground/85">
                Nací en Chile y crecí bajo el sol del Caribe. Fui Miss Teen Colombia, Modelo del
                Año, presenté televisión y diseñé moda a nivel internacional. Pero mientras vestía
                cuerpos ajenos, sentí un llamado más profundo: entender la arquitectura biológica y
                espiritual del ser humano.
              </p>
              <p className="mt-4 text-base text-forest-foreground/85">
                Hoy ese llamado es mi misión. Me formé en nutrición clínica, trofología, salud
                hormonal, microbiota, medicina integrativa, ayurveda, biodescodificación,
                hipnoterapia, reprogramación de ADN y biohacks, entre España y Bali. Mi filosofía
                es simple: la salud es soberanía. En Macasoul te acompaño a limpiar tu energía,
                purificar tu cuerpo y prosperar en un cuerpo sano, libre y lleno de luz.
              </p>
              <blockquote className="mt-8 border-l-2 border-gold pl-5 text-left font-serif text-xl leading-snug text-gold sm:text-2xl">
                "Donde no llega la medicina convencional, ahí empiezo yo: sanación desde la raíz y
                el terreno biológico."
              </blockquote>
              <ul className="mt-8 flex flex-wrap justify-center gap-2 sm:justify-start">
                {credentials.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-gold/40 px-4 py-1.5 text-xs tracking-wide text-forest-foreground/85"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>



      {/* FOOTER */}
      <footer className="border-t border-border/60 py-12">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <p className="font-serif text-lg tracking-[0.22em] text-forest uppercase">Macasoul</p>
          <ul className="mt-5 flex flex-wrap justify-center gap-5 text-sm text-muted-foreground">
            {SOCIAL_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition-colors hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-2xl text-xs leading-relaxed text-muted-foreground">
            Este evento tiene fines educativos e informativos y no sustituye el consejo, diagnóstico
            ni tratamiento médico profesional. Consulta siempre a tu profesional de salud.
          </p>
        </div>
      </footer>
    </div>
  );
}
