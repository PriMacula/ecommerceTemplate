// src/app/admin/components/RecentOrders/RecentOrders.jsx
import React from 'react';
import styles from './RecentOrders.module.css';

const RecentOrders = () => {
  const orders = [
    { id: 1, customer: 'John Doe', date: '2024-07-15', total: '$150' },
    { id: 2, customer: 'Jane Smith', date: '2024-07-14', total: '$200' },
    // More orders...
  ];

  return (
    <div className={styles.orders}>
      <h2>Recent Orders</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.date}</td>
              <td>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;
