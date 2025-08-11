import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import packages from "../data/packages.json";
import { PackagesSteps } from "../components/PackagesSteps";
import { BookingDetails } from "../components/BookingDetails";
import { ChevronLeft } from "lucide-react";

export function PackagesBookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

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
    <main className="bg-[#f2f4f5] pb-6">
      {location.pathname === `/paquetes/resultados/reservas/detalles/${id}` && (
        <PackagesSteps />
      )}
      <button
        type="button"
        className={`flex items-center gap-1 mx-[3%] mb-2 font-bold text-[#2d6a4f] text-sm cursor-pointer ${
          location.pathname ===
          `/paquetes/resultados/reservas/detalles/${pkg.id}`
            ? "pt-0"
            : "pt-2"
        }`}
        onClick={() =>
          location.pathname ===
          `/paquetes/resultados/reservas/detalles/${pkg.id}`
            ? navigate(`/paquetes/resultados/vuelos/detalles/${pkg.id}`)
            : navigate(`/reservas`)
        }
      >
        <ChevronLeft />
        Regresar a la página anterior
      </button>
      <BookingDetails selectedPackage={pkg} />
    </main>
  );
}
