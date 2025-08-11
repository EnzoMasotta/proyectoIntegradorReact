import { Mail } from "lucide-react";
import React from "react";

export function Newsletter() {
  return (
    <section className="w-full mx-auto px-6 py-8 flex flex-col items-center gap-5 bg-[#2d6a4f]">
      <h2 className="text-xl font-semibold text-white text-center">
        Suscribite a nuestro Newsletter y recibí ofertas exclusivas
      </h2>
      <form className="flex flex-col sm:flex-row w-full max-w-lg gap-3">
        <div className="flex items-center justify-center bg-[#3c855d] p-3 rounded-md">
          <Mail size={24} className="text-[#f0e6d2]" />
        </div>
        <input
          type="email"
          placeholder="Ingresá tu email"
          className="flex-1 px-4 py-3 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-[#ad6771] text-[#2a2a2a] bg-white"
          autoComplete="off"
          name="email"
        />
        <button
          type="submit"
          className="bg-[#ad6771] text-white font-bold px-6 py-3 rounded-md hover:bg-[#8b4f58] transition-colors cursor-pointer"
        >
          Suscribirme
        </button>
      </form>
    </section>
  );
}
