// /app/admin/pages/products/page.jsx
"use client";
import React from 'react';
import Layout from '../../layout';
import ProductList from '../../components/ProductList/ProductList';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import OrderItem from '../../components/OrderItem/OrderItem';

const ProductsPage = () => {

    const order = {
        id: '12345',
        customerName: 'John Doe',
        shippingAddress: '123 Main St, Anytown, USA',
        status: 'Pending',
        products: [
          { name: 'Product 1', quantity: 2, price: 30 },
          { name: 'Product 2', quantity: 1, price: 20 }
        ],
        total: 80
      };
  return (
    <>
        <main>
      <h1>Manage Products</h1>
      <OrderItem  key={order.id} order={order} />
      <ProductList />
      </main>
    </>
  );
};

export default ProductsPage;
