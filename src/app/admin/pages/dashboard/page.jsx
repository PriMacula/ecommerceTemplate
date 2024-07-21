// src/app/admin/pages/dashboard/page.jsx
"use client";
import React from 'react';
import DashboardSummary from '../../components/DashboardSummary/DashboardSummary';
import SalesChart from '../../components/SalesChart/SalesChart';
import RecentOrders from '../../components/RecentOrders/RecentOrders';
import CustomerFeedback from '../../components/CustomerFeedback/CustomerFeedback';
import styles from './dashboard.module.css';
import AdminLayout from '../../layout'; // Import AdminLayout

const DashboardPage = () => {
  return (
    <>
      <h1 className={styles.heading}>Dashboard</h1>
      <div className={styles.main}>
        <div className={styles.dashboardSummary}>
          <DashboardSummary />
        </div>
        <div className={styles.salesChart}>
          <SalesChart />
        </div>
        <div className={styles.recentOrders}>
          <RecentOrders />
        </div>
        <div className={styles.customerFeedback}>
          <CustomerFeedback />
        </div>
      </div>
    </>
  );
};

// Define getLayout to use AdminLayout
DashboardPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default DashboardPage;
