"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductList from '@/components/ProductList/ProductList';
import ReviewList from '@/components/ReviewList/ReviewList'; // Assuming ReviewList is the component displaying reviews
import AddReview from '@/components/AddReview/AddReview';
import styles from './SingleProduct.module.css';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]); // State for managing reviews

  useEffect(() => {
    if (id) {
      // Fetch the product details
      fetchProduct(id).then(data => {
        setProduct(data);

        // Fetch related products based on the product category
        fetchRelatedProducts(data.category, 3).then(relatedData => setRelatedProducts(relatedData));
      });

      // Fetch reviews for the product
      fetchReviews(id).then(data => setReviews(data));
    }
  }, [id]);

  const handleAddReview = (newReview) => {
    // Normally, you would submit this to an API or update state as needed.
    // For demo purposes, we'll add the review to the existing list in state.
    setReviews([...reviews, newReview]);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.productDetails}>
        <h1>{product.title}</h1>
        <div className={styles.imageWrapper}>
          <img src={product.image} alt={product.title} />
        </div>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
      </div>
      <h2>Related Products</h2>
      <ProductList products={relatedProducts} />
      <h2>Customer Reviews</h2>

      <ReviewList productId={id} /> {/* Displaying ReviewList component with reviews */}
      <AddReview productId={id} onSubmit={handleAddReview} />
    </div>
  );
};

// Fetch single product details from the API
const fetchProduct = async (id) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await response.json();
  return data;
};

// Fetch related products based on category from the API
const fetchRelatedProducts = async (category, limit) => {
  const response = await fetch(`https://fakestoreapi.com/products/category/${category}?limit=${limit}`);
  const data = await response.json();
  return data;
};

// Fetch reviews for a product from the local JSON file (simulate fetching from an API)
const fetchReviews = async (productId) => {
  const response = await fetch('/reviews.json');
  const data = await response.json();
  return data[productId] || [];
};

export default SingleProduct;
