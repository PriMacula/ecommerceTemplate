"use client";
import React, { useState } from 'react';
import OrderItem from '../OrderItem/OrderItem';

const OrderCard = ({ order }) => {
  const [viewMore, setViewMore] = useState(false);

  return (
    <div className="border text-card-foreground bg-background p-6 rounded-lg shadow-md" data-v0-t="card">
      <div className="flex items-center justify-between mb-4">
        <div className="text-muted-foreground">Order #{order.id} - {order.date}</div>
        <div
          className="inline-flex w-fit items-center whitespace-nowrap border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 px-3 py-1 rounded-full text-xs"
          data-v0-t="badge"
        >
          {order.status}
        </div>
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {order.items.slice(0, viewMore ? order.items.length : 2).map((item, index) => (
            <OrderItem key={index} item={item} />
          ))}
        </div>
        <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
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
