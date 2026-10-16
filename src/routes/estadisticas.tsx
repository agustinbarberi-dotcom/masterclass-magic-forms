import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/estadisticas")({
  component: EstadisticasPage,
  head: () => ({
    meta: [{ title: "Estadísticas · Macasoul" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

type Fila = { nombre: string; visitas: number; optins: number; gracias: number };
type Datos = {
  desde: string | null;
  total: { visitas: number; optins: number; gracias: number; visitantes: number };
  porTipo: Fila[];
  porCanal: (Fila & { tipo: string })[];
  porAnuncio: Fila[];
  porDia: Fila[];
};

const pct = (a: number, b: number) => (b ? `${Math.round((a / b) * 100)}%` : "—");

function Tabla({ titulo, filas, nota }: { titulo: string; filas: Fila[]; nota?: string }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-forest">{titulo}</h2>
      {nota && <p className="mt-1 text-sm text-muted-foreground">{nota}</p>}
      {filas.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">Todavía no hay datos.</p>
      ) : (
        <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5">Origen</th>
                <th className="px-4 py-2.5 text-right">Visitas</th>
                <th className="px-4 py-2.5 text-right">Opt-in</th>
                <th className="px-4 py-2.5 text-right">Gracias</th>
                <th className="px-4 py-2.5 text-right">Conversión</th>
              </tr>
            </thead>
            <tbody>
              {filas.map((f) => (
                <tr key={f.nombre} className="border-t border-border">
                  <td className="px-4 py-2.5 font-medium">{f.nombre}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{f.visitas}</td>
                  <td className="px-4 py-2.5 text-right font-semibold tabular-nums">{f.optins}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{f.gracias}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{pct(f.optins, f.visitas)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function EstadisticasPage() {
  const [datos, setDatos] = useState<Datos | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const k = new URLSearchParams(window.location.search).get("k") ?? "";
    fetch(`/api/estadisticas?k=${encodeURIComponent(k)}`, { cache: "no-store" })
      .then(async (r) => {
        if (r.status === 401) throw new Error("Este link no es válido.");
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || "No se pudieron cargar los datos.");
        setDatos(j);
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  return (
    <div className="min-h-screen bg-background px-5 py-10 text-foreground">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow">Privado · Macasoul</p>
        <h1 className="mt-3 text-3xl font-black text-forest">Estadísticas de la landing</h1>
        {error && <p className="mt-6 text-destructive">{error}</p>}
        {!datos && !error && <p className="mt-6 text-muted-foreground">Cargando…</p>}
        {datos && (
          <>
            <p className="mt-2 text-sm text-muted-foreground">
              {datos.desde
                ? `Datos desde el ${new Date(datos.desde).toLocaleString("es-CO", { timeZone: "America/Bogota" })} (hora Colombia).`
                : "Todavía no hay datos."}{" "}
              Los registros del formulario instantáneo de Meta no pasan por la landing y no se cuentan acá.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Personas que entraron", datos.total.visitantes],
                ["Completaron el opt-in", datos.total.optins],
                ["Llegaron a gracias", datos.total.gracias],
                ["Conversión", pct(datos.total.optins, datos.total.visitantes)],
              ].map(([label, value]) => (
                <div key={label as string} className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="mt-1 text-3xl font-black text-forest tabular-nums">{value}</p>
                </div>
              ))}
            </div>
            <Tabla titulo="Anuncios vs. orgánico" filas={datos.porTipo} />
            <Tabla titulo="Por origen" filas={datos.porCanal} />
            <Tabla
              titulo="Por anuncio"
              filas={datos.porAnuncio}
              nota="Solo aparecen los anuncios que llevan los parámetros de URL de la campaña."
            />
            <Tabla titulo="Por día" filas={datos.porDia} />
          </>
        )}
      </div>
    </div>
  );
}
