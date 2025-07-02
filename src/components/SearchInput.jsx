import React, { useState, useEffect, useRef } from "react";
import { locationsByCountry } from "../data/locations";

function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function flattenLocations(data) {
  const list = [];
  for (const country in data) {
    data[country].forEach(({ city, province }) => {
      list.push({ city, province, country });
    });
  }
  return list;
}

const flatLocations = flattenLocations(locationsByCountry);

export const SearchInput = ({
  label,
  placeholder = "",
  value,
  onChange,
  id,
  name,
  error,
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value || "");
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        validateInput();
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inputValue]);

  function validateInput() {
    const normalizedInput = normalizeText(inputValue.trim());
    if (!normalizedInput) return;

    const matched = flatLocations.some(
      (s) =>
        normalizeText(`${s.city}, ${s.province}, ${s.country}`) ===
        normalizedInput
    );
    if (!matched) {
      setInputValue("");
      onChange && onChange({ target: { value: "" } });
    }
  }

  function handleChange(e) {
    const val = e.target.value;
    setInputValue(val);
    onChange && onChange(e);

    if (val.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    if (/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/.test(val)) {
      setSuggestions([]);
      return;
    }

    const normalizedVal = normalizeText(val);

    const countries = Object.keys(locationsByCountry);
    const matchedCountry = countries.find(
      (country) => normalizeText(country) === normalizedVal
    );

    let newSuggestions = [];

    if (matchedCountry) {
      newSuggestions = locationsByCountry[matchedCountry].map(
        ({ city, province }) => ({
          city,
          province,
          country: matchedCountry,
        })
      );
    } else {
      newSuggestions = flatLocations.filter(({ city, province, country }) => {
        return (
          normalizeText(city).includes(normalizedVal) ||
          normalizeText(province).includes(normalizedVal) ||
          normalizeText(country).includes(normalizedVal)
        );
      });
    }

    setSuggestions(newSuggestions.slice(0, 10));
  }

  function handleSelect(suggestion) {
    const display = `${suggestion.city}, ${suggestion.province}, ${suggestion.country}`;
    setInputValue(display);
    setSuggestions([]);
    onChange && onChange({ target: { value: display } });
    setIsFocused(false);
  }

  return (
    <div className="relative w-full mt-4 lg:w-2/3" ref={containerRef}>
      <input
        type="text"
        id={id}
        name={name}
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        className={`w-full border px-3 pt-6 pb-2 rounded-md focus:outline-none text-[#2a2a2a] lg:placeholder:text-sm lg:text-sm ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-400 focus:border-blue-500"
        }`}
        autoComplete="off"
      />

      {label && (
        <label
          htmlFor={id}
          className="absolute left-3 top-2 text-xs text-gray-500 pointer-events-none"
        >
          {label}
        </label>
      )}

      {isFocused && suggestions.length > 0 && (
        <ul className="absolute z-20 mt-1 max-h-48 w-full overflow-auto rounded border border-gray-300 bg-white shadow-lg">
          {suggestions.map((s, i) => (
            <li
              key={`${s.city}-${i}`}
              onClick={() => handleSelect(s)}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100"
            >
              {s.city}, {s.province}, {s.country}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="absolute top-14 lg:top-13 left-1.5 text-[12px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};
