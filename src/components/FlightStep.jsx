import { Plane } from "lucide-react";
import React from "react";

export function FlightStep({ selectedPackage }) {
  if (!selectedPackage) {
    return (
      <section className="flex flex-1 justify-center border-r border-[#dbdbdb] py-2">
        <div className="flex flex-col gap-4 md:px-[5%]">
          <h1 className="flex gap-2 items-center text-sm md:text-lg text-[#ad6771] font-bold">
            <Plane size={18} strokeWidth={2} />
            Vuelos
          </h1>
        </div>
      </section>
    );
  }
  return (
    <section className="flex flex-1 justify-center border-r border-[#dbdbdb] py-2">
      <div className="flex flex-col gap-4 md:px-[5%]">
        <h1 className="flex gap-2 items-center text-sm md:text-lg text-[#ad6771] font-bold">
          <Plane size={18} strokeWidth={2} />
          Vuelos
        </h1>
      </div>
    </section>
  );
}
