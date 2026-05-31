import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Search, Sparkles, ShieldCheck, Users, Award, Building2 } from "lucide-react";
import { programs } from "@/data/programs";
import { ProgramCard } from "@/components/site/ProgramCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "USM Admisión Postgrado · Magíster y Especializaciones" },
      { name: "description", content: "Postgrados, magísteres y diplomados de la Universidad Técnica Federico Santa María. Encuentra tu programa en segundos." },
      { property: "og:title", content: "USM Admisión Postgrado" },
      { property: "og:description", content: "Programas de postgrado con prestigio académico y foco profesional." },
    ],
  }),
  component: Home,
});

const quickFilters = ["Online", "Presencial", "Híbrido", "Vespertino", "Tecnología", "Negocios"];

function Home() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string | null>(null);

  const featured = useMemo(() => {
    return programs
      .filter((p) => {
        if (q && !`${p.name} ${p.area} ${p.shortDesc}`.toLowerCase().includes(q.toLowerCase())) return false;
        if (filter) {
          const f = filter.toLowerCase();
          return [p.modality, p.schedule, p.area].some((v) => v.toLowerCase().includes(f));
        }
        return true;
      })
      .slice(0, 6);
  }, [q, filter]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_top,oklch(0.95_0.04_260),transparent_60%)]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground shadow-[var(--shadow-card)]">
              <Sparkles className="size-3.5 text-usm-red" />
              Admisión 2026 abierta · más de 40 programas
            </div>
            <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.05]">
              Tu próximo paso académico,{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-usm-navy to-usm-red bg-clip-text text-transparent">
                  con claridad.
                </span>
              </span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
              Magísteres, diplomados y especializaciones de la USM. Simula
              tu inversión y postula en minutos — sin perderte entre páginas.
            </p>

            {/* Search */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl">
              <div className="flex-1 flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 shadow-[var(--shadow-card)] focus-within:ring-2 focus-within:ring-usm-red/30">
                <Search className="size-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Busca un magíster, área o palabra clave…"
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                  aria-label="Buscar programa"
                />
              </div>
              <Link
                to="/programas"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-usm-navy transition"
              >
                Ver todos los programas
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {quickFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(filter === f ? null : f)}
                  className={
                    "rounded-full border px-3 py-1.5 text-xs transition " +
                    (filter === f
                      ? "bg-usm-navy text-white border-usm-navy"
                      : "bg-card border-border text-muted-foreground hover:text-foreground")
                  }
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { icon: Award, n: "90+", l: "años de tradición" },
              { icon: ShieldCheck, n: "7 años", l: "acreditación institucional" },
              { icon: Users, n: "12.000+", l: "egresados de postgrado" },
              { icon: Building2, n: "3 sedes", l: "+ modalidad online" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur">
                <s.icon className="size-5 text-usm-red" />
                <div className="mt-3 text-2xl font-semibold">{s.n}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAMS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs uppercase tracking-wider text-usm-red font-medium">Programas destacados</div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
              Diseñados para profesionales que avanzan.
            </h2>
          </div>
          <Link to="/programas" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium hover:text-usm-red">
            Ver todos <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProgramCard key={p.slug} p={p} />
          ))}
        </div>
      </section>

      {/* WHY USM */}
      <section className="bg-usm-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,oklch(0.55_0.22_27/0.4),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-24 relative">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-usm-yellow font-medium">Por qué la USM</div>
            <h2 className="mt-2 text-3xl sm:text-5xl font-semibold tracking-tight">
              Rigor técnico. Visión global. Impacto profesional.
            </h2>
            <p className="mt-5 text-white/70 text-lg">
              Una de las universidades más prestigiosas de Chile, con foco en
              ingeniería, ciencia y negocios. Nuestros egresados lideran las
              transformaciones más importantes de la industria.
            </p>
          </div>

          <div className="mt-14 grid gap-px bg-white/10 md:grid-cols-3 rounded-2xl overflow-hidden">
            {[
              { t: "Acreditación máxima", d: "Programas acreditados por CNA, AMBA y partners internacionales." },
              { t: "Profesores referentes", d: "Investigadores activos y ejecutivos en empresas líderes." },
              { t: "Red profesional", d: "Más de 60.000 egresados USM en posiciones clave en LATAM." },
            ].map((c) => (
              <div key={c.t} className="bg-usm-navy p-8">
                <div className="text-lg font-semibold">{c.t}</div>
                <div className="mt-2 text-sm text-white/70">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-card to-secondary p-10 sm:p-16 text-center shadow-[var(--shadow-card)]">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight max-w-2xl mx-auto">
            Empieza tu postulación hoy.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Encuentra el programa adecuado y completa tu postulación en menos de 10 minutos.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/programas" className="inline-flex items-center gap-2 rounded-full bg-usm-red px-6 py-3 text-sm font-medium text-white shadow-[var(--shadow-glow)] hover:brightness-110 transition">
              Postula aquí <ArrowRight className="size-4" />
            </Link>
            <Link to="/becas" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium hover:bg-secondary transition">
              Simular financiamiento
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
