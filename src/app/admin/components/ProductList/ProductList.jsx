// /app/components/ProductList/ProductList.jsx
import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';

const ProductList = ({ products }) => {
    if (!products) {
      return <div>Loading...</div>; // or handle loading state as needed
    }
  
    return (
      <div className={styles.productList}>
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
  
  );
};

export default ProductList;
