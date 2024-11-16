// app/menswear/page.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function MenswearPage() {
  const products = [
    { id: 1, name: 'Mens T-shirt', price: '1200', image: '/image/menswear-tshirt.jpg' },
    { id: 2, name: 'Mens Jacket', price: '4500', image: '/image/menswear-jacket.jpg' },
    { id: 3, name: 'Mens Jeans', price: '2200', image: '/image/menswear-jeans.jpg' },
  ];

  return (
    <div className="category-page">
      <h1 className="text-3xl font-bold mb-6 text-center">Menswear Collection</h1>
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
