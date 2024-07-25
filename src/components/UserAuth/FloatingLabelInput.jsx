import React, { useState } from "react";

const FloatingLabelInput = ({ labelText, type, id, value, onChange, hasError }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative text-left">
      <input
        type={type}
        id={id}
        className={`border-[1px] outline-none p-2 w-full rounded-md bg-transparent px-4 ${
          hasError ? "border-red-500" : "border-[#333]"
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onChange}
        value={value}
      />

      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-300 ease ${
          isFocused || value
            ? "px-2 -top-5 bg-white text-black"
            : "top-2 -z-10 text-gray-500"
        }`}
      >
        {labelText}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
