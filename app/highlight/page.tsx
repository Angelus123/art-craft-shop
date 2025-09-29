// app/gallery/page.tsx
'use client'; // Required for client-side rendering in Next.js App Router

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronLeft, ChevronRight, ZoomIn, Play, Pause } from 'lucide-react'; // Assuming lucide-react is installed for icons

// Import the font
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });

// Use the products data from the shop page
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

const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-play logic
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 3000); // Slide every 3 seconds
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
    setZoomScale(1); // Reset zoom on slide change
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    setZoomScale(1); // Reset zoom on slide change
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    } else if (touchEndX.current - touchStartX.current > 50) {
      handlePrev();
    }
  };

  const handleZoom = (e: React.WheelEvent | React.MouseEvent) => {
    if (isZoomed) {
      const delta = 'deltaY' in e ? -e.deltaY / 100 : 0;
      setZoomScale((prev) => Math.min(Math.max(prev + delta, 1), 5)); // Zoom between 1x and 5x
    }
  };

  const toggleZoomMode = () => {
    setIsZoomed(!isZoomed);
    setZoomScale(1); // Reset scale when exiting zoom
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      <Header />
      <section className="py-16 relative">
        {/* Clean Header */}
        <div className="container mx-auto px-4 text-center mb-12">
          <motion.h1
            className={`${playfair.className} text-4xl md:text-6xl font-bold text-gray-800 mb-4`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            aria-label="Gallery Section Title"
          >
            Product Gallery
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Explore our collection of handcrafted art and craft products. Each item is made with care and quality materials.
          </motion.p>
        </div>

        {/* Main Layout: Viewer on left, Product list on right */}
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Gallery Viewer (Left - 2/3 on md+) */}
          <motion.div
            className="md:col-span-2 relative w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-xl shadow-lg bg-white"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleZoom}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={products[currentIndex].id}
                src={products[currentIndex].image}
                alt={products[currentIndex].name}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                style={{ transform: `scale(${zoomScale})` }}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                onClick={toggleZoomMode}
                loading="lazy"
              />
            </AnimatePresence>

            {/* Overlay for Product Info */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-2xl font-semibold mb-1">{products[currentIndex].name}</h2>
              <p className="text-sm mb-1">{products[currentIndex].description}</p>
              <span className="text-lg font-bold">${products[currentIndex].price.toFixed(2)}</span>
            </motion.div>

            {/* Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800/50 hover:bg-gray-800/70 text-white p-2 rounded-full transition-all"
              aria-label="Previous Product"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800/50 hover:bg-gray-800/70 text-white p-2 rounded-full transition-all"
              aria-label="Next Product"
            >
              <ChevronRight size={24} />
            </button>
            <button
              onClick={handlePlayPause}
              className="absolute bottom-2 left-2 bg-gray-800/50 hover:bg-gray-800/70 text-white p-2 rounded-full transition-all"
              aria-label={isPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={toggleZoomMode}
              className="absolute bottom-2 right-2 bg-gray-800/50 hover:bg-gray-800/70 text-white p-2 rounded-full transition-all"
              aria-label={isZoomed ? 'Zoom Out' : 'Zoom In'}
            >
              <ZoomIn size={20} />
            </button>
          </motion.div>

          {/* Product List (Right - 1/3 on md+, below on mobile) */}
          <div className="md:col-span-1 overflow-y-auto max-h-[70vh] space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className={`flex items-center bg-white rounded-lg shadow-md p-3 cursor-pointer transition-all ${index === currentIndex ? 'border-2 border-blue-500' : ''}`}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600 truncate">{product.description}</p>
                  <span className="text-md font-bold text-gray-700">${product.price.toFixed(2)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Gallery;