'use client';
import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Inter, Playfair_Display } from 'next/font/google';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

// Your products data
const products = [
  {
    id: 1,
    name: 'Handwoven Basket',
    description: 'Intricately woven from natural fibers, perfect for storage or decor. This beautiful basket is crafted by skilled artisans using sustainable materials that are both durable and eco-friendly.',
    price: 45.99,
    image: '/images/products/basket.jpg',
    category: 'home-decor',
  },
  {
    id: 2,
    name: 'Ceramic Vase',
    description: 'Hand-painted with traditional motifs, adds elegance to any space. Each vase is unique, featuring patterns passed down through generations of ceramic artists.',
    price: 59.99,
    image: '/images/products/TKX00217.jpg',
    category: 'ceramics',
  },
  {
    id: 3,
    name: 'Wooden Sculpture',
    description: 'Carved from sustainable wood, depicting cultural symbols. This sculpture represents the rich heritage and craftsmanship of local woodworkers.',
    price: 89.99,
    image: '/images/products/TKX00247.jpg',
    category: 'woodwork',
  },
  {
    id: 4,
    name: 'Embroidered Textile',
    description: 'Vibrant patterns hand-stitched by artisans. Each textile tells a story through its intricate designs and color combinations.',
    price: 34.99,
    image: '/images/products/textiles.jpg',
    category: 'textiles',
  },
  {
    id: 5,
    name: 'Beaded Jewelry Set',
    description: 'Colorful beads in traditional designs, includes necklace and earrings. Made with natural stones and traditional beading techniques.',
    price: 29.99,
    image: '/images/products/jewelry.jpg',
    category: 'jewelry',
  },
  {
    id: 6,
    name: 'Pottery Bowl',
    description: 'Wheel-thrown and glazed with earthy tones. Each bowl is unique with its own character and finish.',
    price: 24.99,
    image: '/images/products/TKX00247.jpg',
    category: 'ceramics',
  },
  {
    id: 7,
    name: 'Bamboo Lantern',
    description: 'Eco-friendly lantern with intricate cutouts for ambient lighting. Creates beautiful patterns when lit.',
    price: 39.99,
    image: '/images/products/TKX00319.jpg',
    category: 'lighting',
  },
  {
    id: 8,
    name: 'Silk Scarf',
    description: 'Hand-dyed silk with cultural prints, soft and luxurious. Lightweight and perfect for any occasion.',
    price: 49.99,
    image: '/images/products/TKX00247.jpg',
    category: 'fashion',
  },
  {
    id: 9,
    name: 'Metal Wall Art',
    description: 'Hammered metal piece inspired by ancient craftsmanship. Adds a touch of elegance to any wall.',
    price: 74.99,
    image: '/images/products/TKX00310.jpg',
    category: 'metalwork',
  },
  {
    id: 10,
    name: 'Leather Journal',
    description: 'Hand-bound with embossed designs, ideal for writing or sketching. Features high-quality paper and durable binding.',
    price: 32.99,
    image: '/images/products/TKX00247.jpg',
    category: 'stationery',
  },
  {
    id: 11,
    name: 'Stone Carving',
    description: 'Detailed sculpture from natural stone, a timeless piece. Showcases the natural beauty of the material.',
    price: 99.99,
    image: '/images/products/TKX09970.jpg',
    category: 'stonework',
  },
  {
    id: 12,
    name: 'Woven Rug',
    description: 'Durable and colorful, hand-loomed from wool and cotton. Adds warmth and character to any room.',
    price: 129.99,
    image: '/images/products/woodwork.jpg',
    category: 'textiles',
  },
];

// Cart Context for better state management
interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, qty: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

const Product = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Find the product by ID
  const product = products.find(p => p.id === parseInt(id));
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [cart, setCart] = useState<Product[]>([]);
  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // If product not found
  if (!product) {
    return (
      <div className=" mt-30">
        <Header cart={cart} isScrolled={isScrolled} />
        <div className="min-h-screen bg-amber-50 mt-30 flex items-center justify-center">
          <div className="text-center">
            <h1 className={`${playfair.className} text-4xl font-bold text-amber-900 mb-4`}>Product Not Found</h1>
            <p className="text-amber-700 mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              href="/products"
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Mock product images for gallery
  const productImages = [
    product.image,
    '/images/products/jewelry-2.jpg',
    '/images/products/jewelry-3.jpg',
    '/images/products/jewelry-4.jpg'
  ];

  // Mock related products (products from same category)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Category display names
  const categoryDisplayNames: { [key: string]: string } = {
    'home-decor': 'Home Decor',
    'ceramics': 'Ceramics',
    'woodwork': 'Woodwork',
    'textiles': 'Textiles',
    'jewelry': 'Jewelry',
    'lighting': 'Lighting',
    'fashion': 'Fashion',
    'metalwork': 'Metalwork',
    'stationery': 'Stationery',
    'stonework': 'Stonework'
  };

  const handleAddToCart = () => {
    // Add to cart functionality
    console.log(`Added ${quantity} of ${product.name} to cart`);
    // Show success message
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    notification.textContent = `${product.name} added to cart!`;
    document.body.appendChild(notification);

    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  const handleBuyNow = () => {
    // Buy now functionality
    console.log(`Buying ${quantity} of ${product.name}`);
    // Redirect to checkout or implement your checkout logic
  };

  return (
    <div>
      <Header cart={cart} isScrolled={isScrolled} />
      <div className={`${inter.className} min-h-screen bg-amber-50`}>
        {/* Breadcrumb Navigation */}
        <nav className="bg-white border-b border-amber-200 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-2 text-sm text-amber-700">
              <Link href="/" className="hover:text-amber-900">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-amber-900">Products</Link>
              <span>/</span>
              <Link href={`/categories/${product.category}`} className="hover:text-amber-900 capitalize">
                {categoryDisplayNames[product.category] || product.category}
              </Link>
              <span>/</span>
              <span className="text-amber-900">{product.name}</span>
            </div>
          </div>
        </nav>

        {/* Product Detail Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-white rounded-lg border-2 overflow-hidden transition-all ${selectedImage === index ? 'border-amber-500' : 'border-transparent hover:border-amber-300'
                      }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              <div>
                <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {categoryDisplayNames[product.category] || product.category}
                </span>
                <h1 className={`${playfair.className} text-4xl font-bold text-amber-900 mt-4`}>
                  {product.name}
                </h1>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5 text-amber-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-amber-700">(128 reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold text-amber-600">${product.price}</span>
                <span className="text-lg text-amber-500 line-through">$39.99</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                  25% OFF
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-amber-900 mb-2">Description</h3>
                <p className="text-amber-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-amber-900">Features</h3>
                <ul className="text-amber-700 space-y-1">
                  <li>• Handcrafted by skilled artisans</li>
                  <li>• Made with natural, sustainable materials</li>
                  <li>• Traditional techniques passed through generations</li>
                  <li>• Unique design with cultural significance</li>
                  <li>• Eco-friendly and durable</li>
                </ul>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <span className="text-amber-900 font-medium">Quantity:</span>
                <div className="flex items-center border border-amber-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-amber-600 hover:bg-amber-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-amber-900 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-amber-600 hover:bg-amber-50 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-amber-600">
                  Only 12 left in stock
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-4 px-8 rounded-lg font-semibold transition-colors shadow-lg flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-amber-700 hover:bg-amber-800 text-white py-4 px-8 rounded-lg font-semibold transition-colors shadow-lg"
                >
                  Buy Now
                </button>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-amber-200">
                <div className="text-center">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <p className="text-sm text-amber-700">Free Shipping</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-sm text-amber-700">Quality Guarantee</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className={`${playfair.className} text-3xl font-bold text-amber-900 mb-8`}>
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <span className="inline-block bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium mb-2 capitalize">
                        {categoryDisplayNames[relatedProduct.category] || relatedProduct.category}
                      </span>
                      <h3 className="font-semibold text-amber-900 group-hover:text-amber-700 transition-colors line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-amber-600 font-bold mt-2">${relatedProduct.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

const WrappedProducts = () => (
  <CartProvider>
    <Product />
  </CartProvider>
);

export default WrappedProducts;