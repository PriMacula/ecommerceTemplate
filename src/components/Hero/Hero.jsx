import Image from "next/image";

const Hero = () => {
  return (
    <div className="mt-4">
      <div className="flex flex-col h-[calc(100vh-140px)] md:flex-row  bg-black w-screen  relative ">
        <div className="flex h-full w-full md:w-1/2 relative ">
          <Image
            src="/man.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw"
          />
        </div>
        <div className="flex h-full w-full md:w-1/2 relative">
          <Image
            src="/woman.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full  h-3/4">
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>
        <div className="flex justify-around flex-col md:flex-row top-1/2 h-full md:h-max md:space-y-0  absolute md:top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2  md:space-x-16">
          <button
            className="mt-[260px] md:mt-0 text-4xl md:text-3xl xl:text-5xl text-white ring-2 ring-white p-4 outline-none uppercase transition-colors relative
          before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:content-[''] hover:text-black before:hover:scale-x-100"
          >
            For Him
          </button>
          <button
            className=" mt-[260px] md:mt-0 text-4xl md:text-3xl xl:text-5xl text-white ring-2 ring-white p-4 outline-none uppercase transition-colors relative
          before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:content-[''] hover:text-black before:hover:scale-x-100"
          >
            For Her
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
