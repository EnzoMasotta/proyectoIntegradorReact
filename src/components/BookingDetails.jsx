import React, { useEffect, useState, useContext } from "react";
import {
  BedDouble,
  Info,
  PlaneLanding,
  PlaneTakeoff,
  Star,
} from "lucide-react";
import { useTotalPrice } from "../contexts/TotalPriceContext";
import { useIsMobile } from "../hooks/useIsMobile";
import { addReservationToCart } from "../utils/sessionCart";
import { useNavigate } from "react-router-dom";

export function BookingDetails({ selectedPackage }) {
  const { totalPrice, personas, totalNights } = useTotalPrice();
  const [flightData, setFlightData] = useState(null);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleConfirmReservation = () => {
    if (!selectedPackage || !flightData) return;

    const reservation = {
      hotelId: selectedPackage.id,
      hotelTitle: selectedPackage.title,
      hotelProvince: selectedPackage.province,
      pricePerPerson: totalPrice,
      totalPersons: personas,
      totalNights: totalNights,
      totalPrice: totalPrice * personas,
      flightData: {
        originCountry: flightData.originCountry,
        destinationCountry: flightData.destinationCountry,
        originAirport: flightData.originAirport,
        destinationAirport: flightData.destinationAirport,
        departureTime: flightData.departureTime,
        arrivalTime: flightData.arrivalTime,
        returnDepartureTime: flightData.returnDepartureTime,
        returnArrivalTime: flightData.returnArrivalTime,
        layoverAirports: flightData.layoverAirports || [],
      },
    };

    addReservationToCart(reservation);
    alert("Reserva agregada al carrito");

    navigate("/reservas", { replace: true });
  };

  useEffect(() => {
    if (isMobile) {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open, isMobile]);

  const formatTime = (date) =>
    date
      ? new Date(date).toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "";

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("es-AR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "";

  const getStopLabel = (layovers) => {
    if (!layovers || layovers.length === 0) return "Directo";
    return `${layovers.length} escala${layovers.length > 1 ? "s" : ""}`;
  };

  useEffect(() => {
    if (!selectedPackage) return;

    const query = sessionStorage.getItem("lastSearchQuery");
    if (!query) return;

    const params = new URLSearchParams(query);
    const originParts = (params.get("origen") || "")
      .split(",")
      .map((s) => s.trim());
    const originCity = originParts[0];
    const originCountry = originParts[2];

    const flightKey = `flightData-${selectedPackage.id}-${originCity}-${originCountry}`;
    const storedData = sessionStorage.getItem(flightKey);
    if (storedData) {
      setFlightData(JSON.parse(storedData));
    }
  }, [selectedPackage]);

  if (!flightData || !selectedPackage)
    return <p>No hay paquete seleccionado.</p>;

  if (isMobile) {
    return (
      <>
        <section className="flex flex-col p-4 bg-white rounded-lg border border-[#dbdbdb] gap-3 mx-[3%]">
          <div>
            <h2 className="text-xl font-semibold text-[#ad6771] mb-2">
              Detalles sobre tu reserva
            </h2>

            <div className="flex flex-col">
              <h2 className="flex items-center gap-1 text-[#2a2a2a] font-bold">
                <BedDouble size={16} strokeWidth={3} />
                Hospedaje
              </h2>
              <span className="text-[#4a4a4a] text-sm">
                {selectedPackage.title} - {selectedPackage.province}
              </span>
              <p className="text-xs text-[#4a4a4a]">
                (Horario check-in 13:00 hs - Horario check-out 10:00 hs)
              </p>
            </div>
          </div>

          <div>
            <h2 className="flex items-center gap-1 text-[#2a2a2a] font-bold">
              <PlaneTakeoff size={16} strokeWidth={3} />
              Vuelos
            </h2>
            <p className="text-sm text-[#4a4a4a]">
              IDA: {formatDate(flightData.departureTime)} -{" "}
              {formatTime(flightData.departureTime)}
            </p>
            <p className="text-sm text-[#4a4a4a]">
              VUELTA: {formatDate(flightData.returnDepartureTime)} -{" "}
              {formatTime(flightData.returnDepartureTime)}
            </p>
          </div>
          <div>
            <h2 className="flex items-center gap-1 text-[#2a2a2a] font-bold">
              <Info size={16} strokeWidth={3} />
              Información
            </h2>
            <p className="text-sm text-[#4a4a4a]">
              Paquete para {personas}{" "}
              {personas === 1 ? "pasajero" : "pasajeros"} por la cantidad de{" "}
              {totalNights} {totalNights === 1 ? "noche" : "noches"}
            </p>
            <p className="flex flex-col text-sm text-[#4a4a4a]">
              Precio unitario
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
          </div>
          <button
            type="button"
            className="font-bold text-[#2d6a4f] text-sm cursor-pointer self-end"
            onClick={() => setOpen(true)}
          >
            Ver detalles
          </button>

          {open && (
            <div className="fixed inset-0 bg-white z-50 flex flex-col p-4 overflow-auto">
              <div className="">
                <h3 className="font-semibold mb-2">Vuelo de ida</h3>
                <p>
                  <PlaneTakeoff size={16} className="inline-block mr-1" />
                  {flightData.originAirport.name} (
                  {flightData.originAirport.code}) - {flightData.originCountry}
                </p>
                <p>Fecha: </p>
                <p>Hora salida: </p>
                <p>
                  Destino: {flightData.destinationAirport.name} (
                  {flightData.destinationAirport.code}) -{" "}
                  {flightData.destinationCountry}
                </p>
                <p>Hora llegada: {formatTime(flightData.arrivalTime)}</p>
                <p>Tipo vuelo: {getStopLabel(flightData.layoverAirports)}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Vuelo de vuelta</h3>
                <p>
                  <PlaneLanding size={16} className="inline-block mr-1" />
                  {flightData.destinationAirport.name} (
                  {flightData.destinationAirport.code}) -{" "}
                  {flightData.destinationCountry}
                </p>
                <p>Fecha: {formatDate(flightData.returnDepartureTime)}</p>
                <p>Hora salida: {formatTime(flightData.returnDepartureTime)}</p>
                <p>
                  Destino: {flightData.originAirport.name} (
                  {flightData.originAirport.code}) - {flightData.originCountry}
                </p>
                <p>Hora llegada: {formatTime(flightData.returnArrivalTime)}</p>
                <p>Tipo vuelo: {getStopLabel(flightData.layoverAirports)}</p>
              </div>

              <div>
                <h3 className="font-semibold">Totales</h3>
                <p>Noches: {totalNights}</p>
                <p>Pasajeros: {personas}</p>
                <p>Precio total: ${totalPrice}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="mt-6 py-2 px-4 bg-[#2a5732] text-white rounded text-sm font-semibold"
                type="button"
              >
                Aplicar filtros
              </button>
            </div>
          )}
        </section>
      </>
    );
  }
  return (
    <section className="flex justify-between">
      <div className="flex flex-col border border-[#dbdbdb] rounded-lg bg-white">
        <h2 className="flex items-center gap-1 text-[#2a2a2a] font-bold">
          <BedDouble size={16} strokeWidth={3} />
          Hospedaje
        </h2>
        <span className="text-[#4a4a4a] text-sm">
          {selectedPackage.title} - {selectedPackage.province}
        </span>
        <p className="text-xs text-[#4a4a4a]">
          (Horario check-in 13:00 hs - Horario check-out 10:00 hs)
        </p>
      </div>
      <div className="border border-[#dbdbdb] rounded-lg bg-white">
        <h2 className="flex items-center gap-1 text-[#2a2a2a] font-bold">
          <PlaneTakeoff size={16} strokeWidth={3} />
          Vuelos
        </h2>
        <p className="text-sm text-[#4a4a4a]">
          IDA: {formatDate(flightData.departureTime)} -{" "}
          {formatTime(flightData.departureTime)}
        </p>
        <p className="text-sm text-[#4a4a4a]">
          VUELTA: {formatDate(flightData.returnDepartureTime)} -{" "}
          {formatTime(flightData.returnDepartureTime)}
        </p>
      </div>
      <div className="border border-[#dbdbdb] rounded-lg bg-white">
        <h2 className="flex items-center gap-1 text-[#2a2a2a] font-bold">
          <Info size={16} strokeWidth={3} />
          Información
        </h2>
        <p className="text-sm text-[#4a4a4a]">
          Paquete para {personas} {personas === 1 ? "pasajero" : "pasajeros"}{" "}
          por la cantidad de {totalNights}{" "}
          {totalNights === 1 ? "noche" : "noches"}
        </p>
        <p className="flex flex-col text-sm text-[#4a4a4a]">
          Precio unitario
          <span className="text-lg">
            ${" "}
            <span className="font-bold text-[#2a2a2a]">
              {totalPrice.toLocaleString("es-AR")}
            </span>
          </span>
        </p>
        <p className="text-xs text-[#4a4a4a]">
          Precio final para {personas} {personas === 1 ? "persona" : "personas"}{" "}
          $ {(totalPrice * personas).toLocaleString("es-AR")}
        </p>
        <button type="button" onClick={handleConfirmReservation}>
          Confirmar Reserva
        </button>
      </div>
    </section>
  );
}
