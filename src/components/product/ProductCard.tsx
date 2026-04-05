'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { Card } from '../ui/Card';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  const { addToCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();

  const isFav = wishlist.some((item: any) => 
    (item._id || item) === product._id
  );

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
       toast.error('Please log in first to add products to your cart');
       setTimeout(() => router.push('/login'), 1500);
       return;
    }
    try {
      await addToCart(product._id);
      toast.success('Successfully added to cart!');
    } catch {
      toast.error('Could not add to cart. Please try again.');
    }
  };

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
       toast.error('Please log in first to save items to your wishlist');
       setTimeout(() => router.push('/login'), 1500);
       return;
    }
    try {
      if (isFav) {
        await removeFromWishlist(product._id);
        toast.success('Removed from wishlist');
      } else {
        await addToWishlist(product._id);
        toast.success('Added back to your wishlist!');
      }
    } catch {
      toast.error('Failed to update wishlist');
    }
  };

  return (
    <Link href={`/products/${product._id}`}>
      <Card className="group relative flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
        <div className="relative aspect-square w-full overflow-hidden bg-gray-100 rounded-t-lg">
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2 transition-opacity duration-300 z-10">
            <button 
              onClick={toggleWishlist}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm text-gray-400 hover:text-red-500 hover:bg-white transition-colors"
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <span className="text-xs font-medium text-blue-600 mb-1">{product.category.name}</span>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">{product.title}</h3>
          
          <div className="mt-auto">
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.ratingsAverage}</span>
              <span className="text-xs text-gray-500">({product.ratingsQuantity})</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">EGP {product.price}</span>
              <button 
                onClick={handleAddToCart}
                className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors shadow-sm"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
