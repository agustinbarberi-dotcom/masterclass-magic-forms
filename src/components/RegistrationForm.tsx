import { useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Loader2, AlertTriangle } from "lucide-react";
import {
  COUNTRIES,
  COUNTRY_CODES,
  COUNTRY_FLAGS,
  GOOGLE_SCRIPT_URL,
  EVENT_DATE_LABEL,
} from "@/lib/event-config";
import { cn } from "@/lib/utils";

const schema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, { message: "Por favor escribe tu nombre completo." })
    .max(80, { message: "El nombre es demasiado largo." }),
  whatsapp: z
    .string()
    .trim()
    .min(6, { message: "Tu número necesita más dígitos." })
    .max(20, { message: "El número es demasiado largo." })
    .regex(/^[0-9\s()-]{6,20}$/, {
      message: "Usa solo números (sin código de país, lo agregamos automáticamente).",
    }),
  pais: z.string().trim().max(60).optional(),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

export function RegistrationForm({ id, tone = "light" }: { id: string; tone?: "light" | "dark" }) {
  const navigate = useNavigate();
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [pais, setPais] = useState("Colombia");
  const nombreRef = useRef<HTMLInputElement>(null);
  const whatsappRef = useRef<HTMLInputElement>(null);

  // Precarga la página de gracias para que la redirección sea instantánea
  useEffect(() => {
    router.preloadRoute({ to: "/preguntas" }).catch(() => {});
  }, [router]);

  // Relleno automático: recupera los datos guardados del navegador
  useEffect(() => {
    try {
      const saved = localStorage.getItem("macasoul_lead");
      if (!saved) return;
      const data = JSON.parse(saved) as { nombre?: string; whatsapp?: string; pais?: string };
      if (data.nombre && nombreRef.current && !nombreRef.current.value)
        nombreRef.current.value = data.nombre;
      if (data.whatsapp && whatsappRef.current && !whatsappRef.current.value)
        whatsappRef.current.value = data.whatsapp;
      if (data.pais) setPais(data.pais);
    } catch {
      /* ignorar */
    }
  }, []);

  const labelCls = cn(
    "mb-1.5 block text-[0.72rem] tracking-[0.16em] uppercase",
    tone === "dark" ? "text-forest-foreground/75" : "text-muted-foreground",
  );
  const fieldCls = cn(
    "w-full rounded-lg border px-4 py-3 text-base outline-none transition-colors",
    "focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/40",
    tone === "dark"
      ? "border-forest-foreground/25 bg-forest-foreground/10 text-forest-foreground placeholder:text-forest-foreground/45"
      : "border-border bg-card text-foreground placeholder:text-muted-foreground/70",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const parsed = schema.safeParse({
      nombre: String(fd.get("nombre") ?? ""),
      whatsapp: String(fd.get("whatsapp") ?? ""),
      pais: String(fd.get("pais") ?? ""),
    });

    if (!parsed.success) {
      const next: Errors = {};
      parsed.error.issues.forEach((i) => {
        const key = i.path[0] as keyof Errors;
        if (!next[key]) next[key] = i.message;
      });
      setErrors(next);
      return;
    }

    setErrors({});
    setStatus("loading");

    const pais = parsed.data.pais || "Colombia";
    const code = COUNTRY_CODES[pais] || "";
    const rawNumber = parsed.data.whatsapp.replace(/[^0-9]/g, "");
    const telefono = `${code}${rawNumber}`;

    const payload = {
      fecha: EVENT_DATE_LABEL,
      nombre: parsed.data.nombre,
      telefono,
    };

    // Envío en segundo plano: keepalive garantiza que el POST sobreviva
    // a la navegación, así redirigimos de inmediato sin esperar respuesta.
    try {
      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {
        /* el envío continúa en segundo plano */
      });

      try {
        localStorage.setItem(
          "macasoul_lead",
          JSON.stringify({ nombre: parsed.data.nombre, whatsapp: parsed.data.whatsapp, pais }),
        );
      } catch {
        /* ignorar */
      }

      try {
        sessionStorage.setItem(
          "macasoul_optin",
          JSON.stringify({ nombre: parsed.data.nombre, telefono }),
        );
      } catch {
        /* ignorar */
      }

      form.reset();
      navigate({ to: "/preguntas" });
    } catch {
      setStatus("error");
      setFormError("No pudimos enviar tu registro. Intenta de nuevo en unos segundos.");
    }
  }

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      noValidate
      className={cn(
        "rounded-2xl border p-6 shadow-soft sm:p-7",
        tone === "dark" ? "border-gold/30 bg-forest-foreground/8" : "border-gold-soft/70 bg-card",
      )}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor={`${id}-nombre`} className={labelCls}>
            Nombre completo
          </label>
          <input
            id={`${id}-nombre`}
            ref={nombreRef}
            name="nombre"
            type="text"
            autoComplete="name"
            placeholder="Tu nombre"
            aria-invalid={!!errors.nombre}
            aria-describedby={errors.nombre ? `${id}-nombre-error` : undefined}
            className={fieldCls}
          />
          {errors.nombre && (
            <p id={`${id}-nombre-error`} className="mt-1.5 text-sm text-destructive">
              {errors.nombre}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${id}-whatsapp`} className={labelCls}>
            Número de WhatsApp
          </label>
          <div
            className={cn(
              fieldCls,
              "flex items-center gap-1 px-2 py-0 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/40",
            )}
          >
            <div className="relative flex shrink-0 items-center gap-1 pl-1">
              <span aria-hidden="true" className="text-lg leading-none">
                {COUNTRY_FLAGS[pais] ?? "🌎"}
              </span>
              <span className="text-base tabular-nums">{COUNTRY_CODES[pais]}</span>
              <select
                id={`${id}-pais`}
                name="pais"
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                aria-label="País"
                className="absolute inset-0 w-full cursor-pointer opacity-0"
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {`${COUNTRY_FLAGS[c] ?? "🌎"} ${c} ${COUNTRY_CODES[c]}`}
                  </option>
                ))}
              </select>
              <span aria-hidden="true" className="text-xs opacity-50">
                ▾
              </span>
            </div>
            <input
              id={`${id}-whatsapp`}
              ref={whatsappRef}
              name="whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="300 123 4567"
              aria-invalid={!!errors.whatsapp}
              aria-describedby={errors.whatsapp ? `${id}-whatsapp-error` : undefined}
              className="w-full bg-transparent px-2 py-3 text-base outline-none placeholder:text-muted-foreground/70"
            />
          </div>
          {errors.whatsapp && (
            <p id={`${id}-whatsapp-error`} className="mt-1.5 text-sm text-destructive">
              {errors.whatsapp}
            </p>
          )}
        </div>

      </div>

      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-4 text-sm font-bold tracking-[0.08em] text-gold-foreground uppercase transition-transform hover:scale-[1.015] focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-70"
      >
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {status === "success" && <span aria-hidden="true">✓</span>}
        {status === "loading"
          ? "Enviando..."
          : status === "success"
            ? "¡Registro enviado!"
            : "Quiero mi lugar en el encuentro →"}
      </button>

      {formError && (
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-sm text-destructive">
          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
          {formError}
        </p>
      )}

      <p
        className={cn(
          "mt-4 text-center text-xs leading-relaxed",
          tone === "dark" ? "text-forest-foreground/70" : "text-muted-foreground",
        )}
      >
        Te enviamos el acceso por WhatsApp. Tu información es privada.
      </p>
    </form>
  );
}
