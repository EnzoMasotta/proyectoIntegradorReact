import React from "react";
import navLinks from "../data/navLinks";

export const HeaderLogo = () => {
  return (
    <header
      className="w-full flex py-2 px-[5%] justify-between items-center bg-gray-400 text-white
    "
    >
      <h1 className="cursor-pointer font-bold text-2xl">Viajando Ando</h1>
      <ul className="flex items-center">
        {navLinks.map((link) => (
          <li key={link.id} className="px-2">
            <a href={link.href} className="">
              {link.name}
            </a>
          </li>
        ))}
      </ul>

      <p>Iniciar sesion</p>
    </header>
  );
};
