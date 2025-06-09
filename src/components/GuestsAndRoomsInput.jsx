import { ChevronLeft } from "lucide-react";
import React, { useState, useEffect } from "react";

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

  const toggleOpen = () => setOpen((o) => !o);

  const changeGuestCount = (roomIndex, type, delta) => {
    setRooms((prev) => {
      const updated = [...prev];
      const room = { ...updated[roomIndex] };
      const newCount = room[type] + delta;
      if (newCount < 0) return prev;
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

  const totalAdults = rooms.reduce((a, r) => a + r.adults, 0);
  const totalChildren = rooms.reduce((a, r) => a + r.children, 0);
  const totalRooms = rooms.length;
  const totalPeople = totalAdults + totalChildren;
  const displayValue = `${totalPeople} persona${totalPeople !== 1 ? "s" : ""}`;

  return (
    <div className="relative w-full mt-4 lg:w-[60%]">
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
                className=" text-xl font-bold mb-4"
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
                />
              ))}
              <button
                onClick={addRoom}
                className="mt-auto bg-blue-600 text-white rounded py-3 font-semibold"
              >
                Agregar habitación
              </button>
            </div>
          </div>
        ) : (
          <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md p-4 z-10 shadow-lg max-h-96 overflow-auto">
            {rooms.map((room, i) => (
              <RoomSelector
                key={i}
                room={room}
                index={i}
                changeGuestCount={changeGuestCount}
              />
            ))}
            <button
              onClick={addRoom}
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded"
            >
              Agregar habitación
            </button>
          </div>
        ))}
    </div>
  );
};

const RoomSelector = ({ room, index, changeGuestCount }) => (
  <div className="mb-4 border p-3 rounded">
    <h4 className="font-semibold mb-2">Habitación {index + 1}</h4>
    {["adults", "children"].map((type) => (
      <div key={type} className="flex justify-between items-center mb-2">
        <span className="capitalize">
          {type === "adults" ? "Adultos" : "Niños"}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-2 py-1 border rounded disabled:opacity-50"
            onClick={() => changeGuestCount(index, type, -1)}
            disabled={room[type] === 0}
          >
            -
          </button>
          <span className="w-6 text-center">{room[type]}</span>
          <button
            type="button"
            className="px-2 py-1 border rounded disabled:opacity-50"
            onClick={() => changeGuestCount(index, type, 1)}
            disabled={room.adults + room.children >= 8}
          >
            +
          </button>
        </div>
      </div>
    ))}
  </div>
);
