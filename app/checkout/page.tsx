'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartItem, Address } from '../../types';

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [discount, setDiscount] = useState(0);
  const router = useRouter();

  // Form state
  const [billingAddress, setBillingAddress] = useState<Address>({
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: '',
  });

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

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const calculateTax = () => {
    // Assuming 10% tax rate - in a real app this would come from settings
    return (calculateSubtotal() - discount) * 0.1;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - discount + calculateTax();
  };

  const handleApplyCoupon = () => {
    setIsApplyingCoupon(true);
    // Simulate API call to validate coupon
    setTimeout(() => {
      // In a real app, this would be an API call to validate the coupon
      // For now, we'll just apply a 10% discount if the code is "SAVE10"
      if (couponCode.toUpperCase() === 'SAVE10') {
        setDiscount(calculateSubtotal() * 0.1);
      } else {
        alert('Invalid coupon code');
      }
      setIsApplyingCoupon(false);
    }, 1000);
  };

  const handlePlaceOrder = async () => {
    // Basic validation
    if (!billingAddress.firstName || !billingAddress.lastName || !billingAddress.address1 || 
        !billingAddress.city || !billingAddress.state || !billingAddress.zipCode || 
        !billingAddress.country) {
      alert('Please fill in all required billing address fields');
      return;
    }

    // Simulate order placement
    setIsLoading(true);
    
    // In a real app, this would be an API call to create the order
    // For now, we'll simulate the process
    setTimeout(() => {
      // Clear cart after successful order
      localStorage.removeItem('tilago_cart');
      setOrderPlaced(true);
      setIsLoading(false);
      
      // Redirect after a few seconds
      setTimeout(() => {
        router.push('/order-success');
      }, 3000);
    }, 2000);
  };

  if (isLoading && !orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-white">Loading checkout...</div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-300 mb-6">Redirecting to order confirmation...</p>
          <div className="w-12 h-12 border-4 border-tilago-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="section-title">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Billing Information */}
          <div>
            <div className="glass-container rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-6">Billing Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={billingAddress.firstName}
                    onChange={(e) => setBillingAddress({...billingAddress, firstName: e.target.value})}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={billingAddress.lastName}
                    onChange={(e) => setBillingAddress({...billingAddress, lastName: e.target.value})}
                    className="input-field"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={billingAddress.company}
                    onChange={(e) => setBillingAddress({...billingAddress, company: e.target.value})}
                    className="input-field"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="address1" className="block text-sm font-medium text-gray-300 mb-1">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    id="address1"
                    value={billingAddress.address1}
                    onChange={(e) => setBillingAddress({...billingAddress, address1: e.target.value})}
                    className="input-field"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="address2" className="block text-sm font-medium text-gray-300 mb-1">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    id="address2"
                    value={billingAddress.address2}
                    onChange={(e) => setBillingAddress({...billingAddress, address2: e.target.value})}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={billingAddress.city}
                    onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-300 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    id="state"
                    value={billingAddress.state}
                    onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-300 mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    value={billingAddress.zipCode}
                    onChange={(e) => setBillingAddress({...billingAddress, zipCode: e.target.value})}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1">
                    Country *
                  </label>
                  <select
                    id="country"
                    value={billingAddress.country}
                    onChange={(e) => setBillingAddress({...billingAddress, country: e.target.value})}
                    className="input-field"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="JP">Japan</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={billingAddress.phone}
                    onChange={(e) => setBillingAddress({...billingAddress, phone: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="glass-container rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Payment Method</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="stripe"
                    name="paymentMethod"
                    checked={activePaymentMethod === 'stripe'}
                    onChange={() => setActivePaymentMethod('stripe')}
                    className="h-4 w-4 text-tilago-accent focus:ring-tilago-accent"
                  />
                  <label htmlFor="stripe" className="ml-3 block text-sm font-medium text-white">
                    Credit Card (Stripe)
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    checked={activePaymentMethod === 'paypal'}
                    onChange={() => setActivePaymentMethod('paypal')}
                    className="h-4 w-4 text-tilago-accent focus:ring-tilago-accent"
                  />
                  <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-white">
                    PayPal
                  </label>
                </div>
              </div>
              
              {activePaymentMethod === 'stripe' ? (
                <div className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="input-field"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-300 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        placeholder="MM/YY"
                        className="input-field"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-300 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        placeholder="123"
                        className="input-field"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-300 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        id="cardholderName"
                        placeholder="John Doe"
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                  <p className="text-gray-300 mb-4">You will be redirected to PayPal to complete your purchase.</p>
                  <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    <div className="ml-4">
                      <p className="text-white font-medium">PayPal</p>
                      <p className="text-gray-400 text-sm">Secure payment gateway</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="glass-container rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <ul className="divide-y divide-gray-700 mb-6">
                {cartItems.map((item) => (
                  <li key={item.productId} className="py-4 flex justify-between">
                    <div>
                      <p className="text-white">{item.product.name}</p>
                      <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-white">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </li>
                ))}
              </ul>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <p className="text-gray-400">Subtotal</p>
                  <p className="text-white">${calculateSubtotal().toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-gray-400">Discount</p>
                  <p className="text-green-500">-${discount.toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-gray-400">Tax</p>
                  <p className="text-white">${calculateTax().toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between border-t border-gray-700 pt-4">
                  <p className="text-lg font-bold text-white">Total</p>
                  <p className="text-lg font-bold text-tilago-accent">${calculateTotal().toFixed(2)}</p>
                </div>
              </div>
              
              {/* Coupon Code */}
              <div className="flex mb-6">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon code"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-tilago-accent text-white"
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={isApplyingCoupon}
                  className="bg-tilago-accent hover:bg-tilago-highlight text-white font-medium py-2 px-6 rounded-r-lg transition-all duration-300 disabled:opacity-50"
                >
                  {isApplyingCoupon ? 'Applying...' : 'Apply'}
                </button>
              </div>
              
              <button
                onClick={handlePlaceOrder}
                className="btn-primary w-full py-3 text-lg"
              >
                Place Order
              </button>
              
              <p className="text-gray-500 text-sm mt-4 text-center">
                Your order will be processed securely. You'll receive a confirmation email shortly after payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}