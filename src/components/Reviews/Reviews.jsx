import React, { useEffect, useState } from 'react';
import styles from './Reviews.module.css';

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews(productId).then(data => setReviews(data));
  }, [productId]);

  return (
    <div className={styles.reviews}>
      {reviews.length > 0 ? (
        reviews.map(review => (
          <div key={review.id} className={styles.review}>
            <p><strong>{review.username}</strong></p>
            <p>Rating: {review.rating}/5</p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

// Fetch reviews data from the local JSON file
const fetchReviews = async (productId) => {
  const response = await fetch('/reviews.json');
  const data = await response.json();
  return data[productId] || [];
};

export default Reviews;
