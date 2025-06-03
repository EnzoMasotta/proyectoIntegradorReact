import React from "react";

export const SearchBarForm = ({
  label,
  type = "text",
  placeholder = "",
  name,
  id,
  className = "",
  value,
  onChange,
  ...rest // capturamos cualquier otra prop extra
}) => {
  return (
    <div className="relative w-full mt-4">
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border border-gray-400 text-gray-800 px-3 pt-6 pb-2 rounded-md focus:outline-none focus:border-blue-500 ${className}`}
        style={{ paddingTop: "1.5rem" }}
        {...rest} // aquí pasamos las props extra como min, disabled, etc.
      />
      <label
        htmlFor={id}
        className="absolute left-3 top-2 text-xs text-gray-500 pointer-events-none"
      >
        {label}
      </label>
    </div>
  );
};
