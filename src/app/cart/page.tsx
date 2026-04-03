'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, CreditCard, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cart, isLoading, fetchCart, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleUpdate = async (id: string, count: number) => {
    if (count < 1) return;
    try {
      setUpdatingId(id);
      await updateQuantity(id, count);
      toast.success('Quantity updated');
    } catch {
      toast.error('Failed to update quantity');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      setUpdatingId(id);
      await removeFromCart(id);
      toast.success('Product removed from cart');
    } catch {
      toast.error('Failed to remove product');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleClear = async () => {
    try {
       await clearCart();
       toast.success('Cart cleared');
    } catch {
       toast.error('Failed to clear cart');
    }
  };

  if (isLoading && !cart) {
    return <div className="py-20 text-center">Loading cart...</div>;
  }

  if (!cart || cart.products.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trash2 className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/products" className="inline-flex bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium text-gray-700">{cart.products.length} Items</span>
            <button onClick={handleClear} className="text-sm text-red-600 hover:text-red-700 font-medium">Clear Cart</button>
          </div>
          
          {cart.products.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-6 relative">
              <div className="relative w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={item.product?.imageCover || '/placeholder.jpg'} alt={item.product?.title || 'product'} fill className="object-cover" />
              </div>
              
              <div className="flex-grow flex flex-col justify-between">
                <div className="pr-8">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{item.product?.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">EGP {item.price}</p>
                </div>
                
                <div className="flex items-center justify-between mt-4 sm:mt-0">
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                    <button 
                      onClick={() => handleUpdate(item.product._id, item.count - 1)}
                      disabled={item.count <= 1 || updatingId === item.product._id}
                      className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-sm disabled:opacity-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-4 text-center font-medium text-sm">{item.count}</span>
                    <button 
                      onClick={() => handleUpdate(item.product._id, item.count + 1)}
                      disabled={updatingId === item.product._id}
                      className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-sm disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="font-bold text-gray-900">EGP {item.price * item.count}</span>
                </div>
              </div>
              
              <button 
                onClick={() => handleRemove(item.product._id)}
                disabled={updatingId === item.product._id}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition disabled:opacity-50"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">EGP {cart.totalCartPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">EGP {cart.totalCartPrice}</span>
              </div>
            </div>

            <Link href="/checkout" className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition">
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
