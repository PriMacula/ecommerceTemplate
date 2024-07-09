"use client";
import { useState } from "react";

const sizes = ["S", "M", "L", "XL", "XXL"];
const CustomizeProduct = () => {
  const [index, setIndex] = useState(0);
  return (
    <div className="flex flex-col gap-6 border-y-[1px] border-black border-opacity-50 py-4">
      <h3 className="font-medium">Choose a Size</h3>
      <ul className="flex items-center gap-3">
        {sizes.map((size, i) => (
          <li
            key={i}
            className={`ring-1 ring-black rounded-sm py-1 px-4 text-sm cursor-pointer
           hover:bg-black hover:text-white ${
             index === i && "bg-black text-white"
           }`}
            onClick={() => setIndex(i)}
          >
            {size}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomizeProduct;
