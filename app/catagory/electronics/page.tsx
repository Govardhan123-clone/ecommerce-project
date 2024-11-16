// app/electronics/page.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function ElectronicsPage() {
  const products = [
    { id: 1, name: 'Camera', price: '5000', image: '/image/electronic-camera.jpg' },
    { id: 2, name: 'Fridge', price: '15000', image: '/image/electronic-fridge.jpg' },
  ];

  return (
    <div className="category-page">
      <h1>Electronics Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Image src={product.image} alt={product.name} width={200} height={200} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <Link href={`/products/${product.id}`}>
              <button className="view-details-button">View Details</button>
            </Link>
          </div>
        ))}
      </div>
      <style jsx>{`
        .category-page {
          padding: 20px;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
        .product-card {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
        }
        .view-details-button {
          margin-top: 10px;
          padding: 5px 10px;
          background-color: #0070f3;
          color: #fff;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
