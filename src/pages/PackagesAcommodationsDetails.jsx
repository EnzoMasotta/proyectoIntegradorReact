import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import packages from "../data/packages.json";
import slugify from "slugify";
import { PackagesSteps } from "../components/PackagesSteps";
import { Star } from "lucide-react";

export function PackagesAcommodationsDetails() {
  const { nombre } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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

  return (
    <main className="bg-[#f2f4f5]">
      <section className="">
        <PackagesSteps selectedPackage={pkg} />

        <div className="flex flex-col-reverse">
          <div className="flex items-center gap-2">
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

          <img
            src="/HabitacionPrueba.webp"
            alt=""
            className="w-auto h-50 object-cover"
          />
        </div>
      </section>

      {isMobile && (
        <section className="fixed bottom-0 w-full bg-white p-4 border border-[#dbdbdb] rounded-t-lg z-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{pkg.title}</p>
              <p className="text-base font-semibold text-[#2a2a2a]">
                Desde ${pkg.totalPrice}
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
