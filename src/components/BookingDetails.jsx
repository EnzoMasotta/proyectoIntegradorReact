import React, { useEffect, useState, useContext } from "react";
import {
  BedDouble,
  Info,
  PlaneLanding,
  PlaneTakeoff,
  Star,
  ChevronLeft,
} from "lucide-react";
import { useTotalPrice } from "../contexts/TotalPriceContext";
import { useIsMobile } from "../hooks/useIsMobile";
import { addReservationToCart } from "../utils/sessionCart";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export function BookingDetails({ selectedPackage }) {
  const { totalPrice, personas, totalNights } = useTotalPrice();
  const [flightData, setFlightData] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile(1024);

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
              <p className="text-xs text-[#4a4a4a] italic">
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
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="font-bold text-[#2d6a4f] text-sm cursor-pointer"
              onClick={() => setOpen(true)}
            >
              Ver detalles
            </button>
            {location.pathname ===
              `/paquetes/resultados/reservas/detalles/${id}` && (
              <button
                type="button"
                onClick={handleConfirmReservation}
                className="py-2 px-4 bg-[#2a5732] text-white rounded-lg text-sm font-semibold cursor-pointer"
              >
                Confirmar Reserva
              </button>
            )}
          </div>

          {open && (
            <div className="fixed inset-0 bg-white z-50 flex flex-col p-4 overflow-auto">
              <button
                onClick={() => setOpen(false)}
                className="self-start inline-flex w-auto p-0  text-[#4a4a4a] font-semibold mb-2"
                type="button"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="space-y-4">
                <div className="bg-[#edf4ea] p-4 rounded-lg border border-[#dbdbdb] text-[var(--gris-navbar)] text-sm">
                  <h3 className="font-semibold text-[var(--verde-logo)] mb-3 uppercase tracking-wide">
                    Vuelo de ida
                  </h3>
                  <div className="space-y-1 text-sm text-[var(--gris-navbar)]">
                    <p>
                      <span className="font-medium">
                        {flightData.originAirport.name}
                      </span>{" "}
                      ({flightData.originAirport.code}) –{" "}
                      {flightData.originCountry}
                    </p>
                    <p>
                      Fecha:{" "}
                      <span className="font-medium">
                        {formatDate(flightData.departureTime)}
                      </span>
                    </p>
                    <p>
                      Hora salida:{" "}
                      <span className="font-medium">
                        {formatTime(flightData.departureTime)}
                      </span>
                    </p>
                    <p>
                      Destino: {flightData.destinationAirport.name} (
                      {flightData.destinationAirport.code}) –{" "}
                      {flightData.destinationCountry}
                    </p>
                    <p>
                      Hora llegada:{" "}
                      <span className="font-medium">
                        {formatTime(flightData.arrivalTime)}
                      </span>
                    </p>
                    <p className="text-[var(--rosa-viejo)] font-semibold">
                      {getStopLabel(flightData.layoverAirports)}
                    </p>
                  </div>
                </div>

                <div className="bg-[#edf4ea] p-4 rounded-lg border border-[#dbdbdb] text-[var(--gris-navbar)] text-sm">
                  <h3 className="font-semibold text-[var(--verde-logo)] mb-3 uppercase tracking-wide">
                    Vuelo de vuelta
                  </h3>
                  <div className="space-y-1 text-sm text-[var(--gris-navbar)]">
                    <p>
                      <span className="font-medium">
                        {flightData.destinationAirport.name}
                      </span>{" "}
                      ({flightData.destinationAirport.code}) –{" "}
                      {flightData.destinationCountry}
                    </p>
                    <p>
                      Fecha:{" "}
                      <span className="font-medium">
                        {formatDate(flightData.returnDepartureTime)}
                      </span>
                    </p>
                    <p>
                      Hora salida:{" "}
                      <span className="font-medium">
                        {formatTime(flightData.returnDepartureTime)}
                      </span>
                    </p>
                    <p>
                      Destino: {flightData.originAirport.name} (
                      {flightData.originAirport.code}) –{" "}
                      {flightData.originCountry}
                    </p>
                    <p>
                      Hora llegada:{" "}
                      <span className="font-medium">
                        {formatTime(flightData.returnArrivalTime)}
                      </span>
                    </p>
                    <p className="text-[var(--rosa-viejo)] font-semibold">
                      {getStopLabel(flightData.layoverAirports)}
                    </p>
                  </div>
                </div>

                <div className="bg-[#edf4ea] p-4 rounded-lg border border-[#dbdbdb] text-[var(--gris-navbar)] text-sm">
                  <h3 className="font-semibold text-[var(--verde-logo)] mb-3 uppercase tracking-wide">
                    Totales
                  </h3>
                  <p>Noches: {totalNights}</p>
                  <p>Pasajeros: {personas}</p>
                  <p>Precio total: ${totalPrice.toLocaleString("es-AR")}</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </>
    );
  }
  return (
    <section className="grid grid-cols-[1fr_1fr] grid-rows-[auto_auto] gap-4 px-[3%] items-stretch">
      {/* Card 1 */}
      <div className="flex flex-col border border-[#dbdbdb] rounded-lg bg-white p-2 shadow-sm">
        <h2 className="flex items-center gap-1 text-[#2a2a2a] font-bold text-lg border-b border-[#dbdbdb] pb-2">
          <BedDouble size={16} strokeWidth={3} />
          Hospedaje
        </h2>
        <span className="text-[#4a4a4a] text-sm mt-2">
          {selectedPackage.title} - {selectedPackage.province}
        </span>
        <p className="text-xs text-[#4a4a4a] italic">
          (Horario check-in 13:00 hs - Horario check-out 10:00 hs)
        </p>
        <img
          src={selectedPackage.presentationImage}
          alt={selectedPackage.tittle}
          className="w-1/2 h-40 object-cover rounded-lg mt-2"
        />
      </div>

      {/* Card 2 */}
      <div className="flex flex-col gap-4 border border-[#dbdbdb] rounded-lg bg-white p-4 shadow-sm row-span-2 h-full">
        {/* Encabezado */}
        <h2 className="flex items-center gap-1 text-[#2a2a2a] font-bold text-lg border-b border-[#dbdbdb] pb-2">
          <PlaneTakeoff size={18} strokeWidth={3} className="" />
          Vuelos
        </h2>

        {/* Vuelo de ida */}
        <div className="bg-[#edf4ea] p-3 rounded-md">
          <h3 className="font-semibold text-[var(--verde-logo)] text-sm uppercase tracking-wide mb-2">
            Vuelo de ida
          </h3>
          <div className="space-y-1 text-xs text-[var(--gris-navbar)]">
            <p>
              <span className="font-medium">
                {flightData.originAirport.name}
              </span>{" "}
              ({flightData.originAirport.code}) – {flightData.originCountry}
            </p>
            <p>
              Fecha:{" "}
              <span className="font-medium">
                {formatDate(flightData.departureTime)}
              </span>
            </p>
            <p>
              Hora salida:{" "}
              <span className="font-medium">
                {formatTime(flightData.departureTime)}
              </span>
            </p>
            <p>
              Destino: {flightData.destinationAirport.name} (
              {flightData.destinationAirport.code}) –{" "}
              {flightData.destinationCountry}
            </p>
            <p>
              Hora llegada:{" "}
              <span className="font-medium">
                {formatTime(flightData.arrivalTime)}
              </span>
            </p>
            <p className="text-[var(--rosa-viejo)] font-semibold">
              {getStopLabel(flightData.layoverAirports)}
            </p>
          </div>
        </div>

        {/* Vuelo de vuelta */}
        <div className="bg-[#edf4ea] p-3 rounded-md">
          <h3 className="font-semibold text-[var(--verde-logo)] text-sm uppercase tracking-wide mb-2">
            Vuelo de vuelta
          </h3>
          <div className="space-y-1 text-xs text-[var(--gris-navbar)]">
            <p>
              <span className="font-medium">
                {flightData.destinationAirport.name}
              </span>{" "}
              ({flightData.destinationAirport.code}) –{" "}
              {flightData.destinationCountry}
            </p>
            <p>
              Fecha:{" "}
              <span className="font-medium">
                {formatDate(flightData.returnDepartureTime)}
              </span>
            </p>
            <p>
              Hora salida:{" "}
              <span className="font-medium">
                {formatTime(flightData.returnDepartureTime)}
              </span>
            </p>
            <p>
              Destino: {flightData.originAirport.name} (
              {flightData.originAirport.code}) – {flightData.originCountry}
            </p>
            <p>
              Hora llegada:{" "}
              <span className="font-medium">
                {formatTime(flightData.returnArrivalTime)}
              </span>
            </p>
            <p className="text-[var(--rosa-viejo)] font-semibold">
              {getStopLabel(flightData.layoverAirports)}
            </p>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="flex flex-col border border-[#dbdbdb] rounded-lg bg-white p-2 shadow-sm">
        <h2 className="flex items-center gap-1 text-[#2a2a2a] font-bold text-lg border-b border-[#dbdbdb] pb-2">
          <Info size={16} strokeWidth={3} />
          Información
        </h2>
        <p className="text-sm text-[#4a4a4a] mt-2">
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
        {location.pathname ===
          `/paquetes/resultados/reservas/detalles/${id}` && (
          <button
            type="button"
            onClick={handleConfirmReservation}
            className="mt-2 w-1/3 py-2 px-4 bg-[#2a5732] text-white rounded-lg text-sm font-semibold cursor-pointer"
          >
            Confirmar Reserva
          </button>
        )}
      </div>
    </section>
  );
}
