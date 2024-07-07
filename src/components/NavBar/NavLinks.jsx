"use client";
import Link from "next/link";
import { useReducer, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import DropDownCat from "./DropDownCat";

const NavLinks = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "men":
        return state?.cat === "men" ? { cat: null } : { cat: "men" };

      case "women":
        return state?.cat === "women" ? { cat: null } : { cat: "women" };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, { cat: null });
  return (
    <>
      <div className="flex gap-3 xl:gap-6 mt-2">
        <Link className="text-xl font-semibold" href="/">
          Home
        </Link>
        <div
          className="flex items-center"
          onClick={() => dispatch({ type: "men" })}
        >
          <Link className="text-xl font-semibold" href="#">
            Men
          </Link>
          {state?.cat === "men" ? (
            <IoMdArrowDropup className="cursor-pointer" size={24} />
          ) : (
            <IoMdArrowDropdown className="cursor-pointer" size={24} />
          )}
        </div>
        <div
          className="flex items-center"
          onClick={() => dispatch({ type: "women" })}
        >
          <Link className="text-xl font-semibold" href="#">
            Women
          </Link>
          {state?.cat === "women" ? (
            <IoMdArrowDropup className="cursor-pointer" size={24} />
          ) : (
            <IoMdArrowDropdown className="cursor-pointer" size={24} />
          )}
        </div>
        <Link className="text-xl font-semibold" href="#">
          Contact Us
        </Link>
      </div>
      {state?.cat && <DropDownCat cat={state?.cat} />}
    </>
  );
};

export default NavLinks;
