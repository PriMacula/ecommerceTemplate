import Image from "next/image";
import Link from "next/link";

const products = [
  {
    img1: "/man.jpg",
    img2: "/woman.jpg",
    productName: "Product Name",
    price: "100 DT",
    discountedPrice: "99 DT",
  },
  {
    img1: "/man.jpg",
    img2: "/woman.jpg",
    productName: "Product Name",
    price: "100 DT",
    discountedPrice: "99 DT",
  },
  {
    img1: "/man.jpg",
    img2: "/woman.jpg",
    productName: "Product Name",
    price: "100 DT",
    discountedPrice: "99 DT",
  },
  {
    img1: "/man.jpg",
    img2: "/woman.jpg",
    productName: "Product Name",
    price: "100 DT",
    discountedPrice: "99 DT",
  },
];

const DealsPromotions = () => {
  return (
    <div className="flex flex-col items-center pt-12 gap-12 px-4 md:px-8 lg:px-8 xl:px-18 2xl:px-28">
      <h1 className="text-3xl font-semibold">Don't Miss Our Best Deals</h1>
      <div className="flex w-full  gap-x-8 gap-y-16 justify-center flex-wrap">
        {products.map((product) => (
          <Link
            href="/product"
            className="h-[450px] w-[70%] md:w-[45%] xl:w-[22%] "
          >
            <div className="flex flex-col h-[400px] w-full relative">
              <Image
                src={product.img1}
                alt=""
                fill
                className="object-cover rounded-sm drop-shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <Image
                src={product.img2}
                alt=""
                fill
                className="object-cover rounded-sm drop-shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <h1 className="text-xl px-2 pt-2">{product.productName}</h1>
            <div className="flex ">
              <h2 className="text-lg px-2">{product.discountedPrice}</h2>
              <h2 className="text-lg px-2 line-through text-gray-500">
                {product.price}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DealsPromotions;
