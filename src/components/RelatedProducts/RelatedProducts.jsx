import React, { useEffect, useState } from 'react';
import ProductList from '@/components/ProductList/ProductList';

const RelatedProducts = ({ productId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (productId) {
      // Fetch related products based on the product category or any relevant criteria
      fetchRelatedProducts(productId).then(relatedData => setRelatedProducts(relatedData));
    }
  }, [productId]);

  // Simulated function to fetch related products (replace with actual fetch logic)
  const fetchRelatedProducts = async (productId) => {
    // Example fetch logic, replace with your API call
    const response = await fetch(`https://fakestoreapi.com/products/category/${productId}`);
    const data = await response.json();
    return data.slice(0, 3); // Adjust as needed
  };

  return (
    <div>
      <ProductList products={relatedProducts} />
    </div>
  );
};

export default RelatedProducts;
