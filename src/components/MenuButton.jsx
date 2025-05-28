import { Menu } from "lucide-react";
import { useMenu } from "../contexts/MenuContext";

export function MenuButton() {
  const { toggleMenu } = useMenu();

  return (
    <button
      onClick={toggleMenu}
      className="text-3xl p-2 md:hidden"
      aria-label="Abrir menú"
    >
      <Menu className="text-[#4a4a4a]" />
    </button>
  );
}
