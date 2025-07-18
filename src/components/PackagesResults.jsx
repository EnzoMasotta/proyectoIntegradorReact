import React from "react";
import { Star, Plane, Info } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import slugify from "slugify";

export function PackagesResults({ results, iconMap, personas }) {
  if (results.length === 0) {
    return (
      <p className="text-center text-gray-600 mt-8">
        No hay paquetes disponibles con los criterios seleccionados.
      </p>
    );
  }

  return (
    <section className=" w-full flex flex-col p-[8%] md:p-[3%] md:pt-0 lg:pr-25 gap-6">
      {results.map((pkg) => (
        <NavLink
          to={`/paquetes/resultados/detalles/${slugify(pkg.title, {
            lower: true,
            strict: true,
          })}`}
          key={pkg.id || `${pkg.title}-${pkg.province}-${pkg.country}`}
          className="bg-white w-full border-[#dbdbdb] border transition duration-500 hover:shadow-lg  rounded-md flex flex-col md:flex-row md:justify-between cursor-pointer"
        >
          <img
            /*pkg.image pkg.title */
            src="/HotelPrueba.jpg"
            alt={pkg.title}
            className="w-auto h-50 md:h-70 md:w-70 lg:h-85 lg:w-[40%] object-cover rounded-t md:rounded-l md:rounded-r-none"
          />

          <section className="p-4 md:flex md:flex-1 md:justify-between">
            <div className="">
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
                <div
                  className="flex gap-3 text-gray-600 text-sm mb-1 md:mt-2 md:flex-col md:gap-1
                 "
                >
                  {pkg.services.map((serv) => {
                    const IconComponent = iconMap[serv]?.icon;
                    const label = iconMap[serv]?.label;

                    return (
                      IconComponent && (
                        <div key={serv} className="flex items-center gap-1 ">
                          <IconComponent size={18} />
                          <span className="hidden md:flex">{label}</span>
                        </div>
                      )
                    );
                  })}
                </div>
              )}
            </div>

            <div className="">
              <span className="flex items-center gap-1 text-sm text-[#4a4a4a] border-t-1 md:border-t-0 border-[#dbdbdb]">
                <Plane size={14} />
                <p>Vuelos + alojamiento</p>
              </span>

              {typeof pkg.price === "number" ? (
                <div>
                  <p className="text-sm text-[#4a4a4a] flex flex-col">
                    Precio por persona{" "}
                    <span className="text-xl ">
                      $
                      <span className="font-bold text-[#2a2a2a]">
                        {pkg.price.toLocaleString("es-AR")}
                      </span>
                    </span>
                  </p>
                  <p className="text-xs text-[#4a4a4a]">
                    Precio final para {personas}{" "}
                    {personas === 1 ? "persona" : "personas"} $
                    {(pkg.price * personas).toLocaleString("es-AR")}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-red-500">Precio no disponible</p>
              )}
            </div>
          </section>
        </NavLink>
      ))}
    </section>
  );
}
