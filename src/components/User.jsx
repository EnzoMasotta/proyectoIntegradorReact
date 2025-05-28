import React from "react";
import { CircleUser } from "lucide-react";
import { useUser } from "../contexts/UserContext";

export function User() {
  const { user, login, logout } = useUser();

  const handleClick = () => {
    if (user) {
      logout();
    } else {
      login({ name: "María", email: "maria@ejemplo.com" });
    }
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex items-center gap-2"
    >
      <CircleUser size={25} className="text-[#4a4a4a]" />
      <span className="text-sm text-[#4a4a4a] hidden">
        {user ? user.email : "Iniciar sesión"}
      </span>
    </div>
  );
}
