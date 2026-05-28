import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { programs } from "@/data/programs";
import { ProgramCard } from "@/components/site/ProgramCard";

export const Route = createFileRoute("/programas/")({
  head: () => ({
    meta: [
      { title: "Programas de Postgrado · USM" },
      { name: "description", content: "Explora magísteres, diplomados y especializaciones USM. Filtra por modalidad, área y duración." },
      { property: "og:title", content: "Programas de Postgrado USM" },
      { property: "og:description", content: "Encuentra el programa ideal para tu próximo paso profesional." },
    ],
  }),
  component: ProgramsPage,
});

const levels = ["Todos", "Magíster", "Postgrado", "Especialización", "Continuidad"];
const modalities = ["Todas", "Presencial", "Online", "Híbrido"];
const areas = ["Todas", "Ingeniería", "Negocios", "Tecnología", "Ciencias", "Industrial"];

function ProgramsPage() {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState("Todos");
  const [modality, setModality] = useState("Todas");
  const [area, setArea] = useState("Todas");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      if (q && !`${p.name} ${p.shortDesc} ${p.area}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (level !== "Todos" && p.level !== level) return false;
      if (modality !== "Todas" && p.modality !== modality) return false;
      if (area !== "Todas" && p.area !== area) return false;
      return true;
    });
  }, [q, level, modality, area]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
      <div className="max-w-3xl">
        <div className="text-xs uppercase tracking-wider text-usm-red font-medium">Catálogo 2026</div>
        <h1 className="mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">Programas USM</h1>
        <p className="mt-3 text-muted-foreground text-lg">
          {filtered.length} programas disponibles. Filtra y encuentra el tuyo.
        </p>
      </div>

      {/* Search bar */}
      <div className="mt-8 sticky top-20 z-30 -mx-2 px-2">
        <div className="rounded-2xl border border-border bg-card/90 backdrop-blur p-3 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-3 rounded-xl bg-secondary/60 px-4 py-2.5">
              <Search className="size-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar programa…"
                className="flex-1 bg-transparent outline-none text-sm"
                aria-label="Buscar programa"
              />
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm"
              aria-expanded={open}
            >
              <SlidersHorizontal className="size-4" /> Filtros
            </button>
          </div>

          <div className={(open ? "grid" : "hidden") + " md:grid mt-3 gap-3 md:grid-cols-3"}>
            <FilterGroup label="Nivel" value={level} setValue={setLevel} options={levels} />
            <FilterGroup label="Modalidad" value={modality} setValue={setModality} options={modalities} />
            <FilterGroup label="Área" value={area} setValue={setArea} options={areas} />
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProgramCard key={p.slug} p={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center text-muted-foreground">
          No encontramos programas con esos filtros. Intenta ajustar tu búsqueda.
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  value,
  setValue,
  options,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 px-1">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => setValue(o)}
            className={
              "rounded-full px-3 py-1.5 text-xs transition border " +
              (value === o
                ? "bg-usm-navy text-white border-usm-navy"
                : "bg-card border-border text-muted-foreground hover:text-foreground")
            }
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}