import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import packages from "../data/packages.json";
import slugify from "slugify";
import { PackagesSteps } from "../components/PackagesSteps";
import {
  Star,
  Wifi,
  Coffee,
  Bath,
  Utensils,
  ParkingCircle,
  Snowflake,
  WavesLadder,
  CalendarDays,
} from "lucide-react";
import { useTotalPrice } from "../contexts/TotalPriceContext";

export function PackagesAcommodationsDetails() {
  const { nombre } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile(1024);
  const { totalPrice, personas, totalNights } = useTotalPrice();

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

  const pkg = allPackages.find(
    (p) => slugify(p.title, { lower: true, strict: true }) === nombre
  );

  useEffect(() => {
    if (!pkg) {
      navigate("/", { replace: true });
    }
  }, [pkg, navigate]);

  if (!pkg) return null;

  const iconMap = {
    wifi: { icon: Wifi, label: "Wifi incluido" },
    desayuno: { icon: Coffee, label: "Desayuno" },
    pileta: { icon: WavesLadder, label: "Pileta" },
    restaurante: { icon: Utensils, label: "Restaurante" },
    estacionamiento: { icon: ParkingCircle, label: "Estacionamiento" },
    aire: { icon: Snowflake, label: "Aire acondicionado" },
  };

  return (
    <main className="bg-[#f2f4f5]">
      <section className="">
        <PackagesSteps selectedPackage={pkg} />

        <div className="flex flex-col relative">
          <img
            src="/HabitacionPrueba.webp"
            alt=""
            className="w-auto h-50 object-cover"
          />

          <div className="flex px-[3%] pt-4 items-center gap-2 rounded-t-2xl bg-[#f2f4f5] overflow-hidden absolute bottom-0 w-full">
            <h1 className="text-xl font-bold text-[#2a2a2a]">{pkg.title}</h1>
            <span className="flex gap-1">
              {[...Array(pkg.stars)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-500" />
              ))}
            </span>
            <button className="hidden lg:flex bg-[#2a5732]">
              Elegir opcion
            </button>
          </div>
        </div>

        {pkg.services?.length > 0 && (
          <div className="flex flex-col px-[3%] gap-1 text-gray-600 text-sm border-t border-[#dbdbdb]">
            <h1 className="text-xl text-[#2a2a2a]">
              Servicios incluidos con este hospedaje
            </h1>
            {pkg.services.map((serv) => {
              const IconComponent = iconMap[serv]?.icon;
              const label = iconMap[serv]?.label;

              return (
                IconComponent && (
                  <div key={serv} className="flex items-center gap-1">
                    <IconComponent size={18} />
                    <span className="">{label}</span>
                  </div>
                )
              );
            })}
          </div>
        )}
      </section>

      {isMobile && (
        <section className="fixed bottom-0 w-full bg-white p-4 border border-[#dbdbdb] rounded-t-lg z-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="flex items-center gap-1 text-xs text-gray-600">
                <CalendarDays size={14} />
                <span className="">{totalNights} noches</span>
              </p>
              <p className="flex flex-col text-sm text-[#4a4a4a]">
                Precio por persona
                <span className="text-lg">
                  ${" "}
                  <span className="font-bold text-[#2a2a2a]">
                    {totalPrice.toLocaleString("es-AR")}
                  </span>
                </span>
              </p>
              <p className="text-xs text-[#4a4a4a]">
                Precio final para {personas}{" "}
                {personas === 1 ? "persona" : "personas"} ${" "}
                {(totalPrice * personas).toLocaleString("es-AR")}
              </p>
            </div>
            <button className="bg-[#2a5732] text-white px-4 py-2 rounded-md">
              Elegir
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
