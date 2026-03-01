import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '../types';

// Mock data for featured products - in a real app this would come from an API
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Stream Alert Pack',
    description: 'Professional streaming alerts with customizable themes and smooth animations',
    price: 29.99,
    category: 'stream-alerts',
    thumbnailUrl: '/api/placeholder/300/200',
    previewUrl: '/api/placeholder/800/600',
    downloadUrl: '',
    fileExtension: 'zip',
    fileSize: 10485760, // 10MB
    tags: ['streaming', 'alerts', 'twitch', 'youtube'],
    isActive: true,
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Creative Editing Bundle',
    description: 'Essential assets for video editors including transitions, lower thirds, and graphics',
    price: 49.99,
    category: 'editing-assets',
    thumbnailUrl: '/api/placeholder/300/200',
    previewUrl: '/api/placeholder/800/600',
    downloadUrl: '',
    fileExtension: 'zip',
    fileSize: 52428800, // 50MB
    tags: ['editing', 'transitions', 'graphics', 'video'],
    isActive: true,
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Social Media Overlay Kit',
    description: 'Complete overlay collection for live streams and social media content',
    price: 39.99,
    category: 'overlays',
    thumbnailUrl: '/api/placeholder/300/200',
    previewUrl: '/api/placeholder/800/600',
    downloadUrl: '',
    fileExtension: 'zip',
    fileSize: 20971520, // 20MB
    tags: ['social', 'overlays', 'streaming', 'branding'],
    isActive: true,
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 tilago-gradient"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Premium Digital <span className="tilago-violet-gradient bg-clip-text text-transparent">Products</span> Marketplace
            </h1>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              Discover and purchase high-quality digital assets including stream alerts, editing assets, overlays, templates, and custom design services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/products" className="btn-primary">
                Browse Products
              </Link>
              <Link href="/categories" className="btn-secondary">
                View Categories
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">
            Explore our most popular digital products handpicked by our team
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="glass-container rounded-xl p-6 product-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4">
                  <img 
                    src={product.thumbnailUrl} 
                    alt={product.name} 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-gray-400 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-tilago-accent">${product.price.toFixed(2)}</span>
                  <Link href={`/product/${product.id}`} className="btn-primary">
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/products" className="btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-dark-900/30">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-subtitle">
            Find exactly what you're looking for in our organized categories
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Stream Alerts', count: 42, image: '/api/placeholder/300/200', color: 'from-purple-600 to-indigo-700' },
              { name: 'Editing Assets', count: 38, image: '/api/placeholder/300/200', color: 'from-blue-600 to-teal-700' },
              { name: 'Overlays', count: 31, image: '/api/placeholder/300/200', color: 'from-violet-600 to-purple-700' },
              { name: 'Templates', count: 27, image: '/api/placeholder/300/200', color: 'from-indigo-600 to-blue-700' },
              { name: 'Digital Packs', count: 19, image: '/api/placeholder/300/200', color: 'from-teal-600 to-green-700' },
              { name: 'Custom Design', count: 15, image: '/api/placeholder/300/200', color: 'from-orange-600 to-red-700' },
              { name: 'Sound Effects', count: 23, image: '/api/placeholder/300/200', color: 'from-pink-600 to-rose-700' },
              { name: 'Graphics', count: 35, image: '/api/placeholder/300/200', color: 'from-cyan-600 to-sky-700' },
            ].map((category, index) => (
              <motion.div
                key={category.name}
                className={`glass-container rounded-xl p-6 text-center ${index % 2 === 0 ? 'hover:tilago-violet-gradient' : 'hover:tilago-blue-gradient'} transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                  <span className="text-white text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-gray-400 mb-4">{category.count} products</p>
                <Link href={`/products?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`} className="text-tilago-accent hover:text-tilago-highlight font-medium">
                  Browse →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="glass-container rounded-2xl p-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to elevate your content?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who trust Tilago for premium digital assets
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register" className="btn-primary">
                Create Account
              </Link>
              <Link href="/products" className="btn-secondary">
                Start Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}