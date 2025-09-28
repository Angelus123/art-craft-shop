// app/categories/page.tsx
'use client'; // Required for client-side rendering in Next.js App Router

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';
import Header from '../components/Header';

// Import the font
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });

// Sample category data (expandable; grouped from products)
const categories = [
  {
    id: 1,
    name: 'Textiles & Fabrics',
    description: 'Handwoven and embroidered pieces that blend tradition with artistry.',
    image: '/images/categories/textiles.jpg',
    link: '/shop?category=textiles',
  },
  {
    id: 2,
    name: 'Pottery & Ceramics',
    description: 'Wheel-thrown and hand-painted items for functional and decorative use.',
    image: '/images/categories/ceramic-vase.jpg', 
    link: '/shop?category=ceramics',
  },
  {
    id: 3,
    name: 'Woodwork & Sculptures',
    description: 'Carved masterpieces from sustainable woods, capturing cultural essence.',
    image: '/images/categories/woodwork.jpg',
    link: '/shop?category=woodwork',
  },
  {
    id: 4,
    name: 'Jewelry & Accessories',
    description: 'Beaded and crafted adornments inspired by heritage designs.',
    image: '/images/categories/jewelry.jpg',
    link: '/shop?category=jewelry',
  },
  {
    id: 5,
    name: 'Home Decor',
    description: 'Artisanal items to enhance your living spaces with cultural flair.',
    image: '/images/categories/home-decor.jpg', // e.g., from Bamboo Lantern or Metal Wall Art
    link: '/shop?category=home-decor',
  },
  {
    id: 6,
    name: 'Sculptures & Carvings',
    description: 'Detailed stone and metal works that tell stories through form.',
    image: '/images/categories/sculptures.jpg', // e.g., from Stone Carving or Metal Wall Art
    link: '/shop?category=sculptures',
  },
  // Add more categories as needed
];

const Categories: React.FC = () => {
  return (
    <div>
      <Header />
      <section className="min-h-screen bg-amber-50 py-16">
        {/* Header tying back to Hero and Shop style */}
        <div className="container mx-auto px-4 text-center mb-12">
          <motion.h1
            className={`${playfair.className} text-4xl md:text-6xl font-bold text-amber-800 mb-4`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            aria-label="Categories Section Title"
          >
            Our Categories
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-amber-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Explore our curated categories of traditional art and crafts. Each collection showcases unique handmade treasures preserving cultural heritage.
          </motion.p>
        </div>

        {/* Category Grid */}
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              role="article"
              aria-label={`Category: ${category.name}`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-amber-800 mb-2">{category.name}</h2>
                <p className="text-amber-600 mb-4">{category.description}</p>
                <div className="flex justify-center">
                  <Link
                    href={category.link}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
                    aria-label={`Explore ${category.name}`}
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Categories;