'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';
import { X, Heart, Share2, ShoppingBag, ZoomIn, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  dimensions?: { width: number; height: number };
  materials?: string;
  rating: number;
  reviews: number;
}

const artworks: Product[] = [
  {
    id: 1,
    name: 'Handwoven Basket',
    description: 'Intricately woven from natural fibers, perfect for storage or decor. This sustainable piece blends traditional craftsmanship with modern eco-conscious design.',
    price: 45.99,
    image: '/images/artworks/basket.jpg',
    category: 'home-decor',
    dimensions: { width: 3, height: 2 },
    rating: 4.8,
    reviews: 45,
    materials: 'Natural fibers, sustainable materials',
  },
  {
    id: 2,
    name: 'Ceramic Vase',
    description: 'Hand-painted with bold, contrasting motifs inspired by 2025 trends. Each unique vase features patterns that merge heritage with contemporary personalization.',
    price: 59.99,
    image: '/images/artworks/TKX00217.jpg',
    category: 'ceramics',
    dimensions: { width: 2, height: 1 },
    rating: 4.7,
    reviews: 32,
    materials: 'Ceramic, non-toxic glazes',
  },
  {
    id: 3,
    name: 'Wooden Sculpture',
    description: 'Carved from sustainable wood with cultural symbols. This piece embodies the craft renaissance, combining organic forms with experimental textures.',
    price: 89.99,
    image: '/images/artworks/TKX00247.jpg',
    category: 'woodwork',
    dimensions: { width: 2, height: 1 },
    rating: 4.9,
    reviews: 28,
    materials: 'Sustainable hardwood',
  },
  {
    id: 4,
    name: 'Embroidered Textile',
    description: 'Vibrant, mismatched patterns hand-stitched by artisans. Tells a story through bold colors and inclusive designs, perfect for personalized spaces.',
    price: 34.99,
    image: '/images/artworks/textiles.jpg',
    category: 'textiles',
    dimensions: { width: 1, height: 2 },
    rating: 4.6,
    reviews: 56,
    materials: 'Cotton, natural dyes',
  },
  {
    id: 5,
    name: 'Beaded Jewelry Set',
    description: 'Colorful beads in expressive designs, including necklace and earrings. Made with natural stones and sustainable techniques for everyday luxury.',
    price: 29.99,
    image: '/images/artworks/TKX00247.jpg',
    category: 'jewelry',
    dimensions: { width: 1, height: 1 },
    rating: 4.5,
    reviews: 67,
    materials: 'Natural stones, metal alloys',
  },
  {
    id: 6,
    name: 'Pottery Bowl',
    description: 'Wheel-thrown with earthy tones and lo-fi textures. Unique character that aligns with new naturalism trends in sustainable homeware.',
    price: 24.99,
    image: '/images/artworks/jewelry.jpg',
    category: 'pottery',
    dimensions: { width: 3, height: 2 },
    rating: 4.8,
    reviews: 41,
    materials: 'Clay, natural glazes',
  },
  {
    id: 7,
    name: 'Bamboo Lantern',
    description: 'Eco-friendly with intricate cutouts for ambient lighting. Creates patterns that evoke \'70s revival with modern sustainable twists.',
    price: 39.99,
    image: '/images/artworks/TKX00319.jpg',
    category: 'lighting',
    dimensions: { width: 1, height: 1 },
    rating: 4.7,
    reviews: 39,
    materials: 'Bamboo, LED compatible',
  },

  {
    id: 9,
    name: 'Metal Wall Art',
    description: 'Hammered metal inspired by ancient craftsmanship with bold contrasts. Adds elegant, experimental flair to any wall.',
    price: 74.99,
    image: '/images/artworks/TKX00310.jpg',
    category: 'metalwork',
    dimensions: { width: 3, height: 2 },
    rating: 4.6,
    reviews: 34,
    materials: 'Recycled metal',
  },

  {
    id: 11,
    name: 'Stone Carving',
    description: 'Detailed sculpture from natural stone with timeless appeal. Showcases organic beauty and new naturalism in design.',
    price: 99.99,
    image: '/images/artworks/TKX09970.jpg',
    category: 'stonework',
    dimensions: { width: 1, height: 2 },
    rating: 4.9,
    reviews: 29,
    materials: 'Natural stone',
  },
  {
    id: 12,
    name: 'Woven Rug',
    description: 'Durable and colorful, hand-loomed from wool and cotton. Adds warmth with mismatched patterns and sustainable materials.',
    price: 129.99,
    image: '/images/artworks/woodwork.jpg',
    category: 'home-decor',
    dimensions: { width: 1, height: 2},
    rating: 4.7,
    reviews: 37,
    materials: 'Wool, cotton',
  },
];

const Gallery: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
      const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isZoomed, setIsZoomed] = useState(false);
   // Scroll effect for header
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Grid layout with different sizes based on dimensions
  const getGridClass = (dimensions?: { width: number; height: number }) => {
    const baseClasses = "relative overflow-hidden rounded-2xl cursor-pointer bg-gray-50";
    const dims = dimensions || { width: 1, height: 1 };
    
    if (dims.width >= 3 && dims.height >= 2) {
      return `${baseClasses} col-span-2 row-span-2 md:col-span-3 md:row-span-2`;
    } else if (dims.width === 2 && dims.height === 3) {
      return `${baseClasses} col-span-1 row-span-3`;
    } else if (dims.width === 2 && dims.height === 2) {
      return `${baseClasses} col-span-2 row-span-2`;
    } else if (dims.height >= 2) {
      return `${baseClasses} col-span-1 row-span-2`;
    } else if (dims.width >= 2) {
      return `${baseClasses} col-span-2 row-span-1`;
    } else {
      return `${baseClasses} col-span-1 row-span-1`;
    }
  };

  return (
    <div>
       <Header isScrolled={isScrolled} />
    <div className="min-h-screen bg-white py-12 px-4">
      {/* Enhanced Header */}


      {/* Asymmetrical Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto auto-rows-[200px]">
        {artworks.map((product) => (
          <motion.div
            key={product.id}
            className={getGridClass(product.dimensions)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedProduct(product)}
          >
            {/* Product Image */}
            <div className="relative w-full h-full group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              
              {/* Overlay with Info */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex flex-col justify-between p-6">
                {/* Top Actions */}
                <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`p-2 rounded-full backdrop-blur-sm ${
                      wishlist.includes(product.id) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/90 text-gray-700 hover:bg-white'
                    }`}
                  >
                    <Heart 
                      size={20} 
                      fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} 
                    />
                  </button>
                  <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                {/* Bottom Info */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-white font-semibold text-lg drop-shadow-lg">
                    {product.name}
                  </h3>
                  <p className="text-white/90 text-sm drop-shadow-lg">
                    {product.category}
                  </p>
                </div>
              </div>

              {/* Quick Action Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="flex-1 bg-white text-gray-900 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  <ShoppingBag size={16} />
                  Quick Add
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedProduct(null);
              setIsZoomed(false);
            }}
          >
            <motion.div
              className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                {/* Image Section */}
                <div className="relative h-96 lg:h-full bg-gray-100">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className={`object-contain transition-transform duration-300 ${
                      isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                    }`}
                    onClick={() => setIsZoomed(!isZoomed)}
                  />
                  
                  {/* Image Controls */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => setIsZoomed(!isZoomed)}
                      className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                    >
                      <ZoomIn size={20} />
                    </button>
                    <button
                      onClick={() => toggleWishlist(selectedProduct.id)}
                      className={`p-2 rounded-full backdrop-blur-sm ${
                        wishlist.includes(selectedProduct.id) 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/90 text-gray-700 hover:bg-white'
                      }`}
                    >
                      <Heart 
                        size={20} 
                        fill={wishlist.includes(selectedProduct.id) ? 'currentColor' : 'none'} 
                      />
                    </button>
                  </div>
                </div>

                {/* Product Info Section */}
                <div className="p-8 lg:p-12 flex flex-col h-full overflow-y-auto">
                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      setIsZoomed(false);
                    }}
                    className="absolute top-4 right-4 lg:top-6 lg:right-6 text-gray-500 hover:text-gray-700 p-2 z-10"
                  >
                    <X size={24} />
                  </button>

                  <div className="flex-1">
                    <div className="mb-6">
                      <span className="text-sm text-gray-500 uppercase tracking-wider">
                        {selectedProduct.category}
                      </span>
                      <h2 className={`${playfair.className} text-4xl font-bold text-gray-900 mt-2 mb-4`}>
                        {selectedProduct.name}
                      </h2>
                      <p className="text-2xl font-bold text-gray-900 mb-2">
                        ${selectedProduct.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mb-6">
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              fill={i < Math.floor(selectedProduct.rating) ? 'currentColor' : 'none'}
                              stroke="currentColor"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedProduct.description}
                      </p>
                    </div>

                    {selectedProduct.materials && (
                      <div className="mb-8">
                        <h3 className="font-semibold text-gray-900 mb-3">Materials</h3>
                        <p className="text-gray-600 leading-relaxed">
                          {selectedProduct.materials}
                        </p>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <button className="flex-1 bg-gray-900 text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-3">
                          <ShoppingBag size={20} />
                          Add to Cart
                        </button>
                        <button className="p-4 border border-gray-300 rounded-xl hover:border-gray-400 transition-colors">
                          <Share2 size={20} />
                        </button>
                      </div>
                      
                      <button className="w-full border border-gray-900 text-gray-900 py-4 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                        Buy Now
                      </button>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Free Shipping</span>
                        <p className="font-medium">On orders over $50</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Returns</span>
                        <p className="font-medium">30-day guarantee</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    <Footer />
    </div>
  );
};

export default Gallery;