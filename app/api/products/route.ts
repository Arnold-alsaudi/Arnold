import { NextResponse } from 'next/server';
import { Product } from '../../../types';

// Mock data for products - in a real app this would come from a database
const mockProducts: Product[] = [
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const limit = searchParams.get('limit');
  const offset = searchParams.get('offset');

  let filteredProducts = [...mockProducts];
  
  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  if (limit) {
    const limitNum = parseInt(limit);
    const offsetNum = parseInt(offset || '0');
    filteredProducts = filteredProducts.slice(offsetNum, offsetNum + limitNum);
  }

  return NextResponse.json({ 
    success: true, 
    data: filteredProducts,
    total: mockProducts.length
  });
}

export async function POST(request: Request) {
  try {
    const productData = await request.json();
    
    // Validate required fields
    if (!productData.name || !productData.price || !productData.category) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: name, price, category' 
      }, { status: 400 });
    }
    
    // Create new product
    const newProduct: Product = {
      id: Math.random().toString(36).substring(2, 15),
      name: productData.name,
      description: productData.description || '',
      price: parseFloat(productData.price),
      category: productData.category,
      thumbnailUrl: productData.thumbnailUrl || '/api/placeholder/300/200',
      previewUrl: productData.previewUrl,
      downloadUrl: productData.downloadUrl || '',
      fileExtension: productData.fileExtension || 'zip',
      fileSize: productData.fileSize || 0,
      tags: productData.tags || [],
      isActive: productData.isActive ?? true,
      isFeatured: productData.isFeatured ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    // In a real app, you would save to a database here
    
    return NextResponse.json({ 
      success: true, 
      data: newProduct 
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create product' 
    }, { status: 500 });
  }
}