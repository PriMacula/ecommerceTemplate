"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import RelatedProducts from '@/components/RelatedProducts/RelatedProducts';
import Add from '@/components/SingleProduct/Add';
import Benefits from '@/components/SingleProduct/Benefits';
import CallToAction from '@/components/SingleProduct/CallToAction';
import CustomizeProduct from '@/components/SingleProduct/CustomizeProduct';
import ProducImgs from '@/components/SingleProduct/ProducImgs';
import AddReview from '@/components/AddReview/AddReview';
import ReviewList from '@/components/ReviewList/ReviewList';
import Image from 'next/image';
import styles from './SingleProduct.module.css';

const SingleProductPage = () => {
  const { id } = useParams();
  const price = 100;
  const discountedPrice = 99;
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (id) {
      // Fetch the product details
      fetchProduct(id).then(data => {
        setProduct(data);

        // Fetch related products based on the product category
        fetchRelatedProducts( 3).then(relatedData => setRelatedProducts(relatedData));
      });

      // Fetch reviews for the product
      fetchReviews(id).then(data => setReviews(data));
    }
  }, [id]);

  const handleAddReview = async (newReview) => {
    // Submit the review to the API
    const response = await fetch('/api/addReview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: id, ...newReview }),
    });

    if (response.ok) {
      setReviews([...reviews, newReview]);
    } else {
      console.error('Failed to submit review');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-col gap-16 mt-16 px-4 md:px-8 lg:px-8 xl:px-18 2xl:px-28 relative">
      {/* IMGS */}
      <div className="w-full lg:w-1/2">
        <ProducImgs />
      </div>
      {/* TEXT */}
      <div className="w-full lg:w-1/2 flex flex-col gap-14">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-xl text-[#FF0058]">
              {discountedPrice} DT
            </h2>
            <h4 className="text-sm font-medium text-[#FF0058]">
              -{((price - discountedPrice) / price) * 100}%
            </h4>
            <h3 className="text-gray-800 line-through">{price} DT</h3>
          </div>
          <p>{product.description}</p>
        </div>
        <CustomizeProduct />
        <Add />
        <CallToAction />
        <div className="flex flex-col gap-4 font-medium tracking-wide">
          <div className="flex items-center gap-2 -mt-6">
            <Image src="/guarantee.png" alt="" height={24} width={24} />
            <h3>Guaranteed high quality</h3>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/truck.png" alt="" height={24} width={24} />
            <h3>Delivered in maximum 2 days</h3>
          </div>
        </div>
      </div>

      <RelatedProducts products={relatedProducts} />
      <h2 className={styles.reviewTitle}>Customer Reviews</h2>
      <ReviewList reviews={reviews} />
      <AddReview onAddReview={handleAddReview} />
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
const fetchRelatedProducts = async (limit) => {
  const response = await fetch(`https://fakestoreapi.com/products/category/electronics?limit=${limit}`);
  const data = await response.json();
  return data;
};

// Fetch reviews for a product from the local JSON file (simulate fetching from an API)
const fetchReviews = async (productId) => {
  const response = await fetch('/reviews.json');
  const data = await response.json();
  return data[productId] || [];
};

export default SingleProductPage;
