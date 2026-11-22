import { NextResponse } from 'next/server';
import { CartItem } from '../../../types';

export async function GET(request: Request) {
  try {
    // In a real app, this would fetch from a database or session
    // For now, we'll use localStorage simulation
    const cartString = localStorage.getItem('tilago_cart');
    const cart: CartItem[] = cartString ? JSON.parse(cartString) : [];
    
    return NextResponse.json({ 
      success: true, 
      data: cart,
      totalItems: cart.length,
      subtotal: cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to get cart' 
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { productId, quantity = 1 } = await request.json();
    
    // In a real app, you would fetch product details from the database
    // For now, we'll use a mock product
    const mockProduct = {
      id: productId,
      name: 'Mock Product',
      description: 'Mock product description',
      price: 29.99,
      category: 'mock-category',
      thumbnailUrl: '/api/placeholder/300/200',
      previewUrl: '/api/placeholder/800/600',
      downloadUrl: '',
      fileExtension: 'zip',
      fileSize: 10485760, // 10MB
      tags: ['mock', 'test'],
      isActive: true,
      isFeatured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    // Get existing cart
    const cartString = localStorage.getItem('tilago_cart');
    let cart: CartItem[] = cartString ? JSON.parse(cartString) : [];
    
    // Check if product is already in cart
    const existingItemIndex = cart.findIndex(item => item.productId === productId);
    
    if (existingItemIndex >= 0) {
      // Update quantity if product already exists
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.push({ productId, quantity, product: mockProduct });
    }
    
    // Save updated cart
    localStorage.setItem('tilago_cart', JSON.stringify(cart));
    
    return NextResponse.json({ 
      success: true, 
      data: cart,
      message: 'Item added to cart'
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to add item to cart' 
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { productId, quantity } = await request.json();
    
    // Get existing cart
    const cartString = localStorage.getItem('tilago_cart');
    let cart: CartItem[] = cartString ? JSON.parse(cartString) : [];
    
    // Find and update the item
    const itemIndex = cart.findIndex(item => item.productId === productId);
    
    if (itemIndex >= 0) {
      if (quantity > 0) {
        cart[itemIndex].quantity = quantity;
      } else {
        // Remove item if quantity is 0 or less
        cart.splice(itemIndex, 1);
      }
      
      // Save updated cart
      localStorage.setItem('tilago_cart', JSON.stringify(cart));
      
      return NextResponse.json({ 
        success: true, 
        data: cart,
        message: 'Cart updated'
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Item not found in cart' 
      }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update cart' 
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { productId } = await request.json();
    
    // Get existing cart
    const cartString = localStorage.getItem('tilago_cart');
    let cart: CartItem[] = cartString ? JSON.parse(cartString) : [];
    
    // Filter out the item to remove
    cart = cart.filter(item => item.productId !== productId);
    
    // Save updated cart
    localStorage.setItem('tilago_cart', JSON.stringify(cart));
    
    return NextResponse.json({ 
      success: true, 
      data: cart,
      message: 'Item removed from cart'
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to remove item from cart' 
    }, { status: 500 });
  }
}