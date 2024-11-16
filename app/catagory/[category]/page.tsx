// app/category/[category]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Key, ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode, ReactPortal } from 'react';

export default function CategoryPage() {
  const { category } = useParams(); // Get the category name from the URL

  // Mock data for categories (replace with actual fetch if needed)
  const categoryProducts = {
    electronics: [
      { id: 1, name: 'Smartphone', price: '5000', image: '/image/electronic-camera.jpeg' },
      { id: 2, name: 'Laptop', price: '15000', image: '/image/electronic-fridge.jpg' },
    ],
    fashion: [
      { id: 3, name: 'T-Shirt', price: '500', image: '/image/T-shirt.jpg' },
      { id: 4, name: 'Jeans', price: '1500', image: '/image/jeans.jpg' },
    ],
    "home-garden": [
      { id: 5, name: 'Lamp', price: '1200', image: '/image/home-garden-image2.jpg' },
      { id: 6, name: 'Plant', price: '300', image: '/image/home-garden-image.jpg' },
    ],
  };

  const products = categoryProducts[category] || [];

  return (
    <div className="category-page">
      <h1>{category.replace('-', ' ').toUpperCase()} Products</h1>
      <div className="products-grid">
        {products.map((product: { id: Key | null | undefined; image: string | StaticImport; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; price: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => (
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
