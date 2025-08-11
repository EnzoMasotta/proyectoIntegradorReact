import React from "react";
import { Link } from "react-router-dom";

export function AbbreviatedAboutUs() {
  return (
    <section className="w-full py-12 px-[3%] bg-[#f0e6d2] text-center max-w-5xl mx-auto rounded-lg mb-6">
      <h2 className="text-3xl font-bold text-[#2d6a4f] mb-4">
        Descubrí <span className="text-[#ad6771]">Katafly</span>
      </h2>
      <p className="text-[#2a2a2a] mb-6 leading-relaxed">
        Viajá con nosotros y disfrutá de experiencias únicas en los destinos más
        increíbles, con la mejor atención y tranquilidad.
      </p>
      <Link
        to="/sobrenosotros"
        className="inline-block bg-[#2d6a4f] text-white font-semibold rounded-md px-8 py-3 hover:bg-[#ad6771] transition-colors"
      >
        Conocé más sobre nosotros
      </Link>
    </section>
  );
}
