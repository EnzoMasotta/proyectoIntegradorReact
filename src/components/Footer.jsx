import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="text-[#ffffff] bg-[#2d6a4f]">
      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
        {/* Logo y descripción */}
        <div className="flex-1 min-w-[200px]">
          <h1 className="logo cursor-pointer font-extrabold text-[#ffffff] text-2xl">
            katafly
          </h1>
          <p className="text-sm mt-3 leading-relaxed text-[#ffffff]/90">
            Creamos experiencias de viaje únicas, ofreciendo paquetes turísticos
            a destinos soñados, con la mejor calidad, comodidad y atención para
            que disfrutes cada momento.
          </p>
        </div>

        {/* Navegación */}
        <div className="flex-1 min-w-[150px]">
          <h3 className="text-[#ffffff] text-lg font-semibold mb-3">Enlaces</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/reservas"
                className="hover:text-[#ad6771] transition-colors"
              >
                Mis reservas
              </Link>
            </li>
            <li>
              <Link
                to="/sobrenosotros"
                className="hover:text-[#ad6771] transition-colors"
              >
                Nosotros
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-[#ffffff] text-lg font-semibold mb-3">
            Contacto
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={18} className="text-[#f0e6d2]" />
              Calle Falsa 123, Ciudad, País
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-[#f0e6d2]" />
              +54 9 11 1234 5678
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-[#f0e6d2]" />
              contacto@katafly.com
            </li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-[#ffffff] text-lg font-semibold mb-3">
            Seguinos en las redes
          </h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#ad6771] transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-[#ad6771] transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-[#ad6771] transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div
        className="text-center py-4 text-sm"
        style={{ backgroundColor: "#2a5732", color: "#ffffff" }}
      >
        © {new Date().getFullYear()} Katafly. Todos los derechos reservados.
      </div>
    </footer>
  );
}
