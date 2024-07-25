import React from 'react';

const OrderItem = ({ item }) => {
  return (
    <div className="flex items-center justify-between border-r-2 p-2">
      <div>
        <div className="font-medium">{item.name}</div>
        <div className="text-muted-foreground text-sm">Qty: {item.qty}</div>
      </div>
      <div className="font-medium">${item.price.toFixed(2)}</div>
    </div>
  );
};

export default OrderItem;
