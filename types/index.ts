// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  role: 'customer' | 'admin';
  isActive: boolean;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  thumbnailUrl: string;
  previewUrl?: string;
  downloadUrl: string;
  fileExtension: string;
  fileSize: number; // in bytes
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Cart Types
export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'paid' | 'delivered' | 'cancelled';
  totalAmount: number;
  currency: string;
  billingAddress: Address;
  shippingAddress?: Address;
  paymentMethod: 'stripe' | 'paypal';
  transactionId: string;
  couponCode?: string;
  discountAmount?: number;
  vatAmount?: number;
  vatRate?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

// Transaction Types
export interface Transaction {
  id: string;
  orderId: string;
  paymentMethod: 'stripe' | 'paypal';
  transactionId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentIntentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Invoice Types
export interface Invoice {
  id: string;
  orderId: string;
  invoiceNumber: string; // Format: TLG-YYYY-XXXX
  amount: number;
  currency: string;
  issuedDate: Date;
  dueDate?: Date;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  pdfUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Coupon Types
export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minimumOrderAmount?: number;
  maximumDiscountAmount?: number;
  usageLimit?: number;
  usedCount: number;
  startDate: Date;
  expiryDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// License Types
export interface License {
  id: string;
  orderId: string;
  productId: string;
  licenseKey: string;
  downloadToken: string;
  maxDownloads: number;
  downloadsRemaining: number;
  expiresAt: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Download Log Types
export interface DownloadLog {
  id: string;
  licenseId: string;
  userId: string;
  ipAddress: string;
  userAgent?: string;
  downloadedAt: Date;
}

// Admin Types
export interface AdminRole {
  id: string;
  userId: string;
  permissions: string[]; // e.g., ['read_orders', 'manage_products', 'manage_users']
  createdAt: Date;
  updatedAt: Date;
}

// Settings Types
export interface Settings {
  id: string;
  key: string;
  value: string;
  valueType: 'string' | 'number' | 'boolean' | 'json';
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Payment Types
export interface PaymentIntentData {
  amount: number;
  currency: string;
  receipt_email?: string;
  metadata?: Record<string, string>;
}

export interface PayPalPaymentData {
  intent: 'CAPTURE';
  purchase_units: Array<{
    reference_id: string;
    amount: {
      currency_code: string;
      value: string;
    };
    description?: string;
  }>;
  application_context?: {
    brand_name: string;
    locale: string;
    landing_page: 'LOGIN' | 'BILLING';
    shipping_preference: 'NO_SHIPPING';
    user_action: 'PAY_NOW';
  };
}