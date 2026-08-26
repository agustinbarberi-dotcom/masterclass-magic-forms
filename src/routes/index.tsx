import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Countdown } from "@/components/Countdown";
import { Reveal } from "@/components/Reveal";
import { RegistrationForm } from "@/components/RegistrationForm";
import {
  EVENT_PLATFORM,
  EVENT_TIME_LABEL,
  EVENT_TIMEZONE_LABEL,
  REPLAY_ANSWER,
  SOCIAL_LINKS,
  TESTIMONIALS,
} from "@/lib/event-config";
import heroRoots from "@/assets/hero-roots.jpg";
import macaPortrait from "@/assets/maca-portrait.jpg";
import { Quote } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Un encuentro en vivo · 20 de septiembre | Macasoul",
      },
      {
        name: "description",
        content:
          "Una clase íntima y en vivo con Macarena Cárdenas para mujeres que están cansadas de seguir cansadas. Cupos limitados · 20 de septiembre de 2026.",
      },
      {
        property: "og:title",
        content: "Un encuentro en vivo · 20 de septiembre | Macasoul",
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

const faqs = [
  {
    q: "¿Cuándo y dónde es?",
    a: `El 20 de septiembre de 2026, ${EVENT_TIME_LABEL} (${EVENT_TIMEZONE_LABEL}), en vivo por ${EVENT_PLATFORM}.`,
  },
  { q: "¿Tiene costo?", a: "Es gratis. Los cupos, limitados. Solo las registradas reciben acceso." },
  { q: "¿Queda grabada?", a: REPLAY_ANSWER },
  {
    q: "¿Necesito conocimientos previos?",
    a: "No. Solo estar cansada de seguir cansada.",
  },
  {
    q: "¿Esto reemplaza una consulta médica?",
    a: "No. Es una clase con fines educativos e informativos.",
  },
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
            <Countdown size="sm" />
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

      {/* HERO — opt-in debajo del header, luego el mensaje */}
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
          <Reveal className="mx-auto max-w-xl">
            <RegistrationForm id="registro" />
          </Reveal>

          <Reveal className="mx-auto mt-14 max-w-3xl text-center">
            <p className="eyebrow">
              Un encuentro íntimo en vivo · 20 de septiembre · Cupos limitados
            </p>
            <h1 className="mt-6 text-[2.2rem] text-forest sm:text-5xl lg:text-[3.6rem]">
              Estás cansada de estar cansada. Y nadie te ha dado una respuesta real.
            </h1>
            <p className="mt-7 max-w-xl text-base text-muted-foreground sm:text-lg">
              Esta clase no es para todas. Es para la mujer que ya probó de todo, que sigue
              inflamada, sin energía y sin respuestas —y que está lista, por fin, de sanar desde
              la raíz. Una sola función. En vivo. Con Macarena Cárdenas.
            </p>

            <p className="mt-8 text-sm tracking-wide text-forest">
              20 de septiembre de 2026 · {EVENT_TIME_LABEL} ({EVENT_TIMEZONE_LABEL}) · En vivo por{" "}
              {EVENT_PLATFORM}
            </p>

            <div className="mt-8">
              <Countdown />
            </div>
          </Reveal>
        </div>
      </section>

      {/* DOLOR */}
      <section className="border-t border-border/60 py-24">
        <div className="mx-auto max-w-2xl px-5">
          <Reveal>
            <p className="eyebrow">Te entiendo</p>
            <h2 className="mt-4 text-3xl text-forest sm:text-4xl">
              Si esto te suena, ya sabes por qué estás aquí
            </h2>
          </Reveal>
          <ul className="mt-12 space-y-8">
            {painPoints.map((text, i) => (
              <Reveal as="li" key={text} delay={i * 80}>
                <p className="border-l border-gold pl-6 text-lg text-foreground/90">{text}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={140}>
            <p className="mt-16 text-center font-serif text-2xl leading-snug text-forest sm:text-3xl">
              No es falta de voluntad.
              <br />
              Nadie te enseñó a mirar la raíz.
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
              Lo que nadie te había explicado así
            </h2>
          </Reveal>
          <ol className="mt-12 space-y-8">
            {learnings.map((text, i) => (
              <Reveal as="li" key={text} delay={i * 80}>
                <div className="flex gap-6">
                  <span className="font-serif text-2xl text-gold" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg text-foreground/90">{text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={120}>
            <p className="mt-12 text-base text-muted-foreground">
              Sin humo. Sin recetas milagro. Solo el mapa que te faltaba.
            </p>
          </Reveal>
          <Reveal delay={160} className="mt-10">
            <GoldButton>Quiero mi lugar gratis</GoldButton>
          </Reveal>
        </div>
      </section>

      {/* QUIÉN TE VA A GUIAR */}
      <section className="bg-forest py-24 text-forest-foreground">
        <div className="mx-auto grid max-w-5xl gap-14 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <figure className="overflow-hidden rounded-2xl border border-gold/30">
              {/* [FOTO DE MACA] — reemplazar por retrato real */}
              <img
                src={macaPortrait}
                alt="[FOTO DE MACA] Retrato de Macarena Cárdenas"
                width={1008}
                height={1312}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <figcaption className="bg-forest-foreground/10 px-4 py-2 text-center text-xs tracking-[0.18em] uppercase">
                [FOTO DE MACA]
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow text-gold">Quién te va a guiar</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">De las pasarelas a la esencia</h2>
            <p className="mt-6 text-base text-forest-foreground/85">
              Macarena Cárdenas dejó atrás el mundo de la belleza —Miss Teen Colombia, Modelo del
              Año, televisión y moda internacional— para dedicar su vida a lo único que
              realmente importa: entender por qué nos enfermamos y cómo volver a la raíz. Se
              formó en nutrición clínica, salud hormonal, medicina integrativa, biodescodificación
              y ayurveda, en España y Bali. Su filosofía: la salud como soberanía.
            </p>
            <blockquote className="mt-10 border-l border-gold pl-6 font-serif text-2xl text-gold sm:text-3xl">
              "Donde no llega la medicina convencional, ahí empiezo yo."
            </blockquote>
            <ul className="mt-10 flex flex-wrap gap-2">
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
      </section>

      {/* PRUEBA SOCIAL */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <p className="eyebrow">Testimonios</p>
            <h2 className="mt-4 text-3xl text-forest sm:text-4xl">
              Mujeres que ya caminaron este camino
            </h2>
          </Reveal>
          {/* NOTA DEV: estructura lista para reemplazar por testimonios reales */}
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal as="article" key={t.placeholder} delay={i * 90}>
                <figure>
                  <Quote className="h-6 w-6 text-gold" aria-hidden="true" />
                  <blockquote className="mt-4 font-serif text-xl leading-snug text-forest">
                    {t.text}
                  </blockquote>
                  <figcaption className="mt-6 text-sm text-muted-foreground">
                    <span className="block font-semibold text-foreground">{t.name}</span>
                    {t.country}
                    <span className="mt-2 block text-[0.68rem] tracking-[0.18em] text-gold uppercase">
                      {t.placeholder}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border/60 py-24">
        <div className="mx-auto max-w-2xl px-5">
          <Reveal>
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2 className="mt-4 text-3xl text-forest sm:text-4xl">Antes de reservar</h2>
          </Reveal>
          <Reveal delay={100}>
            <Accordion type="single" collapsible className="mt-8">
              {faqs.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-left font-serif text-xl text-forest">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-forest py-24 text-forest-foreground">
        <div className="mx-auto grid max-w-5xl gap-14 px-5 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow text-gold">Una sola función</p>
            <h2 className="mt-4 text-3xl sm:text-[2.6rem]">
              Puedes seguir igual. O puedes reservar tu lugar antes de que se acaben.
            </h2>
            <p className="mt-6 text-base text-forest-foreground/80">
              Es gratis. Es en vivo. Es con cupos limitados —y cuando se cierren, se cierran.
            </p>
            <div className="mt-10">
              <Countdown />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <RegistrationForm id="registro-final" tone="dark" />
          </Reveal>
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

      {/* CTA STICKY MOBILE */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gold-soft/60 bg-background/95 px-4 py-3 backdrop-blur-md md:hidden">
        <GoldButton className="w-full py-4 text-base">Quiero mi lugar gratis</GoldButton>
      </div>
      <div className="h-20 md:hidden" aria-hidden="true" />
    </div>
  );
}
