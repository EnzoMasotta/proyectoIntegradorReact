import {
  Star,
  Wifi,
  Coffee,
  Utensils,
  ParkingCircle,
  Snowflake,
  WavesLadder,
} from "lucide-react";
import { AcommodationSliderImgs } from "./AcommodationSliderImgs";
import { useState } from "react";

export function AcommodationDetails({ pkg }) {
  const iconMap = {
    wifi: { icon: Wifi, label: "Wifi incluido" },
    desayuno: { icon: Coffee, label: "Desayuno" },
    pileta: { icon: WavesLadder, label: "Pileta" },
    restaurante: { icon: Utensils, label: "Restaurante" },
    estacionamiento: { icon: ParkingCircle, label: "Estacionamiento" },
    aire: { icon: Snowflake, label: "Aire acondicionado" },
  };

  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => setShowFullText((prev) => !prev);

  const maxParagraphsToShow = 2;

  const paragraphsToShow = showFullText
    ? pkg.description
    : pkg.description.slice(0, maxParagraphsToShow);

  return (
    <div className="flex flex-col relative lg:bg-white">
      <AcommodationSliderImgs id={pkg.id} />
      <div className="flex flex-col px-[3%] pt-4 gap-4 rounded-t-2xl bg-white overflow-hidden w-full absolute top-50 lg:relative lg:top-0 md:top-90">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-[#2a2a2a]">{pkg.title}</h1>
          <span className="flex gap-1">
            {[...Array(pkg.stars)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className="text-yellow-500"
                style={{ fill: "currentColor" }}
              />
            ))}
          </span>
        </div>

        {pkg.services?.length > 0 && (
          <div className="flex flex-col gap-2 text-[#4a4a4a] text-sm">
            <h1 className="text-xl font-bold text-[#2a2a2a] border-t border-[#dbdbdb] pt-2">
              Servicios incluidos con este hospedaje
            </h1>
            {pkg.services.map((serv) => {
              const IconComponent = iconMap[serv]?.icon;
              const label = iconMap[serv]?.label;

              return (
                IconComponent && (
                  <div key={serv} className="flex items-center gap-1">
                    <IconComponent size={18} />
                    <span className="">{label}</span>
                  </div>
                )
              );
            })}
          </div>
        )}
        <div>
          <h1 className="text-xl font-bold text-[#2a2a2a] border-t border-[#dbdbdb] pt-2 mb-1">
            Información
          </h1>
          {paragraphsToShow.map((paragraph, index) => (
            <p key={index} className="text-[#4a4a4a] text-sm mt-1 lg:max-w-2xl">
              {paragraph}
            </p>
          ))}
          {pkg.description.length > maxParagraphsToShow && (
            <button
              onClick={toggleText}
              className="text-blue-600 text-sm mt-2 hover:underline"
            >
              {showFullText ? "Leer menos" : "Leer más"}
            </button>
          )}
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-[#2a2a2a] border-t border-[#dbdbdb] pt-2">
            Horarios
          </h1>
          <p className="text-[#4a4a4a] text-sm mt-2">
            Horario de Check in: 13:00 hs
          </p>
          <p className="text-[#4a4a4a] text-sm">
            Horario de Check out: 10:00 hs
          </p>
        </div>
      </div>
    </div>
  );
}
