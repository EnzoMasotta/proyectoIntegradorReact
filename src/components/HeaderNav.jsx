import React from "react";
import navLinks from "../data/navLinks";
import { Link } from "react-router-dom";

export function HeaderNav() {
  return (
    <nav className="w-full items-center py-2 bg-amber-200">
      <ul className="flex items-center justify-center">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.id} className="px-3">
              <Link
                to={link.href}
                className="flex flex-col items-center justify-center gap-2 px-3 hover:text-white text-sm"
              >
                <Icon size={20} />
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
