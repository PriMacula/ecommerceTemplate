// src/app/admin/layout.js
import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import styles from './layout.module.css';

const AdminLayout = ({ children }) => {
  return (
    <div className={styles.adminContainer}>
      <Sidebar />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
