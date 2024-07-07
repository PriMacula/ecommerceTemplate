"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ProductList from '../../../components/ProductList/ProductList';
import styles from './category.module.css';

const sections = [
  { id: 'new-arrivals', title: 'New Arrivals' },
  { id: 'best-sellers', title: 'Best Sellers' },
  { id: 'top-rated', title: 'Top Rated' }
];

const CategoryPage = () => {
  const pathname = usePathname();
  const category = pathname.split('/')[2];
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState({});

  useEffect(() => {
    if (category) {
      sections.forEach(section => {
        fetchProductsForSection(section.id);
      });
    }
  }, [category]);

  const fetchProductsForSection = (sectionId, limit = 12) => {
    setLoading(prevLoading => ({ ...prevLoading, [sectionId]: true }));

    fetch(`https://fakestoreapi.com/products/category/${category}?limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        setProducts(prevProducts => ({
          ...prevProducts,
          [sectionId]: data
        }));
        setLoading(prevLoading => ({ ...prevLoading, [sectionId]: false }));
      })
      .catch(error => {
        console.error(`Error fetching products for section ${sectionId}:`, error);
        setLoading(prevLoading => ({ ...prevLoading, [sectionId]: false }));
      });
  };

  const loadMoreProducts = (sectionId) => {
    const currentProducts = products[sectionId] || [];
    fetchProductsForSection(sectionId, currentProducts.length + 12);
  };

  return (
    <div className={styles.categoryPage}>
      <h1 className={styles.title}>{category.toUpperCase()}</h1>
            {sections.map(section => (
        <div key={section.id} className={styles.section}>
          <h2 className={styles.sectionTitle}>{section.title}</h2>
          <ProductList products={products[section.id] || []} />
          
          <div className={styles.loadMoreButtonContainer}>{(products[section.id] || []).length > 0 && (
            <button
              onClick={() => loadMoreProducts(section.id)}
              className={styles.loadMoreButton}
              disabled={loading[section.id]}
            >
              {loading[section.id] ? 'Loading...' : 'View More'}
            </button>
          )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
