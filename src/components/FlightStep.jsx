import { Plane } from "lucide-react";
import React from "react";

export default function FlightStep() {
  return (
    <section className="flex flex-1 justify-center border-r border-[#dbdbdb] py-2">
      <h1 className="flex gap-2 items-center text-sm text-[#2a2a2a]">
        <Plane size={18} />
        Vuelos
      </h1>
    </section>
  );
}
