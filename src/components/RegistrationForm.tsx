import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, MessageCircle, Loader2 } from "lucide-react";
import { COUNTRIES, WEBHOOK_URL, WHATSAPP_GROUP_URL } from "@/lib/event-config";
import { cn } from "@/lib/utils";

const schema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, { message: "Por favor escribe tu nombre." })
    .max(80, { message: "El nombre es demasiado largo." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Necesitamos tu email para enviarte el acceso." })
    .email({ message: "Revisa tu email: parece que falta algo." })
    .max(255, { message: "El email es demasiado largo." }),
  whatsapp: z
    .string()
    .trim()
    .min(8, { message: "Incluye tu WhatsApp con código de país (ej. +52 55 1234 5678)." })
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
      email: String(fd.get("email") ?? ""),
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

  if (status === "success") {
    return (
      <div
        id={id}
        className={cn(
          "rounded-2xl border p-7 text-center shadow-soft",
          tone === "dark"
            ? "border-gold/40 bg-forest-foreground/10"
            : "border-gold-soft bg-card",
        )}
      >
        <CheckCircle2 className="mx-auto h-9 w-9 text-gold" aria-hidden="true" />
        <h3
          className={cn(
            "mt-4 text-2xl",
            tone === "dark" ? "text-forest-foreground" : "text-forest",
          )}
        >
          ¡Listo! Tu lugar está reservado.
        </h3>
        <p
          className={cn(
            "mt-3 text-sm",
            tone === "dark" ? "text-forest-foreground/80" : "text-muted-foreground",
          )}
        >
          Revisa tu email y WhatsApp: te enviamos los detalles para conectarte el 20 de
          septiembre.
        </p>
        <a
          href={WHATSAPP_GROUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "mt-6 inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors",
            tone === "dark"
              ? "border-gold text-gold hover:bg-gold hover:text-gold-foreground"
              : "border-forest/30 text-forest hover:bg-forest hover:text-forest-foreground",
          )}
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Únete al grupo de WhatsApp
        </a>
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
            Nombre
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
          <label htmlFor={`${id}-email`} className={labelCls}>
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="tucorreo@ejemplo.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
            className={fieldCls}
          />
          {errors.email && (
            <p id={`${id}-email-error`} className="mt-1.5 text-sm text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${id}-whatsapp`} className={labelCls}>
            WhatsApp (con código de país)
          </label>
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
          {errors.whatsapp && (
            <p id={`${id}-whatsapp-error`} className="mt-1.5 text-sm text-destructive">
              {errors.whatsapp}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${id}-pais`} className={labelCls}>
            País (opcional)
          </label>
          <select id={`${id}-pais`} name="pais" defaultValue="" className={fieldCls}>
            <option value="">Selecciona tu país</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-4 text-base font-bold tracking-wide text-gold-foreground transition-transform hover:scale-[1.015] focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-70"
      >
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Quiero mi lugar gratis
      </button>

      {formError && <p className="mt-3 text-center text-sm text-destructive">{formError}</p>}

      <p
        className={cn(
          "mt-4 text-center text-xs leading-relaxed",
          tone === "dark" ? "text-forest-foreground/70" : "text-muted-foreground",
        )}
      >
        Cupos limitados · Clase 100% en vivo · Te enviamos el acceso por WhatsApp y email.
      </p>
    </form>
  );
}
