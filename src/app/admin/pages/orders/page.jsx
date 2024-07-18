"use client";
import React from 'react';
import OrderItem from '../../components/OrderItem/OrderItem';
import styles from './orders.module.css';

const OrdersPage = () => {
  const orders = [
    {
      id: '12345',
      customerName: 'John Doe',
      shippingAddress: '123 Main St, Anytown, USA',
      status: 'Pending',
      products: [
        { name: 'Product 1', quantity: 2, price: 30 },
        { name: 'Product 2', quantity: 1, price: 20 }
      ],
      total: 80
    },
    {
      id: '12346',
      customerName: 'Jane Smith',
      shippingAddress: '456 Elm St, Othertown, USA',
      status: 'Shipped',
      products: [
        { name: 'Product 3', quantity: 1, price: 50 },
        { name: 'Product 4', quantity: 3, price: 15 }
      ],
      total: 95
    }
  ];

  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Manage Orders</h1>
      <div className={styles.orderList}>
        {orders.map(order => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
