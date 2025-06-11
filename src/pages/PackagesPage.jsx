import React from "react";
import { PackagesSearchBar } from "../components/PackagesSearchBar";
import { FeaturedPackages } from "../components/FeaturedPackages";

export function PackagesPage() {
  return (
    <main className="flex flex-col">
      <section className="bg-[#2a5732] px-3 py-6 lg:justify-center lg:flex lg:py-9">
        <PackagesSearchBar />
      </section>
      <FeaturedPackages />
    </main>
  );
}
