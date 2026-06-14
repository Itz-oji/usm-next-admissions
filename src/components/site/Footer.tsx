import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-white/10 bg-footer-blue text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="flex items-center gap-2 mb-4">
          <img src="/sello-acreditacion-2028.png" alt="USM" className="h-68 sm:h-76 md:h-84 w-auto"/>
        </div>
        <div className="col-2">
          <div className="text-white text-2xl font-bold mb-4">Explorar</div>
          <ul className="space-y-2 text-white/70 text-sm">
            <li><Link to="/programas" className="hover:text-secondary transition-colors">Programas</Link></li>
            <li><Link to="/becas" className="hover:text-secondary transition-colors">Becas</Link></li>
            <li><Link to="/fechas" className="hover:text-secondary transition-colors">Fechas</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-white text-2xl font-bold mb-4">Contacto</div>
          <ul className="space-y-2 text-white/70 text-sm">
            <li>admision.postgrado@usm.cl</li>
            <li>+56 32 265 4000</li>
            <li>Valparaíso · Santiago · Online</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-white/50">
          <div>© {new Date().getFullYear()} USM. Todos los derechos reservados.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Accesibilidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}