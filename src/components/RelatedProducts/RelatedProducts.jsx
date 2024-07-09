import React from 'react';
import styles from './RelatedProducts.module.css';

const RelatedProducts = ({ products }) => {
  return (
    <div className={styles.relatedProducts}>
      <h2>Related Products</h2>
      <div className={styles.productList}>
        {products.map(product => (
          <div key={product.id} className={styles.productCard}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
