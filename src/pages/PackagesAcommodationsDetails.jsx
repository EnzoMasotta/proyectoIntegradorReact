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
import { AcommodationDetails } from "../components/AcommodationDetails";

export function PackagesAcommodationsDetails() {
  const { id } = useParams();
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

  const pkg = allPackages.find((p) => String(p.id) === id);

  useEffect(() => {
    if (!pkg) {
      navigate("/", { replace: true });
    }
  }, [pkg, navigate]);

  if (!pkg) return null;

  return (
    <main className="bg-[#f2f4f5]">
      <section className="">
        <PackagesSteps selectedPackage={pkg} />
        <AcommodationDetails pkg={pkg} />
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
            <button
              onClick={() => {
                navigate(`/paquetes/resultados/vuelos/detalles/${pkg.id}`);
              }}
              className="bg-[#2a5732] text-white px-4 py-2 rounded-md"
            >
              Elegir
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
