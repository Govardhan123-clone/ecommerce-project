// app/products/[id]/page.tsx
"use client";

import { useRouter } from 'next/router';

const products = [
  { id: 1, name: 'Product 1', description: 'Detailed description for Product 1', price: 29.99 },
  { id: 2, name: 'Product 2', description: 'Detailed description for Product 2', price: 39.99 },
  { id: 3, name: 'Product 3', description: 'Detailed description for Product 3', price: 49.99 },
];

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === parseInt(params.id));
  
  if (!product) return <p>Product not found</p>;

  const handleAddToCart = () => {
    // Add product to cart (this would involve updating a global cart state or API call)
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
