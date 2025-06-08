import React from "react";
import { SearchBarForm } from "./SearchBarForm";
import { useState } from "react";
import { DatePicker } from "./DatePicker";

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

        <DatePicker />
      </form>
    </section>
  );
}
