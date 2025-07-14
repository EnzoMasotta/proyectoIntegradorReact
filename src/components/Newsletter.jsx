import { Mail } from "lucide-react";
import React from "react";

export function Newsletter() {
  return (
    <section className="flex flex-col items-center justify-center mt-4 gap-6 md:gap-4 py-3 bg-[#f4f4f4]">
      <h1 className="text-xl text-center px-[3%] text-[#4a4a4a]">
        Suscribíte a nuestro Newsletter y recibí ofertas exclusivas
      </h1>
      <div className="flex flex-wrap items-center gap-2 lg:gap-4 px-[3%]">
        <Mail className="" size={30} />
        <input
          id="email"
          type="email"
          placeholder="Ingresá tu email"
          className="flex-1 pl-2 pr-7 md:pr-15 py-2 rounded-lg border-[#4a4a4a] border-1 outline-0 bg-white "
        />
        <button
          type="submit"
          className=" m-auto md:w-auto px-4 py-3 text-white font-bold text-xs uppercase bg-[#ad6771] rounded-xl cursor-pointer"
        >
          Suscribirme
        </button>
      </div>
    </section>
  );
}
