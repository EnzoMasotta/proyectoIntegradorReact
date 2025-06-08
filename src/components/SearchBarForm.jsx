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
  ...rest
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
        className={`w-full border border-gray-400 text-[#2a2a2a] px-3 pt-6 pb-2 rounded-md focus:outline-none focus:border-blue-500 ${className}`}
        style={{ paddingTop: "1.5rem" }}
        {...rest}
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
