"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <FaCartShopping
        className="cursor-pointer"
        size={30}
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {isOpen && (
        <div>
          <div className="bg-black bg-opacity-60 fixed top-0 right-0 h-full w-full z-10" />
          <div
            className="fixed top-0 right-0 bg-[#f9f9f9] h-[100vh] w-3/4 md:w-1/2 xl:w-1/3
          z-20 overflow-hidden"
          >
            <div className="h-20 bg-black flex items-center justify-between p-4">
              <h2 className="text-3xl text-white font-bold">My Cart</h2>
              <div className="hidden md:flex items-center cursor-pointer">
                <Image
                  className=""
                  src="/logo.png"
                  alt=""
                  height={54}
                  width={54}
                />
                <h1 className="text-3xl text-white font-bold">E-comm</h1>
              </div>
              <IoMdClose
                size={40}
                className="text-white cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
              />
            </div>
            {isEmpty ? (
              <div className="h-[calc(100vh-80px)] w-full flex flex-col py-8 px-4">
                <div className="relative h-1/2  w-full">
                  <Image
                    src="/emptyCart.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col items-center h-1/2">
                  <div className="text-center h-1/2 flex flex-col py-2 gap-5">
                    <h2 className="text-xl font-semibold">Empty Cart</h2>
                    <div className="flex flex-col h-1/4 text-center ">
                      <p>Your Cart is still empty,</p>
                      <p>Browse our top picks and start shopping now!</p>
                    </div>
                  </div>
                  <button className="  bg-[#fc9b7b] text-3xl text-white font-bold rounded-lg  p-4">
                    Shop Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-[calc(100vh-80px)] w-full flex flex-col py-8 px-4">
                <div className="h-3/4 flex flex-col gap-4 overflow-auto">
                  <div className="h-1/4 flex">
                    <div className="h-full w-1/3  relative">
                      <Image
                        src="/man.jpg"
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between p-2 w-2/3  border-y-2 border-[#e0e1dd]">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl">Product Name</h2>
                        <div className="flex gap-2">
                          <MdOutlineEdit className="cursor-pointer" size={20} />
                          <RiDeleteBinLine
                            className="cursor-pointer"
                            size={20}
                          />
                        </div>
                      </div>
                      <h2 className="text-[#FF0058] font-semibold text-sm">
                        99 TND
                      </h2>
                      <h3 className="text-sm">Quantity: 1</h3>
                      <h3 className="text-sm">Size: xl</h3>
                    </div>
                  </div>
                  <div className="h-1/4 flex">
                    <div className="h-full w-1/3  relative">
                      <Image
                        src="/man.jpg"
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between p-2 w-2/3  border-y-2 border-[#e0e1dd]">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl">Product Name</h2>
                        <div className="flex gap-2">
                          <MdOutlineEdit className="cursor-pointer" size={20} />
                          <RiDeleteBinLine
                            className="cursor-pointer"
                            size={20}
                          />
                        </div>
                      </div>
                      <h2 className="text-[#FF0058] font-semibold text-sm">
                        99 TND
                      </h2>
                      <h3 className="text-sm">Quantity: 1</h3>
                      <h3 className="text-sm">Size: xl</h3>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4  h-1/4 px-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg">1 Article</h3>
                    <h2 className="text-lg font-bold">99 TND</h2>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b-2">
                    <h3 className="text-lg">Delivery Fees</h3>
                    <h2 className="text-lg font-bold">0 TND</h2>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg">Total</h3>
                    <h2 className="text-lg font-bold">99 TND</h2>
                  </div>
                  <div className="flex items-center justify-center ">
                    <Link href="/cart" className="w-full">
                      <button className="bg-[#00b27d] text-white text-xl font-semibold w-full p-3 rounded-md" onClick={()=>setIsOpen(false)}>
                        Process Order
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
