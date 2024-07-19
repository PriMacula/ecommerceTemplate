"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ProductList from '../../../components/ProductList/ProductList';
import styles from './Category.module.css';

const CategoryPage = () => {
  const pathname = usePathname();
  const category = pathname.split('/')[2]; // Adjust to extract category from URL as per your setup
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Example fetchProducts function to fetch products based on category
    const fetchProducts = async (category) => {
      try {
        const response = await fetch(`/api/Product/getProductsByCategory?category=${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products); // Update state with fetched products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts(category); // Fetch products when category changes or component mounts
  }, [category]);

  return (
    <div className={styles.categoryPage}>
      <h1 className={styles.title}>{category.toUpperCase()}</h1>
      <ProductList products={products} />
      <h1 className={styles.title}>{category.toUpperCase()}</h1>
      <ProductList products={products} />
      <h1 className={styles.title}>{category.toUpperCase()}</h1>
      <ProductList products={products} />
    </div>
  );
};

export default CategoryPage;
