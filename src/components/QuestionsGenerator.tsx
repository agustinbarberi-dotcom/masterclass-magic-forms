import { useRef, useState } from "react";

export function QuestionsGenerator() {
  const [texto, setTexto] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  async function generar(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setError("");
    setResult("");
    setLoading(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const res = await fetch("/api/preguntas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) {
        setError((await res.text()) || "No pudimos generar tus preguntas.");
        return;
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        setResult((r) => r + dec.decode(value, { stream: true }));
      }
    } catch (err) {
      if (!(err instanceof DOMException && err.name === "AbortError"))
        setError("No pudimos generar tus preguntas. Intenta nuevamente.");
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }

  const preguntas = result
    .split("\n")
    .map((l) => l.replace(/^\s*\d+[.)]\s*/, "").trim())
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-2xl text-center">
      <form onSubmit={generar} className="space-y-4">
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows={5}
          maxLength={2000}
          placeholder="Ej: Tengo 47 años, me siento inflamada, duermo mal y quiero entender qué pasa con mis hormonas en la perimenopausia…"
          className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-left text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="flex justify-center gap-3">
          <button
            type="submit"
            disabled={loading || texto.trim().length < 10}
            className="rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Preparando tus preguntas…" : "Crear mis preguntas"}
          </button>
          {loading && (
            <button
              type="button"
              onClick={() => abortRef.current?.abort()}
              className="rounded-full border border-border px-6 py-4 text-sm font-semibold text-foreground"
            >
              Detener
            </button>
          )}
        </div>
      </form>

      {error && <p className="mt-6 text-sm text-destructive">{error}</p>}

      {preguntas.length > 0 && (
        <ol className="mt-10 space-y-3 text-left">
          {preguntas.map((p, i) => (
            <li key={i} className="flex gap-4 rounded-2xl border border-border/60 bg-background/70 px-5 py-4">
              <span className="font-display text-xl font-bold text-primary">{i + 1}</span>
              <span className="text-foreground">{p}</span>
            </li>
          ))}
        </ol>
      )}
      {!loading && preguntas.length > 0 && (
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(preguntas.map((p, i) => `${i + 1}. ${p}`).join("\n"))}
          className="mt-6 text-sm font-semibold text-primary underline underline-offset-4"
        >
          Copiar mis preguntas
        </button>
      )}
    </div>
  );
}
