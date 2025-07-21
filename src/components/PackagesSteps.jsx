import React from "react";
import { FlightStep } from "./FlightStep";
import { AcommodationStep } from "./AcommodationStep";
import { StepsTotalPrice } from "./StepsTotalPrice";
import { useNavigate } from "react-router-dom";

export function PackagesSteps({ selectedPackage }) {
  const navigate = useNavigate();

  const handleChange = () => {
    const lastQuery = sessionStorage.getItem("lastSearchQuery");
    if (lastQuery) {
      const separator = lastQuery.includes("?") ? "&" : "?";
      navigate(
        `/paquetes/resultados${lastQuery}${separator}scrollTo=accommodation`
      );
    } else {
      navigate("/paquetes");
    }
  };

  return (
    <main className="bg-[#f2f4f5] h-auto flex justify-center px-[3%] md:px-[8%] py-6">
      <section className="bg-white flex justify-between items-center border border-[#dbdbdb] rounded-lg w-full overflow-x-auto">
        <AcommodationStep
          selectedPackage={selectedPackage}
          onChange={handleChange}
        />
        <FlightStep />
        <StepsTotalPrice />
      </section>
    </main>
  );
}
