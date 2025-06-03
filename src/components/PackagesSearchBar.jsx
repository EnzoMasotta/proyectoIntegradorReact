import React from "react";
import { SearchBarForm } from "./SearchBarForm";
import { useState } from "react";

export function PackagesSearchBar() {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fechaIda, setFechaIda] = useState("");
  const [fechaVuelta, setFechaVuelta] = useState("");

  return (
    <section className="bg-white p-4 rounded-lg flex flex-col">
      <h1 className="text-[17px] font-normal text-[#4a4a4a]">
        Elegí el paquete perfecto
      </h1>
      <form className="flex flex-col items-start">
        <SearchBarForm
          label="Destino"
          placeholder="Ingrese destino"
          name="destino"
          id="destino"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />

        <SearchBarForm
          label="Origen"
          placeholder="Ingrese su origen"
          name="origen"
          id="origen"
          value={origen}
          onChange={(e) => setOrigen(e.target.value)}
        />

        <SearchBarForm
          label="Fecha de ida"
          placeholder="Seleccione la fecha de ida"
          name="fechaIda"
          id="fechaIda"
          type="date"
          value={fechaIda}
          onChange={(e) => {
            setFechaIda(e.target.value);
            // Si la fecha vuelta es anterior, la reseteamos
            if (fechaVuelta && e.target.value > fechaVuelta) {
              setFechaVuelta("");
            }
          }}
        />

        <SearchBarForm
          label="Fecha de vuelta"
          placeholder="Seleccione la fecha de vuelta"
          name="fechaVuelta"
          id="fechaVuelta"
          type="date"
          value={fechaVuelta}
          min={fechaIda || undefined} // no permite fechas antes que ida
          onChange={(e) => {
            if (fechaIda && e.target.value < fechaIda) {
              alert("La fecha de vuelta no puede ser anterior a la de ida");
              return;
            }
            setFechaVuelta(e.target.value);
          }}
          disabled={!fechaIda} // deshabilitar si no hay fecha de ida
        />
      </form>
    </section>
  );
}
