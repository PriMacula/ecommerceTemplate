import Link from "next/link";
import { FaCircleCheck } from "react-icons/fa6";

const SuccessPage = () => {
  return (
    <div className="p-4 md:p-0 w-full h-screen flex bg-gray-900 items-center justify-center">
      <div className="min-w-[50%] min-h-[50%] bg-white rounded-lg shadow-lg flex flex-col justify-center gap-6 p-6 md:p-12 text-left">
        <div className="flex items-center gap-4">
        <FaCircleCheck size={40} className="text-green-500 " />
        <p className="text-black font-semibold text-2xl">
            Your order has been placed successfully
          </p>
        </div>
        <div className="text-gray-700 space-y-2">
          <p><span className="font-semibold">Order ID:</span> 12345</p>
          <p><span className="font-semibold">Order Date:</span> 2023-01-01</p>
          <p><span className="font-semibold">Order Total:</span> 99 TND</p>
          <p><span className="font-semibold">Delivery Fees:</span> 0 TND</p>
          <p><span className="font-semibold">Total:</span> 99 TND</p>
          <p><span className="font-semibold">Estimated Delivery Date:</span> 2023-01-01</p>
        </div>
        <Link href="/" className="bg-green-500 text-center text-white font-bold uppercase px-8 py-3 w-full rounded-md hover:bg-green-600 transition-colors duration-300">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
