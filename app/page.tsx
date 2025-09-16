'use client';
import Link from 'next/link';
import { Inter, Playfair_Display } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Header from './components/Header';

// Define interfaces for data structures
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface Category {
  name: string;
  count: number;
  image: string;
}

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
}

interface NewsletterForm extends HTMLFormElement {
  readonly elements: FormElements;
}

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });

export default function Home() {
  const [cart, setCart] = useState<Product[]>([]);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Sample featured products data
  const featuredProducts: Product[] = [
    {
      id: 1,
      name: 'Handcrafted Ceramic Vase',
      price: 45.99,
      image: '/images/ceramic-vase.jpg',
      category: 'Pottery',
      description: 'A beautifully glazed vase, handcrafted with traditional techniques.'
    },
    {
      id: 2,
      name: 'Traditional Embroidered Tapestry',
      price: 32.50,
      image: '/images/textiles.jpg',
      category: 'Textiles',
      description: 'Intricate patterns woven by skilled artisans.'
    },
    {
      id: 3,
      name: 'Wood Carved Figurine',
      price: 67.00,
      image: '/images/woodwork.jpg',
      category: 'Woodwork',
      description: 'A detailed carving inspired by cultural heritage.'
    },
    {
      id: 4,
      name: 'Handwoven Reed Basket',
      price: 28.75,
      image: '/images/basket.jpg',
      category: 'Weaving',
      description: 'A sturdy, eco-friendly basket for daily use.'
    }
  ];

  const categories: Category[] = [
    { name: 'Pottery', count: 24, image: '/images/pottery.jpg' },
    { name: 'Textiles', count: 32, image: '/images/textiles.jpg' },
    { name: 'Woodwork', count: 18, image: '/images/woodwork.jpg' },
    { name: 'Jewelry', count: 29, image: '/images/jewelry.jpg' },
  ];

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Basic cart functionality
  const addToCart = (product: Product): void => {
    setCart([...cart, product]);
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    notification.textContent = `${product.name} added to cart!`;
    document.body.appendChild(notification);

    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  // Newsletter form handler
  const handleNewsletterSubmit = (e: React.FormEvent<NewsletterForm>): void => {
    e.preventDefault();
    const email = e.currentTarget.elements.email.value;
    if (email) {
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      successMsg.textContent = 'Thank you for subscribing!';
      document.body.appendChild(successMsg);

      setTimeout(() => {
        document.body.removeChild(successMsg);
      }, 3000);

      e.currentTarget.reset();
    }
  };

  return (
    <div className={`${inter.className} min-h-screen bg-amber-50`}>
      {/* Sticky Header */}
      <Header cart={cart} isScrolled={isScrolled} />

      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-amber-800 bg-cover bg-center bg-fixed">
          <motion.div
            className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: 'easeOut' }}
            aria-label="Background image of traditional crafts"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-amber-600/60 z-10" />
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
            Discover unique handmade treasures that weave stories of cultural heritage and masterful craftsmanship
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

        {/* Scroll indicator */}
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
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className={`${playfair.className} text-4xl md:text-5xl font-bold text-center mb-12 text-amber-900`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            Explore Our Craft Categories
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category: Category, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/category/${category.name.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition duration-500 block"
                >
                  <div className="h-72 relative">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${category.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 to-transparent group-hover:from-amber-900/50 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-semibold">{category.name}</h3>
                      <p className="text-amber-100">{category.count} items</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <motion.h2
              className={`${playfair.className} text-4xl md:text-5xl font-bold text-amber-900`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              Featured Masterpieces
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link
                href="/shop"
                className="text-amber-600 hover:text-amber-700 font-semibold flex items-center group"
              >
                View All
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product: Product, index: number) => (
              <motion.div
                key={product.id}
                className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/product/${product.id}`}>
                  <div className="h-64 relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                  </div>
                  <div className="p-6">
                    <p className="text-amber-600 text-sm mb-1">{product.category}</p>
                    <h3 className="font-semibold text-gray-700/40 text-xl mb-2 group-hover:text-amber-700 transition duration-300">
                      {product.name}
                    </h3>
                    <p className="text-amber-900 font-bold">${product.price.toFixed(2)}</p>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>
                  </div>
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  className="absolute bottom-4 right-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full px-4 py-2 shadow-md opacity-0 group-hover:opacity-100 transition duration-300 transform hover:scale-105"
                  aria-label={`Add ${product.name} to cart`}
                >
                  Add to Cart
                </button>
                <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-amber-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-amber-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Spotlight with Carousel */}
      <section className="py-20 bg-amber-900 text-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className={`${playfair.className} text-4xl md:text-5xl font-bold text-center mb-12`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            Meet Our Artisans
          </motion.h2>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <motion.div
              className="w-full md:w-1/2 lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="h-96 relative rounded-xl overflow-hidden shadow-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/textiles.jpg')" }}
                />
              </div>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="mb-6 text-amber-100 text-lg">
                Our artisans are the heart of our craft. Using techniques passed down through generations, they create pieces that tell stories of culture and tradition. From pottery to textiles, every item is a labor of love.
              </p>
              <Link
                href="/artisans"
                className="inline-flex items-center text-amber-300 hover:text-amber-200 font-semibold group"
              >
                Discover Their Stories
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className={`${playfair.className} text-4xl md:text-5xl font-bold text-center mb-12 text-amber-900`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            What Our Customers Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item: number, index: number) => (
              <motion.div
                key={index}
                className="bg-amber-50 p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  {[0, 1, 2, 3, 4].map((star: number) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-amber-800 mb-4">&quot;The craftsmanship is exceptional! Each piece tells a story and adds so much character to my home.&quot;</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-amber-200 mr-3"></div>
                  <div>
                    <p className="font-semibold text-amber-900">Sarah Johnson</p>
                    <p className="text-sm text-amber-600">Verified Customer</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-amber-100">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.h2
            className={`${playfair.className} text-4xl md:text-5xl font-bold mb-4 text-amber-900`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            Join Our Craft Community
          </motion.h2>
          <motion.p
            className="mb-8 text-amber-800 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Subscribe to our newsletter for exclusive updates on new arrivals, artisan stories, and special offers.
          </motion.p>
          <motion.form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 text-amber-700 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              required
            />
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-md"
            >
              Subscribe
            </button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className={`${playfair.className} text-2xl font-bold mb-4 text-white`}>Crafts Shop</h3>
              <p className="mb-4">Preserving traditional craftsmanship through modern appreciation.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-amber-200 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-amber-200 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-amber-200 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">Shop</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">Information</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Return Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">Contact</h3>
              <address className="not-italic">
                <p className="mb-2">123 Craft Avenue</p>
                <p className="mb-2">Artisan Village, AV 12345</p>
                <p className="mb-2">hello@artisancrafts.com</p>
                <p>(123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="border-t border-amber-800 mt-8 pt-8 text-center">
            <p>© {new Date().getFullYear()} Artisan Crafts. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}