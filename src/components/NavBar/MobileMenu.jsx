"use client";
import React, { useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { MobileMenuLinks } from "./MobileMenuLinks";
import Image from "next/image";
import { FaCartShopping } from "react-icons/fa6";
import SearchBar from "./SearchBar";

const MobileMenu = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  

  return (
    <div className="z-10">
      {!isOpen && (
        <GiHamburgerMenu
          size={34}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`z-10 ${
            isOpen ? "text-white" : "text-black"
          } cursor-pointer`}
        />
      )}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 left-0 bg-black h-full min-h-screen w-[100%] p-6 overflow-y-auto"
        >
          <div className="flex flex-col gap-4 h-full">
            <div
              className="flex items-center justify-between"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <GiHamburgerMenu
                size={32}
                className={`z-10 ${
                  isOpen ? "text-white" : "text-black"
                } cursor-pointer`}
              />
              <div className="flex items-center cursor-pointer">
                <Image
                  className=""
                  src="/logo.png"
                  alt=""
                  height={54}
                  width={54}
                />
                <h1 className="text-3xl text-white font-bold">E-comm</h1>
              </div>
              <IoMdClose size={36} className="text-white  cursor-pointer" />
            </div>
            <hr />
            <p className="text-white text-4xl"></p>
            <MobileMenuLinks />
            <div className="flex items-center justify-center gap-6 mt-8">
              <FaCartShopping className="text-white" size={40} />
              <SearchBar device="mobile" menu={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
