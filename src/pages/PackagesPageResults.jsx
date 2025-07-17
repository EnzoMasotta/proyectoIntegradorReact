import React, { useState, useEffect } from "react";
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

export function PackagesPageResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const origenParam = searchParams.get("origen") || "";
  const destinoParam = searchParams.get("destino") || "";
  const personas = parseInt(searchParams.get("people") || "1", 10);

  const idaParam = searchParams.get("ida");
  const vueltaParam = searchParams.get("vuelta");

  const parseDate = (iso) => {
    if (!iso) return undefined;
    const d = new Date(iso);
    return isNaN(d) ? undefined : d;
  };

  const [range, setRange] = useState({
    from: parseDate(idaParam),
    to: parseDate(vueltaParam),
  });

  useEffect(() => {
    if (range.from && range.to) {
      const params = new URLSearchParams(searchParams);
      params.set("ida", range.from.toISOString());
      params.set("vuelta", range.to.toISOString());
      setSearchParams(params, { replace: true });
    }
  }, [range.from, range.to]);

  const origen = origenParam.split(",")[0].trim().toLowerCase();
  const destino = destinoParam.split(",")[0].trim().toLowerCase();

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
        });
      });
    }
  }

  const results = allPackages.filter(
    (pkg) =>
      pkg.province?.toLowerCase().includes(destino) ||
      pkg.country?.toLowerCase().includes(destino) ||
      pkg.title?.toLowerCase().includes(destino)
  );

  const iconMap = {
    wifi: { icon: Wifi, label: "Wifi incluido" },
    desayuno: { icon: Coffee, label: "Desayuno" },
    pileta: { icon: WavesLadder, label: "Pileta" },
    restaurante: { icon: Utensils, label: "Restaurante" },
    estacionamiento: { icon: ParkingCircle, label: "Estacionamiento" },
    aire: { icon: Snowflake, label: "Aire acondicionado" },
  };

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

      <div className="bg-[#f2f4f5] md:px-[3%] lg:px-[8%] flex flex-col lg:flex-row">
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
