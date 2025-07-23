import {
  Star,
  Wifi,
  Coffee,
  Utensils,
  ParkingCircle,
  Snowflake,
  WavesLadder,
} from "lucide-react";

export function AcommodationDetails({ pkg }) {
  const iconMap = {
    wifi: { icon: Wifi, label: "Wifi incluido" },
    desayuno: { icon: Coffee, label: "Desayuno" },
    pileta: { icon: WavesLadder, label: "Pileta" },
    restaurante: { icon: Utensils, label: "Restaurante" },
    estacionamiento: { icon: ParkingCircle, label: "Estacionamiento" },
    aire: { icon: Snowflake, label: "Aire acondicionado" },
  };

  return (
    <div className="flex flex-col relative">
      <img
        src="/HabitacionPrueba.webp"
        alt=""
        className="w-auto h-60 object-cover"
      />
      <div className="flex flex-col px-[3%] pt-4 gap-2 rounded-t-2xl bg-white overflow-hidden w-full absolute top-50">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-[#2a2a2a]">{pkg.title}</h1>
          <span className="flex gap-1">
            {[...Array(pkg.stars)].map((_, i) => (
              <Star key={i} size={16} className="text-yellow-500" />
            ))}
          </span>
          <button className="hidden lg:flex bg-[#2a5732] text-white px-4 py-2 rounded-md">
            Elegir opcion
          </button>
        </div>

        {pkg.services?.length > 0 && (
          <div className="flex flex-col gap-1 text-gray-600 text-sm">
            <h1 className="text-xl font-bold text-[#2a2a2a] border-t border-[#dbdbdb]">
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
          <h1 className="text-xl font-bold text-[#2a2a2a] border-t border-[#dbdbdb]">
            Informacion importante
          </h1>
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#2a2a2a] border-t border-[#dbdbdb]">
            Horarios
          </h1>
        </div>
      </div>
    </div>
  );
}
