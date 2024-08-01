"use client";
import React, { useEffect, useState } from "react";
import OrderCard from "@/components/OrderCard/OrderCard";

const PurchaseHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const resp = await fetch("/api/getUserId");
        const userId = await resp.json();

        if (!userId) {
          setIsLoggedIn(false);
          setLoading(false);
          return;
        }

        setIsLoggedIn(true);

        const response = await fetch(
          `/api/getorderbyuserid?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!isLoggedIn)
    return (
      <p className="text-2xl text-center my-10 font-bold ">
        Please login to view your purchase history.
      </p>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Purchase History</h1>
      <div className="grid gap-6">
        {orders.length > 0 ? (
          orders.map((order) => <OrderCard key={order._id} order={order} />)
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
