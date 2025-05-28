import React from "react";
import { User } from "./User";
import { Link } from "react-router-dom";
import { MenuButton } from "./MenuButton";
import { ResponsiveMenu } from "./ResponsiveMenu";

export const HeaderLogo = () => {
  return (
    <header className="w-full flex py-3 px-[3%] justify-between items-center bg-white md:px-[10%]">
      <Link to="/">
        <h1 className="logo cursor-pointer font-extrabold text-[#2d6a4f] text-3xl">
          katafly
        </h1>
      </Link>

      <nav className="flex gap-3 justify-between items-center md:gap-5 ">
        <Link
          to="/reservas"
          className="text-sm font-medium hidden text-[#2d6a4f] md:flex "
        >
          Mis reservas
        </Link>
        <User />
        <MenuButton />
        <ResponsiveMenu />
      </nav>
    </header>
  );
};
