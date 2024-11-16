"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const products = [
    { id: 1, name: 'watche', price: '2000.00', image: '/image/watche.jpg' },
    { id: 2, name: 'HeadPhone', price: '1000', image: '/image/headphone.jpg' },
    { id: 3, name: 'Product 3', price: '900', image: '/image/shoes.jpeg' },
    { id: 4, name: 'Pattu Langa Designs For Kids', price: '2000', image: '/image/Pattu Langa Designs For Kids.jpg' },
    { id: 5, name: 'Royal Marathi Grooms That Aced The Peshwai Wedding Look', price: '10000', image: '/image/Royal Marathi Wedding dress.jpg' },
  ];

  return (
    <div className="home-page">
      <header className="banner">
        <h1>Welcome to  GG Store!</h1>
        <p>Find the best products at amazing prices.</p>
        <Link href="/products">
          <button className="shop-now-button">Shop Now</button>
        </Link>
      </header>

      <section className="featured-products">
        <h2>Featured Products</h2>
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
      </section>

      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <Link href="/catagory/electronics">
            <div className="category-card">Electronics</div>
          </Link>
          <Link href="/catagory/fashion">
            <div className="category-card">Fashion</div>
          </Link>
          <Link href="/catagory/home-garden">
            <div className="category-card">Home & Garden</div>
          </Link>
        </div>
      </section>

      <section className="special-offers">
        <h2>Special Offers</h2>
        <p>Don’t miss out on our exclusive deals and discounts!</p>
        <Link href="/offers">
          <button className="special-offers-button">View Offers</button>
        </Link>
      </section>

      <style jsx>{`
        .home-page {
          background-image: url('/image/homepagebg.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
}
