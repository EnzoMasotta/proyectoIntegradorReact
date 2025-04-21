import React from "react";

export const Header = () => {
  return (
    <header
      className="w-full flex py-6 px-[3%] justify-between bg-gray-900 text-white
    "
    >
      <h1>VIAJES LOCOS</h1>
      <ul>
        <li>
          <a href="">Viajes</a>
        </li>
      </ul>
      <p>Iniciar sesion</p>
    </header>
  );
};
