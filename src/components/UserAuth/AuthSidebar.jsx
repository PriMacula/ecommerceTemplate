"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import Login from "./Login";
import Signup from "./Signup";
import Recovery from "./Recovery";

const AuthSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authState, setAuthState] = useState("login");
  const authComponents = {
    login: <Login setAuthState={setAuthState} />,
    signup: <Signup setAuthState={setAuthState} />,
    recovery: <Recovery setAuthState={setAuthState} />,
  };
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
  const handleClose = () => {
    setIsOpen((prev) => !prev);
    setAuthState("login");
  };
  return (
    <div>
      <FaUserCircle
        size={30}
        className="cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
        
      />
      {isOpen && (
        <div>
          <div className="bg-black bg-opacity-40 fixed top-0 right-0 h-full w-full z-10" />
          <div className="bg-white fixed top-0 right-0 w-1/2 lg:w-[40%] 2xl:w-[30%] min-h-full z-50 overflow-scroll">
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

export default AuthSidebar;
