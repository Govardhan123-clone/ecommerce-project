// app/orders/page.tsx
"use client";

import { useState } from 'react';

const cartItems = [
  { id: 1, name: 'Product 1', quantity: 1, price: 29.99 },
  { id: 2, name: 'Product 2', quantity: 2, price: 39.99 },
];

export default function OrdersPage() {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    // Place order logic (this would involve API call to process the order)
    setOrderPlaced(true);
  };

  return (
    <div className="order-page">
      <h1>Your Cart</h1>
      {orderPlaced ? (
        <p>Thank you! Your order has been placed.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <h2>{item.name}</h2>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price.toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <p>Total: ${total.toFixed(2)}</p>
          <button onClick={handlePlaceOrder}>Place Order</button>
        </>
      )}
    </div>
  );
}
