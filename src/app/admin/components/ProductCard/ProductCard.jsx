// /app/components/ProductCard/ProductCard.jsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
    <div className={styles.productCard}>
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
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>${product.price}</p>
        <Link href={`/product/${product._id}`}>
          <a className={styles.button}>View Details</a>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
