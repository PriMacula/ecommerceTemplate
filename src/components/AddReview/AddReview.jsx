import React, { useState } from 'react';
import styles from './AddReview.module.css';

const AddReview = ({ onAddReview }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddReview({ review, rating });
    setReview('');
    setRating(1);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea
        className={styles.textarea}
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
      />
      <select
        className={styles.select}
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
        ))}
      </select>
      <button type="submit" className={styles.button}>Submit Review</button>
    </form>
  );
};

export default AddReview;
