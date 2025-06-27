import React from "react";
import { useSearchParams } from "react-router-dom";
import packages from "../data/packages.json";
import { PackagesSearchBar } from "../components/PackagesSearchBar";

export function PackagesPageResults() {
  const [searchParams] = useSearchParams();

  const origenParam = searchParams.get("origen") || "";
  const destinoParam = searchParams.get("destino") || "";
  const personas = parseInt(searchParams.get("people") || "1", 10);

  const origen = origenParam.split(",")[0].trim().toLowerCase();
  const destino = destinoParam.split(",")[0].trim().toLowerCase();

  const resultados = packages.filter((pkg) =>
    pkg.destination.toLowerCase().includes(destino)
  );

  return (
    <main className="flex flex-col">
      <section className="bg-[#2a5732] px-3 py-6 lg:justify-center lg:flex lg:py-9">
        <PackagesSearchBar
          defaultOrigen={origenParam}
          defaultDestino={destinoParam}
          defaultPeople={personas}
        />
      </section>

      <section className="p-4 grid gap-4">
        {resultados.length === 0 ? (
          <p className="text-center text-gray-600 mt-8">
            No hay paquetes disponibles con los criterios seleccionados.
          </p>
        ) : (
          resultados.map((pkg) => (
            <div
              key={pkg.id}
              className="border rounded shadow p-4 flex flex-col items-start max-w-md mx-auto"
            >
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h2 className="text-lg font-semibold">{pkg.title}</h2>
              <p className="text-sm text-gray-600">{pkg.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                Precio por persona: ${pkg.price.toLocaleString("es-AR")}
              </p>
              <p className="text-md font-bold mt-1">
                Total: ${(pkg.price * personas).toLocaleString("es-AR")}
              </p>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
