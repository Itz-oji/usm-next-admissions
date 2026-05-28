import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, CheckCircle2, Clock, GraduationCap, MapPin, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { programs, formatCLP } from "@/data/programs";

export const Route = createFileRoute("/programas/$slug")({
  loader: ({ params }) => {
    const p = programs.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return { p };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.p.name} · USM` },
          { name: "description", content: loaderData.p.shortDesc },
          { property: "og:title", content: `${loaderData.p.name} · USM` },
          { property: "og:description", content: loaderData.p.shortDesc },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl py-32 px-6 text-center">
      <h1 className="text-3xl font-semibold">Programa no encontrado</h1>
      <Link to="/programas" className="mt-6 inline-flex items-center gap-2 text-usm-red">
        <ArrowLeft className="size-4" /> Volver al catálogo
      </Link>
    </div>
  ),
  errorComponent: () => <div className="p-12 text-center">Error cargando el programa.</div>,
  component: ProgramDetail,
});

function ProgramDetail() {
  const { p } = Route.useLoaderData();

  return (
    <article>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <Link to="/programas" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Programas
          </Link>
          <div className="mt-6 grid lg:grid-cols-[1fr_360px] gap-10">
            <div>
              <div className="flex flex-wrap gap-2">
                <Pill>{p.level}</Pill>
                <Pill>{p.area}</Pill>
                <Pill>{p.modality}</Pill>
              </div>
              <h1 className="mt-5 text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05]">{p.name}</h1>
              <p className="mt-5 text-lg text-muted-foreground max-w-2xl">{p.description}</p>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
                <Stat icon={Clock} v={p.duration} l="Duración" />
                <Stat icon={MapPin} v={p.campus} l="Sede" />
                <Stat icon={ShieldCheck} v={p.accreditation.split("·")[0].trim()} l="Acreditación" />
                <Stat icon={TrendingUp} v={`${p.employability}%`} l="Empleabilidad" />
              </div>
            </div>

            {/* Sticky CTA */}
            <aside className="lg:sticky lg:top-24 h-fit rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-elevated)]">
              <div className="text-xs text-muted-foreground">Arancel total</div>
              <div className="text-3xl font-semibold text-foreground">{formatCLP(p.tuition)}</div>
              <div className="text-xs text-muted-foreground mt-1">Becas y financiamiento disponibles</div>
              <Link
                to="/programas/$slug"
                params={{ slug: p.slug }}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-usm-red px-5 py-3 text-sm font-medium text-white shadow-[var(--shadow-glow)] hover:brightness-110 transition"
              >
                Postula aquí
              </Link>
              <Link
                to="/becas"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium hover:bg-secondary transition"
              >
                Simular financiamiento
              </Link>
              <div className="mt-6 pt-5 border-t border-border space-y-2 text-sm">
                <Row icon={Clock} k="Horario" v={p.schedule} />
                <Row icon={GraduationCap} k="Inicio" v={p.dates[p.dates.length - 1]?.date ?? "Mar 2026"} />
                <Row icon={Users} k="Perfil" v="Profesionales" />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 grid gap-16">
        <Section title="Campo laboral">
          <div className="flex flex-wrap gap-2">
            {p.career.map((c) => (
              <span key={c} className="rounded-full bg-secondary px-4 py-2 text-sm">{c}</span>
            ))}
          </div>
        </Section>

        <Section title="Perfil de ingreso">
          <p className="text-muted-foreground text-lg leading-relaxed">{p.profile}</p>
        </Section>

        <Section title="Malla curricular">
          <div className="grid sm:grid-cols-2 gap-4">
            {p.curriculum.map((s) => (
              <div key={s.semester} className="rounded-xl border border-border p-5 bg-card">
                <div className="text-xs uppercase tracking-wider text-usm-red font-medium">{s.semester}</div>
                <ul className="mt-3 space-y-2">
                  {s.courses.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="size-4 text-usm-navy/60" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Requisitos">
          <ul className="grid sm:grid-cols-2 gap-3">
            {p.requirements.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="size-4 text-usm-red mt-0.5 shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Fechas importantes">
          <ol className="relative border-l border-border ml-2">
            {p.dates.map((d) => (
              <li key={d.label} className="mb-5 ml-6">
                <span className="absolute -left-1.5 mt-1.5 size-3 rounded-full bg-usm-red" />
                <div className="text-sm font-medium">{d.label}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="size-3" /> {d.date}
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Testimonio">
          <figure className="rounded-2xl bg-usm-navy text-white p-8 sm:p-10">
            <blockquote className="text-xl leading-relaxed">“{p.testimonial.quote}”</blockquote>
            <figcaption className="mt-4 text-sm text-white/70">
              <span className="text-white font-medium">{p.testimonial.name}</span> · {p.testimonial.role}
            </figcaption>
          </figure>
        </Section>

        <Section title="Preguntas frecuentes">
          <div className="divide-y divide-border border-y border-border">
            {p.faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-medium">
                  {f.q}
                  <span className="text-usm-red group-open:rotate-45 transition">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>
      </div>
    </article>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-border bg-card px-3 py-1 text-xs">{children}</span>;
}
function Stat({ icon: I, v, l }: { icon: React.ElementType; v: string; l: string }) {
  return (
    <div>
      <I className="size-4 text-usm-red" />
      <div className="mt-2 text-base font-semibold">{v}</div>
      <div className="text-xs text-muted-foreground">{l}</div>
    </div>
  );
}
function Row({ icon: I, k, v }: { icon: React.ElementType; k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-muted-foreground"><I className="size-3.5" />{k}</span>
      <span className="font-medium text-right">{v}</span>
    </div>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">{title}</h2>
      {children}
    </section>
  );
}