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
      <DashboardSummary />
    </>
  );
};

// Define getLayout to use AdminLayout
DashboardPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default DashboardPage;
