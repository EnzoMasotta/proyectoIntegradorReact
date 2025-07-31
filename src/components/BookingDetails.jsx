import React, { useEffect, useState, useContext } from "react";
import { PlaneLanding, PlaneTakeoff, Star } from "lucide-react";
import { useTotalPrice } from "../contexts/TotalPriceContext";

export function BookingDetails({ selectedPackage }) {
  const { totalPrice, personas, totalNights } = useTotalPrice();
  const [flightData, setFlightData] = useState(null);

  // Función para formatear horas HH:mm sin librerías externas
  const formatTime = (date) =>
    date
      ? new Date(date).toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "";

  // Función para formatear fechas dd/mm/yyyy
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "";

  // Etiqueta de escalas
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

  return (
    <section className="p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* Información del paquete */}
      <div>
        <h2 className="text-xl font-semibold text-[#ad6771] mb-2">
          Detalles sobre tu reserva {selectedPackage.title}
        </h2>
        <span className="flex gap-1">
          {[...Array(selectedPackage.stars)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className="text-yellow-500"
              style={{ fill: "currentColor" }}
            />
          ))}
        </span>
      </div>

      {/* Totales del contexto */}
      <div>
        <h3 className="font-semibold">Totales</h3>
        <p>Noches: {totalNights}</p>
        <p>Pasajeros: {personas}</p>
        <p>Precio total: ${totalPrice}</p>
      </div>

      {/* Datos del vuelo */}
      <div>
        <h3 className="font-semibold mb-2">Vuelo de ida</h3>
        <p>
          <PlaneTakeoff size={16} className="inline-block mr-1" />
          {flightData.originAirport.name} ({flightData.originAirport.code}) -{" "}
          {flightData.originCountry}
        </p>
        <p>Fecha: {formatDate(flightData.departureTime)}</p>
        <p>Hora salida: {formatTime(flightData.departureTime)}</p>
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

      {/* Distancia y duración */}
      <div>
        <p>Distancia aproximada: {Math.round(flightData.distanceKm)} km</p>
        <p>Duración aproximada: {flightData.durationHrs.toFixed(1)} horas</p>
      </div>
    </section>
  );
}
