'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, CartItem } from '../types';
import { getCurrentUser } from '../lib/auth';

const Header = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Get current user
    const user = getCurrentUser();
    setCurrentUser(user);

    // Get cart items from localStorage
    const savedCart = localStorage.getItem('tilago_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        setCartItems([]);
      }
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.div 
            className="text-2xl font-bold tilago-violet-gradient bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Tilago
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link href="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link>
          <Link href="/categories" className="text-gray-300 hover:text-white transition-colors">Categories</Link>
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
          <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
          
          {/* Cart */}
          <Link href="/cart" className="relative p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5m6-5V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2" />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
          
          {/* User Menu */}
          {currentUser ? (
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-300 hover:text-white">
                <span>{currentUser.name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Dashboard</Link>
                <Link href="/orders" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">My Orders</Link>
                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Profile</Link>
                {currentUser.role === 'admin' && (
                  <Link href="/admin" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Admin Panel</Link>
                )}
                <button 
                  onClick={() => {
                    // Handle logout
                    document.cookie = 'auth-token=; Max-Age=0; path=/';
                    window.location.href = '/';
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link href="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
          )}
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-4">
          <Link href="/cart" className="relative p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5m6-5V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2" />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
          <button 
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-dark-800 border-t border-gray-800"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors py-2">Home</Link>
            <Link href="/products" className="text-gray-300 hover:text-white transition-colors py-2">Products</Link>
            <Link href="/categories" className="text-gray-300 hover:text-white transition-colors py-2">Categories</Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors py-2">About</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors py-2">Contact</Link>
            
            {currentUser ? (
              <>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors py-2">Dashboard</Link>
                <Link href="/orders" className="text-gray-300 hover:text-white transition-colors py-2">My Orders</Link>
                <Link href="/profile" className="text-gray-300 hover:text-white transition-colors py-2">Profile</Link>
                {currentUser.role === 'admin' && (
                  <Link href="/admin" className="text-gray-300 hover:text-white transition-colors py-2">Admin Panel</Link>
                )}
                <button 
                  onClick={() => {
                    // Handle logout
                    document.cookie = 'auth-token=; Max-Age=0; path=/';
                    window.location.href = '/';
                  }}
                  className="text-left text-gray-300 hover:text-white transition-colors py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="text-gray-300 hover:text-white transition-colors py-2">Login</Link>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;