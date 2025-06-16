import { ChevronLeft, Plus, Minus } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

export const GuestsAndRoomsInput = ({ label = "Personas" }) => {
  const isMobile = useIsMobile();
  const [rooms, setRooms] = useState([{ adults: 1, children: 0 }]);
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
    setRooms((prev) => [...prev, { adults: 1, children: 0 }]);
  };

  const removeRoom = (roomIndex) => {
    setRooms((prev) => prev.filter((_, i) => i !== roomIndex));
  };

  const totalAdults = rooms.reduce((a, r) => a + r.adults, 0);
  const totalChildren = rooms.reduce((a, r) => a + r.children, 0);
  const totalRooms = rooms.length;
  const totalPeople = totalAdults + totalChildren;
  const displayValue = `${totalPeople} persona${totalPeople !== 1 ? "s" : ""}`;

  return (
    <div ref={containerRef} className="relative w-full mt-4 lg:w-1/2">
      <input
        type="text"
        value={displayValue}
        readOnly
        onClick={toggleOpen}
        placeholder={label}
        className="w-full border border-gray-400 text-[#2a2a2a] px-3 pt-6 pb-2 rounded-md focus:outline-none focus:border-blue-500 cursor-pointer lg:placeholder:text-sm lg:text-sm"
      />
      <label className="absolute left-3 top-2 text-xs text-gray-500 pointer-events-none">
        {label}
      </label>

      {open &&
        (isMobile ? (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex flex-col z-50">
            <div className="bg-white flex flex-col flex-grow p-4 overflow-auto">
              <button
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
              <button
                onClick={addRoom}
                className="mt-auto bg-[#2a5732] text-white rounded py-3 font-semibold"
              >
                Agregar habitación
              </button>
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
            <button
              onClick={addRoom}
              className="mt-2 w-full bg-[#2a5732] text-white py-2 rounded"
            >
              Agregar habitación
            </button>
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
          className="text-red-600 hover:text-red-800 text-sm font-normal"
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
            className="px-2 py-1 border rounded disabled:opacity-50"
            onClick={() => changeGuestCount(index, type, -1)}
            disabled={type === "adults" ? room[type] === 1 : room[type] === 0}
          >
            <Minus />
          </button>

          <span className="w-6 text-center">{room[type]}</span>
          <button
            type="button"
            className="px-1 py-0.5 border rounded disabled:opacity-50"
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
