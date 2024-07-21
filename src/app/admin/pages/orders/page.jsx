"use client";
import React, { useEffect, useState } from 'react';
import OrderItem from '../../components/OrderItem/OrderItem';
import styles from './orders.module.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/Order/getOrders'); // Make sure this path matches your route
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Manage Orders</h1>
      <div className={styles.orderList}>
        {orders.map(order => (
          <OrderItem key={order._id} order={order} /> // Use _id if your MongoDB schema uses it
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
