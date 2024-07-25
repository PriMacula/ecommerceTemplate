import React from 'react';
import OrderCard from '@/components/OrderCard/OrderCard';

const PurchaseHistory = () => {
  const orders = [
    {
      id: 'OD12345',
      date: '2023-06-15',
      status: 'Delivered',
      items: [
        { name: 'Wireless ass', qty: 1, price: 99.99 },
        { name: 'Portable Charger', qty: 1, price: 49.99 },
        { name: 'Bluetooth Speaker', qty: 1, price: 79.99 },
      ],
    },
    {
      id: 'OD12346',
      date: '2023-05-20',
      status: 'Delivered',
      items: [{ name: 'T-Shirt', qty: 2, price: 39.99 }],
    },
    {
      id: 'OD12347',
      date: '2023-04-01',
      status: 'Delivered',
      items: [{ name: 'Laptop Backpack', qty: 1, price: 299.99 }],
    },
    {
      id: 'OD12348',
      date: '2023-03-10',
      status: 'Delivered',
      items: [{ name: 'Wireless Mouse', qty: 2, price: 29.99 }],
    },
    {
      id: 'OD12349',
      date: '2023-02-25',
      status: 'Delivered',
      items: [{ name: 'Gaming Keyboard', qty: 1, price: 199.99 }],
    },
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Purchase History</h1>
      <div className="grid gap-6">
        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default PurchaseHistory;
