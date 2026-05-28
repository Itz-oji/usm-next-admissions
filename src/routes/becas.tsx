import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Banknote, Briefcase, GraduationCap, HeartHandshake, Trophy } from "lucide-react";
import { formatCLP } from "@/data/programs";

export const Route = createFileRoute("/becas")({
  head: () => ({
    meta: [
      { title: "Becas y financiamiento · USM Postgrado" },
      { name: "description", content: "Becas, descuentos y financiamiento para tu postgrado en la USM. Simula tu inversión en segundos." },
      { property: "og:title", content: "Becas y financiamiento USM" },
      { property: "og:description", content: "Hasta 50% de beca según mérito. Convenios con empresas y financiamiento flexible." },
    ],
  }),
  component: Becas,
});

const scholarships = [
  { icon: Trophy, name: "Beca Excelencia Académica", pct: "Hasta 50%", desc: "Para los mejores puntajes de admisión." },
  { icon: HeartHandshake, name: "Beca Alumni USM", pct: "20%", desc: "Para egresados de pregrado USM." },
  { icon: Briefcase, name: "Convenio Empresa", pct: "15 - 30%", desc: "Para profesionales de empresas con convenio." },
  { icon: GraduationCap, name: "Beca Vocación", pct: "25%", desc: "Para áreas estratégicas: IA, energía, ciberseguridad." },
];

export default function Becas() { return <Page />; }
function Page() {
  const [tuition, setTuition] = useState(9800000);
  const [discount, setDiscount] = useState(20);
  const [months, setMonths] = useState(24);

  const result = useMemo(() => {
    const finalT = tuition * (1 - discount / 100);
    return { finalT, monthly: finalT / months, saved: tuition - finalT };
  }, [tuition, discount, months]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
      <div className="max-w-3xl">
        <div className="text-xs uppercase tracking-wider text-usm-red font-medium">Inversión</div>
        <h1 className="mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">
          Becas, descuentos y financiamiento.
        </h1>
        <p className="mt-3 text-muted-foreground text-lg">
          Diseñamos opciones para que el costo nunca sea una barrera para tu desarrollo.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_420px]">
        {/* Scholarships */}
        <div className="grid gap-4 sm:grid-cols-2">
          {scholarships.map((s) => (
            <div key={s.name} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between">
                <div className="size-10 rounded-lg bg-primary-soft grid place-items-center">
                  <s.icon className="size-5 text-usm-navy" />
                </div>
                <span className="text-sm font-semibold text-usm-red">{s.pct}</span>
              </div>
              <div className="mt-4 font-semibold">{s.name}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Calculator */}
        <div className="rounded-3xl bg-usm-navy text-white p-8 shadow-[var(--shadow-elevated)] h-fit lg:sticky lg:top-24">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-usm-yellow">
            <Banknote className="size-4" /> Simulador
          </div>
          <h2 className="mt-2 text-2xl font-semibold">Calcula tu inversión</h2>

          <div className="mt-6 space-y-5">
            <Slider label="Arancel total" value={tuition} min={2000000} max={20000000} step={100000} onChange={setTuition} display={formatCLP(tuition)} />
            <Slider label="Descuento o beca" value={discount} min={0} max={50} step={5} onChange={setDiscount} display={`${discount}%`} />
            <Slider label="Cuotas" value={months} min={6} max={48} step={6} onChange={setMonths} display={`${months} meses`} />
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 grid gap-3 text-sm">
            <Row k="Total con beca" v={formatCLP(result.finalT)} bold />
            <Row k="Ahorro" v={formatCLP(result.saved)} accent />
            <Row k="Cuota mensual" v={formatCLP(result.monthly)} bold />
          </div>

          <Link to="/contacto" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-usm-red px-5 py-3 text-sm font-medium hover:brightness-110 transition">
            Hablar con admisión
          </Link>
        </div>
      </div>

      {/* Timeline pago */}
      <section className="mt-20">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Cómo funciona el pago</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-4">
          {[
            { n: "01", t: "Matrícula", d: "Pago inicial al confirmar tu cupo." },
            { n: "02", t: "Arancel anual", d: "Distribuido en cuotas mensuales sin interés." },
            { n: "03", t: "Becas aplicadas", d: "Descuentos automáticos en cada cuota." },
            { n: "04", t: "Comprobante", d: "Acceso digital a tu estado de cuenta 24/7." },
          ].map((s) => (
            <div key={s.n} className="rounded-xl border border-border p-6 bg-card">
              <div className="text-xs text-usm-red font-mono">{s.n}</div>
              <div className="mt-2 font-semibold">{s.t}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.d}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Slider({
  label, value, min, max, step, onChange, display,
}: { label: string; value: number; min: number; max: number; step: number; onChange: (n: number) => void; display: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/70">{label}</span>
        <span className="font-semibold">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-usm-red"
        aria-label={label}
      />
    </div>
  );
}

function Row({ k, v, bold, accent }: { k: string; v: string; bold?: boolean; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/60">{k}</span>
      <span className={(bold ? "font-semibold " : "") + (accent ? "text-usm-yellow" : "text-white")}>{v}</span>
    </div>
  );
}