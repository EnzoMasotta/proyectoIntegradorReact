import React from "react";
import brasil from "../assets/FeaturedPackagesImgs/brasil.png";
import madrid from "../assets/FeaturedPackagesImgs/madrid.png";
import puntacana from "../assets/FeaturedPackagesImgs/puntacana.png";
import cuotassininteres from "../assets/FeaturedPackagesImgs/cuotassininteres.png";

export function FeaturedPackages() {
  return (
    <div className="flex w-full h-auto mt-10 items-center justify-around lg:justify-center overflow-x-auto gap-5 lg:gap-10 border-r-[15px] px-[3%] border-white no-scrollbar lg:border-none">
      <img src={brasil} alt="" className="h-55 md:h-65 w-auto rounded-lg" />

      <img src={madrid} alt="" className="h-55 md:h-65 w-auto rounded-lg" />

      <img src={puntacana} alt="" className="h-55 md:h-65 w-auto rounded-lg" />

      <img
        src={cuotassininteres}
        alt=""
        className="h-55 md:h-65 w-auto rounded-lg"
      />
    </div>
  );
}
