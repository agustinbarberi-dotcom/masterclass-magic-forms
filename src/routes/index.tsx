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
import rootsDiagram from "@/assets/roots-diagram.png";
import macaPortrait from "@/assets/maca-portrait.jpg";
import {
  Stethoscope,
  Salad,
  HeartCrack,
  RefreshCcw,
  AlertCircle,
  Quote,
  Calendar,
  Clock,
  MapPin,
  Gift,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Clase magistral gratis · 20 de septiembre | Macasoul",
      },
      {
        name: "description",
        content:
          "Clase en vivo y gratuita con Macarena Cárdenas: entiende por qué sigues inflamada, cansada y sin energía, y cómo sanar desde la raíz. 20 de septiembre de 2026.",
      },
      {
        property: "og:title",
        content: "Clase magistral gratis · 20 de septiembre | Macasoul",
      },
      {
        property: "og:description",
        content:
          "Hormonas, inflamación y energía: sanar desde la raíz. Clase en vivo con Macarena Cárdenas. Cupos limitados.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const eventDetails = [
  { icon: Calendar, text: "20 de septiembre de 2026" },
  { icon: Clock, text: `${EVENT_TIME_LABEL} (${EVENT_TIMEZONE_LABEL})` },
  { icon: MapPin, text: `En vivo por ${EVENT_PLATFORM}` },
  { icon: Gift, text: "Gratis, cupos limitados" },
];

const painPoints = [
  {
    icon: Stethoscope,
    text: 'Vas de médico en médico y te dicen que "todo está normal", pero te sigues sintiendo mal.',
  },
  { icon: Salad, text: "Probaste dietas, suplementos y rutinas… y nada te queda." },
  {
    icon: HeartCrack,
    text: "Te cuesta reconocerte: inflamada, sin energía, con un cuerpo que ya no sientes tuyo.",
  },
  {
    icon: RefreshCcw,
    text: "Empiezas con toda la intención y a los pocos días lo abandonas —y sientes que es tu culpa.",
  },
  { icon: AlertCircle, text: "Vives en alerta, con ansiedad y con miedo a que los síntomas vuelvan." },
];

const learnings = [
  'Por qué "hacer todo bien" no te está funcionando —y qué mirar en su lugar.',
  "Cómo se conectan tus hormonas, tu inflamación, tu digestión y tu energía: el mapa completo.",
  "Los primeros pasos para desinflamar y recuperar tu energía desde la raíz.",
  "Qué hace que empieces y abandones una y otra vez —y cómo cambiarlo sin depender de la fuerza de voluntad.",
  "Cómo construir hoy la salud con la que quieres llegar a tus próximos 20 años.",
];

const credentials = [
  "Nutrición Clínica",
  "Trofología",
  "Salud Hormonal y Menopausia",
  "Microbiota",
  "Medicina Integrativa",
  "Digitopuntura China",
  "Biodescodificación",
  "Ayurveda",
];

const forWhom = [
  "Para ti, si sientes que tu cuerpo cambió (hormonas, peso, energía) y no encuentras respuestas.",
  "Si ya probaste de todo y sigues igual.",
  "Si quieres dejar de tapar síntomas y entender —de verdad— la raíz.",
  "Si quieres llegar sana y fuerte a las próximas décadas, por ti y por los tuyos.",
];

const symptoms = ["Inflamación", "Hormonas", "Cansancio", "Ansiedad", "Peso que no baja", "Digestión"];

const faqs = [
  {
    q: "¿Cuándo y dónde es?",
    a: `El 20 de septiembre de 2026, ${EVENT_TIME_LABEL} (${EVENT_TIMEZONE_LABEL}), en vivo por ${EVENT_PLATFORM}.`,
  },
  { q: "¿Tiene costo?", a: "Es totalmente gratis, con cupos limitados." },
  { q: "¿Queda grabada?", a: REPLAY_ANSWER },
  {
    q: "¿Necesito conocimientos previos?",
    a: "No. Solo las ganas de entender y cuidar tu cuerpo.",
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
      {/* A) HEADER FIJO */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
          <div className="flex flex-col">
            {/* [LOGO] */}
            <span className="font-serif text-xl tracking-[0.2em] text-forest uppercase">
              Macasoul
            </span>
            <Countdown size="sm" />
          </div>
          <a
            href="#registro"
            className="rounded-full border border-forest/25 px-4 py-2 text-xs font-semibold tracking-wide text-forest transition-colors hover:bg-forest hover:text-forest-foreground sm:px-5 sm:text-sm"
          >
            Reservar mi lugar
          </a>
        </div>
      </header>

      {/* B) HERO */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32">
        <img
          src={heroRoots}
          alt="Raíces de un árbol iluminadas por luz dorada en un bosque"
          width={1600}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-warm opacity-85" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">
              Clase magistral en vivo · 20 de septiembre · Gratis
            </p>
            <h1 className="mt-5 text-[2.1rem] text-forest sm:text-5xl lg:text-[3.4rem]">
              Por qué sigues inflamada, cansada y sin energía… aunque "hagas todo bien"
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              Descubre cómo empezar a sanar desde la raíz —hormonas, inflamación y energía— en una
              clase en vivo con Macarena Cárdenas. Donde no llega la medicina convencional, ahí
              empieza este camino.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {eventDetails.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-forest">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-soft bg-card">
                    <Icon className="h-4 w-4 text-gold" aria-hidden="true" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Countdown />
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:pl-4">
            <RegistrationForm id="registro" />
          </Reveal>
        </div>
      </section>

      {/* C) DOLOR */}
      <section className="border-t border-border/60 py-20">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <p className="eyebrow">Te entiendo</p>
            <h2 className="mt-4 text-3xl text-forest sm:text-4xl">
              Si te pasa esto, esta clase es para ti
            </h2>
          </Reveal>
          <ul className="mt-10 space-y-5">
            {painPoints.map(({ icon: Icon, text }, i) => (
              <Reveal as="li" key={text} delay={i * 80}>
                <div className="flex gap-4 rounded-xl border border-border/70 bg-card/70 p-5">
                  <Icon className="mt-1 h-5 w-5 shrink-0 text-terracotta" aria-hidden="true" />
                  <p className="text-base text-foreground/90">{text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={140}>
            <blockquote className="mt-12 border-l-2 border-gold pl-6 text-2xl text-forest sm:text-3xl">
              No es falta de voluntad ni de información. Es que nadie te enseñó a mirar la raíz.
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* D) MECANISMO */}
      <section className="bg-secondary/50 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Sanar desde la raíz</p>
            <h2 className="mt-4 text-3xl text-forest sm:text-4xl">
              Tus síntomas no son problemas separados
            </h2>
            <p className="mt-6 text-base text-muted-foreground sm:text-lg">
              Tu inflamación, tus hormonas, tu cansancio y tu ansiedad comparten una misma raíz.
              Mientras trates cada síntoma por separado, nada va a funcionar de verdad. En esta
              clase vas a entender esa raíz —y cómo empezar a ordenarla, paso a paso.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-gold-soft/70 bg-card p-7 shadow-soft">
              <ul className="flex flex-wrap justify-center gap-2">
                {symptoms.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-border bg-background px-4 py-1.5 text-xs tracking-wide text-muted-foreground uppercase"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <img
                src={rootsDiagram}
                alt="Ilustración de raíces que conectan todos los síntomas en una misma raíz"
                width={1200}
                height={1200}
                loading="lazy"
                className="mx-auto mt-2 w-full max-w-sm"
              />
              <p className="text-center font-serif text-2xl text-forest">Una misma raíz</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* E) QUÉ VAS A DESCUBRIR */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <p className="eyebrow">La clase</p>
            <h2 className="mt-4 text-3xl text-forest sm:text-4xl">
              Qué vas a descubrir en esta clase
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {learnings.map((text, i) => (
              <Reveal as="article" key={text} delay={i * 80}>
                <div className="h-full rounded-2xl border border-border/70 bg-card p-6 transition-shadow hover:shadow-soft">
                  <Sparkles className="h-5 w-5 text-gold" aria-hidden="true" />
                  <p className="mt-4 text-base text-foreground/90">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120} className="mt-10 text-center">
            <GoldButton>Quiero mi lugar gratis</GoldButton>
          </Reveal>
        </div>
      </section>

      {/* F) QUIÉN TE VA A GUIAR */}
      <section className="bg-forest py-20 text-forest-foreground">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
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
              Macarena Cárdenas pasó del mundo de la belleza —Miss Teen Colombia, Modelo del Año,
              presentadora de televisión y diseñadora de modas internacional, hija de Sonia Bravo
              (Miss Chile 1969)— a dedicar su vida a comprender el diseño más profundo del ser
              humano: su salud biológica y energética. Hoy es especialista en nutrición clínica,
              salud hormonal y menopausia, medicina integrativa, biodescodificación y ayurveda. Se
              formó en la Escuela de Salud Integrativa en España y como Raw Vegan Chef en Bali. Su
              filosofía: la salud como soberanía.
            </p>
            <blockquote className="mt-8 border-l-2 border-gold pl-6 text-2xl text-gold sm:text-3xl">
              "Donde no llega la medicina convencional, ahí empiezo yo: sanación desde la raíz y
              terreno biológico."
            </blockquote>
            <ul className="mt-8 flex flex-wrap gap-2">
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

      {/* G) PRUEBA SOCIAL */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="eyebrow">Testimonios</p>
            <h2 className="mt-4 text-3xl text-forest sm:text-4xl">
              Lo que viven quienes ya caminaron con Maca
            </h2>
          </Reveal>
          {/* NOTA DEV: estructura lista para reemplazar por testimonios reales */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal as="article" key={t.placeholder} delay={i * 90}>
                <figure className="h-full rounded-2xl border border-border/70 bg-card p-7">
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

      {/* H) PARA QUIÉN ES */}
      <section className="bg-secondary/50 py-20">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <p className="eyebrow">Para quién es</p>
            <h2 className="mt-4 text-3xl text-forest sm:text-4xl">Para quién es esta clase</h2>
          </Reveal>
          <ul className="mt-10 space-y-4">
            {forWhom.map((text, i) => (
              <Reveal as="li" key={text} delay={i * 80}>
                <div className="flex gap-4">
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                    aria-hidden="true"
                  />
                  <p className="text-base text-foreground/90">{text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* I) FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2 className="mt-4 text-3xl text-forest sm:text-4xl">Resolvemos tus dudas</h2>
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

      {/* J) CTA FINAL */}
      <section className="bg-forest py-20 text-forest-foreground">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="text-3xl sm:text-[2.6rem]">
              El 20 de septiembre puede ser el día en que dejes de tapar síntomas y empieces a sanar
              desde la raíz.
            </h2>
            <p className="mt-6 text-base text-forest-foreground/80">
              Reserva tu lugar. Es gratis y los cupos son limitados.
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

      {/* K) FOOTER */}
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
