import { BedDouble } from "lucide-react";
import React from "react";

export default function AcommodationStep() {
  return (
    <section className="flex md:m-auto md:w-full border-r border-[#dbdbdb] p-5">
      <h1 className="flex gap-2 items-center text-xs">
        <BedDouble />
        Elegir hospedaje
      </h1>
    </section>
  );
}
