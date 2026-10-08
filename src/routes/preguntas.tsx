import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { GOOGLE_SCRIPT_URL } from "@/lib/event-config";

export const Route = createFileRoute("/preguntas")({
  component: PreguntasPage,
  head: () => ({
    meta: [
      { title: "Tu lugar está reservado · Macasoul" },
      { name: "description", content: "Responde 4 preguntas rápidas para que Maca prepare la clase pensando en ti." },
      { property: "og:title", content: "Tu lugar está reservado · Macasoul" },
      { property: "og:description", content: "Responde 4 preguntas rápidas para que Maca prepare la clase pensando en ti." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

type Key = "edad" | "sintoma" | "inversion_salud" | "acompanamiento";

const QUESTIONS: { key: Key; q: string; options: string[] }[] = [
  { key: "edad", q: "¿Qué edad tienes?", options: ["Menos de 40", "Entre 40 y 49", "Entre 50 y 59", "60 o más"] },
  {
    key: "sintoma",
    q: "¿Qué es lo que más te está afectando hoy?",
    options: [
      "El peso que no baja, aunque me cuido",
      "El cansancio y la falta de energía",
      "La inflamación y los problemas digestivos",
      "La niebla mental, los cambios de humor o el mal sueño",
      "Me siento bien, quiero aprender y prevenir",
    ],
  },
  {
    key: "inversion_salud",
    q: "En el último año, ¿qué has hecho para cuidar tu salud?",
    options: [
      "Consultas privadas con especialistas, estudios o tratamientos",
      "Programas, cursos o acompañamientos pagos",
      "Suplementos y cambios de alimentación por mi cuenta",
      "Solo información gratuita (redes, videos, lecturas)",
      "Nada todavía",
    ],
  },
  {
    key: "acompanamiento",
    q: "Si encuentras una solución que tenga sentido para ti, ¿qué tipo de acompañamiento preferirías?",
    options: [
      "Personalizado, con seguimiento cercano de Maca",
      "Un programa grupal con guía paso a paso",
      "Contenido grabado para hacerlo a mi ritmo",
      "Por ahora solo quiero información gratuita",
    ],
  },
];

function computePrioridad(a: Record<Key, string>) {
  if (!a.edad || !a.sintoma || !a.inversion_salud || !a.acompanamiento) return "";
  const ok =
    (a.edad === QUESTIONS[0].options[1] || a.edad === QUESTIONS[0].options[2]) &&
    a.sintoma !== QUESTIONS[1].options[4] &&
    QUESTIONS[2].options.slice(0, 2).includes(a.inversion_salud) &&
    QUESTIONS[3].options.slice(0, 2).includes(a.acompanamiento);
  return ok ? "ALTA" : "NORMAL";
}

function PreguntasPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const [lead, setLead] = useState<{ nombre: string; telefono: string } | null>(null);
  const [step, setStep] = useState(0);
  const answers = useRef<Record<Key, string>>({ edad: "", sintoma: "", inversion_salud: "", acompanamiento: "" });
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("macasoul_optin");
      const d = raw ? JSON.parse(raw) : null;
      if (!d?.nombre || !d?.telefono) {
        navigate({ to: "/", replace: true });
        return;
      }
      setLead(d);
    } catch {
      navigate({ to: "/", replace: true });
    }
    router.preloadRoute({ to: "/gracias" }).catch(() => {});
  }, [navigate, router]);

  function choose(option: string) {
    if (!lead || picked) return;
    const q = QUESTIONS[step];
    answers.current = { ...answers.current, [q.key]: option };
    const a = answers.current;
    try {
      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: "calificacion",
          telefono: lead.telefono,
          nombre: lead.nombre,
          edad: a.edad,
          sintoma: a.sintoma,
          inversion_salud: a.inversion_salud,
          acompanamiento: a.acompanamiento,
          prioridad: computePrioridad(a),
        }),
      }).catch(() => {});
    } catch {
      /* nunca frenar */
    }
    setPicked(option);
    setTimeout(() => {
      setPicked(null);
      if (step + 1 >= QUESTIONS.length) navigate({ to: "/gracias" });
      else setStep(step + 1);
    }, 220);
  }

  if (!lead) return <div className="min-h-screen bg-gradient-warm" />;
  const q = QUESTIONS[step];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-warm text-foreground">
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-5 py-10 sm:py-14">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
            ¡Listo, tu lugar está reservado!
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base text-muted-foreground">
            Antes de enviarte el acceso, respóndeme 4 preguntas rápidas para preparar la clase pensando en ti.
          </p>
        </div>

        <div className="mt-8">
          <div className="mb-2 text-center text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            {step + 1} de {QUESTIONS.length}
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gold-soft/60">
            <div
              className="h-full rounded-full bg-gradient-gold transition-all duration-500 ease-out"
              style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        <div key={step} className="mt-8 animate-in fade-in duration-300">
          <h2 className="text-center font-display text-xl font-semibold leading-snug sm:text-2xl">{q.q}</h2>
          <div className="mt-6 flex flex-col gap-3">
            {q.options.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => choose(o)}
                className={
                  "w-full rounded-2xl border px-5 py-4 text-left text-base font-medium shadow-soft transition-all active:scale-[0.99] " +
                  (picked === o
                    ? "border-gold bg-gold-soft/70"
                    : "border-gold-soft/70 bg-card hover:border-gold")
                }
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-10 text-center">
          <Link to="/gracias" className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground">
            Omitir y unirme al grupo
          </Link>
        </div>
      </main>
    </div>
  );
}
