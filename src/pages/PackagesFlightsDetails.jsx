import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FlightStep } from "../components/FlightStep";
import packages from "../data/packages.json";
import { PackagesSteps } from "../components/PackagesSteps";

export function PackagesFlightsDetails() {
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
    <main className="bg-[#f2f4f5]">
      <PackagesSteps selectedPackage={pkg} />
      <h1>hola</h1>
    </main>
  );
}
