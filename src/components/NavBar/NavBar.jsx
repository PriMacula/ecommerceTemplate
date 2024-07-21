import Image from "next/image";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import Cart from "../Cart/Cart";
import AuthSidebar from "../UserAuth/AuthSidebar";
const NavBar = () => {
  return (
    <div className="sticky top-0 h-20 py-2 px-4 md:px-8 lg:px-8 xl:px-18 2xl:px-28 z-30 bg-white">
      {/* MOBILE_SCREEN */}
      <div className="h-full flex items-center justify-between md:hidden">
        <MobileMenu />
        <Link href="/" className="flex items-center">
          <Image className="" src="/logo.png" alt="" height={54} width={54} />
          <h1 className="text-3xl font-bold">E-comm</h1>
        </Link>
        <div className="flex gap-4 items-center">
          <SearchBar device="mobile" menu={false} />
          <Cart />
        </div>
      </div>
      {/* LARGER_SCREEN */}
      {/* LEFT */}
      <div className="hidden md:flex justify-between">
        <div className=" flex md:w-3/4 w-2/3 items-center gap-6 xl:gap-16">
          <Link href="/" className="flex items-center">
            <Image
              className="hidden lg:flex"
              src="/logo.png"
              alt=""
              height={60}
              width={60}
            />
            <h1 className="text-3xl lg:text-4xl font-bold ">E-comm</h1>
          </Link>
          <NavLinks />
        </div>
        {/* RIGHT */}
        <div className="flex flex-1 items-center justify-end gap-6 mt-2">
          <SearchBar device="larger-screen" menu={false} />
          <AuthSidebar />
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
