import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import styles from './Newsletter.module.css';

const Newsletter = () => {
  return (
    <div className={styles.newsletter}>
      <FaEnvelope className={styles.icon} />
      <h2 className={styles.heading}>Subscribe to Our Newsletter</h2>
      <form className={styles.form}>
        <input
          type="email"
          className={styles.input}
          placeholder="Enter your email"
          required
        />
        <button type="submit" className={styles.button}>
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
