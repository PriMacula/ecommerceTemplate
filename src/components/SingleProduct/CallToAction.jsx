"use client";
import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";

const CallToAction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setIsLoading((prev) => !prev);
  };
  return (
    <div className="border-y-[1px] border-black border-opacity-50 py-6 px-24 flex justify-center">
      <button
        className="py-3 text-xl font-semibold tracking-wide bg-black
        text-white hover:bg-[#00b27d] w-full rounded-sm 
        flex items-center justify-center gap-2 disabled:cursor-not-allowed"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <svg
            className="mr-3 h-6 w-6 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <>
            <h2 className="">Buy Now</h2>
            <FaCartShopping size={24} />
          </>
        )}
      </button>
    </div>
  );
};

export default CallToAction;
