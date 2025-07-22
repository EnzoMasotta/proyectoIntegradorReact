import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import packages from "../data/packages.json";
import { PackagesSearchBar } from "../components/PackagesSearchBar";
import { PackagesFilter } from "../components/PackagesFilter";
import { PackagesResults } from "../components/PackagesResults";
import {
  Wifi,
  Coffee,
  Bath,
  Utensils,
  ParkingCircle,
  Snowflake,
  WavesLadder,
} from "lucide-react";
import { PackagesSteps } from "../components/PackagesSteps";
import { calculateDistanceInKm } from "../utils/distanceCalculator";
import { locationsByCountry } from "../data/locations";

export function PackagesPageResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const origenParam = searchParams.get("origen") || "";
  const destinoParam = searchParams.get("destino") || "";
  const personas = parseInt(searchParams.get("people") || "1", 10);

  const parseDate = (iso) => {
    if (!iso) return undefined;
    const d = new Date(iso);
    return isNaN(d) ? undefined : d;
  };

  const [range, setRange] = useState({
    from: parseDate(searchParams.get("ida")),
    to: parseDate(searchParams.get("vuelta")),
  });

  useEffect(() => {
    setRange({
      from: parseDate(searchParams.get("ida")),
      to: parseDate(searchParams.get("vuelta")),
    });
  }, [searchParams]);

  const origenCity = origenParam.split(",")[0].trim();
  const destinoCity = destinoParam.split(",")[0].trim().toLowerCase();

  const allPackages = [];

  for (const pais in packages) {
    const provincias = packages[pais];
    for (const provincia in provincias) {
      const packagesProvincia = provincias[provincia];
      packagesProvincia.forEach((hotel) => {
        allPackages.push({
          ...hotel,
          country: pais,
          province: provincia,
          city: provincia,
        });
      });
    }
  }

  const findCityCoords = (cityName) => {
    for (const country in locationsByCountry) {
      const cityObj = locationsByCountry[country].find(
        (c) => c.city.toLowerCase() === cityName.toLowerCase()
      );
      if (cityObj) return cityObj;
    }
    return null;
  };

  const fromCoords = findCityCoords(origenCity);

  const fixedFlightCost = 100000;
  const pricePerKm = 150;

  const results = allPackages
    .filter(
      (pkg) =>
        pkg.province?.toLowerCase().includes(destinoCity) ||
        pkg.country?.toLowerCase().includes(destinoCity) ||
        pkg.title?.toLowerCase().includes(destinoCity)
    )
    .map((pkg) => {
      const toCoords = findCityCoords(pkg.city);
      let distanceCost = 0;

      if (fromCoords && toCoords) {
        const distance = calculateDistanceInKm(
          fromCoords.lat,
          fromCoords.lon,
          toCoords.lat,
          toCoords.lon
        );
        distanceCost = Math.round(distance * pricePerKm);
      }

      const totalNights =
        range.from && range.to
          ? Math.max(
              1,
              Math.round((range.to - range.from) / (1000 * 60 * 60 * 24))
            )
          : 1;

      const totalFlightCost = fixedFlightCost + distanceCost;
      const totalPrice = pkg.pricePerNight * totalNights + totalFlightCost;

      return {
        ...pkg,
        pricePerNight: pkg.pricePerNight,
        totalNights,
        flightCostFixed: fixedFlightCost,
        flightCostVariable: distanceCost,
        totalFlightCost,
        totalPrice,
      };
    });

  const iconMap = {
    wifi: { icon: Wifi, label: "Wifi incluido" },
    desayuno: { icon: Coffee, label: "Desayuno" },
    pileta: { icon: WavesLadder, label: "Pileta" },
    restaurante: { icon: Utensils, label: "Restaurante" },
    estacionamiento: { icon: ParkingCircle, label: "Estacionamiento" },
    aire: { icon: Snowflake, label: "Aire acondicionado" },
  };

  const sectionRef = useRef(null);

  useEffect(() => {
    if (searchParams.get("scrollTo") === "accommodation") {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
      const params = new URLSearchParams(searchParams);
      params.delete("scrollTo");
      setSearchParams(params, { replace: true });
    }
  }, [searchParams]);

  return (
    <main className="flex flex-col">
      <section className="bg-[#2a5732] px-3 py-6 lg:justify-center lg:flex lg:py-9">
        <PackagesSearchBar
          defaultOrigen={origenParam}
          defaultDestino={destinoParam}
          defaultPeople={personas}
          defaultRange={range}
          setRange={setRange}
        />
      </section>

      <PackagesSteps />

      <div
        className="bg-[#f2f4f5] md:px-[3%] lg:px-[8%] flex flex-col lg:flex-row"
        ref={sectionRef}
        id="accommodation"
      >
        <PackagesFilter />

        <PackagesResults
          results={results}
          iconMap={iconMap}
          personas={personas}
        />
      </div>
    </main>
  );
}
