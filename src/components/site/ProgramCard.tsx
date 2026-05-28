import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, MapPin, ShieldCheck, TrendingUp } from "lucide-react";
import { type Program, formatCLP } from "@/data/programs";

export function ProgramCard({ p }: { p: Program }) {
  return (
    <Link
      to="/programas/$slug"
      params={{ slug: p.slug }}
      className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:-translate-y-0.5 transition-all"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[11px] font-medium uppercase tracking-wider text-usm-red">{p.level}</span>
        <span className="text-muted-foreground/40">·</span>
        <span className="text-[11px] text-muted-foreground">{p.area}</span>
      </div>
      <h3 className="text-lg font-semibold leading-snug text-foreground group-hover:text-usm-navy transition-colors">
        {p.name}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.shortDesc}</p>

      <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
        <Meta icon={Clock} label={p.duration} />
        <Meta icon={MapPin} label={p.modality} />
        <Meta icon={ShieldCheck} label={p.accreditation.split("·")[0].trim()} />
        <Meta icon={TrendingUp} label={`${p.employability}% empleabilidad`} />
      </div>

      <div className="mt-6 pt-5 border-t border-border flex items-end justify-between">
        <div>
          <div className="text-[11px] text-muted-foreground">Arancel total</div>
          <div className="text-base font-semibold text-foreground">{formatCLP(p.tuition)}</div>
        </div>
        <div className="size-9 grid place-items-center rounded-full bg-foreground text-background group-hover:bg-usm-red transition-colors">
          <ArrowUpRight className="size-4" />
        </div>
      </div>
    </Link>
  );
}

function Meta({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <Icon className="size-3.5 shrink-0" />
      <span className="truncate">{label}</span>
    </div>
  );
}