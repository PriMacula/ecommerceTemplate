import React, { useState } from 'react';
import styles from './OrderDetails.module.css';
import { FaTimes } from 'react-icons/fa';

const OrderDetails = ({ order, onClose }) => {
  const [status, setStatus] = useState(order.status);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSaveClick = () => {
    // Add your save logic here
    alert(`Order status updated to ${status}`);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
        <h2 className={styles.modalTitle}>Order Details</h2>
        <div className={styles.orderInfo}>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Customer Name:</strong> {order.customerName}</p>
          <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
          <p><strong>Status:</strong>
            <select value={status} onChange={handleStatusChange} className={styles.statusDropdown}>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button className={styles.saveButton} onClick={handleSaveClick}>Save</button>
          </p>
          <h3>Products:</h3>
          <ul>
            {order.products.map((product, index) => (
              <li key={index}>
                {product.name} - {product.quantity} x ${product.price}
              </li>
            ))}
          </ul>
          <p><strong>Total:</strong> ${order.total}</p>
        </div>
        <button className={styles.actionButton} onClick={handleSaveClick}>Contact Customer</button>
      </div>
    </div>
  );
};

export default OrderDetails;
