// app/westernwear/page.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function WesternwearPage() {
  const products = [
    { id: 1, name: 'Western Shirt', price: '1800', image: '/image/westernwear-shirt.jpg' },
    { id: 2, name: 'Western Jeans', price: '2500', image: '/image/westernwear-jeans.jpg' },
    { id: 3, name: 'Western Boots', price: '3200', image: '/image/westernwear-boots.jpg' },
  ];

  return (
    <div className="category-page">
      <h1 className="text-3xl font-bold mb-6 text-center">Western Wear Collection</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card border rounded-lg shadow-lg p-4">
            <Image src={product.image} alt={product.name} width={200} height={200} className="object-cover" />
            <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.price} INR</p>
            <Link href={`/products/${product.id}`}>
              <button className="view-details-button mt-4 py-2 px-4 bg-blue-500 text-white rounded-full">View Details</button>
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
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        .product-card {
          text-align: center;
        }
        .view-details-button {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
