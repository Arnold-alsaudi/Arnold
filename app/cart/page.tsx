'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartItem } from '../../types';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem('tilago_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        setCartItems([]);
      }
    }
    setIsLoading(false);
  }, []);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.productId === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('tilago_cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cartItems.filter(item => item.productId !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('tilago_cart', JSON.stringify(updatedCart));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const calculateTax = () => {
    // Assuming 10% tax rate - in a real app this would come from settings
    return calculateSubtotal() * 0.1;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-white">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="section-title">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Looks like you haven't added anything to your cart yet</p>
            <a href="/products" className="btn-primary">Browse Products</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="glass-container rounded-xl p-6">
                <ul className="divide-y divide-gray-700">
                  {cartItems.map((item) => (
                    <li key={item.productId} className="py-6 flex">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-700">
                        <img
                          src={item.product.thumbnailUrl}
                          alt={item.product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-white">
                            <h3>{item.product.name}</h3>
                            <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-400">{item.product.category.replace('-', ' ')}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center">
                            <label htmlFor={`quantity-${item.productId}`} className="mr-2 text-gray-400">
                              Qty
                            </label>
                            <select
                              id={`quantity-${item.productId}`}
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                              className="max-w-16 rounded-md border border-gray-700 bg-gray-800 py-1 text-white focus:outline-none focus:ring-1 focus:ring-tilago-accent"
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <option key={num} value={num}>
                                  {num}
                                </option>
                              ))}
                            </select>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.productId)}
                            className="font-medium text-tilago-accent hover:text-tilago-highlight"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-container rounded-xl p-6 sticky top-24">
                <h2 className="text-lg font-medium text-white mb-6">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Subtotal</p>
                    <p className="text-white">${calculateSubtotal().toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Shipping</p>
                    <p className="text-white">Free</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Tax</p>
                    <p className="text-white">${calculateTax().toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                    <p className="text-lg font-bold text-white">Total</p>
                    <p className="text-lg font-bold text-tilago-accent">${calculateTotal().toFixed(2)}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => router.push('/checkout')}
                    className="btn-primary w-full"
                  >
                    Proceed to Checkout
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <a href="/products" className="text-tilago-accent hover:text-tilago-highlight text-sm font-medium">
                    Continue Shopping
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}