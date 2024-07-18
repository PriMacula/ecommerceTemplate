// src/app/admin/layout.js
import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import styles from './layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.adminContainer}>
      <Sidebar />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
