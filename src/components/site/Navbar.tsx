import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/programas", label: "Programas" },
  { to: "/comparar", label: "Comparar" },
  { to: "/becas", label: "Becas y financiamiento" },
  { to: "/fechas", label: "Fechas importantes" },
  { to: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60 py-2"
          : "bg-transparent py-4",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 group" aria-label="USM Admisión Inicio">
          <div className="size-9 rounded-lg bg-usm-navy text-white grid place-items-center shadow-[var(--shadow-card)]">
            <GraduationCap className="size-5" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-foreground">USM</div>
            <div className="text-[11px] text-muted-foreground -mt-0.5">Admisión Postgrado</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "px-3 py-2 rounded-md text-sm transition-colors",
                  active
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/programas"
            className="hidden sm:inline-flex h-9 items-center justify-center rounded-full bg-usm-red px-4 text-sm font-medium text-white shadow-[var(--shadow-glow)] hover:brightness-110 transition"
          >
            Postula aquí
          </Link>
          <button
            className="lg:hidden size-9 grid place-items-center rounded-md hover:bg-muted"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
          <nav className="px-4 py-3 flex flex-col">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="py-3 text-sm text-foreground border-b border-border/40 last:border-0"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/programas"
              className="mt-3 inline-flex h-10 items-center justify-center rounded-full bg-usm-red px-4 text-sm font-medium text-white"
            >
              Postula aquí
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}