import React from "react";
import { Star, Plane } from "lucide-react";

export function PackagesResults({ results, iconMap, personas }) {
  if (results.length === 0) {
    return (
      <p className="text-center text-gray-600 mt-8">
        No hay paquetes disponibles con los criterios seleccionados.
      </p>
    );
  }

  return (
    <section className=" w-full flex flex-col p-10 gap-2">
      {results.map((pkg) => (
        <div
          key={pkg.id || `${pkg.title}-${pkg.province}-${pkg.country}`}
          className="bg-white w-full border-[#d3d3d3] border rounded flex flex-col "
        >
          <img
            /*pkg.image pkg.title */
            src="/HotelPrueba.jpg"
            alt={pkg.title}
            className="w-auto h-auto object-cover rounded-t"
          />

          <section className="p-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-semibold text-[#2a2a2a]">
                  {pkg.title}
                </h2>
                <span className="flex gap-1">
                  {[...Array(pkg.stars)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-500" />
                  ))}
                </span>
              </div>

              {pkg.services?.length > 0 && (
                <div className="flex gap-3 text-gray-600 text-sm">
                  {pkg.services.map((serv) => {
                    const IconComponent = iconMap[serv]?.icon;
                    const label = iconMap[serv]?.label;

                    return (
                      IconComponent && (
                        <div key={serv} className="flex items-center gap-1">
                          <IconComponent size={18} />
                          <span className="hidden md:flex">{label}</span>
                        </div>
                      )
                    );
                  })}
                </div>
              )}
            </div>

            <span className="flex items-center gap-1 text-[#4a4a4a]">
              <Plane size={16} />
              <p>Vuelos + alojamiento</p>
            </span>

            {typeof pkg.price === "number" ? (
              <div>
                <p className="text-sm text-[#4a4a4a] flex flex-col">
                  Precio por persona{" "}
                  <span className="text-xl">
                    $
                    <span className="font-bold text-[#2a2a2a]">
                      {pkg.price.toLocaleString("es-AR")}
                    </span>
                  </span>
                </p>
                <p className="text-md  text-[#4a4a4a]">
                  Precio final para {personas}{" "}
                  {personas === 1 ? "persona" : "personas"} $
                  {(pkg.price * personas).toLocaleString("es-AR")}
                </p>
              </div>
            ) : (
              <p className="text-sm text-red-500">Precio no disponible</p>
            )}
          </section>
        </div>
      ))}
    </section>
  );
}
