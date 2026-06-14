import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/fechas")({
  head: () => ({
    meta: [
      { title: "Fechas importantes · Admisión USM Postgrado" },
      { name: "description", content: "Calendario completo del proceso de admisión 2026: postulación, entrevistas, resultados y matrícula." },
      { property: "og:title", content: "Fechas importantes USM" },
      { property: "og:description", content: "Todas las fechas clave del proceso de admisión 2026." },
    ],
  }),
  component: Fechas,
});

const milestones = [
  { date: "01 Sep 2026", title: "Apertura de postulaciones", desc: "Comienza el periodo oficial para todos los programas de magíster y postgrado." },
  { date: "01 - 30 Nov 2026", title: "Entrevistas y evaluación", desc: "Coordinación de entrevistas con coordinadores académicos." },
  { date: "15 Dic 2026", title: "Cierre de postulaciones", desc: "Última fecha para enviar antecedentes y documentación." },
  { date: "08 Ene 2027", title: "Publicación de resultados", desc: "Recibe respuesta oficial y carta de admisión." },
  { date: "10 - 30 Ene 2027", title: "Matrícula", desc: "Formaliza tu cupo y accede a opciones de financiamiento." },
  { date: "10 Mar 2027", title: "Inicio de clases", desc: "Comienza tu programa con la jornada de bienvenida USM." },
];

function Fechas() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20">
      <div className="text-xs uppercase tracking-wider text-usm-red font-medium">Calendario 2026</div>
      <h1 className="mt-2 text-4xl sm:text-6xl font-semibold tracking-tight">Fechas importantes</h1>
      <p className="mt-4 text-muted-foreground text-lg max-w-2xl">
        Todo el proceso de admisión a la vista, en una sola línea de tiempo.
      </p>

      <ol className="relative mt-14 border-l-2 border-border ml-3">
        {milestones.map((m, i) => (
          <li key={m.title} className="mb-12 ml-8 last:mb-0">
            <span className="absolute -left-[11px] mt-1 size-5 rounded-full bg-usm-red ring-4 ring-background grid place-items-center">
              <CheckCircle2 className="size-3 text-white" />
            </span>
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-usm-red">
                <Calendar className="size-3" /> {m.date}
              </span>
              <span className="text-xs text-muted-foreground">Etapa {String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-2 text-2xl font-semibold">{m.title}</h3>
            <p className="mt-2 text-muted-foreground max-w-xl">{m.desc}</p>
          </li>
        ))}
      </ol>

      <div className="mt-16 rounded-2xl bg-secondary border border-border p-8 sm:p-10 flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="font-semibold text-lg">¿Listo para postular?</div>
          <div className="text-sm text-muted-foreground">Las postulaciones cierran el 15 de diciembre.</div>
        </div>
        <Link to="/programas" className="inline-flex items-center gap-2 rounded-full bg-usm-red px-6 py-3 text-sm font-medium text-white shadow-[var(--shadow-glow)] hover:brightness-110 transition">
          Postula aquí
        </Link>
      </div>
    </div>
  );
}