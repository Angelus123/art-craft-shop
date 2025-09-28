{/* Hero Section with Parallax */}
// Hero.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';

// Import the font (assuming Next.js setup)
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });

// Array of background images for the slider (add your image paths here)
const backgroundImages = [
  '/images/hero.jpg', // Image showcasing traditional crafts
  '/images/basket.jpg', // Another craft image
  '/images/jewelry.jpg', // More artisanal work
  // Add more images as needed to advertise various art crafts
];

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-slide effect every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 bg-amber-800 bg-cover bg-center bg-fixed">
        {backgroundImages.map((img, index) => (
          <motion.div
            key={img}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            aria-label={`Background image of traditional craft: ${img.split('/').pop()?.replace('.jpg', '')}`}
          />
        ))}
      </div>

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/30 z-10" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 text-center text-white mt-16">
        <motion.h1
          className={`${playfair.className} text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Traditional Art & Craft
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Discover unique handmade treasures that weave stories of cultural heritage and masterful craftsmanship. Explore our collection of artisanal pieces, each crafted with passion and tradition.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Link
            href="/shop"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-10 rounded-full transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Shop Now
          </Link>
          <Link
            href="/about"
            className="border-2 border-white hover:bg-white/20 text-white font-semibold py-3 px-10 rounded-full transition duration-300 transform hover:scale-105"
          >
            Our Story
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>

      {/* Slider Indicators (Dots) for User Interaction */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Slide to image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;