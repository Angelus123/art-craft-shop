// app/gallery/page.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronLeft, ChevronRight, ZoomIn, Play, Pause, Plus, Minus, ShoppingCart, X } from 'lucide-react';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });

const products = [
  {
    id: 1,
    name: 'Handwoven Basket',
    description: 'Intricately woven from natural fibers, perfect for storage or decor. This beautiful basket is crafted by skilled artisans using sustainable materials that are both durable and eco-friendly.',
    price: 45.99,
    image: '/images/products/basket.jpg',
  },
  {
    id: 2,
    name: 'Ceramic Vase',
    description: 'Hand-painted with traditional motifs, adds elegance to any space. Each vase is unique, featuring patterns passed down through generations of ceramic artists.',
    price: 59.99,
    image: '/images/products/TKX00217.jpg',
  },
  {
    id: 3,
    name: 'Wooden Sculpture',
    description: 'Carved from sustainable wood, depicting cultural symbols. This sculpture represents the rich heritage and craftsmanship of local woodworkers.',
    price: 89.99,
    image: '/images/products/TKX00247.jpg',
  },
  {
    id: 4,
    name: 'Embroidered Textile',
    description: 'Vibrant patterns hand-stitched by artisans. Each textile tells a story through its intricate designs and color combinations.',
    price: 34.99,
    image: '/images/products/textiles.jpg',
  },
  {
    id: 5,
    name: 'Beaded Jewelry Set',
    description: 'Colorful beads in traditional designs, includes necklace and earrings. Made with natural stones and traditional beading techniques.',
    price: 29.99,
    image: '/images/products/jewelry.jpg',
  },
  {
    id: 6,
    name: 'Pottery Bowl',
    description: 'Wheel-thrown and glazed with earthy tones. Each bowl is unique with its own character and finish.',
    price: 24.99,
    image: '/images/products/TKX00247.jpg',
  },
  {
    id: 7,
    name: 'Bamboo Lantern',
    description: 'Eco-friendly lantern with intricate cutouts for ambient lighting. Creates beautiful patterns when lit.',
    price: 39.99,
    image: '/images/products/TKX00319.jpg',
  },
  {
    id: 8,
    name: 'Silk Scarf',
    description: 'Hand-dyed silk with cultural prints, soft and luxurious. Lightweight and perfect for any occasion.',
    price: 49.99,
    image: '/images/products/TKX00247.jpg',
  },
  {
    id: 9,
    name: 'Metal Wall Art',
    description: 'Hammered metal piece inspired by ancient craftsmanship. Adds a touch of elegance to any wall.',
    price: 74.99,
    image: '/images/products/TKX00310.jpg',
  },
  {
    id: 10,
    name: 'Leather Journal',
    description: 'Hand-bound with embossed designs, ideal for writing or sketching. Features high-quality paper and durable binding.',
    price: 32.99,
    image: '/images/products/TKX00247.jpg',
  },
  {
    id: 11,
    name: 'Stone Carving',
    description: 'Detailed sculpture from natural stone, a timeless piece. Showcases the natural beauty of the material.',
    price: 99.99,
    image: '/images/products/TKX09970.jpg',
  },
  {
    id: 12,
    name: 'Woven Rug',
    description: 'Durable and colorful, hand-loomed from wool and cotton. Adds warmth and character to any room.',
    price: 129.99,
    image: '/images/products/woodwork.jpg',
  },
];

const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [showDescription, setShowDescription] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-play logic
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 3000);
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
    setZoomScale(1);
    setShowDescription(false);
    setQuantity(1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    setZoomScale(1);
    setShowDescription(false);
    setQuantity(1);
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
      setZoomScale((prev) => Math.min(Math.max(prev + delta, 1), 5));
    }
  };

  const toggleZoomMode = () => {
    setIsZoomed(!isZoomed);
    setZoomScale(1);
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const currentProduct = products[currentIndex];

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
                key={currentProduct.id}
                src={currentProduct.image}
                alt={currentProduct.name}
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

            {/* Enhanced Product Info Overlay */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 md:p-6 text-white"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex flex-col gap-3">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2">{currentProduct.name}</h2>
                  
                  {/* Collapsible Description */}
                  <div className="mb-2">
                    {showDescription ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-200 text-sm leading-relaxed mb-2">
                          {currentProduct.description}
                        </p>
                        <button
                          onClick={toggleDescription}
                          className="text-blue-300 hover:text-blue-100 text-sm font-medium transition-colors"
                        >
                          Show Less
                        </button>
                      </motion.div>
                    ) : (
                      <div className="flex items-start gap-2">
                        <p className="text-gray-200 text-sm line-clamp-2 flex-1">
                          {currentProduct.description.substring(0, 80)}...
                        </p>
                        <button
                          onClick={toggleDescription}
                          className="text-blue-300 hover:text-blue-100 text-sm font-medium whitespace-nowrap transition-colors"
                        >
                          Read More
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold text-white">${currentProduct.price.toFixed(2)}</span>
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1">
                      <button
                        onClick={decreaseQuantity}
                        className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-white font-semibold min-w-[20px] text-center text-sm">{quantity}</span>
                      <button
                        onClick={increaseQuantity}
                        className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    onClick={handleAddToCart}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                      addedToCart 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white shadow-lg`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={addedToCart}
                  >
                    <ShoppingCart size={16} />
                    {addedToCart ? 'Added!' : `Add - $${(currentProduct.price * quantity).toFixed(2)}`}
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={handlePlayPause}
                className="bg-gray-800/50 hover:bg-gray-800/70 text-white p-2 rounded-full transition-all backdrop-blur-sm"
                aria-label={isPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button
                onClick={toggleZoomMode}
                className="bg-gray-800/50 hover:bg-gray-800/70 text-white p-2 rounded-full transition-all backdrop-blur-sm"
                aria-label={isZoomed ? 'Zoom Out' : 'Zoom In'}
              >
                <ZoomIn size={16} />
              </button>
            </div>

            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800/50 hover:bg-gray-800/70 text-white p-2 rounded-full transition-all backdrop-blur-sm"
              aria-label="Previous Product"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800/50 hover:bg-gray-800/70 text-white p-2 rounded-full transition-all backdrop-blur-sm"
              aria-label="Next Product"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>

          {/* Product List (Right - 1/3 on md+, below on mobile) */}
          <div className="md:col-span-1 overflow-y-auto max-h-[70vh] space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className={`flex items-center bg-white rounded-lg shadow-md p-3 cursor-pointer transition-all ${
                  index === currentIndex 
                    ? 'border-2 border-blue-500 ring-2 ring-blue-200' 
                    : 'hover:shadow-lg'
                }`}
                onClick={() => {
                  setCurrentIndex(index);
                  setShowDescription(false);
                  setQuantity(1);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md mr-3 flex-shrink-0"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-800 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-600 truncate mb-1">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-md font-bold text-gray-700">${product.price.toFixed(2)}</span>
                    {index === currentIndex && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {addedToCart && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50"
            >
              <div className="bg-green-600 rounded-full p-1">
                <ShoppingCart size={20} />
              </div>
              <div>
                <p className="font-semibold">Successfully added to cart!</p>
                <p className="text-sm opacity-90">{quantity} x {currentProduct.name}</p>
              </div>
              <button
                onClick={() => setAddedToCart(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer />
    </div>
  );
};

export default Gallery;