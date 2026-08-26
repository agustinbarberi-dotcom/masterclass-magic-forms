import { createFileRoute } from "@tanstack/react-router";
import { Countdown } from "@/components/Countdown";
import { Reveal } from "@/components/Reveal";
import { RegistrationForm } from "@/components/RegistrationForm";
import {
  EVENT_PLATFORM,
  EVENT_TIME_LABEL,
  EVENT_TIMEZONE_LABEL,
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
              Te invito a un encuentro íntimo en vivo · 20 de septiembre · Cupos limitados
            </p>
            <h1 className="mt-6 text-[2.2rem] font-black leading-[0.98] tracking-tight text-forest sm:text-5xl lg:text-[3.6rem]">
              Estás cansada de estar cansada. Y nadie te ha dado una respuesta real.
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-base text-muted-foreground sm:text-lg">
              Esta clase no es para todas. Es para la mujer que ya probó de todo, que sigue
              inflamada, sin energía y sin respuestas —y que está lista, por fin, de sanar desde
              la raíz. Una sola función. En vivo. Conmigo.
            </p>

            <p className="mt-8 text-sm tracking-wide text-forest">
              20 de septiembre de 2026 · {EVENT_TIME_LABEL} ({EVENT_TIMEZONE_LABEL}) · En vivo por{" "}
              {EVENT_PLATFORM}
            </p>

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
      <section id="registro" className="relative overflow-hidden py-24 sm:py-28">
        <div className="absolute inset-0 bg-gradient-warm opacity-90" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-5">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <p className="eyebrow">Una sola función. En vivo. Gratis.</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-forest sm:text-4xl lg:text-[2.6rem]">
                Reservá tu lugar antes de que se acaben los cupos.
              </h2>
              <p className="mt-6 text-base text-muted-foreground sm:text-lg">
                Dejame tu nombre, email y WhatsApp. Te mando el acceso a la clase y un recordatorio
                el día del evento. No te pido tarjeta. Solo tu decisión de estar.
              </p>
              <p className="mt-6 text-sm tracking-wide text-forest">
                20 de septiembre de 2026 · {EVENT_TIME_LABEL} ({EVENT_TIMEZONE_LABEL}) · En vivo por{" "}
                {EVENT_PLATFORM}
              </p>
            </Reveal>

            <Reveal delay={120}>
              <RegistrationForm id="registro-form" />
            </Reveal>
          </div>
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
            <p className="eyebrow text-gold">Quién soy</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">Soy Macarena Cárdenas</h2>
            <p className="mt-6 text-base text-forest-foreground/85">
              Nací en Chile y crecí bajo el sol del Caribe. Soy hija de Sonia Bravo (Miss Chile
              1969), fui Miss Teen Colombia y Modelo del Año, presenté televisión y diseñé moda con
              éxito internacional. Pero mientras vestía cuerpos ajenos, sentí un llamado más
              profundo: entender la arquitectura biológica y espiritual del ser humano.
            </p>
            <p className="mt-4 text-base text-forest-foreground/85">
              Hoy ese llamado es mi misión. Me formé en nutrición clínica, trofología, salud
              hormonal, menopausia, microbiota, dietoterapia, digitopuntura china,
              biodescodificación, bioneuroemoción, medicina integrativa, ayurveda, hipnoterapia,
              reprogramación de ADN y biohacks, entre España y Bali. Mi filosofía es simple: la
              salud es soberanía. No enfermamos por azar, sino por ignorancia sobre nuestro propio
              templo. En Macasoul te acompaño a limpiar tu energía, purificar tu cuerpo y prosperar
              en un cuerpo sano, libre y lleno de luz.
            </p>
            <blockquote className="mt-10 border-l border-gold pl-6 font-serif text-2xl text-gold sm:text-3xl">
              "Donde no llega la medicina convencional, ahí empiezo yo: sanación desde la raíz y el
              terreno biológico."
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
              Ellas también confiaron en mi voz
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


      {/* CTA FINAL */}
      <section className="bg-forest py-24 text-forest-foreground">
        <div className="mx-auto grid max-w-5xl gap-14 px-5 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow text-gold">Una sola función</p>
            <h2 className="mt-4 text-3xl sm:text-[2.6rem]">
              Puedes seguir igual. O puedes reservar tu lugar conmigo antes de que se acaben.
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
