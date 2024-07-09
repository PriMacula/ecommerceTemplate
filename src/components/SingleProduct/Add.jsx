"use client";

import { useState } from "react";

const Add = () => {
  const [quantity, setQuantity] = useState(1);
  const maxqtty = 5;
  const handleInc = () => {
    if (quantity < maxqtty) {
      setQuantity((prev) => prev + 1);
    }
  };
  const handleDec = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  return (
    <div className="flex flex-col gap-3 px-4">
      {/* QUANTITY */}
      <h3 className="font-medium">Choose a Quantity</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">

        <div className="text-lg flex items-center px-6 py-3 justify-between bg-gray-200 bg-opacity-75 rounded-3xl w-32">
          <button className="font-semibold cursor-pointer" onClick={handleDec}>
            -
          </button>
          <p className="font-medium">{quantity}</p>
          <button className="font-semibold cursor-pointer" onClick={handleInc}>
            +
          </button>
        </div>
        <p className="max-w-[105px]">
          ONLY
          <span className="font-semibold text-[#FF0058]"> {maxqtty} </span>
          ITEMS LEFT !
        </p>
        </div>
        {/* ADD */}
        <button
          className="font-medium rounded-3xl py-3 px-6 ring-1 ring-black hover:text-white
          hover:bg-black "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Add;
