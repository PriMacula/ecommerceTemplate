import React, { useState, useEffect } from 'react';
import styles from './OrderDetails.module.css';
import { FaTimes } from 'react-icons/fa';

const OrderDetails = ({ order, onClose }) => {
  const [status, setStatus] = useState(order.status);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productPromises = order.products.map(async (item) => {
          const response = await fetch(`/api/Product/getProductById?id=${item.productId}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch product');
          }

          const data = await response.json();
          console.log('Fetched product:', data.product); // Debugging line
          return {
            ...data.product,
            quantity: item.quantity,
            price: parseFloat(data.product.price), // Ensure price is a number
          };
        });

        const productDetails = await Promise.all(productPromises);
        setProducts(productDetails);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError(error.message);
      }
    };

    fetchProductDetails();
  }, [order.products]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSaveClick = () => {
    // Add your save logic here
    alert(`Order status updated to ${status}`);
    onClose();
  };

  // Calculate total price
  const totalPrice = products.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
        <h2 className={styles.modalTitle}>Order Details</h2>
        <div className={styles.orderInfo}>
          <p><strong>Order ID:</strong> {order.orderId}</p>
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
          {error ? (
            <p className={styles.error}>Error: {error}</p>
          ) : (
            <ul>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <li key={index}>
                    {product.title} - {product.quantity} x ${product.price?.toFixed(2) || '0.00'}
                  </li>
                ))
              ) : (
                <li>No products found</li>
              )}
            </ul>
          )}
          <p><strong>Total:</strong> ${totalPrice}</p>
        </div>
        <button className={styles.actionButton} onClick={handleSaveClick}>Contact Customer</button>
      </div>
    </div>
  );
};

export default OrderDetails;
