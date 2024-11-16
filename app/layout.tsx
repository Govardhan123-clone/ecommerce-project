"use client";

import './globals.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [username, setUsername] = useState("VI KHAS"); // Username sample
  const [currentTime, setCurrentTime] = useState(""); // Current time state
  const router = useRouter();

  // Update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString()); // Update the time in "HH:MM:SS AM/PM" format
    }, 1000);

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  // Map category names to their respective page paths
  const categoryPages = {
    all: "/",
    electronics: "/catagory/electronics",
    fashion: "/catagory/fashion",
    homeGarden: "/catagory/home-garden",
    kidswear: "/catagory/kidswear",
    menswear: "/catagory/menswear",
    westernwear: "/catagory/westernwear",
  };

  // Handle category change and navigate to category page
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);

    // If no search query, navigate directly to the selected category page
    if (!searchQuery.trim()) {
      router.push(categoryPages[category] || "/products");
    }
  };

  // Handle search button click
  const handleSearch = () => {
    if (searchQuery.trim()) {
      // If there is a search query, navigate to search results with query and category filter
      router.push(`/search?query=${encodeURIComponent(searchQuery)}&category=${selectedCategory}`);
    } else {
      // If no search query, navigate to selected category page
      router.push(categoryPages[selectedCategory] || "/products");
    }
  };

  return (
    <html lang="en">
      <head>
        <title>E-Commerce Store</title>
      </head>
      <body>
        <header className="header">
          <nav className="top-nav">
            <a href="/" className="logo">
              <Image src="/image/GGStoreLOGO.jpg" alt="Store Logo" width={80} height={80} />
            </a>

            <div className="search-bar">
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="category-dropdown"
              >
                <option value="all">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="homeGarden">Home & Garden</option>
                <option value="kidswear">Kids Wear</option>
                <option value="menswear">Mens Wear</option>
                <option value="westernwear">Western Wear</option>
              </select>
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>

            <div className="auth-links">
              {isAuthenticated ? (
                <>
                  <button onClick={() => setIsAuthenticated(false)} className="nav-button">Logout</button>
                  <a href="/change-password" className="nav-link">Change Password</a>
                </>
              ) : (
                <>
                  <a href="/register" className="nav-link">Register</a>
                  <a href="/login" className="nav-link">Login</a>
                  <a href="/forgot-password" className="nav-link">Forgot Password</a>
                </>
              )}

              {/* Shopping Cart Icon - Place it next to Forgot Password */}
              <a href="/cart" className="cart-link">
                <Image src="/image/shoppingcartimage.jpg" alt="Shopping Cart" width={40} height={40} />
              </a>
            </div>
          </nav>
        </header>

        {/* Display the username and time on the top-right */}
        <div className="username-time">
          <p>{username}</p>
          <p>{currentTime}</p>
        </div>

        <div className="layout">
          <aside className="sidebar">
            <nav className="vertical-nav">
              <a href="/" className="nav-link">Home</a>
              <a href="/products" className="nav-link">Products</a>
              <a href="/about" className="nav-link">About Us</a>
              <a href="/contact" className="nav-link">Contact Us</a>
              <a href="/orders" className="nav-link">Order</a>
            </nav>
          </aside>
          <main className="main-content">{children}</main>
        </div>

        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} E-Commerce Store. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
  