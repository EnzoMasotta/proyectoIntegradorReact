import React, { useEffect, useState } from "react";

export function MyReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const stored = sessionStorage.getItem("reservationCart");
    if (stored) {
      setReservations(JSON.parse(stored));
    }
  }, []);

  if (reservations.length === 0) {
    return <p>No tenés reservas guardadas.</p>;
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-[#f2f4f5]">
      {reservations.map((res, index) => (
        <div
          key={`${res.hotelId}-${res.flightData.originAirport.code}-${index}`}
          className="border border-[#dbdbdb] p-4 rounded-lg bg-white"
        >
          <h3 className="font-bold text-lg">{res.hotelTitle}</h3>
          <p>
            Provincia: <strong>{res.hotelProvince}</strong>
          </p>
          <p>
            Origen: <strong>{res.flightData.originAirport.code}</strong> -{" "}
            {res.flightData.originCountry}
          </p>
          <p>
            Destino: <strong>{res.flightData.destinationAirport.code}</strong> -{" "}
            {res.flightData.destinationCountry}
          </p>
          <p>
            Pasajeros: <strong>{res.totalPersons}</strong>
          </p>
          <p>
            Noches: <strong>{res.totalNights}</strong>
          </p>
          <p>
            Precio total:{" "}
            <strong>${res.totalPrice.toLocaleString("es-AR")}</strong>
          </p>
        </div>
      ))}
    </div>
  );
}
