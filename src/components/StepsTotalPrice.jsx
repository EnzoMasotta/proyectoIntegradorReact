import { Receipt, CalendarDays } from "lucide-react";
import React from "react";
import { useTotalPrice } from "../contexts/TotalPriceContext";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";

export function StepsTotalPrice({ selectedPackage }) {
  const { totalPrice, personas, totalNights } = useTotalPrice();
  const navigate = useNavigate();
  const isMobile = useIsMobile(1024);
  const thisPage = location.pathname.includes(
    "/paquetes/resultados/reservas/detalles/"
  );

  const showBorder =
    !isMobile &&
    location.pathname !== "/paquetes/resultados/reservas/detalles/";
  const disableButton = thisPage;

  if (!selectedPackage) {
    return (
      <section
        className={`flex flex-1 justify-center py-2 lg:py-4 rounded-lg rounded-l-none ${
          thisPage ? "border-3 border-l-0 border-[#ad6771]" : "border-0"
        }`}
      >
        <div className="flex flex-col py-2">
          <h1 className="flex gap-2 items-center text-sm md:text-lg text-[#ad6771] font-bold">
            <Receipt size={18} />
            Reserva
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`flex flex-col flex-1 justify-center py-2 lg:py-4 rounded-lg rounded-l-none `}
    >
      <div className="lg:flex lg:flex-col lg:gap-1 py-2">
        <div className="flex items-center justify-center lg:justify-between lg:w-full lg:px-[5%] ">
          <h1 className="flex gap-2 items-center text-sm md:text-lg text-[#ad6771] font-bold">
            <Receipt size={18} />
            Reserva
          </h1>
        </div>
        <div className="hidden lg:flex flex-col px-[5%]">
          <p className="flex flex-col text-sm text-[#4a4a4a]">
            Precio por persona
            <span className="text-lg">
              ${" "}
              <span className="font-bold text-[#2a2a2a]">
                {totalPrice.toLocaleString("es-AR")}
              </span>
            </span>
          </p>
          <p className="text-xs text-[#4a4a4a]">
            Precio final para {personas}{" "}
            {personas === 1 ? "persona" : "personas"} ${" "}
            {(totalPrice * personas).toLocaleString("es-AR")}
          </p>
          <button
            className={`flex justify-center mx-auto w-1/2 items-center bg-[#2a5732] text-white py-1 mt-2 rounded-3xl 
              ${
                disableButton
                  ? "opacity-0 cursor-default"
                  : "flex cursor-pointer"
              }`}
            onClick={
              disableButton
                ? undefined
                : () =>
                    navigate(
                      `/paquetes/resultados/reservas/detalles/${selectedPackage.id}`
                    )
            }
          >
            Reservar
          </button>
        </div>
      </div>
    </section>
  );
}
