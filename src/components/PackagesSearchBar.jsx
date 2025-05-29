import React from "react";

export function PackagesSearchBar() {
  return (
    <section className="bg-white p-4 rounded-lg flex flex-col">
      <h1 class="text-[17px] font-semibold text-[#4a4a4a]">Paquetes</h1>
      <form className="flex flex-col" action="">
        <label className="text-[10px] text-[#4a4a4a]" htmlFor="">
          Destino
        </label>
        <input
          className="w-[80%] border-1 border-[#4a4a4a]"
          type="search"
          name=""
          id=""
          placeholder="Ingrese destino"
        />
        <label className="text-[10px] text-[#4a4a4a]" htmlFor="">
          Origen
        </label>
        <input
          className="w-[80%] border-1 text-[#4a4a4a]"
          type="search"
          name=""
          id=""
          placeholder="Ingrese su origen"
        />
      </form>
    </section>
  );
}
