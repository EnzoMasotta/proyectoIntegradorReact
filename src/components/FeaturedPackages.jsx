import React from "react";
import brasil from "../assets/FeaturedPackagesImgs/brasil.png";
import madrid from "../assets/FeaturedPackagesImgs/madrid.png";
import puntacana from "../assets/FeaturedPackagesImgs/puntacana.png";
import cuotassininteres from "../assets/FeaturedPackagesImgs/cuotassininteres.png";

export function FeaturedPackages() {
  return (
    <div className="flex w-full h-auto mt-10 items-center justify-around overflow-x-auto px-[3%] gap-4 border-r-[15px] border-white no-scrollbar lg:border-none">
      <img
        src={brasil}
        alt=""
        className="h-65 md:h-80 w-auto rounded-2xl cursor-pointer"
      />

      <img
        src={madrid}
        alt=""
        className="h-65 md:h-80 w-auto rounded-2xl cursor-pointer"
      />

      <img
        src={puntacana}
        alt=""
        className="h-65 md:h-80 w-auto rounded-2xl cursor-pointer"
      />

      <img
        src={cuotassininteres}
        alt=""
        className="h-65 md:h-80 w-auto rounded-2xl cursor-pointer"
      />
    </div>
  );
}
