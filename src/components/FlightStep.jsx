import { Plane } from "lucide-react";
import React, { useMemo } from "react";
import airports from "../data/airports.json";
import { locationsByCountry } from "../data/locations";
import { calculateDistanceInKm } from "../utils/distanceCalculator";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";

export function FlightStep({ selectedPackage }) {
  const navigate = useNavigate();
  const query = sessionStorage.getItem("lastSearchQuery");
  const isMobile = useIsMobile(1024);
  const location = useLocation();
  const isFirstPage = location.pathname.includes(
    "/paquetes/resultados/hospedajes/detalles/"
  );
  const showBorder = !isMobile || !isFirstPage;

  const getCoordsFromCity = (city, country) => {
    if (!city || !country) return null;
    const countryData = locationsByCountry[country];
    if (!countryData) return null;
    const location = countryData.find(
      (loc) => loc.city.toLowerCase() === city.toLowerCase()
    );
    return location ? { lat: location.lat, lon: location.lon } : null;
  };

  const findAirportByCity = (city) => {
    for (const countryAirports of Object.values(airports)) {
      for (const location of countryAirports) {
        if (location.city.toLowerCase() === city.toLowerCase()) {
          return location.airports?.[0] || null;
        }
      }
    }
    return null;
  };

  const calculateFlightDuration = (distanceKm) => {
    if (distanceKm < 500) return 0.9;
    if (distanceKm < 1500) return Math.max(distanceKm / 700, 1.5);
    return distanceKm / 800;
  };

  const getFlightType = (
    origin,
    destination,
    originCountry,
    destinationCountry
  ) => {
    if (!origin || !destination) return "Desconocido";

    if (
      originCountry &&
      destinationCountry &&
      originCountry.toLowerCase() === destinationCountry.toLowerCase()
    ) {
      return "Directo";
    }

    const isOriginGlobal = origin.isGlobal;
    const isDestinationGlobal = destination.isGlobal;

    if (isOriginGlobal && isDestinationGlobal) return "Directo";
    if (isOriginGlobal || isDestinationGlobal) return "1 escala";
    return "2 escalas";
  };

  const {
    originAirport,
    destinationAirport,
    distanceKm,
    durationHrs,
    departureTime,
    arrivalTime,
    returnDepartureTime,
    returnArrivalTime,
    originCountry,
    destinationCountry,
  } = useMemo(() => {
    if (!query || !selectedPackage)
      return {
        originAirport: null,
        destinationAirport: null,
        distanceKm: null,
        durationHrs: null,
        departureTime: null,
        arrivalTime: null,
        returnDepartureTime: null,
        returnArrivalTime: null,
        originCountry: null,
        destinationCountry: null,
      };

    const params = new URLSearchParams(query);
    const originParts = (params.get("origen") || "")
      .split(",")
      .map((s) => s.trim());
    const destinationParts = (params.get("destino") || "")
      .split(",")
      .map((s) => s.trim());

    const originCity = originParts[0];
    const originCountry = originParts[2];
    const destinationCity = destinationParts[0];
    const destinationCountry = destinationParts[2];

    const pkgId = selectedPackage.id;
    const flightKey = `flightData-${pkgId}-${originCity}-${originCountry}`;
    const storedData = sessionStorage.getItem(flightKey);
    if (storedData) {
      const parsed = JSON.parse(storedData);
      return {
        ...parsed,
        departureTime: new Date(parsed.departureTime),
        arrivalTime: new Date(parsed.arrivalTime),
        returnDepartureTime: new Date(parsed.returnDepartureTime),
        returnArrivalTime: new Date(parsed.returnArrivalTime),
        originCountry,
        destinationCountry,
      };
    }

    const departureDate = new Date(params.get("ida"));
    const returnDate = new Date(params.get("vuelta"));

    const originCoords = getCoordsFromCity(originCity, originCountry);
    const destinationCoords = getCoordsFromCity(
      destinationCity,
      destinationCountry
    );

    const originAirport = findAirportByCity(originCity);
    const destinationAirport = findAirportByCity(destinationCity);

    if (!originCoords || !destinationCoords) {
      return {
        originAirport,
        destinationAirport,
        distanceKm: null,
        durationHrs: null,
        departureTime: null,
        arrivalTime: null,
        returnDepartureTime: null,
        returnArrivalTime: null,
        originCountry,
        destinationCountry,
      };
    }

    const distanceKm = calculateDistanceInKm(
      originCoords.lat,
      originCoords.lon,
      destinationCoords.lat,
      destinationCoords.lon
    );

    const durationHrs = calculateFlightDuration(distanceKm);

    const randomHour = Math.floor(Math.random() * (22 - 6 + 1)) + 6;
    const departureTime = new Date(departureDate);
    departureTime.setHours(randomHour, 0, 0, 0);

    const arrivalTime = new Date(
      departureTime.getTime() + durationHrs * 3600 * 1000
    );

    const returnRandomHour = Math.floor(Math.random() * (22 - 6 + 1)) + 6;
    const returnDepartureTime = new Date(returnDate);
    returnDepartureTime.setHours(returnRandomHour, 0, 0, 0);

    const returnArrivalTime = new Date(
      returnDepartureTime.getTime() + durationHrs * 3600 * 1000
    );

    const flightData = {
      originAirport,
      destinationAirport,
      distanceKm,
      durationHrs,
      departureTime,
      arrivalTime,
      returnDepartureTime,
      returnArrivalTime,
      originCountry,
      destinationCountry,
    };

    sessionStorage.setItem(flightKey, JSON.stringify(flightData));

    return flightData;
  }, [query, selectedPackage]);

  const formatTime = (date) =>
    date
      ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "";

  const flightType = getFlightType(
    originAirport,
    destinationAirport,
    originCountry,
    destinationCountry
  );

  if (!selectedPackage) {
    return (
      <section className="flex flex-1 justify-center border-r border-[#dbdbdb] my-2">
        <div className="flex flex-col py-2">
          <h1 className="flex gap-2 items-center text-sm md:text-lg text-[#ad6771] font-bold">
            <Plane size={18} strokeWidth={2} />
            Vuelos
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`flex flex-col flex-1 justify-center py-2 lg:py-4 rounded-lg rounded-r-none rounded-l-none ${
        showBorder
          ? "border-3 border-r-0 border-l-0 border-[#ad6771]"
          : "border-0"
      }`}
    >
      <div className="lg:flex lg:flex-col gap-[14px] border-r border-[#dbdbdb] py-2">
        <div className="flex items-center justify-center lg:justify-between lg:w-full lg:px-[5%] ">
          <h1 className="flex gap-2 items-center text-sm md:text-lg text-[#ad6771] font-bold">
            <Plane size={18} strokeWidth={2} />
            Vuelos
          </h1>
          <p
            className="hidden lg:flex text-sm text-[#4a4a4a] hover:text-[#ad6771] cursor-pointer"
            onClick={() => {
              navigate(
                `/paquetes/resultados/vuelos/detalles/${selectedPackage.id}`
              );
            }}
          >
            Cambiar opción
          </p>
        </div>

        {originAirport && destinationAirport && (
          <div className="hidden lg:flex justify-between items-center gap-2 text-base text-[#2a2a2a] lg:px-[15%]">
            <div className="flex flex-col items-center font-bold text-base">
              <span className="text-xs">{originAirport.code}</span>
              <span>{formatTime(departureTime)}</span>
            </div>
            <span className="text-xs border-b-2 border-[#2a5732] px-8 text-[#2a2a2a]">
              {flightType}
            </span>
            <div className="flex flex-col items-center  font-bold text-base">
              <span className="text-xs">{destinationAirport.code}</span>
              <span>{formatTime(arrivalTime)}</span>
            </div>
          </div>
        )}

        {originAirport && destinationAirport && returnDepartureTime && (
          <div className="hidden lg:flex justify-between items-center gap-2 text-base text-[#2a2a2a] lg:px-[15%]">
            <div className="flex flex-col items-center  font-bold text-base">
              <span className="text-xs">{destinationAirport.code}</span>
              <span>{formatTime(returnDepartureTime)}</span>
            </div>
            <span className="text-xs border-b-2 border-[#2a5732] px-8 text-[#2a2a2a]">
              {flightType}
            </span>
            <div className="flex flex-col items-center  font-bold text-base">
              <span className="text-xs">{originAirport.code}</span>
              <span>{formatTime(returnArrivalTime)}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
