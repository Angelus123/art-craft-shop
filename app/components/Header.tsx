'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });

// Define the shape of a cart item (adjust based on your actual cart structure)
interface CartItem {
  id: string | number;
  // Add other properties as needed, e.g., name, price, quantity
}

// Define the props for the Navbar component
interface NavbarProps {
  isScrolled: boolean;
  cart?: CartItem[];
}

// Define the shape of a navigation link
interface NavLink {
  href: string;
  label: string;
}

export default function Navbar({ isScrolled, cart = [] }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const navLinks: NavLink[] = [
    { href: '/shop', label: 'Shop' },
    { href: '/categories', label: 'Categories' },
    { href: '/artisans', label: 'Artisans' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header
      className={`fixed w-full z-30 transition-all duration-300 ${
        isScrolled ? 'bg-amber-900 shadow-md py-2' : 'bg-white/60 py-4'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className={`${playfair.className} text-2xl md:text-3xl font-bold transition-colors ${
            isScrolled ? 'text-white' : 'text-amber-900'
          } hover:text-amber-700`}
          aria-label="Artisan Crafts Home"
        >
          Artisan Crafts
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium text-base transition-colors ${
                isScrolled
                  ? 'text-amber-100 hover:text-white focus:text-white'
                  : 'text-amber-900 hover:text-amber-700 focus:text-amber-700'
              } focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* Search Button */}
          <button
            className={`p-2 rounded-full transition-colors ${
              isScrolled ? 'bg-amber-800 text-white' : 'bg-white/20 text-amber-900'
            } hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500`}
            aria-label="Search products"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Cart Button */}
          <div className="relative">
            <button
              className={`p-2 rounded-full transition-colors ${
                isScrolled ? 'bg-amber-800 text-white' : 'bg-white/20 text-amber-900'
              } hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500`}
              aria-label={`Shopping cart with ${cart.length} items`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </button>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav
          className={`flex flex-col space-y-4 bg-amber-900/95 p-4 ${
            isScrolled ? 'text-amber-100' : 'text-amber-900'
          }`}
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium text-base transition-colors ${
                isScrolled
                  ? 'text-amber-100 hover:text-white focus:text-white'
                  : 'text-amber-900 hover:text-amber-700 focus:text-amber-700'
              } focus:outline-none focus:ring-2 focus:ring-amber-500 rounded`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}