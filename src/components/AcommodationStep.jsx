import { BedDouble, Star } from "lucide-react";
import React from "react";
import { useIsMobile } from "../hooks/useIsMobile";

export function AcommodationStep({ selectedPackage, onChange }) {
  const isMobile = useIsMobile(1024);

  if (!selectedPackage) {
    return (
      <section className="flex flex-1 justify-center border-r border-[#dbdbdb] my-2">
        <div className="flex flex-col py-2">
          <h1 className="flex gap-2 items-center text-sm md:text-lg text-[#ad6771] font-bold">
            <BedDouble size={18} strokeWidth={2} />
            Hospedaje
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section
      className="flex flex-col flex-1 justify-center py-2 lg:py-4 rounded-lg rounded-r-none border-3 border-[#ad6771] border-r-0"
      onClick={isMobile ? onChange : undefined}
    >
      <div className="lg:flex lg:flex-col lg:gap-2 border-r border-[#dbdbdb] py-2">
        <div className="flex items-center justify-center lg:justify-between lg:w-full lg:px-[5%] ">
          <h1 className="flex gap-2 items-center text-sm md:text-lg text-[#ad6771] font-bold">
            <BedDouble size={18} strokeWidth={2} />
            Hospedaje
          </h1>
          <p
            className="hidden lg:flex text-sm text-[#4a4a4a] hover:text-[#ad6771] cursor-pointer"
            onClick={onChange}
          >
            Cambiar opción
          </p>
        </div>
        <div className="hidden lg:flex lg:px-[5%] lg:gap-3">
          <img
            src="/HotelPrueba.jpg" /*{selectedPackage.image}*/
            alt={selectedPackage.title}
            className="w-25 h-25 rounded-lg object-cover"
          />

          <div className="flex flex-col gap-1">
            <h1>{selectedPackage.title}</h1>
            <span className="flex gap-1">
              {[...Array(selectedPackage.stars)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="text-yellow-500"
                  style={{ fill: "currentColor" }}
                />
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
