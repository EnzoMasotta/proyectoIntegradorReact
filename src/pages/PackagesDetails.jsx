import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import packages from "../data/packages.json";
import slugify from "slugify";

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
    <main className="">
      <section className="p-5">
        <h1 className="text-2xl font-normal mb-4 text-[#4a4a4a]">
          {pkg.title}
        </h1>
      </section>
    </main>
  );
}
