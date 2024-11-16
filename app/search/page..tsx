"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [rating, setRating] = useState(searchParams.get("rating") || "");

  const products = [
    { id: 1, name: 'Laptop', category: 'electronics', price: 1000, rating: 4, image: '/images/laptop.jpg' },
    { id: 2, name: 'T-Shirt', category: 'fashion', price: 20, rating: 5, image: '/images/tshirt.jpg' },
    { id: 3, name: 'Garden Tools', category: 'home-garden', price: 50, rating: 3, image: '/images/garden_tools.jpg' },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = (!minPrice || product.price >= parseFloat(minPrice)) &&
                         (!maxPrice || product.price <= parseFloat(maxPrice));
    const matchesRating = !rating || product.rating >= parseFloat(rating);

    return matchesCategory && matchesQuery && matchesPrice && matchesRating;
  });

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleMinPriceChange = (e) => setMinPrice(e.target.value);
  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);
  const handleRatingChange = (e) => setRating(e.target.value);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("query", searchQuery);
    if (selectedCategory) params.set("category", selectedCategory);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (rating) params.set("rating", rating);
    router.replace(`/search?${params.toString()}`);
  }, [searchQuery, selectedCategory, minPrice, maxPrice, rating]);

  return (
    <div className="search-page p-6">
      <h1 className="text-2xl font-semibold mb-4">Search Products</h1>

      {/* Search and Filters */}
      <div className="filter mb-6">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border rounded w-full mb-4"
        />

        <label htmlFor="category" className="mr-2">Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border rounded mb-4"
        >
          <option value="all">All Products</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home-garden">Home & Garden</option>
        </select>

        <label htmlFor="minPrice" className="mr-2">Min Price:</label>
        <input
          type="number"
          id="minPrice"
          value={minPrice}
          onChange={handleMinPriceChange}
          className="p-2 border rounded mb-4"
          placeholder="Min"
        />

        <label htmlFor="maxPrice" className="mr-2">Max Price:</label>
        <input
          type="number"
          id="maxPrice"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="p-2 border rounded mb-4"
          placeholder="Max"
        />

        <label htmlFor="rating" className="mr-2">Minimum Rating:</label>
        <select
          id="rating"
          value={rating}
          onChange={handleRatingChange}
          className="p-2 border rounded mb-4"
        >
          <option value="">All Ratings</option>
          <option value="1">1 Star & up</option>
          <option value="2">2 Stars & up</option>
          <option value="3">3 Stars & up</option>
          <option value="4">4 Stars & up</option>
        </select>
      </div>

      {/* Display Filtered Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card p-4 border rounded shadow-md">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-500">${product.price.toFixed(2)}</p>
              <p className="text-yellow-500">Rating: {product.rating} ★</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
