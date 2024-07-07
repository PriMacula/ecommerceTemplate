import Add from "@/components/SingleProduct/Add";
import Benefits from "@/components/SingleProduct/Benefits";
import CallToAction from "@/components/SingleProduct/CallToAction";
import CustomizeProduct from "@/components/SingleProduct/CustomizeProduct";
import ProducImgs from "@/components/SingleProduct/ProducImgs";
import Image from "next/image";

const singleProductPage = () => {
  const price = 100;
  const discountedPrice = 99;

  return (
    <div className="flex flex-col lg:flex-row gap-16 mt-16 px-4 md:px-8 lg:px-8 xl:px-18 2xl:px-28 realtive">
      {/* IMGS */}
      <div className="w-full lg:w-1/2 ">
        <ProducImgs />
      </div>
      {/* TEXT */}
      <div className="w-full lg:w-1/2 flex flex-col gap-14">
        <div className="flex flex-col  gap-4">
          <h1 className="text-3xl font-semibold">Product Name</h1>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-xl text-[#FF0058]">
              {discountedPrice} DT
            </h2>
            <h4 className="text-sm font-medium text-[#FF0058]">
              -{((price - discountedPrice) / price) * 100}%
            </h4>
            <h3 className="text-gray-800 line-through">{price} DT</h3>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Temporibus, provident dolor, illo vel consequuntur exercitationem
            quae cupiditate reiciendis
          </p>
        </div>
        <CustomizeProduct />
        <Add />
        <CallToAction />
        <div className="flex flex-col gap-4 font-medium tracking-wide">
          <div className="flex items-center gap-2 -mt-6">
            <Image src="/guarantee.png" alt="" height={24} width={24} />
            <h3>Guranteed high quality</h3>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/truck.png" alt="" height={24} width={24} />
            <h3>Delivered in maxium 2 days</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default singleProductPage;
