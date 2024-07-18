import React, { useState } from 'react';
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import OrderDetails from '../OrderDetails/OrderDetails';
import styles from './OrderItem.module.css';

const OrderItem = ({ order }) => {
  const [isDetailsVisible, setDetailsVisible] = useState(false);

  const handleViewDetails = () => {
    setDetailsVisible(true);
  };

  const handleCloseDetails = () => {
    setDetailsVisible(false);
  };

  return (
    <>
      <div className={styles.orderItem}>
        <h2 className={styles.orderTitle}>Order #{order.id}</h2>
        <p className={styles.orderDetails}>Customer: {order.customerName}</p>
        <p className={styles.orderDetails}>Status: {order.status}</p>
        <div className={styles.actionButtons}>
          <button className={styles.actionButton} onClick={handleViewDetails}>
            <FaEye />
          </button>
          <button className={styles.actionButton} onClick={() => alert('Mark as Delivered')}>
            <FaCheck />
          </button>
        </div>
      </div>

      {isDetailsVisible && (
        <OrderDetails order={order} onClose={handleCloseDetails} />
      )}
    </>
  );
};

export default OrderItem;
