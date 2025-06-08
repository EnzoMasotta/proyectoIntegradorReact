import React, { useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/style.css";

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

export function DatePicker() {
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const ref = useRef();

  useEffect(() => {
    if (!isMobile) {
      const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMobile]);

  const formatRange = (from, to) => {
    if (from && to)
      return `Del ${format(from, "d MMM")} al ${format(to, "d MMM")}`;
    if (from) return `Del ${format(from, "d MMM")}`;
    return "";
  };

  const handleSelect = (selectedRange) => {
    const { from, to } = selectedRange || {};

    if (from && to && from.getTime() === to.getTime()) {
      const newFrom = new Date(from);
      const newTo = new Date(newFrom);
      newTo.setDate(newTo.getDate() + 2);

      setRange({ from: newFrom, to: newTo });
      return;
    }

    setRange(selectedRange);
  };

  const handleApply = () => {
    if (range.from && range.to) {
      setOpen(false);
    }
  };

  return (
    <div className="relative w-full mt-4" ref={ref}>
      <input
        readOnly
        value={formatRange(range.from, range.to)}
        onClick={() => setOpen(true)}
        placeholder="Selecciona fechas"
        className="w-full border border-gray-400 text-gray-800 px-3 pt-6 pb-2 rounded-md focus:outline-none focus:border-blue-500"
        style={{ paddingTop: "1.5rem" }}
      />
      <label className="absolute left-3 top-2 text-xs text-gray-500 pointer-events-none">
        Fechas
      </label>

      {open &&
        (isMobile ? (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto p-4 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Selecciona fechas</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-blue-600 font-semibold"
              >
                Cerrar
              </button>
            </div>

            <DayPicker
              mode="range"
              selected={range}
              onSelect={handleSelect}
              showOutsideDays
              disabled={{ before: new Date() }}
              numberOfMonths={1}
            />

            <button
              disabled={!range.from || !range.to}
              className={`mt-4 py-2 rounded-md text-white ${
                !range.from || !range.to
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={handleApply}
            >
              Aplicar fechas
            </button>
          </div>
        ) : (
          <div className="absolute z-10 mt-2 bg-white shadow-lg border border-gray-200 rounded-md p-4">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={handleSelect}
              numberOfMonths={2}
              pagedNavigation
              showOutsideDays
              disabled={{ before: new Date() }}
            />
          </div>
        ))}
    </div>
  );
}
