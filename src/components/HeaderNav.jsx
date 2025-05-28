import React from "react";
import { navLinks } from "../data/navLinks";
import { Link } from "react-router-dom";

export function HeaderNav() {
  return (
    <div className="relative">
      <nav className="w-full items-center py-2 px-[3%] md:px-[15%] block overflow-x-auto">
        <ul className="flex items-center whitespace-nowrap">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.id} className="px-3">
                <Link
                  to={link.href}
                  className="flex flex-col items-center justify-center gap-2 text-[#4a4a4a] hover:text-gray-400 text-sm font-extralight md:px-2"
                >
                  <Icon size={20} />
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent md:hidden" />
    </div>
  );
}
