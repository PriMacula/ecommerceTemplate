"use client";
import { HiMiniArrowSmallDown, HiMiniArrowSmallUp } from "react-icons/hi2";
import Link from "next/link";
import React, { useState } from "react";

const cats = ["- New", " - T-shirts", "- Shorts", "- Trousers", "- Shoes"];
export const MobileMenuLinks = () => {
  const [forMenOpen, setForMenOpen] = useState(false);
  const [forWomenOpen, setForWomenOpen] = useState(false);

  const handleForMenOpen = (e) => {
    e.preventDefault();
    setForMenOpen((prev) => !prev);
  };
  const handleForWomenOpen = (e) => {
    e.preventDefault();
    setForWomenOpen((prev) => !prev);
  };
  return (
    <div className="flex flex-col items-center h-max gap-8">
      <Link href="/" className="text-white text-3xl">
        Home
      </Link>
      <Link href="/" className="flex pl-6" onClick={handleForMenOpen}>
        <h1
          className={`text-white text-3xl ${
            forMenOpen ? "border-b-2" : "border-none"
          }`}
        >
          For Men
        </h1>
        {forMenOpen ? (
          <HiMiniArrowSmallUp className="text-white" size={40} />
        ) : (
          <HiMiniArrowSmallDown className="text-white" size={40} />
        )}
      </Link>
      {forMenOpen && (
        <div
          className="flex flex-col items-center justify-between"
          style={{ height: "40vh" }}
        >
          {cats.map((cat) => (
            <Link
              className="text-2xl font-semibold text-white"
              key={cat}
              href="#"
            >
              {cat}
            </Link>
          ))}
        </div>
      )}
      <Link href="/" className="flex pl-6 " onClick={handleForWomenOpen}>
        <h1
          className={`text-white text-3xl ${
            forWomenOpen ? "border-b-2" : "border-none"
          }`}
        >
          For Women
        </h1>
        {forWomenOpen ? (
          <HiMiniArrowSmallUp className="text-white" size={40} />
        ) : (
          <HiMiniArrowSmallDown className="text-white" size={40} />
        )}
      </Link>
      {forWomenOpen && (
        <div
          className="flex flex-col items-center justify-between"
          style={{ height: "40vh" }}
        >
          {cats.map((cat) => (
            <Link
              className="text-2xl font-semibold text-white"
              key={cat}
              href="#"
            >
              {cat}
            </Link>
          ))}
        </div>
      )}
      <Link href="/login" className="text-white text-3xl">
        Login
      </Link>
      <Link href="/contactus" className="text-white text-3xl">
        Contact Us
      </Link>
    </div>
  );
};
