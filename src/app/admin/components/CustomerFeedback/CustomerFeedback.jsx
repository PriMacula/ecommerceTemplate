// src/app/admin/components/CustomerFeedback/CustomerFeedback.jsx
import React from 'react';
import styles from './CustomerFeedback.module.css';

const CustomerFeedback = () => {
  const feedback = [
    { id: 1, customer: 'John Doe', comment: 'Great service!', date: '2024-07-15' },
    { id: 2, customer: 'Jane Smith', comment: 'Fast delivery!', date: '2024-07-14' },
    // More feedback...
  ];

  return (
    <div className={styles.feedback}>
      <h2>Customer Feedback</h2>
      <ul>
        {feedback.map((item) => (
          <li key={item.id}>
            <p>{item.comment}</p>
            <span>- {item.customer}, {item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerFeedback;
