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
      navigate(`/paquetes/resultados${lastQuery}`);
    } else {
      navigate("/paquetes");
    }
  };

  return (
    <main className="bg-[#f2f4f5] h-auto flex justify-center p-0 md:px-[8%] md:py-6">
      <section className="bg-white flex justify-between items-center md:border border-[#dbdbdb] border-b rounded-b-md md:rounded-md w-full p-2 overflow-x-auto">
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
