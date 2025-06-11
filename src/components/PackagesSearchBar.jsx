import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBarForm } from "./SearchBarForm";
import { DatePicker } from "./DatePicker";
import { GuestsAndRoomsInput } from "./GuestsAndRoomsInput";

export function PackagesSearchBar() {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (origen.trim() !== "") params.append("origen", origen.trim());
    if (destino.trim() !== "") params.append("destino", destino.trim());

    navigate(`/paquetes${params.toString() ? "?" + params.toString() : ""}`);
  };

  return (
    <section className="bg-white p-4 rounded-lg flex flex-col lg:w-[75%]">
      <h1 className="text-[17px] font-normal text-[#4a4a4a]">
        Elegí el paquete perfecto
      </h1>
      <form
        className="flex flex-col items-start lg:flex-row lg:gap-2 lg:items-center"
        onSubmit={handleSubmit}
      >
        <SearchBarForm
          label="Origen"
          placeholder="Ingrese su origen"
          name="origen"
          id="origen"
          value={origen}
          onChange={(e) => setOrigen(e.target.value)}
        />

        <SearchBarForm
          label="Destino"
          placeholder="Ingrese destino"
          name="destino"
          id="destino"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />

        <DatePicker />

        <GuestsAndRoomsInput />

        <button
          type="submit"
          className="mt-4 w-full px-4 py-2 bg-[#2a5732] text-white rounded lg:w-1/3"
        >
          Buscar
        </button>
      </form>
    </section>
  );
}
