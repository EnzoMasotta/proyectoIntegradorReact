import React from "react";
import FlightStep from "./FlightStep";
import AcommodationStep from "./AcommodationStep";
import StepsTotalPrice from "./StepsTotalPrice";

export function PackagesSteps() {
  return (
    <main className="bg-[#f2f4f5] h-auto flex justify-center p-0 md:px-[8%] md:py-6">
      <section className="bg-white flex justify-between items-center border border-[#dbdbdb] border-t-0 md:border-t rounded-md w-full p-2 overflow-x-auto">
        <AcommodationStep />
        <FlightStep />
        <StepsTotalPrice />
      </section>
    </main>
  );
}
