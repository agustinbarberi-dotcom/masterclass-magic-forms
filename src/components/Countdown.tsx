import { useEffect, useState } from "react";
import { EVENT_DATE_ISO } from "@/lib/event-config";

function diff(target: number) {
  const total = Math.max(0, target - Date.now());
  return {
    total,
    horas: Math.floor(total / 3600000),
    minutos: Math.floor((total / 60000) % 60),
    segundos: Math.floor((total / 1000) % 60),
  };
}

export function Countdown({ size = "lg" }: { size?: "lg" | "sm" }) {
  const target = new Date(EVENT_DATE_ISO).getTime();
  const [t, setT] = useState(() => diff(target));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const items = [
    { label: "horas", value: t.horas },
    { label: "min", value: t.minutos },
    { label: "seg", value: t.segundos },
  ];

  if (size === "sm") {
    return (
      <span
        aria-live="off"
        className="font-sans text-xs tracking-[0.18em] text-muted-foreground uppercase"
      >
        {mounted
          ? `Faltan ${String(t.horas).padStart(2, "0")}h ${String(t.minutos).padStart(2, "0")}m`
          : "18 de octubre"}
      </span>
    );
  }

  return (
    <div
      className="flex items-stretch justify-center gap-2 sm:gap-3"
      role="timer"
      aria-label="Tiempo restante para la clase magistral"
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="min-w-[68px] flex-1 rounded-xl border border-gold-soft/60 bg-card/80 px-2 py-3 text-center shadow-soft backdrop-blur-sm sm:min-w-[84px] sm:py-4"
        >
          <div className="font-serif text-3xl leading-none tabular-nums text-forest sm:text-5xl">
            {mounted ? String(item.value).padStart(2, "0") : "--"}
          </div>
          <div className="mt-2 text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase sm:text-[0.68rem]">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
