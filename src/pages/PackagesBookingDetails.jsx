import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import packages from "../data/packages.json";
import { PackagesSteps } from "../components/PackagesSteps";
import { BookingDetails } from "../components/BookingDetails";

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
    <main className="bg-[#f2f4f5] px-[3%] py-6">
      <BookingDetails selectedPackage={pkg} />
    </main>
  );
}
