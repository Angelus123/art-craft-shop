'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });

// Your products data
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  isNew: boolean;
}

const products = [
  {
    id: 1,
    name: 'Handwoven Basket',
    description: 'Intricately woven from natural fibers, perfect for storage or decor.',
    price: 45.99,
    image: '/images/products/basket.jpg',
    category: 'home-decor',
    rating: 4.5,
    reviews: 128,
    isNew: true
  },
  {
    id: 2,
    name: 'Ceramic Vase',
    description: 'Hand-painted with traditional motifs, adds elegance to any space.',
    price: 59.99,
    image: '/images/products/TKX00217.jpg',
    category: 'ceramics',
    rating: 4.8,
    reviews: 89,
    isNew: false
  },
  {
    id: 3,
    name: 'Wooden Sculpture',
    description: 'Carved from sustainable wood, depicting cultural symbols.',
    price: 89.99,
    image: '/images/products/TKX00247.jpg',
    category: 'woodwork',
    rating: 4.3,
    reviews: 67,
    isNew: true
  },
  {
    id: 4,
    name: 'Embroidered Textile',
    description: 'Vibrant patterns hand-stitched by artisans.',
    price: 34.99,
    image: '/images/products/textiles.jpg',
    category: 'textiles',
    rating: 4.6,
    reviews: 203,
    isNew: false
  },
  {
    id: 5,
    name: 'Beaded Jewelry Set',
    description: 'Colorful beads in traditional designs, includes necklace and earrings.',
    price: 29.99,
    image: '/images/products/jewelry.jpg',
    category: 'jewelry',
    rating: 4.9,
    reviews: 156,
    isNew: true
  },
  {
    id: 6,
    name: 'Silver Tribal Necklace',
    description: 'Handcrafted silver necklace with traditional motifs.',
    price: 89.99,
    image: '/images/products/jewelry-2.jpg',
    category: 'jewelry',
    rating: 4.7,
    reviews: 92,
    isNew: false
  },
  {
    id: 7,
    name: 'Gold Plated Earrings',
    description: 'Elegant gold plated earrings with gemstone accents.',
    price: 45.50,
    image: '/images/products/jewelry-3.jpg',
    category: 'jewelry',
    rating: 4.8,
    reviews: 134,
    isNew: true
  },
  {
    id: 8,
    name: 'Traditional Bracelet Set',
    description: 'Set of three bracelets with cultural patterns.',
    price: 67.00,
    image: '/images/products/jewelry-4.jpg',
    category: 'jewelry',
    rating: 4.6,
    reviews: 78,
    isNew: false
  },
  {
    id: 9,
    name: 'Handwoven Wall Hanging',
    description: 'Beautiful textile art for your walls.',
    price: 75.99,
    image: '/images/products/textiles-2.jpg',
    category: 'home-decor',
    rating: 4.4,
    reviews: 56,
    isNew: false
  },
  {
    id: 10,
    name: 'Decorative Ceramic Plates',
    description: 'Set of hand-painted decorative plates.',
    price: 52.99,
    image: '/images/products/ceramics-2.jpg',
    category: 'home-decor',
    rating: 4.7,
    reviews: 89,
    isNew: true
  }
];

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  console.log('Category param:', category);
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Capitalize category for display
  const categoryName = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Filter products by category
  let filteredProducts = products.filter(product => product.category === category);

  // Apply price range filter
  if (priceRange !== 'all') {
    filteredProducts = filteredProducts.filter(product => {
      switch (priceRange) {
        case 'under-25': return product.price < 25;
        case '25-50': return product.price >= 25 && product.price <= 50;
        case '50-100': return product.price > 50 && product.price <= 100;
        case 'over-100': return product.price > 100;
        default: return true;
      }
    });
  }

  // Apply sorting
  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'new': return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-3 w-3 ${star <= rating ? 'text-amber-400' : 'text-gray-300'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-xs text-gray-500">({rating.toFixed(1)})</span>
      </div>
    );
  };

  const handleAddToCart = (product: Product) => {
    console.log(`Added ${product.name} to cart`);
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    notification.textContent = `${product.name} added to cart!`;
    document.body.appendChild(notification);

    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  return (
    <div className={`${inter.className} min-h-screen bg-gray-50`}>
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-amber-600">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-amber-600">Categories</Link>
            <span>/</span>
            <span className="text-amber-600 font-medium">{categoryName}</span>
          </div>
        </div>
      </nav>

      {/* Category Header */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 mb-4">
            <h1 className={`${playfair.className} text-4xl md:text-5xl font-bold`}>
              {categoryName}
            </h1>
          </div>
          <p className="text-amber-100 text-lg max-w-3xl">
            Browse our collection of {categoryName.toLowerCase()} products.
          </p>
          <div className="flex items-center space-x-6 mt-6 text-amber-100">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">{filteredProducts.length}</span>
              <span>{filteredProducts.length === 1 ? 'Product' : 'Products'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span>4.8 Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full flex items-center justify-between py-2 text-gray-700 font-medium mb-4"
              >
                <span>Filters</span>
                <svg className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-6`}>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'All Prices' },
                      { value: 'under-25', label: 'Under $25' },
                      { value: '25-50', label: '$25 - $50' },
                      { value: '50-100', label: '$50 - $100' },
                      { value: 'over-100', label: 'Over $100' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                        <input
                          type="radio"
                          name="priceRange"
                          value={option.value}
                          checked={priceRange === option.value}
                          onChange={(e) => setPriceRange(e.target.value)}
                          className="text-amber-500 focus:ring-amber-500"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setPriceRange('all');
                    setSortBy('name');
                  }}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sorting Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-gray-600">
                    Showing <span className="font-semibold">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="name">Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="new">New Arrivals</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters to see more products in this category.
                  </p>
                  <button
                    onClick={() => {
                      setPriceRange('all');
                      setSortBy('name');
                    }}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group overflow-hidden"
                  >
                    <Link href={`/products/${product.id}`}>
                      <div className="aspect-square relative overflow-hidden bg-gray-100">
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span>Product Image</span>
                        </div>
                        {product.isNew && (
                          <span className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                            New
                          </span>
                        )}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToCart(product);
                            }}
                            className="bg-white rounded-full p-2 shadow-md hover:bg-amber-50 transition-colors"
                          >
                            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      </Link>
                      
                      <div className="flex items-center justify-between mb-3">
                        {renderStars(product.rating)}
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-amber-600">${product.price}</span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-white border border-amber-500 text-amber-600 hover:bg-amber-50 px-8 py-3 rounded-lg font-semibold transition-colors">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}