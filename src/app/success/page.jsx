"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaCircleCheck } from 'react-icons/fa6';

const SuccessPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId'); 

  useEffect(() => {
    if (orderId) {
      const fetchOrder = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/Order/getOrder?orderId=${orderId}`);
          const data = await response.json();

          if (response.ok) {
            setOrder(data);
          } else {
            console.error('Failed to fetch order:', data.message);
          }
        } catch (error) {
          console.error('Error fetching order:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="p-4 md:p-0 w-full h-screen flex bg-gray-900 items-center justify-center">
        <div className="min-w-[50%] min-h-[50%] bg-white rounded-lg shadow-lg flex flex-col justify-center gap-6 p-6 md:p-12 text-left">
          <p className="text-black font-semibold text-2xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-4 md:p-0 w-full h-screen flex bg-gray-900 items-center justify-center">
        <div className="min-w-[50%] min-h-[50%] bg-white rounded-lg shadow-lg flex flex-col justify-center gap-6 p-6 md:p-12 text-left">
          <p className="text-black font-semibold text-2xl">Order not found.</p>
        </div>
      </div>
    );
  }

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
          <p><span className="font-semibold">Order ID:</span> {order.orderId}</p>
          <p><span className="font-semibold">Order Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
          <p><span className="font-semibold">Order Total:</span> {order.totalAmount} TND</p>
          <p><span className="font-semibold">Delivery Fees:</span> 0 TND</p>
          <p><span className="font-semibold">Total:</span> {order.totalAmount} TND</p>
          <p><span className="font-semibold">Estimated Delivery Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <Link href="/" className="bg-green-500 text-center text-white font-bold uppercase px-8 py-3 w-full rounded-md hover:bg-green-600 transition-colors duration-300">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
