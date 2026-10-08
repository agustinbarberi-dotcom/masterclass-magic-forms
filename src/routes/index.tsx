import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { RegistrationForm } from "@/components/RegistrationForm";

import {
  EVENT_DAY_LABEL,
  EVENT_PLATFORM,
  EVENT_TIME_LABEL,
  SOCIAL_LINKS,
} from "@/lib/event-config";
import heroRoots from "@/assets/hero-roots.webp";
import macaEstudio from "@/assets/maca-estudio.webp";
import macaRostro from "@/assets/maca-estudio-rostro.webp";
import macaCertificado from "@/assets/maca-certificado.webp";
import { Calendar } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Cambio hormonal después de los 40 · Clase en vivo | Macasoul",
      },
      {
        name: "description",
        content:
          `Una clase en vivo de 60 minutos con Macarena Cárdenas para mujeres de más de 40 que están atravesando el cambio hormonal. Evento exclusivo · ${EVENT_DAY_LABEL} · Cupos limitados.`,
      },
      {
        property: "og:title",
        content: "Cambio hormonal después de los 40 · Clase en vivo | Macasoul",
      },
      {
        property: "og:description",
        content:
          "Comes bien, te cuidas y tu cuerpo dejó de responderte. Te muestro qué cambió y por dónde empezar a recuperarlo. En vivo, una sola vez al año.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const painPoints = [
  "Haces lo mismo que hacías a los 25, y el peso ya no baja. Sobre todo en el abdomen.",
  "Duermes y amaneces cansada. A media tarde ya no tienes energía.",
  'Te inflamas con casi todo, aunque comas "sano".',
  "Se te olvidan las cosas, te cuesta concentrarte y cambias de humor sin entender por qué.",
  'Tus exámenes salen bien. O te dicen "es la edad".',
  "Ya probaste dietas, detox, suplementos y médicos. Te ayudan un tiempo y vuelves al mismo lugar.",
];

const learnings = [
  'Por qué "hacer todo bien" dejó de funcionarte después de los 40, y qué cambió en tu cuerpo.',
  "El mapa completo: cómo se conectan tus hormonas, tu digestión, tu inflamación, tu peso y tu energía, para que dejes de tratar síntomas sueltos.",
  "Por dónde empezar a desinflamar y recuperar energía esta misma semana.",
  "Cómo sostenerlo sin empezar de cero cada lunes ni depender de la fuerza de voluntad.",
];

const credentials = [
  "Nutricionista Clínica",
  "Experta en Dietoterapia China",
  "Medicina Tradicional China",
  "Digitopuntura para puntos específicos de dolor y sanación",
  "Desparasitación",
  "Desintoxicación nueva escuela",
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
    <div className={`text-sm font-semibold tracking-wide text-forest ${className}`}>
      <div className="flex flex-nowrap items-center justify-center gap-x-1.5 text-xs sm:gap-x-2 sm:text-sm">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-gold" aria-hidden="true" />
          {EVENT_DAY_LABEL}
        </span>
        <span className="text-gold/70" aria-hidden="true">·</span>
        <span>{EVENT_TIME_LABEL}</span>
        <span className="text-gold/70" aria-hidden="true">·</span>
        <span>{EVENT_PLATFORM}</span>
        <span className="text-gold/70" aria-hidden="true">·</span>
        <span className="rounded-full border border-gold/40 px-2.5 py-0.5 text-xs font-bold tracking-wider text-gold uppercase">
          Cupos limitados
        </span>
      </div>
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
          width={1200}
          height={900}
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-warm opacity-90" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-5 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12">
          <Reveal className="mx-auto max-w-3xl text-center">
            <img
              src={macaRostro}
              alt="Macarena Cárdenas"
              width={480}
              height={480}
              decoding="async"
              fetchPriority="high"
              className="mx-auto mb-6 h-28 w-28 rounded-full border-2 border-gold/60 object-cover shadow-soft lg:hidden"
            />
            <p className="eyebrow">
              Evento exclusivo · {EVENT_DAY_LABEL} · Única vez en el año · Cupos limitados
            </p>
            <h1 className="mt-6 text-[2.2rem] font-black leading-[0.98] tracking-tight text-forest sm:text-5xl lg:text-[3.6rem]">
              Comes bien. Te cuidas.
              <br />
              Y tu cuerpo dejó de responderte.
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-base text-muted-foreground sm:text-lg">
              Una clase en vivo de 60 minutos para mujeres de más de 40 que están atravesando el
              cambio hormonal y ya no se reconocen: el peso que no baja, el cansancio, la
              inflamación, la niebla mental. Te muestro qué cambió en tu cuerpo y por dónde empezar
              a recuperarlo.
            </p>


            <div className="mt-8 flex justify-center">
              <EventMeta />
            </div>

            <div className="mt-10">
              <GoldButton className="animate-float px-8 py-4 text-base">Reservar mi lugar</GoldButton>
            </div>

          </Reveal>
          <Reveal delay={120} className="hidden lg:block">
            <img
              src={macaEstudio}
              alt="Macarena Cárdenas"
              width={1151}
              height={1280}
              decoding="async"
              className="w-full rounded-3xl border border-gold/40 object-cover shadow-soft"
            />
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
            <p className="eyebrow">Si te pasa esto</p>
            <h2 className="mt-4 text-3xl text-forest sm:text-4xl">
              Esta clase es para ti
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              <span className="font-serif text-forest italic">
                "Tengo 45 años y me siento de 60."
              </span>{" "}
              Si alguna vez pensaste algo parecido, quiero que leas esto despacio.
            </p>
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
              No es la edad.
              <br />
              Y no es falta de disciplina.
            </p>
            <p className="mx-auto mt-6 max-w-lg text-center text-base leading-relaxed text-muted-foreground">
              Tu cuerpo cambió las reglas y nadie te explicó las nuevas. Lo que te funcionaba a los
              25 hoy no alcanza, y seguir haciendo lo mismo te agota más.
            </p>
          </Reveal>
          <Reveal delay={180} className="mt-10 flex justify-center">
            <a
              href="#registro"
              className="inline-flex rounded-full bg-forest px-8 py-3.5 text-sm font-semibold tracking-wide text-forest-foreground shadow-soft transition-colors hover:bg-forest/90"
            >
              Reservar mi lugar
            </a>
          </Reveal>
        </div>

      </section>

      {/* LA CLASE */}
      <section className="bg-secondary/50 py-24">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <Reveal>
            <p className="eyebrow">La clase</p>
            <h2 className="mx-auto mt-4 max-w-xl text-3xl text-forest sm:text-4xl">
              Lo que te vas a llevar en una hora
            </h2>
          </Reveal>
          <ol className="mx-auto mt-12 max-w-xl space-y-8 text-left sm:text-center">
            {learnings.map((text, i) => (
              <Reveal as="li" key={text} delay={i * 80}>
                <div className="flex items-start gap-5 sm:flex-col sm:items-center sm:gap-3">
                  <span className="font-serif text-2xl font-bold text-gold" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg font-medium text-foreground/90">{text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={120}>
            <p className="mt-14 text-center font-serif text-2xl font-bold leading-snug text-forest sm:text-3xl">
              Una hora. En vivo.
              <br />
              Una sola vez al año.
            </p>
            <p className="mx-auto mt-6 max-w-lg text-base text-muted-foreground">
              Sin humo. Sin recetas milagro. Solo lo que yo aprendí, validé en cientos de mujeres y
              hoy te comparto.
            </p>
          </Reveal>
          <Reveal delay={160} className="mt-10 flex justify-center">
            <GoldButton>Quiero mi lugar</GoldButton>
          </Reveal>
        </div>
      </section>

      {/* QUIÉN SOY */}
      <section className="bg-forest py-24 text-forest-foreground">
        <div className="mx-auto max-w-3xl px-5">
          <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-start lg:gap-10 lg:text-left">
            <Reveal className="shrink-0">
              <img
                src={macaCertificado}
                alt="Macarena Cárdenas con bata blanca, sosteniendo su certificado de formación"
                width={450}
                height={601}
                loading="lazy"
                className="w-56 rounded-2xl border-2 border-gold/50 object-cover shadow-soft lg:w-60"
              />
            </Reveal>
            <Reveal delay={120} className="flex flex-col items-center lg:items-start">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Llevo años acompañando a mujeres en esta etapa
              </p>
              <h2 className="mt-4 font-serif text-3xl font-black tracking-tight lg:text-4xl">
                Macarena Cárdenas
              </h2>
              <p className="mt-3 max-w-md text-xs font-semibold leading-relaxed tracking-[0.12em] text-gold uppercase">
                Nutricionista Clínica · Dietoterapia China · Medicina Tradicional China ·
                Digitopuntura · Desparasitación · Desintoxicación
              </p>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-forest-foreground/85">
                Muchas de ustedes me conocen hace tiempo. Soy nutricionista clínica, formada en
                medicina tradicional china y medicina integrativa. Y lo que más veo en consulta es
                esto: mujeres que se cuidan, que hacen <span className="font-semibold text-gold">"todo bien"</span>, y a
                las que nadie les miró el cuadro completo.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-forest-foreground/85">
                Nací en Chile y crecí bajo el sol del Caribe. Fui Miss Teen Colombia, Modelo del
                Año, presenté televisión y diseñé moda a nivel internacional. Pero mientras vestía
                cuerpos ajenos, sentí un llamado más profundo: entender la arquitectura biológica y
                espiritual del ser humano.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-forest-foreground/85">
                Hoy ese llamado es mi misión. Me formé en nutrición clínica, trofología, salud
                hormonal, microbiota, medicina integrativa, ayurveda, biodescodificación,
                hipnoterapia, reprogramación de ADN y biohacks, entre España y Bali. Mi filosofía
                es simple: la salud es soberanía. En Macasoul te acompaño a limpiar tu energía,
                purificar tu cuerpo y prosperar en un cuerpo sano, libre y lleno de luz.
              </p>
              <blockquote className="mt-8 max-w-lg border-l-2 border-gold pl-5 text-left font-serif text-xl leading-snug text-gold lg:text-2xl">
                "Donde no llega la medicina convencional, ahí empiezo yo: sanación desde la raíz y
                el terreno biológico."
              </blockquote>
              <ul className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start">
                {credentials.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-gold/40 px-4 py-1.5 text-xs tracking-wide text-forest-foreground/85"
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex justify-center lg:justify-start">
                <GoldButton>Reservar mi lugar</GoldButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>



      {/* FOOTER */}
      <footer className="border-t border-border/60 py-12">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <p className="font-serif text-lg tracking-[0.22em] text-forest uppercase">Macasoul</p>
          {SOCIAL_LINKS.length > 0 && (
            <ul className="mt-5 flex flex-wrap justify-center gap-5 text-sm text-muted-foreground">
              {SOCIAL_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="transition-colors hover:text-gold">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </footer>

    </div>
  );
}
