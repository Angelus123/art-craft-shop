// app/shop/page.tsx
'use client'; // Required for client-side rendering in Next.js App Router

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';
import Header from '../components/Header';

// Import the font
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });

// Sample product data (12 items, expandable)
const products = [
  {
    id: 1,
    name: 'Handwoven Basket',
    description: 'Intricately woven from natural fibers, perfect for storage or decor.',
    price: 45.99,
    image: '/images/products/basket.jpg',
  },
  {
    id: 2,
    name: 'Ceramic Vase',
    description: 'Hand-painted with traditional motifs, adds elegance to any space.',
    price: 59.99,
    image: '/images/products/TKX00217.jpg',
  },
  {
    id: 3,
    name: 'Wooden Sculpture',
    description: 'Carved from sustainable wood, depicting cultural symbols.',
    price: 89.99,
    image: '/images/products/TKX00247.jpg',
  },
  {
    id: 4,
    name: 'Embroidered Textile',
    description: 'V airport patterns hand-stitched by artisans.',
    price: 34.99,
    image: '/images/products/textiles.jpg',
  },
  {
    id: 5,
    name: 'Beaded Jewelry Set',
    description: 'Colorful beads in traditional designs, includes necklace and earrings.',
    price: 29.99,
    image: '/images/products/jewelry.jpg',
  },
  {
    id: 6,
    name: 'Pottery Bowl',
    description: 'Wheel-thrown and glazed with earthy tones.',
    price: 24.99,
    image: '/images/products/TKX00247.jpg',
  },
  {
    id: 7,
    name: 'Bamboo Lantern',
    description: 'Eco-friendly lantern with intricate cutouts for ambient lighting.',
    price: 39.99,
    image: '/images/products/TKX00319.jpg',
  },
  {
    id: 8,
    name: 'Silk Scarf',
    description: 'Hand-dyed silk with cultural prints, soft and luxurious.',
    price: 49.99,
    image: '/images/products/TKX00247.jpg',
  },
  {
    id: 9,
    name: 'Metal Wall Art',
    description: 'Hammered metal piece inspired by ancient craftsmanship.',
    price: 74.99,
    image: '/images/products/TKX00310.jpg',
  },
  {
    id: 10,
    name: 'Leather Journal',
    description: 'Hand-bound with embossed designs, ideal for writing or sketching.',
    price: 32.99,
    image: '/images/products/TKX00247.jpg',
  },
  {
    id: 11,
    name: 'Stone Carving',
    description: 'Detailed sculpture from natural stone, a timeless piece.',
    price: 99.99,
    image: '/images/products/TKX09970.jpg',
  },
  {
    id: 12,
    name: 'Woven Rug',
    description: 'Durable and colorful, hand-loomed from wool and cotton.',
    price: 129.99,
    image: '/images/products/woodwork.jpg',
  },
];
 

const Shop: React.FC = () => {
  return (
    <div>
      <Header />
    <section className="min-h-screen bg-amber-50 py-16">
      {/* Header tying back to Hero style */}
      
      <div className="container mx-auto px-4 text-center mb-12">
        <motion.h1
          className={`${playfair.className} text-4xl md:text-6xl font-bold text-amber-800 mb-4`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          aria-label="Shop Section Title"
        >
          Our Shop
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-amber-700 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Browse our collection of authentic traditional art and crafts. Each piece is handmade with care, preserving cultural heritage.
        </motion.p>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            role="article"
            aria-label={`Product: ${product.name}`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-amber-800 mb-2">{product.name}</h2>
              <p className="text-amber-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-amber-700">${product.price.toFixed(2)}</span>
                <Link
                  href={`/product/${product.id}`}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
                  aria-label={`View details for ${product.name}`}
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination or Load More */}
      <div className="container mx-auto px-4 text-center mt-12">
        <button
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg"
          onClick={() => alert('Load more products')} // Replace with actual load more logic
          aria-label="Load more products"
        >
          Load More
        </button>
      </div>
    </section>
    </div>
  );
};

export default Shop;