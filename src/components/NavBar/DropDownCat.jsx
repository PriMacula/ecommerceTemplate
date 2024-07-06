import Image from "next/image";
import Link from "next/link";

const DropDownCat = ({ cat }) => {
  return (
    <div className="flex absolute top-[50px]  lg:top-[60px] left-0 drop-shadow-xl h-[260px] w-full bg-white items-center justify-center gap-[80px] z-10 border-t-2 border-black ">
      <Link
        href="/"
        className="flex flex-col h-full items-center justify-center gap-6"
      >
        <Image
          className="rounded-full ring-4 ring-black"
          height={120}
          width={120}
          src="/t-shirt.jpg"
          alt=""
        />
        <h1 className="text-2xl text-black font-semibold">T-shirt</h1>
      </Link>
      <div className="flex flex-col h-full items-center justify-center gap-6">
        <Image
          className="rounded-full ring-4 ring-black"
          height={120}
          width={120}
          src="/t-shirt.jpg"
          alt=""
          priority
        />
        <h1 className="text-2xl text-black font-semibold">T-shirt</h1>
      </div>
      <div className="flex flex-col h-full items-center justify-center gap-6">
        <Image
          className="rounded-full ring-4 ring-black"
          height={120}
          width={120}
          src="/t-shirt.jpg"
          alt=""
          priority
        />
        <h1 className="text-2xl text-black font-semibold">T-shirt</h1>
      </div>
      <div className="flex flex-col h-full items-center justify-center gap-6">
        <Image
          className="rounded-full ring-4 ring-black"
          height={120}
          width={120}
          src="/t-shirt.jpg"
          alt=""
          priority
        />
        <h1 className="text-2xl text-black font-semibold">T-shirt</h1>
      </div>
      <div className="flex flex-col h-full items-center justify-center gap-6">
        <Image
          className="rounded-full ring-4 ring-black"
          height={120}
          width={120}
          src="/t-shirt.jpg"
          alt=""
          priority
        />
        <h1 className="text-2xl text-black font-semibold">T-shirt</h1>
      </div>
    </div>
  );
};

export default DropDownCat;
