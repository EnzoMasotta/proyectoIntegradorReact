import React, { useState, useEffect, useRef } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import "react-day-picker/style.css";
import { useIsMobile } from "../hooks/useIsMobile";
import { ChevronLeft } from "lucide-react";

export function DatePicker() {
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const ref = useRef();

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
      return `${format(from, "dd/MM/yyyy")} hasta ${format(to, "dd/MM/yyyy")}`;
    if (from) return `${format(from, "dd/MM/yyyy")}`;
    return "";
  };

  const handleSelect = (selectedRange) => {
    const { from, to } = selectedRange || {};

    if (from && to) {
      const diffInDays = (to - from) / (1000 * 60 * 60 * 24) + 1;

      if (diffInDays < 3) {
        const newTo = new Date(from);
        newTo.setDate(from.getDate() + 2);
        setRange({ from, to: newTo });
        return;
      }
    }

    if (from && !to) {
      setRange({ from, to: undefined });
      return;
    }

    setRange(selectedRange);
  };

  return (
    <div className=" w-full mt-4" ref={ref}>
      <div className="flex w-full gap-4 lg:gap-2">
        <div className="relative w-1/2 lg:w-2/3">
          <input
            readOnly
            value={formatRange(range.from)}
            onClick={() => setOpen(true)}
            placeholder="Fecha de ida"
            className="w-full border border-gray-400 text-gray-800 px-3 pt-6 pb-2 rounded-md focus:outline-none focus:border-blue-500 lg:placeholder:text-sm lg:text-sm"
          />
          <label className="absolute left-3 top-2 text-xs text-gray-500 pointer-events-none">
            Ida
          </label>
        </div>

        <div className="relative w-1/2 lg:w-2/3">
          <input
            readOnly
            value={formatRange(range.to)}
            onClick={() => setOpen(true)}
            placeholder="Fecha de vuelta"
            className="w-full border border-gray-400 text-gray-800 px-3 pt-6 pb-2 rounded-md focus:outline-none focus:border-blue-500 lg:placeholder:text-sm lg:text-sm"
          />
          <label className="absolute left-3 top-2 text-xs text-gray-500 pointer-events-none">
            Vuelta
          </label>
        </div>
      </div>

      {open &&
        (isMobile ? (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto p-4 flex flex-col">
            <div className="flex gap-4 items-center mb-4">
              <button
                onClick={() => setOpen(false)}
                className="text-[#4a4a4a] font-semibold"
              >
                <ChevronLeft />
              </button>
              <h2 className="text-[17px] font-normal text-[#4a4a4a]">
                Seleccioná fechas
              </h2>
            </div>

            <DayPicker
              className="flex justify-center"
              locale={es}
              mode="range"
              selected={range}
              onSelect={handleSelect}
              showOutsideDays
              disabled={{ before: new Date() }}
              numberOfMonths={1}
            />

            <button
              onClick={() => setOpen(false)}
              className="mt-auto w-full px-4 py-2 bg-[#2a5732] text-white rounded-md"
            >
              Listo
            </button>
          </div>
        ) : (
          <div className="absolute z-10 mt-2 bg-white shadow-lg border border-gray-200 rounded-md p-4">
            <DayPicker
              locale={es}
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
