"use client";
import React, { useState } from 'react';
import OrderItem from '../OrderItem/OrderItem';

const OrderCard = ({ order }) => {
  const [viewMore, setViewMore] = useState(false);

  return (
    <div className="border text-card-foreground bg-background p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="text-muted-foreground">
          Order #{order.orderId} - {new Date(order.createdAt).toLocaleDateString()}
        </div>
        <div
          className={`inline-flex w-fit items-center whitespace-nowrap border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${
            order.status === 'Delivered' ? 'bg-green-500 text-green-50' : 
            order.status === 'Pending' ? 'bg-yellow-500 text-yellow-50' : 
            order.status === 'Shipped' ? 'bg-blue-500 text-blue-50' : 
            'bg-red-500 text-red-50'
          } hover:bg-opacity-80 px-3 py-1 rounded-full text-xs`}
        >
          {order.status}
        </div>
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {order.products.slice(0, viewMore ? order.products.length : 2).map((product, index) => (
            <OrderItem key={index} item={product} />
          ))}
        </div>
        <div className="shrink-0 bg-border h-[1px] w-full"></div>
        <div className="flex justify-end">
          <button
            onClick={() => setViewMore(!viewMore)}
            className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {viewMore ? 'View Less' : 'View More'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
