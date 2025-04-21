import React from "react";
import navLinks from "../data/navLinks";

export const Header = () => {
  return (
    <header
      className="w-full flex py-6 px-[3%] justify-between bg-gray-900 text-white
    "
    >
      <h1>VIAJES LOCOS</h1>
      <ul className="flex gap-4">
        {navLinks.map((link) => (
          <li key={link.id}>
            <a href={link.href} className="text-blue-600 hover:underline">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
      <p>Iniciar sesion</p>
    </header>
  );
};
