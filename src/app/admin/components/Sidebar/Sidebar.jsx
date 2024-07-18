// /app/admin/components/Sidebar/Sidebar.js
import React from 'react';
import Link from 'next/link';
import { FaChartLine, FaBoxOpen, FaClipboardList, FaUsers, FaCog } from 'react-icons/fa'; // Importing Font Awesome icons
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Admin Panel</h2>
      <ul className={styles.menu}>
        <li className={styles.item}>
          <Link href="/admin/pages/dashboard">
            <div className={styles.link}>
              <FaChartLine className={styles.icon} /> Dashboard
            </div>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/admin/pages/products">
            <div className={styles.link}>
              <FaBoxOpen className={styles.icon} /> Manage Products
            </div>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/admin/pages/orders">
            <div className={styles.link}>
              <FaClipboardList className={styles.icon} /> Manage Orders
            </div>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/admin/pages/users">
            <div className={styles.link}>
              <FaUsers className={styles.icon} /> Manage Users
            </div>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/admin/pages/settings">
            <div className={styles.link}>
              <FaCog className={styles.icon} /> Settings
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
