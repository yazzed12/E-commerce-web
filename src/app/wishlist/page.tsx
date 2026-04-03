'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Heart, ShoppingCart } from 'lucide-react';
import { useWishlistStore } from '../../store/wishlistStore';
import { useCartStore } from '../../store/cartStore';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { wishlist, fetchWishlist, removeFromWishlist, isLoading } = useWishlistStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleMoveToCart = async (productId: string) => {
    try {
      await addToCart(productId);
      await removeFromWishlist(productId);
      toast.success('Moved to cart');
    } catch {
      toast.error('Failed to move to cart');
    }
  };

  if (isLoading && wishlist.length === 0) {
    return <div className="py-20 text-center">Loading wishlist...</div>;
  }

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-10 h-10 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mb-8">Save items you love here to buy them later.</p>
        <Link href="/products" className="inline-flex bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition">
          Discover Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        <Heart className="w-8 h-8 text-red-500" /> My Wishlist
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div key={product._id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col group relative">
            <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-50 mb-4">
              <Image src={product.imageCover} alt={product.title} fill className="object-cover" />
              <button 
                onClick={() => removeFromWishlist(product._id)}
                className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-500 hover:text-red-500 hover:bg-white transition opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">{product.title}</h3>
            <p className="text-lg font-bold text-gray-900 mb-4">EGP {product.price}</p>
            
            <button 
              onClick={() => handleMoveToCart(product._id)}
              className="mt-auto w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2 text-sm"
            >
              <ShoppingCart className="w-4 h-4" /> Move to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
