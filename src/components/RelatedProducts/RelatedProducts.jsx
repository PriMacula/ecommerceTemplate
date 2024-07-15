import React, { useEffect, useState } from 'react';
import ProductList from '@/components/ProductList/ProductList';

const RelatedProducts = ({ productId, category }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (productId && category) {
      
      fetchRelatedProducts(category, productId).then((relatedData) =>
        setRelatedProducts(relatedData)
      );
    }
  }, [productId, category]);

  
  const fetchRelatedProducts = async (category, currentProductId) => {
    try {
      
      const response = await fetch(`/api/getProductsByCategory?category=${category}`);
      const data = await response.json();
      
      
      if (data.products && Array.isArray(data.products)) {
        
        const filteredProducts = data.products.filter(product => product._id !== currentProductId);
        return filteredProducts.slice(0, 3); 
      } else {
        console.error('Invalid data format:', data);
        return [];
      }
    } catch (error) {
      console.error('Failed to fetch related products:', error);
      return [];
    }
  };

  return (
    <div>
      <ProductList products={relatedProducts} />
    </div>
  );
};

export default RelatedProducts;
