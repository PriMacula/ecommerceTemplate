// src/app/admin/components/SalesChart/SalesChart.jsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './SalesChart.module.css';

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: 'white',
      borderColor: 'black',
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const SalesChart = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; // or a loading spinner
  }

  return (
    <div className={styles.chart}>
        <h2>Sales</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesChart;
