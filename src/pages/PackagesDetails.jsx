import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import packages from "../data/packages.json";
import slugify from "slugify";
import { PackagesSteps } from "../components/PackagesSteps";

export function PackagesDetails() {
  const { nombre } = useParams();
  const navigate = useNavigate();

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

        <div className="flex flex-col-reverse mt-2">
          <h1 className="text-xl font-bold mb-4 text-[#2a2a2a]">{pkg.title}</h1>
          <img
            src="/HabitacionPrueba.webp"
            alt=""
            className="w-auto h-50 object-cover"
          />
        </div>
      </section>
    </main>
  );
}
