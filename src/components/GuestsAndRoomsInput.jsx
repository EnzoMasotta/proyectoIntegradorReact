import { ChevronLeft, Plus, Minus } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

export const GuestsAndRoomsInput = ({
  label = "Personas",
  onChange,
  defaultPeople = 1,
}) => {
  const isMobile = useIsMobile();

  const MAX_ROOMS = 4;

  const createRoomsFromPeople = (totalPeople) => {
    let adults = totalPeople > 0 ? totalPeople : 1;
    let children = 0;
    if (adults > 8) adults = 8;
    return [{ adults, children }];
  };

  const [rooms, setRooms] = useState(() =>
    createRoomsFromPeople(defaultPeople)
  );
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const toggleOpen = () => setOpen((o) => !o);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (isMobile) {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open, isMobile]);

  const changeGuestCount = (roomIndex, type, delta) => {
    setRooms((prev) => {
      const updated = [...prev];
      const room = { ...updated[roomIndex] };
      const newCount = room[type] + delta;

      if (type === "children" && newCount < 0) return prev;
      if (type === "adults" && newCount < 1) return prev;

      const totalPeople = room.adults + room.children + delta;
      if (totalPeople > 8) return prev;

      room[type] = newCount;
      updated[roomIndex] = room;
      return updated;
    });
  };

  const addRoom = () => {
    if (rooms.length >= MAX_ROOMS) return;
    setRooms((prev) => [...prev, { adults: 1, children: 0 }]);
  };

  const removeRoom = (roomIndex) => {
    setRooms((prev) => prev.filter((_, i) => i !== roomIndex));
  };

  const totalAdults = rooms.reduce((a, r) => a + r.adults, 0);
  const totalChildren = rooms.reduce((a, r) => a + r.children, 0);
  const totalPeople = totalAdults + totalChildren;
  const displayValue = `${totalPeople} persona${totalPeople !== 1 ? "s" : ""}`;

  useEffect(() => {
    if (onChange) {
      onChange(totalPeople);
    }
  }, [totalPeople, onChange]);

  return (
    <div ref={containerRef} className="relative w-full mt-4 lg:w-1/2">
      <input
        id="personas"
        type="text"
        value={displayValue}
        readOnly
        onClick={toggleOpen}
        placeholder={label}
        className="w-full border border-gray-400 text-[#2a2a2a] px-3 pt-6 pb-2 rounded-md focus:outline-none focus:border-blue-500 cursor-pointer lg:placeholder:text-sm lg:text-sm"
      />
      <label
        htmlFor="personas"
        className="absolute left-3 top-2 text-xs text-gray-500 pointer-events-none"
      >
        {label}
      </label>

      {open &&
        (isMobile ? (
          <div className="fixed inset-0 bg-white bg-opacity-60 flex flex-col z-50">
            <div className="bg-white flex flex-col flex-grow p-4 overflow-auto">
              <button
                type="button"
                onClick={toggleOpen}
                className=" text-xl font-bold mb-4 text-[#4a4a4a]"
                aria-label="Cerrar"
              >
                <ChevronLeft />
              </button>
              {rooms.map((room, i) => (
                <RoomSelector
                  key={i}
                  room={room}
                  index={i}
                  changeGuestCount={changeGuestCount}
                  removeRoom={removeRoom}
                />
              ))}
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={addRoom}
                  disabled={rooms.length >= MAX_ROOMS}
                  className={`text-[#2a5732] font-medium cursor-pointer ${
                    rooms.length >= MAX_ROOMS
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Agregar habitación
                </button>
                <button
                  type="button"
                  onClick={toggleOpen}
                  className="bg-[#2a5732] text-white py-2 px-4 rounded-md"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute mt-1 bg-white border border-gray-300 rounded-md p-4 z-10 shadow-lg max-h-96 overflow-auto w-[400px] left-1/2 -translate-x-1/2">
            {rooms.map((room, i) => (
              <RoomSelector
                key={i}
                room={room}
                index={i}
                changeGuestCount={changeGuestCount}
                removeRoom={removeRoom}
              />
            ))}

            <div className="flex justify-between items-center ">
              <button
                type="button"
                onClick={addRoom}
                disabled={rooms.length >= MAX_ROOMS}
                className={`text-[#2a5732] font-medium cursor-pointer ${
                  rooms.length >= MAX_ROOMS ? "opacity-50" : ""
                }`}
              >
                Agregar habitación
              </button>
              <button
                type="button"
                onClick={toggleOpen}
                className="bg-[#2a5732] text-white py-1.5 px-4 rounded-md cursor-pointer"
              >
                Aplicar
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

const RoomSelector = ({ room, index, changeGuestCount, removeRoom }) => (
  <div className="mb-4 border-b border-[#a8a8a8] p-3">
    <div className="flex justify-between items-center mb-4">
      <h4 className="font-normal text-[#4a4a4a]">Habitación {index + 1}</h4>
      {index > 0 && (
        <button
          type="button"
          onClick={() => removeRoom(index)}
          className="text-red-600 hover:text-red-800 text-sm font-normal cursor-pointer"
          aria-label={`Eliminar habitación ${index + 1}`}
        >
          Eliminar
        </button>
      )}
    </div>

    {["adults", "children"].map((type) => (
      <div key={type} className="flex justify-between items-center mb-4">
        <div className="flex flex-col leading-[1]">
          <span className="capitalize font-medium">
            {type === "adults" ? "Mayores" : "Menores"}
          </span>
          <span className="text-xs text-gray-500">
            {type === "adults"
              ? "Personas mayores de 18 años"
              : "Personas hasta los 17 años"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-2 py-1 border rounded disabled:opacity-50 cursor-pointer"
            onClick={() => changeGuestCount(index, type, -1)}
            disabled={type === "adults" ? room[type] === 1 : room[type] === 0}
          >
            <Minus />
          </button>

          <span className="w-6 text-center">{room[type]}</span>
          <button
            type="button"
            className="px-1 py-0.5 border rounded disabled:opacity-50 cursor-pointer"
            onClick={() => changeGuestCount(index, type, 1)}
            disabled={room.adults + room.children >= 8}
          >
            <Plus />
          </button>
        </div>
      </div>
    ))}
  </div>
);
