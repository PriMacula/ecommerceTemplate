import React, { useState } from "react";

const FloatingLabelInput = ({ labelText, type, id }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="relative text-left">
      <input
        type={type}
        id={id}
        className="border-[1px] outline-none p-2 w-full border-[#333] rounded-md bg-transparent px-4"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleInputChange}
        value={inputValue}
      />

      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-300 ease ${
          isFocused || inputValue
            ? "px-2 -top-5 bg-white text-black"
            : "top-2 -z-10 text-gray-500"
        }`
      }
      >
        {labelText}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
