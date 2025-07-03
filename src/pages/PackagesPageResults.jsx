import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import hoteles from "../data/hoteles.json";
import { PackagesSearchBar } from "../components/PackagesSearchBar";

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

  for (const pais in hoteles) {
    const provincias = hoteles[pais];
    for (const provincia in provincias) {
      const hotelesProvincia = provincias[provincia];
      hotelesProvincia.forEach((hotel) => {
        allPackages.push({
          ...hotel,
          country: pais,
          province: provincia,
        });
      });
    }
  }

  const resultados = allPackages.filter(
    (pkg) =>
      pkg.province?.toLowerCase().includes(destino) ||
      pkg.country?.toLowerCase().includes(destino) ||
      pkg.title?.toLowerCase().includes(destino)
  );

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

      <section className="flex justify-between">
        {resultados.length === 0 ? (
          <p className="text-center text-gray-600 mt-8">
            No hay paquetes disponibles con los criterios seleccionados.
          </p>
        ) : (
          resultados.map((pkg) => (
            <div
              key={pkg.id || `${pkg.title}-${pkg.province}-${pkg.country}`}
              className="border rounded shadow p-4 flex flex-col"
            >
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h2 className="text-lg font-semibold">{pkg.title}</h2>
              <p className="text-sm text-gray-600">{pkg.description}</p>
              <p className="text-sm text-gray-500">
                Ubicación: {pkg.province}, {pkg.country}
              </p>

              {typeof pkg.price === "number" ? (
                <>
                  <p className="mt-2 text-sm text-gray-500">
                    Precio por persona: ${pkg.price.toLocaleString("es-AR")}
                  </p>
                  <p className="text-md font-bold mt-1">
                    Total: ${(pkg.price * personas).toLocaleString("es-AR")}
                  </p>
                </>
              ) : (
                <p className="text-sm text-red-500 mt-2">
                  Precio no disponible
                </p>
              )}
            </div>
          ))
        )}
      </section>
    </main>
  );
}
