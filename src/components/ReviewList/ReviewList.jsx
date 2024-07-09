import React from 'react';
import Reviews from '../Reviews/Reviews'; // Adjust the path as per your project structure

const ReviewList = ({ productId }) => {
  return (
    <div>
      
        <Reviews key={productId} productId={productId} />
     
    </div>
  );
};

export default ReviewList;
