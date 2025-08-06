import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import packages from "../data/packages.json";
import { PackagesSteps } from "../components/PackagesSteps";
import { BookingDetails } from "../components/BookingDetails";
import { ChevronLeft } from "lucide-react";

export function PackagesBookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

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
      <PackagesSteps />
      <button
        type="button"
        className="flex items-center gap-1 mx-[3%] mb-2 font-bold text-[#2d6a4f] text-sm cursor-pointer"
        onClick={() => {
          navigate(`/paquetes/resultados/vuelos/detalles/${pkg.id}`);
        }}
      >
        <ChevronLeft />
        Regresar a la pagina anterior
      </button>
      <BookingDetails selectedPackage={pkg} />
    </main>
  );
}
