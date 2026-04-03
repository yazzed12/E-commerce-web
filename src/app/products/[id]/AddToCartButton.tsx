'use client';

import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../../store/cartStore';
import { useAuthStore } from '../../../store/authStore';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const AddToCartButton = ({ productId }: { productId: string }) => {
  const router = useRouter();
  const { addToCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    if (!isAuthenticated) {
       toast.error('Log in to Yazzed Shop Mart to continue shopping!');
       setTimeout(() => router.push('/login'), 1000);
       return;
    }
    setIsLoading(true);
    try {
      await addToCart(productId);
      toast.success('Successfully added to your cart!');
    } catch {
      toast.error('Opps! We couldn\'t add this item.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleAdd}
      disabled={isLoading}
      className="flex-1 bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:bg-gray-400"
    >
      <ShoppingCart className="w-5 h-5" />
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
};
