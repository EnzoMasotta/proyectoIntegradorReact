import React from "react";
import { useUser } from "../contexts/UserContext";
import Login from "./Login";

export const HeaderLogo = () => {
  const { user, logout } = useUser();

  return (
    <header
      className="w-full flex py-2 px-[5%] justify-between items-center bg-white 
    "
    >
      <h1 className="logo cursor-pointer  font-bold text-[#2d6a4f] text-2xl">
        nomada 360°
      </h1>

      <nav>
        {user ? (
          <>
            <span className="text-gray-700">Hola, {user.email}</span>
            <button onClick={logout} className="text-red-600">
              Cerrar sesión
            </button>
          </>
        ) : (
          <Login />
        )}
      </nav>
    </header>
  );
};
