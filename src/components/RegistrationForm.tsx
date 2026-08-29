import { useState } from "react";
import { z } from "zod";
import { Sparkles, MessageCircle, Loader2, AlertTriangle } from "lucide-react";
import { COUNTRIES, WEBHOOK_URL, WHATSAPP_GROUP_URL } from "@/lib/event-config";
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
    .min(8, { message: "Tu número necesita más dígitos (mínimo 8, con código de país)." })
    .max(25, { message: "El número es demasiado largo." })
    .regex(/^\+?[0-9\s()-]{8,25}$/, {
      message: "Usa solo números y el código de país (ej. +57 300 123 4567).",
    }),
  pais: z.string().trim().max(60).optional(),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

export function RegistrationForm({ id, tone = "light" }: { id: string; tone?: "light" | "dark" }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [formError, setFormError] = useState<string | null>(null);

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
    const fd = new FormData(e.currentTarget);
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
    try {
      if (WEBHOOK_URL.startsWith("http")) {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...parsed.data,
            evento: "Clase magistral en vivo · 20 de septiembre de 2026",
            origen: typeof window !== "undefined" ? window.location.href : "",
          }),
        });
      }
      setStatus("success");
    } catch {
      setStatus("idle");
      setFormError("No pudimos enviar tu registro. Intenta de nuevo en unos segundos.");
    }
  }

  // PÁGINA DE GRACIAS — reemplaza toda la pantalla tras el registro
  if (status === "success") {
    return (
      <div
        id={id}
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-background px-5 py-20"
      >
        <div className="mx-auto w-full max-w-xl text-center">
          <Sparkles className="mx-auto h-9 w-9 text-gold" aria-hidden="true" />
          <h1 className="mt-8 font-serif text-3xl font-black leading-[1.05] tracking-tight text-forest sm:text-[2.6rem]">
            ¡Ya estás adentro. Solo falta un paso.
          </h1>

          <p className="mt-8 text-[0.72rem] font-semibold tracking-[0.2em] text-gold uppercase">
            Tu registro: 80% completado
          </p>
          <div
            className="mx-auto mt-3 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-secondary"
            role="progressbar"
            aria-valuenow={80}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="h-full w-[80%] rounded-full bg-gradient-gold" />
          </div>

          <p className="mx-auto mt-8 max-w-md text-base text-muted-foreground">
            El acceso, los recordatorios y el material exclusivo llegan por WhatsApp. Únete al grupo
            ahora para no perderte nada.
          </p>

          <a
            href={WHATSAPP_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-forest px-7 py-4 text-sm font-bold tracking-wide text-forest-foreground shadow-soft transition-transform hover:scale-[1.02]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Unirme al grupo de WhatsApp →
          </a>

          <p className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <AlertTriangle className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            Si no lo haces ahora, podrías quedarte sin el acceso y los materiales.
          </p>
        </div>
      </div>
    );
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
          <div className="flex gap-2">
            <select
              id={`${id}-pais`}
              name="pais"
              defaultValue="Colombia"
              aria-label="País"
              className={cn(fieldCls, "w-[38%] shrink-0 px-3")}
            >
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              id={`${id}-whatsapp`}
              name="whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+57 300 123 4567"
              aria-invalid={!!errors.whatsapp}
              aria-describedby={errors.whatsapp ? `${id}-whatsapp-error` : undefined}
              className={fieldCls}
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
        disabled={status === "loading"}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-4 text-sm font-bold tracking-[0.08em] text-gold-foreground uppercase transition-transform hover:scale-[1.015] focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-70"
      >
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {status === "loading" ? "Enviando..." : "Quiero mi lugar en el encuentro →"}
      </button>

      {formError && <p className="mt-3 text-center text-sm text-destructive">{formError}</p>}

      <p
        className={cn(
          "mt-4 text-center text-xs leading-relaxed",
          tone === "dark" ? "text-forest-foreground/70" : "text-muted-foreground",
        )}
      >
        Tu información es privada. Solo la usamos para enviarte el acceso.
      </p>
    </form>
  );
}
