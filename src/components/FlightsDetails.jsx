import { PlaneLanding, PlaneTakeoff } from "lucide-react";
import React, { useEffect, useState } from "react";

function randomizeTime(baseDate) {
  const randomHour = Math.floor(Math.random() * 24);
  const fixedMinutes = [0, 15, 30, 45];
  const randomMinute =
    fixedMinutes[Math.floor(Math.random() * fixedMinutes.length)];

  const newDate = new Date(baseDate);
  newDate.setHours(randomHour, randomMinute, 0, 0);
  return newDate;
}

function generateUniqueRandomTimes(baseTimes, count) {
  const sets = new Set();
  const results = [];

  const flightDurationMs =
    new Date(baseTimes.arrivalTime) - new Date(baseTimes.departureTime);
  const returnDurationMs =
    new Date(baseTimes.returnArrivalTime) -
    new Date(baseTimes.returnDepartureTime);

  while (results.length < count) {
    const newDeparture = randomizeTime(baseTimes.departureTime);
    const newArrival = new Date(newDeparture.getTime() + flightDurationMs);

    const newReturnDeparture = randomizeTime(baseTimes.returnDepartureTime);
    const newReturnArrival = new Date(
      newReturnDeparture.getTime() + returnDurationMs
    );

    const signature = [
      newDeparture.toISOString(),
      newArrival.toISOString(),
      newReturnDeparture.toISOString(),
      newReturnArrival.toISOString(),
    ].join("|");

    if (!sets.has(signature)) {
      sets.add(signature);
      results.push({
        departureTime: newDeparture,
        arrivalTime: newArrival,
        returnDepartureTime: newReturnDeparture,
        returnArrivalTime: newReturnArrival,
      });
    }
  }

  return results;
}

export function FlightsDetails({ selectedPackage }) {
  const [flightData, setFlightData] = useState(null);
  const [randomOptions, setRandomOptions] = useState([]);

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
      const parsed = JSON.parse(storedData);

      const baseTimes = {
        departureTime: new Date(parsed.departureTime),
        arrivalTime: new Date(parsed.arrivalTime),
        returnDepartureTime: new Date(parsed.returnDepartureTime),
        returnArrivalTime: new Date(parsed.returnArrivalTime),
      };

      setFlightData(parsed);
      const options = generateUniqueRandomTimes(baseTimes, 8);
      setRandomOptions(options);
    }
  }, [selectedPackage]);

  const formatTime = (date) =>
    date
      ? date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "";

  const handleOptionClick = (times) => {
    const query = sessionStorage.getItem("lastSearchQuery");
    if (!query) return;

    const params = new URLSearchParams(query);
    const originParts = (params.get("origen") || "")
      .split(",")
      .map((s) => s.trim());
    const originCity = originParts[0];
    const originCountry = originParts[2];

    const flightKey = `flightData-${selectedPackage.id}-${originCity}-${originCountry}`;
    const currentData = JSON.parse(sessionStorage.getItem(flightKey));

    const updated = {
      ...currentData,
      departureTime: times.departureTime,
      arrivalTime: times.arrivalTime,
      returnDepartureTime: times.returnDepartureTime,
      returnArrivalTime: times.returnArrivalTime,
    };

    sessionStorage.setItem(flightKey, JSON.stringify(updated));
    window.location.reload();
  };

  const getStopLabel = (layovers) => {
    if (!layovers || layovers.length === 0) return "Directo";
    return `${layovers.length} escala${layovers.length > 1 ? "s" : ""}`;
  };

  const scale = (layovers) => {
    if (!layovers || layovers.length === 0) return "Directo";
    return `Escala${layovers.length > 1 ? "s" : ""}`;
  };

  if (!flightData) {
    return <div>No hay datos de vuelo disponibles.</div>;
  }

  return (
    <section className="w-full flex flex-col px-[3%] lg:px-[20%] gap-6">
      <div className="lg:hidden flex bg-white w-full border-[#d9b0b6] border-2 rounded-lg flex-col cursor-pointer">
        <h3 className="text-lg font-bold text-[#2a2a2a] p-2">
          Tu selección actual
        </h3>
        <p className="flex justify-between items-center gap-1 text-sm bg-gray-200 text-[#4a4a4a] px-[3%]">
          <span className="flex items-center uppercase">
            <PlaneTakeoff size={16} />
            ida
          </span>
          <span>
            {new Date(flightData.departureTime).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        </p>
        <div className="flex justify-between items-center px-[12%] text-base text-[#2a2a2a] mt-2">
          <p className="flex flex-col items-center font-bold text-base">
            <span className="text-xs">{flightData.originAirport.code}</span>{" "}
            {formatTime(new Date(flightData.departureTime))}
          </p>
          <p className="text-xs border-b-2 border-[#2a5732] px-8 text-[#2a2a2a]">
            {getStopLabel(flightData.layoverAirports)}
          </p>
          <p className="flex flex-col items-center font-bold text-base">
            <span className="text-xs">
              {flightData.destinationAirport.code}
            </span>{" "}
            {formatTime(new Date(flightData.arrivalTime))}
          </p>
        </div>

        {flightData.layoverAirports &&
          flightData.layoverAirports.length > 0 && (
            <div className="text-sm text-[#2a2a2a] px-[3%]">
              <h3 className="text-xs text-[#4a4a4a]">
                {scale(flightData.layoverAirports)}
              </h3>
              {flightData.layoverAirports.map((layover, i) => (
                <p key={i}>
                  {layover.city} ({layover.code}) - {layover.country}
                </p>
              ))}
            </div>
          )}

        <p className="flex justify-between items-center gap-1 text-sm bg-gray-200 text-[#4a4a4a] mt-3 px-[3%]">
          <span className="flex items-center uppercase">
            <PlaneLanding size={16} />
            vuelta
          </span>
          <span>
            {new Date(flightData.departureTime).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        </p>
        <div className="flex justify-between items-center px-[12%] text-base text-[#2a2a2a] mt-2">
          <p className="flex flex-col items-center font-bold text-base">
            <span className="text-xs">
              {flightData.destinationAirport.code}
            </span>{" "}
            {formatTime(new Date(flightData.returnDepartureTime))}
          </p>
          <p className="text-xs border-b-2 border-[#2a5732] px-8 text-[#2a2a2a]">
            {getStopLabel(flightData.layoverAirports)}
          </p>
          <p className="flex flex-col items-center font-bold text-base">
            <span className="text-xs">{flightData.originAirport.code}</span>{" "}
            {formatTime(new Date(flightData.returnArrivalTime))}
          </p>
        </div>

        {flightData.layoverAirports &&
          flightData.layoverAirports.length > 0 && (
            <div className="text-sm text-[#2a2a2a] px-[3%] pb-2">
              <h3 className="text-xs text-[#4a4a4a]">
                {scale(flightData.layoverAirports)}
              </h3>
              <div className="flex flex-col-reverse">
                {flightData.layoverAirports.map((layover, i) => (
                  <p className="" key={i}>
                    {layover.city} ({layover.code}) - {layover.country}
                  </p>
                ))}
              </div>
            </div>
          )}
      </div>

      {randomOptions.map((times, idx) => (
        <div
          key={idx}
          className="bg-white w-full border-[#dbdbdb] border transition duration-500 hover:shadow-lg rounded-lg flex flex-col cursor-pointer"
          onClick={() => handleOptionClick(times)}
        >
          <h3 className="text-lg font-bold p-2 text-[#2a2a2a]">
            Opción {idx + 1}
          </h3>
          <p className="flex justify-between items-center gap-1 text-sm bg-gray-200 text-[#4a4a4a] px-[3%]">
            <span className="flex items-center uppercase">
              <PlaneTakeoff size={16} />
              ida
            </span>
            <span>
              {new Date(flightData.departureTime).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </p>
          <div className="flex justify-between items-center px-[12%] text-base text-[#2a2a2a] mt-2">
            <p className="flex flex-col items-center font-bold text-base">
              <span className="text-xs">{flightData.originAirport.code}</span>{" "}
              {formatTime(times.departureTime)}
            </p>
            <p className="text-xs border-b-2 border-[#2a5732] px-8 text-[#2a2a2a]">
              {getStopLabel(flightData.layoverAirports)}
            </p>
            <p className="flex flex-col items-center font-bold text-base">
              <span className="text-xs">
                {flightData.destinationAirport.code}
              </span>{" "}
              {formatTime(times.arrivalTime)}
            </p>
          </div>

          {flightData.layoverAirports &&
            flightData.layoverAirports.length > 0 && (
              <div className="text-sm text-[#2a2a2a] px-[3%]">
                <h3 className="text-xs text-[#4a4a4a]">
                  {scale(flightData.layoverAirports)}
                </h3>
                {flightData.layoverAirports.map((layover, i) => (
                  <p key={i}>
                    {layover.city} ({layover.code}) - {layover.country}
                  </p>
                ))}
              </div>
            )}

          <p className="flex justify-between items-center gap-1 text-sm bg-gray-200 text-[#4a4a4a] mt-3 px-[3%]">
            <span className="flex items-center uppercase">
              <PlaneLanding size={16} />
              vuelta
            </span>
            <span>
              {new Date(flightData.departureTime).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </p>
          <div className="flex justify-between items-center px-[12%] text-base text-[#2a2a2a] mt-2">
            <p className="flex flex-col items-center font-bold text-base">
              <span className="text-xs">
                {flightData.destinationAirport.code}
              </span>{" "}
              {formatTime(times.returnDepartureTime)}
            </p>
            <p className="text-xs border-b-2 border-[#2a5732] px-8 text-[#2a2a2a]">
              {getStopLabel(flightData.layoverAirports)}
            </p>
            <p className="flex flex-col items-center font-bold text-base">
              <span className="text-xs">{flightData.originAirport.code}</span>{" "}
              {formatTime(times.returnArrivalTime)}
            </p>
          </div>
          {flightData.layoverAirports &&
            flightData.layoverAirports.length > 0 && (
              <div className="text-sm text-[#2a2a2a] px-[3%] pb-2">
                <h3 className="text-xs text-[#4a4a4a]">
                  {scale(flightData.layoverAirports)}
                </h3>
                <div className="flex flex-col-reverse">
                  {flightData.layoverAirports.map((layover, i) => (
                    <p className="" key={i}>
                      {layover.city} ({layover.code}) - {layover.country}
                    </p>
                  ))}
                </div>
              </div>
            )}
        </div>
      ))}
    </section>
  );
}
