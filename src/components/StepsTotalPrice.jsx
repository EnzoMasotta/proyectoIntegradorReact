import { DollarSign } from "lucide-react";
import React from "react";

export default function StepsTotalPrice() {
  return (
    <section className="flex flex-1 justify-center py-2">
      <h1 className="flex gap-2 items-center text-sm text-[#2a2a2a]">
        <DollarSign size={18} />
        Total
      </h1>
    </section>
  );
}
