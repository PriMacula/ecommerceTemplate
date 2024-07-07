// components/Categories.js

import React from 'react';
import Link from 'next/link';
import styles from './Categories.module.css';

const categories = [
  { name: 'Electronics', link: '/category/electronics', image: '/electronics.png' },
  { name: 'Fashion', link: '/category/fashion', image: '/electronics.png' },
  { name: 'Home & Garden', link: '/category/home-garden', image: '/electronics.png' },
  { name: 'Sports', link: '/category/sports', image:'/electronics.png' },
  { name: 'Toys', link: '/category/toys', image: '/electronics.png' },
  { name: 'Automotive', link: '/category/automotive', image: '/electronics.png' },
];

const Categories = () => {
  return (
    <div className={styles.categories}>
      <h2 className={styles.title}>Categories</h2>
      <div className={styles.grid}>
        {categories.map((category, index) => (
          <Link key={index} href={category.link} passHref>
            <div className={styles.categoryCard}>
              <div className={styles.categoryImage}>
                <img
                  src={category.image}
                  alt={category.name}
                  className={styles.image}
                />
              </div>
              <span className={styles.categoryName}>{category.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
