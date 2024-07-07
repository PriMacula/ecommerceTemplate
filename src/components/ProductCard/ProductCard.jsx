import React from 'react';
import Image from 'next/image';
import styles from './ProductCard.module.css';

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  } else {
    return text;
  }
};

const ProductCard = ({ product }) => {
  const truncatedTitle = truncateText(product.title, 20); // Adjust the max length as needed

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image 
          src={product.image} 
          alt={product.title} 
          layout="fill" 
          objectFit="cover" 
          className={styles.image} 
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title} title={product.title}>
          {truncatedTitle}
        </h3>
        <p className={styles.price}>${product.price}</p>
        <button className={styles.button}>View Details</button>
      </div>
    </div>
  );
};

export default ProductCard;
