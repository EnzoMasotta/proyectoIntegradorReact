import { Check, ChevronLeft, SlidersHorizontal } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

export function PackagesFilter({ filters, setFilters, sortBy, setSortBy }) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile(1024);

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

  const handleStarsChange = (e) => {
    const value = parseInt(e.target.value);
    setFilters((prev) => ({
      ...prev,
      stars: isNaN(value) ? null : value,
    }));
  };

  const servicesLabels = {
    wifi: "Wifi incluido",
    desayuno: "Desayuno",
    pileta: "Pileta",
    restaurante: "Restaurante",
    estacionamiento: "Estacionamiento",
    aire: "Aire acondicionado",
  };

  const toggleService = (service) => {
    setFilters((prev) => {
      const updated = prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services: updated };
    });
  };

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-between px-4 py-2 ml-4 w-[25%] md:w-[15%] bg-white border border-[#dbdbdb] rounded-lg text-sm text-[#2a2a2a] mb-2"
        >
          <SlidersHorizontal size={14} />
          Filtros
        </button>

        {open && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col p-4 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filtros</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className=" text-xl font-bold mb-4 text-[#4a4a4a]"
                aria-label="Cerrar"
              >
                <ChevronLeft />
              </button>
            </div>

            <div className="border-b border-[#dbdbdb] pb-3 mb-4">
              <label
                className="block font-semibold text-sm text-[#2a2a2a]"
                htmlFor="mobile-sort-select"
              >
                Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-500 px-2 py-1 rounded outline-0 text-sm text-[#4a4a4a]"
                id="mobile-sort-select"
                name="mobile-sort"
              >
                <option value="">Sin ordenar</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="stars-asc">Estrellas: menor a mayor</option>
                <option value="stars-desc">Estrellas: mayor a menor</option>
              </select>
            </div>

            <div className="border-b border-[#dbdbdb] pb-3 mb-4">
              <label
                className="block font-semibold text-sm text-[#2a2a2a]"
                htmlFor="mobile-stars-select"
              >
                Estrellas
              </label>
              <select
                value={filters.stars || ""}
                onChange={handleStarsChange}
                className="w-full border border-gray-500 px-2 py-1 rounded outline-0 text-sm text-[#4a4a4a]"
                id="mobile-stars-select"
                name="mobile-stars"
              >
                <option value="">Todas</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="2">⭐⭐</option>
                <option value="1">⭐</option>
              </select>
            </div>

            <div>
              <h3 className="block font-semibold text-sm text-[#2a2a2a]">
                Servicios
              </h3>
              <div className="flex flex-col gap-1 text-sm text-[#4a4a4a]">
                {Object.keys(servicesLabels).map((serv) => (
                  <label
                    key={serv}
                    className="flex items-center gap-2 cursor-pointer select-none relative"
                    htmlFor={serv}
                  >
                    <input
                      type="checkbox"
                      checked={filters.services.includes(serv)}
                      onChange={() => toggleService(serv)}
                      className="absolute opacity-0 w-5 h-5 cursor-pointer"
                      id={serv}
                      name={`mobile-services-${serv}`}
                    />
                    <span
                      className="w-6 h-6 flex justify-center items-center border-2 border-gray-500 rounded-md
                      transition-colors duration-200 bg-white"
                    >
                      {filters.services.includes(serv) && (
                        <Check size={16} strokeWidth={3} color="#2a5732" />
                      )}
                    </span>
                    {servicesLabels[serv]}
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-6 py-2 px-4 bg-[#2a5732] text-white rounded text-sm font-semibold"
              type="button"
            >
              Aplicar filtros
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <section className="w-80 p-4 rounded-lg border border-[#dbdbdb] bg-white flex flex-col gap-2">
      <div className="border-b border-[#dbdbdb] pb-3">
        <label
          className="block font-semibold text-sm text-[#2a2a2a]"
          htmlFor="sort-select"
        >
          Ordenar por
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border border-gray-500 px-2 py-1 rounded outline-0 text-sm text-[#4a4a4a]"
          id="sort-select"
          name="sort"
        >
          <option value="">Sin ordenar</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="stars-asc">Estrellas: menor a mayor</option>
          <option value="stars-desc">Estrellas: mayor a menor</option>
        </select>
      </div>

      <div className="border-b border-[#dbdbdb] pb-3">
        <label
          className="block font-semibold text-sm text-[#2a2a2a]"
          htmlFor="stars-select"
        >
          Estrellas
        </label>
        <select
          value={filters.stars || ""}
          onChange={handleStarsChange}
          className="w-full border border-gray-500 px-2 py-1 rounded outline-0 text-sm text-[#4a4a4a]"
          id="stars-select"
          name="stars"
        >
          <option value="">Todas</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold text-sm text-[#2a2a2a]">
          Servicios
        </label>
        <div className="flex flex-col gap-1 text-sm text-[#4a4a4a]">
          {[
            "wifi",
            "desayuno",
            "pileta",
            "restaurante",
            "aire",
            "estacionamiento",
          ].map((serv) => (
            <label
              key={serv}
              className="flex items-center gap-2 cursor-pointer select-none relative"
              htmlFor={serv}
            >
              <input
                type="checkbox"
                checked={filters.services.includes(serv)}
                onChange={() => toggleService(serv)}
                className="absolute opacity-0 w-5 h-5 cursor-pointer"
                id={serv}
                name={`mobile-services-${serv}`}
              />
              <span
                className="w-6 h-6 flex justify-center items-center border-2 border-gray-500 rounded-md
                 transition-colors duration-200
                 bg-white"
              >
                {filters.services.includes(serv) && (
                  <Check size={16} strokeWidth={3} color="#2a5732" />
                )}
              </span>

              {servicesLabels[serv] || serv}
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}
