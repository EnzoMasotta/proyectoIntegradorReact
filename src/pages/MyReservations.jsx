import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function MyReservations() {
  const [reservations, setReservations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem("reservationCart");
    if (stored) {
      setReservations(JSON.parse(stored));
    }
  }, []);

  const handleDelete = (index) => {
    const updated = reservations.filter((_, i) => i !== index);
    setReservations(updated);
    sessionStorage.setItem("reservationCart", JSON.stringify(updated));
  };

  if (reservations.length === 0) {
    return (
      <section className="h-100 bg-[#f2f4f5] flex justify-center items-center">
        <p className="p-6 text-[#4a4a4a] text-sm md:text-base">
          Todavía no tenes ninguna reserva guardada.
        </p>
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:px-[8%] lg:px-[10%] bg-[#f2f4f5] min-h-screen">
      {reservations.map((res, index) => (
        <div
          key={`${res.hotelId}-${res.flightData.originAirport.code}-${index}`}
          className="bg-white rounded-lg shadow-sm p-4 flex flex-col gap-3 cursor-pointer"
          onClick={() => {
            navigate(`/reservas/detalles/${res.hotelId}`);
          }}
        >
          <div className="flex justify-between">
            <div className="">
              <h3 className="font-bold text-lg text-[#2a2a2a]">
                {res.hotelTitle}
              </h3>
              <p className="text-sm text-[#4a4a4a]">{res.hotelProvince}</p>
            </div>
            <button
              type="button"
              className="text-red-600 text-sm self-start cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(index);
              }}
            >
              Eliminar reserva
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-[#f8f9fa] rounded-lg p-2">
              <p className="text-[#4a4a4a]">Origen</p>
              <p className="font-semibold text-[#2a2a2a]">
                {res.flightData.originAirport.code} -{" "}
                {res.flightData.originCountry}
              </p>
            </div>
            <div className="bg-[#f8f9fa] rounded-lg p-2">
              <p className="text-[#4a4a4a]">Destino</p>
              <p className="font-semibold text-[#2a2a2a]">
                {res.flightData.destinationAirport.code} -{" "}
                {res.flightData.destinationCountry}
              </p>
            </div>
            <div className="bg-[#f8f9fa] rounded-lg p-2">
              <p className="text-[#4a4a4a]">Pasajeros</p>
              <p className="font-semibold text-[#2a2a2a]">{res.totalPersons}</p>
            </div>
            <div className="bg-[#f8f9fa] rounded-lg p-2">
              <p className="text-[#4a4a4a]">Noches</p>
              <p className="font-semibold text-[#2a2a2a]">{res.totalNights}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="text-[#2a2a2a]">Precio total</span>
            <span className="text-lg font-bold text-[#ad6771]">
              ${res.totalPrice.toLocaleString("es-AR")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
