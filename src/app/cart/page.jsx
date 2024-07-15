import CartForm from "@/components/Cart/CartForm";
import Image from "next/image";
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

const cartPage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-8 xl:px-18 2xl:px-28 py-8">
      <div className="h-16 bg-[#9cc7afb6] my-12 text-white font-bold text-3xl flex items-center justify-center gap-4">
        <FaCartShopping className="cursor-pointer" size={32} />
        <h1 className="tracking-wide">MY CART</h1>
      </div>
      <div className=" flex flex-col lg:flex-row gap-16">
        <div className="flex flex-col gap-6 lg:w-1/2">
          <div className="flex w-full">
            <div className="relative w-1/4 flex">
              <Image
                src="/man.jpg"
                alt=""
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="flex flex-col p-2 gap-4 w-3/4 border-b-2 border-black">
              <div className="flex items-center justify-between">
                <h2 className="text-xl">Product Name</h2>
                <div className="flex gap-2">
                  <MdOutlineEdit className="cursor-pointer" size={20} />
                  <RiDeleteBinLine className="cursor-pointer" size={20} />
                </div>
              </div>
              <h3 className="text-sm">Quantity: 1</h3>
              <h3 className="text-sm">Size: xl</h3>
              <h2 className="text-[#FF0058] font-semibold text-sm">99 TND</h2>
            </div>
          </div>
          <div className="flex w-full">
            <div className="relative w-1/4 flex">
              <Image
                src="/man.jpg"
                alt=""
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="flex flex-col p-2 gap-4 w-3/4 border-b-2 border-black">
              <div className="flex items-center justify-between">
                <h2 className="text-xl">Product Name</h2>
                <div className="flex gap-2">
                  <MdOutlineEdit className="cursor-pointer" size={20} />
                  <RiDeleteBinLine className="cursor-pointer" size={20} />
                </div>
              </div>
              <h3 className="text-sm">Quantity: 1</h3>
              <h3 className="text-sm">Size: xl</h3>
              <h2 className="text-[#FF0058] font-semibold text-sm">99 TND</h2>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <CartForm />
        </div>
      </div>
    </div>
  );
};

export default cartPage;
