"use client";

import * as React from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, CheckCircle2, Clock, GraduationCap, MapPin, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { programs, formatCLP, type Program } from "@/data/programs";

export const Route = createFileRoute("/programas/$slug")({
  loader: ({ params }): { p: Program } => {
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

type ApplicationFormValues = {
  program: string;
  fullName: string;
  email: string;
  phone: string;
  degree: string;
  motivation: string;
};

function ProgramDetail() {
  const { p } = Route.useLoaderData() as { p: Program };
  const [open, setOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const form = useForm<ApplicationFormValues>({
    defaultValues: {
      program: p.name,
      fullName: "",
      email: "",
      phone: "",
      degree: "Pregrado",
      motivation: "",
    },
  });

  const onSubmit = (values: ApplicationFormValues) => {
    console.log("Solicitud de postulación:", values);
    setSubmitted(true);
  };

  React.useEffect(() => {
    if (!open) {
      setSubmitted(false);
      form.reset({
        program: p.name,
        fullName: "",
        email: "",
        phone: "",
        degree: "Pregrado",
        motivation: "",
      });
    }
  }, [open, p.name, form]);

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
              <div className="text-sm text-muted-foreground">Arancel total</div>
              <div className="mt-1 text-4xl font-bold text-foreground">{formatCLP(p.tuition)}</div>
              <div className="my-5 border-t border-border" />
              <div className="flex items-center gap-2 text-base">
                <span className="font-medium text-foreground">
                  Matrícula:
                </span>
                <span className="text-muted-foreground">
                  {formatCLP(p.matricula)}
                </span>
              </div>
              <Link to="/becas" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-800 hover:underline">Becas y financiamiento disponibles<span>→</span></Link>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-usm-red px-5 py-3 text-sm font-medium text-white shadow-[var(--shadow-glow)] hover:brightness-110 transition"
                  >
                    Postula aquí
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Postulación a {p.name}</DialogTitle>
                    <DialogDescription>Completa estos datos para iniciar tu postulación al programa.</DialogDescription>
                  </DialogHeader>

                  {submitted ? (
                    <div className="space-y-6 pt-4">
                      <div className="rounded-2xl border border-border bg-secondary/10 p-5 text-sm text-muted-foreground">
                        ¡Gracias! Hemos recibido tu solicitud de postulación. Nuestro equipo de admisión te contactará pronto.
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="inline-flex h-10 items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
                        >
                          Cerrar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-4">
                      <input type="hidden" value={p.name} {...form.register("program")} />

                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="fullName">Nombre completo</Label>
                          <Input
                            id="fullName"
                            placeholder="Nombre completo"
                            {...form.register("fullName", { required: "Este campo es obligatorio" })}
                          />
                          {form.formState.errors.fullName && (
                            <p className="mt-1 text-sm text-destructive">{form.formState.errors.fullName.message}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="correo@ejemplo.com"
                            {...form.register("email", {
                              required: "Este campo es obligatorio",
                              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Ingresa un email válido" },
                            })}
                          />
                          {form.formState.errors.email && (
                            <p className="mt-1 text-sm text-destructive">{form.formState.errors.email.message}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="phone">Teléfono</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+56 9 1234 5678"
                            {...form.register("phone", { required: "Este campo es obligatorio" })}
                          />
                          {form.formState.errors.phone && (
                            <p className="mt-1 text-sm text-destructive">{form.formState.errors.phone.message}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="degree">Grado académico</Label>
                          <Input
                            id="degree"
                            placeholder="Pregrado, Titulado, Especialista, etc."
                            {...form.register("degree", { required: "Este campo es obligatorio" })}
                          />
                          {form.formState.errors.degree && (
                            <p className="mt-1 text-sm text-destructive">{form.formState.errors.degree.message}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="motivation">¿Por qué quieres postular?</Label>
                          <Textarea
                            id="motivation"
                            placeholder="Cuéntanos brevemente tu interés y objetivos"
                            {...form.register("motivation", { required: "Este campo es obligatorio" })}
                          />
                          {form.formState.errors.motivation && (
                            <p className="mt-1 text-sm text-destructive">{form.formState.errors.motivation.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                        <DialogClose asChild>
                          <button
                            type="button"
                            className="inline-flex h-10 items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
                          >
                            Cancelar
                          </button>
                        </DialogClose>
                        <button
                          type="submit"
                          className="inline-flex h-10 items-center justify-center rounded-md bg-usm-red px-4 py-2 text-sm font-medium text-white hover:brightness-110"
                        >
                          Enviar postulación
                        </button>
                      </div>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
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