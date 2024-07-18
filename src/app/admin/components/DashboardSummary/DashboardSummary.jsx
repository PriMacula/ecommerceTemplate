// /app/admin/pages/dashboard/DashboardSummary.js
import React from 'react';
import styles from './DashboardSummary.module.css';

const DashboardSummary = () => {
  return (
    <div className={styles.summaryContainer}>
      <h3 className={styles.summaryTitle}>Dashboard Summary</h3>
      <div className={styles.summaryContent}>
        <div className={styles.summaryItem}>
          <h4>Products</h4>
          <p>25</p>
        </div>
        <div className={styles.summaryItem}>
          <h4>Orders</h4>
          <p>50</p>
        </div>
        <div className={styles.summaryItem}>
          <h4>Users</h4>
          <p>100</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
