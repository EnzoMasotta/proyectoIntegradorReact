import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "./SearchInput";
import { DatePicker } from "./DatePicker";
import { GuestsAndRoomsInput } from "./GuestsAndRoomsInput";

export function PackagesSearchBar({
  defaultOrigen = "",
  defaultDestino = "",
  defaultRange = { from: undefined, to: undefined },
  defaultPeople = 1,
}) {
  const [origen, setOrigen] = useState(defaultOrigen);
  const [destino, setDestino] = useState(defaultDestino);
  const [range, setRange] = useState(defaultRange);
  const [people, setPeople] = useState(defaultPeople);
  const [errors, setErrors] = useState({
    origen: "",
    destino: "",
    fechaIda: "",
    fechaVuelta: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (submitted) {
      setSubmitted(false);
    }
  }, [people]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    let valid = true;
    const newErrors = {
      origen: "",
      destino: "",
      fechaIda: "",
      fechaVuelta: "",
    };

    if (origen.trim() === "") {
      newErrors.origen = "Campo obligatorio";
      valid = false;
    }
    if (destino.trim() === "") {
      newErrors.destino = "Campo obligatorio";
      valid = false;
    }
    if (
      origen.trim() !== "" &&
      destino.trim() !== "" &&
      origen.trim().toLowerCase() === destino.trim().toLowerCase()
    ) {
      newErrors.destino = "El destino debe ser distinto del origen";
      valid = false;
    }
    if (!range.from) {
      newErrors.fechaIda = "Campo obligatorio";
      valid = false;
    }
    if (!range.to) {
      newErrors.fechaVuelta = "Campo obligatorio";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

    setSubmitted(false);

    const params = new URLSearchParams();
    params.append("origen", origen.trim());
    params.append("destino", destino.trim());
    params.append("ida", range.from.toISOString());
    params.append("vuelta", range.to.toISOString());
    params.append("people", people.toString());
    params.append("scrollTo", "accommodation");

    navigate(`/paquetes/resultados?${params.toString()}`);
  };

  const handleChangeOrigen = (e) => {
    setOrigen(e.target.value);
    if (submitted) setSubmitted(false);
  };
  const handleChangeDestino = (e) => {
    setDestino(e.target.value);
    if (submitted) setSubmitted(false);
  };
  const handleRangeChange = (newRange) => {
    setRange(newRange);
    if (submitted) setSubmitted(false);
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
        <SearchInput
          label="Origen"
          placeholder="Ingrese su origen"
          name="origen"
          id="origen"
          value={origen}
          onChange={handleChangeOrigen}
          error={submitted ? errors.origen : ""}
        />

        <SearchInput
          label="Destino"
          placeholder="Ingrese destino"
          name="destino"
          id="destino"
          value={destino}
          onChange={handleChangeDestino}
          error={submitted ? errors.destino : ""}
        />

        <DatePicker
          range={range}
          setRange={handleRangeChange}
          errorFrom={submitted ? errors.fechaIda : ""}
          errorTo={submitted ? errors.fechaVuelta : ""}
        />

        <GuestsAndRoomsInput
          onChange={setPeople}
          defaultPeople={defaultPeople}
        />

        <button
          type="submit"
          className="mt-4 w-full px-4 py-2 bg-[#2a5732] text-white rounded cursor-pointer lg:w-1/3"
        >
          Buscar
        </button>
      </form>
    </section>
  );
}
