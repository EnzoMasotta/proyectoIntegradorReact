import { BedDouble } from "lucide-react";
import React from "react";

export default function AcommodationStep() {
  return (
    <section className="flex md:flex-col md:gap-2 flex-1 justify-center border-r border-[#dbdbdb] py-2">
      <div className="flex justify-between items-center md:w-full md:px-[5%]">
        <h1 className="flex gap-2 items-center text-sm md:text-lg text-[#2a2a2a] font-bold">
          <BedDouble size={18} strokeWidth={3} />
          Hospedaje
        </h1>
        <p className="hidden md:flex text-sm text-[#4a4a4a] hover:text-[#ad6771] cursor-pointer">
          Cambiar opción
        </p>
      </div>
      <div className="hidden md:opacity-full md:flex md:px-[5%]">
        <img
          src="/HotelPrueba.jpg"
          alt=""
          className="w-30 h-30 rounded-lg object-cover"
        />
      </div>
    </section>
  );
}
