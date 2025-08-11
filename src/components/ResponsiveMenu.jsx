import { useMenu } from "../contexts/MenuContext";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export function ResponsiveMenu() {
  const { isMenuOpen, closeMenu } = useMenu();
  const location = useLocation();

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  return (
    <div
      className={`fixed top-0 left-0 h-full w-2/3 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
    >
      <nav className="p-4">
        <ul className="space-y-4 text-lg text-[#4a4a4a]">
          <li>
            <Link to="/" onClick={closeMenu}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/reservas" onClick={closeMenu}>
              Mis reservas
            </Link>
          </li>
          <li>
            <Link to="/sobrenosotros" onClick={closeMenu}>
              Nosotros
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
