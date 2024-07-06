"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdArrowBackIosNew } from "react-icons/md";

const SearchBar = ({ device, menu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="">
      <IoSearch
        className={`cursor-pointer ${
          device === "mobile" && menu && "text-white"
        } `}
        size={device === "mobile" && menu ? "40" : "30"}
        onClick={handleIsOpen}
      />
      {isOpen && (
        <div
          className={`fixed top-0 left-0 flex flex-col overflow-y-auto ${
            device === "mobile" ? " bg-black text-white" : "bg-white"
          } h-[100%]  min-h-screen w-[100%] md:p-4 px-4 py-2 gap-6 z-20`}
        >
          <div className="flex md:gap-4 gap-2 h-20 w-full items-center">
            <MdArrowBackIosNew
              size={34}
              className="cursor-pointer"
              onClick={handleIsOpen}
            />
            <div className="flex items-center cursor-pointer">
              <Image
                className=""
                src="/logo.png"
                alt=""
                height={56}
                width={56}
              />
              <h1 className="text-3xl font-bold">E-comm</h1>
            </div>
          </div>
          <div className="flex border-b-2 pb-2 gap-2">
            <IoSearch className="" size={24} />
            <input
              className={`w-full ${
                device === "mobile" ? "bg-black" : "bg-white"
              } outline-none`}
              placeholder="ENTER WHAT YOU ARE LOOKING FOR"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
