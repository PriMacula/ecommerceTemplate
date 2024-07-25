"use client";
import { HiMiniArrowSmallDown, HiMiniArrowSmallUp } from "react-icons/hi2";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import Login from "../UserAuth/Login";
import Signup from "../UserAuth/Signup";
import Recovery from "../UserAuth/Recovery";

const cats = ["- New", " - T-shirts", "- Shorts", "- Trousers", "- Shoes"];

export const MobileMenuLinks = () => {
  const [forMenOpen, setForMenOpen] = useState(false);
  const [forWomenOpen, setForWomenOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [authState, setAuthState] = useState("login");

  const handleSubmit = async (e) => {
    if (isLoggedIn) {
      try {
        const res = await fetch("/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          window.location.href = "/";
        } else {
          const { error } = await res.json();
          alert(error);
        }
      } catch (error) {
        console.error("Logout error:", error);
        alert("An error occurred while logging out.");
      }
    } else {
      setIsOpen(true);
    }
  };
  const handleClose = () => {
    setIsOpen((prev) => !prev);
    setAuthState("login");
  };
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch("/api/check-auth");
        const data = await res.json();
        setIsLoggedIn(data.isLoggedIn);
      } catch (error) {
        console.error("Error fetching auth status:", error);
      }
    };

    checkAuthStatus();
  }, []);

  const handleForMenOpen = (e) => {
    e.preventDefault();
    setForMenOpen((prev) => !prev);
  };

  const handleForWomenOpen = (e) => {
    e.preventDefault();
    setForWomenOpen((prev) => !prev);
  };
  const authComponents = {
    login: <Login setAuthState={setAuthState} />,
    signup: <Signup setAuthState={setAuthState} />,
    recovery: <Recovery setAuthState={setAuthState} />,
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
      <Link
        href="/login"
        className="text-white text-3xl"
        onClick={handleSubmit}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </Link>
      <Link href="/contactus" className="text-white text-3xl">
        Contact Us
      </Link>
      {isOpen && (
        <div>
          <div className="bg-white fixed top-0 right-0 w-full z-40">
            <div className="h-20 bg-black flex items-center justify-between p-4">
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
                onClick={handleClose}
              />
            </div>
            <div className="h-[calc(100vh-80px)]  mx-auto max-w-[90%] px-4 lg:px-8 py-16 text-center flex flex-col gap-12">
              <h2 className="text-2xl font-bold ">
                Log in or create an account
              </h2>
              <button className="border-[1px] border-[#333333] w-full rounded-md py-3 px-4 flex hover:bg-black hover:text-white">
                <FcGoogle size={24} />
                <span className="uppercase mx-auto font-medium">
                  Continue with Google
                </span>
              </button>
              <p className="text-gray-800 text-[0.7rem] -mt-8 tracking-wider font-medium">
                By logging/signing in with my social login, I agree to connect
                my account in accordance with the Privacy Policy
              </p>
              {authComponents[authState] || (
                <div className="text-red-600 text-xl">Invalid state</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
