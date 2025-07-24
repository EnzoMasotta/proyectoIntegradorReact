import React, { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import "react-day-picker/style.css";
import { useIsMobile } from "../hooks/useIsMobile";
import { ChevronLeft } from "lucide-react";

export function DatePicker({ range, setRange, errorFrom, errorTo }) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const ref = useRef();

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = open ? "hidden" : "";
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

  const formatRange = (date) => {
    return date ? format(date, "dd/MM/yyyy") : "";
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
    <div className="w-full mt-4" ref={ref}>
      <div className="flex w-full gap-4 lg:gap-2">
        <div className="relative w-1/2 lg:w-2/3">
          <input
            id="ida"
            readOnly
            value={formatRange(range.from)}
            onClick={() => setOpen(true)}
            placeholder="Fecha de ida"
            className={`w-full border px-3 pt-6 pb-2 rounded-md focus:outline-none lg:placeholder:text-sm lg:text-sm text-gray-800 ${
              errorFrom
                ? "border-red-500 focus:border-red-500"
                : "border-gray-400 focus:border-blue-500"
            }`}
          />
          <label
            htmlFor="ida"
            className="absolute left-3 top-2 text-xs text-gray-500 pointer-events-none"
          >
            Ida
          </label>
          {errorFrom && (
            <p className="absolute top-14 lg:top-13 left-1.5 text-[12px] text-red-600 whitespace-nowrap">
              {errorFrom}
            </p>
          )}
        </div>

        <div className="relative w-1/2 lg:w-2/3">
          <input
            id="vuelta"
            readOnly
            value={formatRange(range.to)}
            onClick={() => setOpen(true)}
            placeholder="Fecha de vuelta"
            className={`w-full border px-3 pt-6 pb-2 rounded-md focus:outline-none lg:placeholder:text-sm lg:text-sm text-gray-800 ${
              errorTo
                ? "border-red-500 focus:border-red-500"
                : "border-gray-400 focus:border-blue-500"
            }`}
          />
          <label
            htmlFor="vuelta"
            className="absolute left-3 top-2 text-xs text-gray-500 pointer-events-none"
          >
            Vuelta
          </label>
          {errorTo && (
            <p className="absolute top-14 lg:top-13 left-1.5 text-[12px] text-red-600 whitespace-nowrap">
              {errorTo}
            </p>
          )}
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
              disabled={(date) => {
                const today = new Date();
                const todayStart = new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate()
                );
                return date <= todayStart;
              }}
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
              disabled={(date) => {
                const today = new Date();

                const todayStart = new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate()
                );
                return date <= todayStart;
              }}
            />
          </div>
        ))}
    </div>
  );
}
