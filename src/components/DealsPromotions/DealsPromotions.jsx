import Image from "next/image";

const DealsPromotions = () => {
  return (
    <div className="flex flex-col items-center pt-12 gap-12 px-4 md:px-8 lg:px-8 xl:px-18 2xl:px-28">
      <h1 className="text-3xl font-semibold">Don't Miss Our Best Deals</h1>
      <div className="flex w-full  gap-x-8 gap-y-16 justify-center flex-wrap">
        <div className="h-[450px] w-[70%] md:w-[45%] xl:w-[22%] ">
          <div className="flex flex-col h-[400px] w-full relative">
            <Image
              src="/man.jpg"
              alt=""
              fill
              className="object-cover rounded-sm drop-shadow-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <Image
              src="/woman.jpg"
              alt=""
              fill
              className="object-cover rounded-sm drop-shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <h1 className="text-xl px-2 pt-2">Product Name</h1>
          <div className="flex ">
            <h2 className="text-lg px-2">100 DT</h2>
            <h2 className="text-lg px-2 line-through text-gray-500">99 DT</h2>
          </div>
        </div>
        <div className="h-[450px] w-[70%] md:w-[45%] xl:w-[22%]">
          <div className="flex flex-col h-[400px] w-full relative">
            <Image
              src="/man.jpg"
              alt=""
              fill
              className="object-cover  rounded-sm drop-shadow-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <Image
              src="/woman.jpg"
              alt=""
              fill
              className="object-cover rounded-sm drop-shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <h1 className="text-xl px-2 pt-2">Product Name</h1>
          <div className="flex ">
            <h2 className="text-lg px-2">100 DT</h2>
            <h2 className="text-lg px-2 line-through text-gray-500">99 DT</h2>
          </div>
        </div>
        <div className="h-[450px] w-[70%] md:w-[45%] xl:w-[22%]">
          <div className="flex flex-col h-[400px] w-full relative">
            <Image
              src="/man.jpg"
              alt=""
              fill
              className="object-cover  rounded-sm drop-shadow-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <Image
              src="/woman.jpg"
              alt=""
              fill
              className="object-cover rounded-sm drop-shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <h1 className="text-xl px-2 pt-2">Product Name</h1>
          <div className="flex ">
            <h2 className="text-lg px-2">100 DT</h2>
            <h2 className="text-lg px-2 line-through text-gray-500">99 DT</h2>
          </div>
        </div>
        <div className="h-[450px] w-[70%] md:w-[45%] xl:w-[22%]">
          <div className="flex flex-col h-[400px] w-full relative">
            <Image
              src="/man.jpg"
              alt=""
              fill
              className="object-cover  rounded-sm drop-shadow-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <Image
              src="/woman.jpg"
              alt=""
              fill
              className="object-cover rounded-sm drop-shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <h1 className="text-xl px-2 pt-2">Product Name</h1>
          <div className="flex ">
            <h2 className="text-lg px-2">100 DT</h2>
            <h2 className="text-lg px-2 line-through text-gray-500">99 DT</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsPromotions;
