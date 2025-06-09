import React from "react";
import { navLinks } from "../data/navLinks";
import { Link, NavLink } from "react-router-dom";

export function HeaderNav() {
  return (
    <div className="relative">
      <nav className="w-full items-center pt-3 px-[3%] md:px-[15%] block overflow-x-auto ">
        <ul className="flex items-center whitespace-nowrap">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.id} className="px-3">
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `flex flex-col items-center text-[#4a4a4a] justify-center gap-1 text-sm font-extralight border-b-3 md:px-2 ${
                      isActive
                        ? "text-[#AD6771] border-[#AD6771]"
                        : "border-transparent"
                    }`
                  }
                >
                  <Icon size={20} />
                  {link.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent md:hidden" />
    </div>
  );
}
