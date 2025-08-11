import React from "react";
import { Globe2, PlaneTakeoff, HeartHandshake } from "lucide-react";

export function AboutUs() {
  return (
    <main className="w-full min-h-screen px-[3%] py-16 bg-white text-[#2a2a2a] flex flex-col items-center">
      <div className="max-w-5xl w-full flex flex-col items-center text-center gap-10">
        <h1 className="text-4xl font-extrabold text-[#2d6a4f]">
          Sobre <span className="logo text-[#ad6771]">Katafly</span>
        </h1>

        <p className="text-lg leading-relaxed max-w-3xl">
          En Katafly creemos que viajar es mucho más que desplazarse de un lugar
          a otro. Es crear recuerdos inolvidables, descubrir culturas y
          disfrutar cada experiencia con tranquilidad y confianza. Por eso
          diseñamos paquetes turísticos únicos, pensando en vos y en la mejor
          calidad para que vivas el viaje que soñás.
        </p>

        <section className="w-full max-w-3xl text-left">
          <h2 className="text-2xl font-semibold text-[#2d6a4f] mb-4">
            Nuestra misión
          </h2>
          <p className="mb-6 leading-relaxed">
            Nuestra misión es facilitar viajes accesibles, seguros y memorables.
            Trabajamos con proveedores confiables y diseñamos experiencias
            personalizadas que se adaptan a cada viajero.
          </p>

          <h2 className="text-2xl font-semibold text-[#2d6a4f] mb-4">
            ¿Por qué elegirnos?
          </h2>
          <ul className="list-disc list-inside space-y-3 leading-relaxed text-[#2a2a2a]">
            <li>
              Paquetes turísticos con atención personalizada y calidad
              garantizada.
            </li>
            <li>
              Asesoría integral para que elijas el destino ideal según tus
              gustos y presupuesto.
            </li>
            <li>
              Compromiso con la satisfacción y seguridad de nuestros clientes.
            </li>
          </ul>
        </section>

        <section className="w-full max-w-5xl mt-16 flex flex-col sm:flex-row gap-14 justify-center items-center">
          <div className="flex flex-col items-center max-w-xs text-center">
            <Globe2 size={56} className="text-[#2d6a4f] mb-4" />
            <h3 className="text-2xl font-semibold text-[#2d6a4f] mb-2">
              Destinos globales
            </h3>
            <p>
              Te conectamos con los destinos más increíbles para que tu viaje
              sea una aventura inolvidable.
            </p>
          </div>

          <div className="flex flex-col items-center max-w-xs text-center">
            <PlaneTakeoff size={56} className="text-[#2d6a4f] mb-4" />
            <h3 className="text-2xl font-semibold text-[#2d6a4f] mb-2">
              Viajes sin estrés
            </h3>
            <p>
              Nos encargamos de cada detalle para que solo te preocupes por
              disfrutar.
            </p>
          </div>

          <div className="flex flex-col items-center max-w-xs text-center">
            <HeartHandshake size={56} className="text-[#2d6a4f] mb-4" />
            <h3 className="text-2xl font-semibold text-[#2d6a4f] mb-2">
              Atención cercana
            </h3>
            <p>
              Te acompañamos en cada paso como parte de nuestra gran familia
              viajera.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
