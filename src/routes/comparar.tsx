import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { programs, formatCLP } from "@/data/programs";

export const Route = createFileRoute("/comparar")({
  head: () => ({
    meta: [
      { title: "Comparar programas · USM Admisión" },
      { name: "description", content: "Compara magísteres y postgrados USM lado a lado: arancel, duración, modalidad y empleabilidad." },
      { property: "og:title", content: "Comparar programas USM" },
      { property: "og:description", content: "Decide con claridad. Compara hasta 3 programas en paralelo." },
    ],
  }),
  component: Compare,
});

function Compare() {
  const [selected, setSelected] = useState<string[]>([programs[0].slug, programs[1].slug]);

  const toggle = (slug: string) => {
    setSelected((s) =>
      s.includes(slug) ? s.filter((x) => x !== slug) : s.length < 3 ? [...s, slug] : s,
    );
  };

  const cols = programs.filter((p) => selected.includes(p.slug));

  const rows: { label: string; get: (p: typeof programs[number]) => React.ReactNode }[] = [
    { label: "Nivel", get: (p) => p.level },
    { label: "Área", get: (p) => p.area },
    { label: "Modalidad", get: (p) => p.modality },
    { label: "Duración", get: (p) => p.duration },
    { label: "Horario", get: (p) => p.schedule },
    { label: "Sede", get: (p) => p.campus },
    { label: "Acreditación", get: (p) => p.accreditation },
    { label: "Arancel", get: (p) => formatCLP(p.tuition) },
    { label: "Empleabilidad", get: (p) => `${p.employability}%` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
      <div className="max-w-3xl">
        <div className="text-xs uppercase tracking-wider text-usm-red font-medium">Comparador</div>
        <h1 className="mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">
          Compara hasta 3 programas.
        </h1>
        <p className="mt-3 text-muted-foreground text-lg">
          Visualiza diferencias clave para decidir con confianza.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {programs.map((p) => {
          const on = selected.includes(p.slug);
          const disabled = !on && selected.length >= 3;
          return (
            <button
              key={p.slug}
              onClick={() => toggle(p.slug)}
              disabled={disabled}
              className={
                "rounded-full border px-3 py-1.5 text-xs transition inline-flex items-center gap-1.5 " +
                (on
                  ? "bg-usm-navy text-white border-usm-navy"
                  : disabled
                  ? "opacity-40 border-border"
                  : "bg-card border-border hover:text-foreground text-muted-foreground")
              }
            >
              {on ? <Check className="size-3" /> : <X className="size-3" />} {p.name}
            </button>
          );
        })}
      </div>

      <div className="mt-10 overflow-x-auto">
        <div className="min-w-[700px] grid" style={{ gridTemplateColumns: `160px repeat(${cols.length}, minmax(0, 1fr))` }}>
          <div />
          {cols.map((p) => (
            <div key={p.slug} className="p-5 border-l border-border">
              <div className="text-[11px] uppercase tracking-wider text-usm-red font-medium">{p.level}</div>
              <div className="mt-1 font-semibold leading-snug">{p.name}</div>
              <Link to="/programas/$slug" params={{ slug: p.slug }} className="mt-3 inline-flex text-xs text-usm-red hover:underline">
                Ver detalle →
              </Link>
            </div>
          ))}
          {rows.map((r, i) => (
            <div key={r.label} className="contents">
              <div className={"p-4 text-sm text-muted-foreground border-t border-border " + (i === 0 ? "border-t-0" : "")}>
                {r.label}
              </div>
              {cols.map((p) => (
                <div key={p.slug} className={"p-4 text-sm border-t border-l border-border " + (i === 0 ? "border-t-0" : "")}>
                  {r.get(p)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {cols.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
          Selecciona al menos un programa para comparar.
        </div>
      )}
    </div>
  );
}