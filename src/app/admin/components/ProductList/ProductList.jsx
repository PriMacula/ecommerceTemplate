// src/app/admin/components/ProductList/ProductList.jsx
import React from 'react';
import styles from './ProductList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <div key={product._id} className={styles.productItem}>
          <div className={styles.productInfo}>
            <span className={styles.productTitle}>{product.title}</span>
            <span className={styles.productDescription}>{product.description}</span>
            <span className={styles.productPrice}>${product.price.toFixed(2)}</span>
          </div>
          <div className={styles.productActions}>
            <button className={styles.actionButton} onClick={() => onEdit(product)}>
              <FontAwesomeIcon icon={faEdit} /> Edit
            </button>
            <button className={styles.actionButton} onClick={() => onDelete(product._id)}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
