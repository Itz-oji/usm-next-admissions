import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto · USM Admisión Postgrado" },
      { name: "description", content: "Habla con el equipo de admisión USM. Resuelve dudas sobre programas, becas y postulación." },
      { property: "og:title", content: "Contacto USM Admisión" },
      { property: "og:description", content: "Estamos aquí para ayudarte con tu postulación." },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20 grid gap-14 lg:grid-cols-2">
      <div>
        <div className="text-xs uppercase tracking-wider text-primary font-medium">Contacto</div>
        <h1 className="mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">
          Hablemos de tu próximo paso.
        </h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Nuestro equipo de admisión te acompaña en todo el proceso. Te respondemos en menos de 24 horas hábiles.
        </p>

        <div className="mt-10 space-y-5">
          {[
            { icon: Mail, k: "Email", v: "admision.postgrado@usm.cl" },
            { icon: Phone, k: "Teléfono", v: "+56 32 265 4000" },
            { icon: MapPin, k: "Sedes", v: "Valparaíso · Santiago · Vitacura" },
          ].map((c) => (
            <div key={c.k} className="flex items-start gap-4">
              <div className="size-10 rounded-lg bg-primary-soft grid place-items-center shrink-0">
                <c.icon className="size-5 text-primary" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.k}</div>
                <div className="font-medium">{c.v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] h-fit"
      >
        {sent ? (
          <div className="py-16 text-center">
            <div className="text-2xl font-semibold">¡Gracias!</div>
            <p className="mt-2 text-muted-foreground">Te contactaremos en menos de 24 horas hábiles.</p>
          </div>
        ) : (
          <>
            <div className="text-xl font-semibold">Envíanos tu consulta</div>
            <div className="mt-6 grid gap-4">
              <Field label="Nombre" type="text" required />
              <Field label="Email" type="email" required />
              <Field label="Programa de interés" type="text" />
              <div>
                <label className="text-sm font-medium block mb-1.5">Mensaje</label>
                <textarea
                  required
                  rows={4}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <button className="mt-2 inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground shadow-[var(--shadow-glow)] hover:brightness-90 transition">
                Enviar consulta
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

function Field({ label, type, required }: { label: string; type: string; required?: boolean }) {
  return (
    <div>
      <label className="text-sm font-medium block mb-1.5">{label}</label>
      <input
        type={type}
        required={required}
        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}