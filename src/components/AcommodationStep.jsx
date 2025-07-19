import { BedDouble, Star } from "lucide-react";
import React from "react";
import { useIsMobile } from "../hooks/useIsMobile";

export function AcommodationStep({ selectedPackage, onChange }) {
  const isMobile = useIsMobile();

  if (!selectedPackage) {
    return (
      <section className="flex flex-1 justify-center border-r border-[#dbdbdb] py-2">
        <div className="flex flex-col gap-4 md:px-[5%]">
          <h1 className="flex gap-2 items-center text-sm md:text-lg text-[#ad6771] font-bold">
            <BedDouble size={18} strokeWidth={2} />
            Hospedaje
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="flex md:flex-col md:gap-2 flex-1 justify-center border-r border-[#dbdbdb] py-2">
      <div className="flex md:flex-col lg:flex-row lg:items-center lg:justify-between lg:w-full md:px-[5%]">
        <h1
          className="flex gap-2 items-center text-sm md:text-lg text-[#ad6771] font-bold"
          onClick={isMobile ? onChange : undefined}
        >
          <BedDouble size={18} strokeWidth={2} />
          Hospedaje
        </h1>
        <p
          className="hidden md:flex text-sm text-[#4a4a4a] hover:text-[#ad6771] cursor-pointer"
          onClick={onChange}
        >
          Cambiar opción
        </p>
      </div>
      <div className="hidden lg:flex lg:px-[5%] lg:gap-3">
        <img
          src="/HotelPrueba.jpg" /*{selectedPackage.image}*/
          alt={selectedPackage.title}
          className="w-30 h-30 rounded-lg object-cover"
        />

        <div className="flex flex-col gap-1">
          <h1>{selectedPackage.title}</h1>
          <span className="flex gap-1">
            {[...Array(selectedPackage.stars)].map((_, i) => (
              <Star key={i} size={16} className="text-yellow-500" />
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
