import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="size-9 rounded-lg bg-usm-navy text-white grid place-items-center">
              <GraduationCap className="size-5" />
            </div>
            <div className="leading-tight">
              <div className="font-semibold">Universidad Técnica Federico Santa María</div>
              <div className="text-xs text-muted-foreground">Admisión Postgrado · Magíster · Especializaciones</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Más de 90 años formando profesionales que transforman la industria, la ciencia y la sociedad.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Explorar</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/programas" className="hover:text-foreground">Programas</Link></li>
            <li><Link to="/comparar" className="hover:text-foreground">Comparar</Link></li>
            <li><Link to="/becas" className="hover:text-foreground">Becas</Link></li>
            <li><Link to="/fechas" className="hover:text-foreground">Fechas</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Contacto</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>admision.postgrado@usm.cl</li>
            <li>+56 32 265 4000</li>
            <li>Valparaíso · Santiago · Online</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} USM. Todos los derechos reservados.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Privacidad</a>
            <a href="#" className="hover:text-foreground">Términos</a>
            <a href="#" className="hover:text-foreground">Accesibilidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}