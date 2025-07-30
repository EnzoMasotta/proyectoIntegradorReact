import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import packages from "../data/packages.json";
import { PackagesSteps } from "../components/PackagesSteps";
import { FlightsDetails } from "../components/FlightsDetails";
import { useIsMobile } from "../hooks/useIsMobile";
import { useTotalPrice } from "../contexts/TotalPriceContext";
import { CalendarDays } from "lucide-react";

export function PackagesFlightsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile(1024);
  const { totalPrice, personas, totalNights } = useTotalPrice();

  const allPackages = [];
  for (const country in packages) {
    const provinces = packages[country];
    for (const province in provinces) {
      const pkgList = provinces[province];
      pkgList.forEach((pkg) => {
        allPackages.push({ ...pkg, country, province });
      });
    }
  }

  const pkg = allPackages.find((p) => p.id === Number(id));

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
        <FlightsDetails selectedPackage={pkg} />
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
                navigate(`/paquetes/resultados/reservas/detalles/${pkg.id}`);
              }}
              className="bg-[#2a5732] text-white px-4 py-2 rounded-md"
            >
              Continuar
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
