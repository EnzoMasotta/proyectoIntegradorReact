import React from "react";
import { PackagesSearchBar } from "../components/PackagesSearchBar";
import { FeaturedPackages } from "../components/FeaturedPackages";
import { FeaturedPackageDeals } from "../components/FeaturedPackageDeals";
import { Newsletter } from "../components/Newsletter";
import { AbbreviatedAboutUs } from "../components/AbbreviatedAboutUs";

export function PackagesPage() {
  return (
    <main className="flex flex-col">
      <section className="bg-[#2a5732] px-3 py-6 lg:justify-center lg:flex lg:py-9">
        <PackagesSearchBar />
      </section>
      <FeaturedPackages />
      <FeaturedPackageDeals />
      <AbbreviatedAboutUs />
      <Newsletter />
    </main>
  );
}
