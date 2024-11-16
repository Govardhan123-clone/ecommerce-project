'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function ProductPage() {
  return (
    <>
      <style jsx>{`
        .productCard {
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px solid #ddd;
          padding: 16px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          background-color: #fff;
          width: 300px;
          transition: transform 0.3s ease-in-out;
        }

        .productCard:hover {
          transform: translateY(-5px);
        }

        .productImage {
          border-radius: 8px;
          margin-bottom: 16px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .productTitle {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          text-align: center;
        }

        .productDescription {
          font-size: 1rem;
          color: #555;
          margin-top: 8px;
          text-align: center;
        }

        .productPrice {
          font-size: 1.25rem;
          color: #f39c12;
          margin-top: 8px;
          font-weight: bold;
        }

        .buttonContainer {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          width: 100%;
          margin-top: 16px;
        }

        .addToCartButton,
        .paymentButton {
          background-color: #f39c12;
          color: white;
          border: none;
          padding: 10px;
          width: 100%;
          cursor: pointer;
          border-radius: 5px;
          font-size: 1rem;
          transition: background-color 0.3s ease-in-out;
        }

        .addToCartButton:hover,
        .paymentButton:hover {
          background-color: #e67e22;
        }
      `}</style>

      <div className="productCard">
        <Image
          src="/image/shoes.jpg" // Ensure this path is correct
          alt="Gold Jewellery"
          width={300}
          height={200}
        />

        <h2 className="productTitle">Shoes for Men</h2>
        <p className="productDescription">Detailed description of shoes for men</p>
        <h3 className="productPrice">Rs 900</h3>

        <div className="buttonContainer">
          <Link href="/cart">
            <button className="addToCartButton">Add to Cart</button>
          </Link>
          <Link href="/payment">
            <button className="paymentButton">Buy Now</button>
          </Link>
        </div>
      </div>
    </>
  );
}
