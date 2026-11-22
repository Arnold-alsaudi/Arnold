import Link from 'next/link';
import { Product } from '../../types';

// Mock data for products - in a real app this would come from an API
const products: Product[] = [
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
  {
    id: '4',
    name: 'YouTube Thumbnail Templates',
    description: 'Professional YouTube thumbnail templates with editable PSD files',
    price: 19.99,
    category: 'templates',
    thumbnailUrl: '/api/placeholder/300/200',
    previewUrl: '/api/placeholder/800/600',
    downloadUrl: '',
    fileExtension: 'zip',
    fileSize: 31457280, // 30MB
    tags: ['youtube', 'thumbnails', 'templates', 'psd'],
    isActive: true,
    isFeatured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Gaming UI Elements',
    description: 'Complete set of gaming interface elements and widgets',
    price: 34.99,
    category: 'ui-elements',
    thumbnailUrl: '/api/placeholder/300/200',
    previewUrl: '/api/placeholder/800/600',
    downloadUrl: '',
    fileExtension: 'zip',
    fileSize: 41943040, // 40MB
    tags: ['gaming', 'ui', 'elements', 'interface'],
    isActive: true,
    isFeatured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Custom Logo Design',
    description: 'Get a custom logo designed specifically for your brand',
    price: 99.99,
    category: 'custom-design',
    thumbnailUrl: '/api/placeholder/300/200',
    previewUrl: '/api/placeholder/800/600',
    downloadUrl: '',
    fileExtension: 'zip',
    fileSize: 104857600, // 100MB
    tags: ['logo', 'design', 'branding', 'custom'],
    isActive: true,
    isFeatured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="section-title">All Products</h1>
        <p className="section-subtitle">
          Browse our entire collection of premium digital products
        </p>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="glass-container rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Filters</h3>
              
              <div className="mb-6">
                <h4 className="text-md font-medium text-white mb-2">Categories</h4>
                <ul className="space-y-2">
                  {['All', 'Stream Alerts', 'Editing Assets', 'Overlays', 'Templates', 'UI Elements', 'Custom Design'].map((category) => (
                    <li key={category}>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-tilago-accent focus:ring-tilago-accent" />
                        <span className="ml-2 text-gray-300">{category}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h4 className="text-md font-medium text-white mb-2">Price Range</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-tilago-accent focus:ring-tilago-accent" />
                    <span className="ml-2 text-gray-300">Under $25</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-tilago-accent focus:ring-tilago-accent" />
                    <span className="ml-2 text-gray-300">$25 - $50</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-tilago-accent focus:ring-tilago-accent" />
                    <span className="ml-2 text-gray-300">$50 - $100</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-tilago-accent focus:ring-tilago-accent" />
                    <span className="ml-2 text-gray-300">Over $100</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium text-white mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {['Popular', 'New', 'Free', 'Premium'].map((tag) => (
                    <button 
                      key={tag} 
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-tilago-accent hover:text-white transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-400">
                Showing <span className="text-white">{products.length}</span> products
              </p>
              <div>
                <select className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-tilago-accent">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Best Selling</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="glass-container rounded-xl p-6 product-card"
                >
                  <div className="mb-4">
                    <img 
                      src={product.thumbnailUrl} 
                      alt={product.name} 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-tilago-accent bg-tilago-accent/10 rounded-full mb-2">
                      {product.category.replace('-', ' ').toUpperCase()}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                    <p className="text-gray-400 mb-4">{product.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 text-xs text-gray-300 bg-gray-700 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-tilago-accent">${product.price.toFixed(2)}</span>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <button className="btn-primary text-sm py-2 px-4">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}