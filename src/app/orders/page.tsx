'use client';

import React, { useEffect, useState } from 'react';
import { Package, Clock, CheckCircle, LogIn } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Link from 'next/link';
import Image from 'next/image';
import api from '../../services/api';
import { Order } from '../../types';

export default function OrdersPage() {
  const { user, isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Note: The Route Ecommerce API needs the actual user ID.
    // Usually it can be extracted from token or a `/users/me` endpoint.
    // Assuming `user` has `_id`. As fallback, we'll fetch from API if we implement get Me later.
    const fetchOrders = async () => {
      try {
        if (!user?._id) {
          // You might have to decode JWT token to get user ID if not available in store
          // Here we assume it's loaded 
          return;
        }
        const res = await api.get(`/orders/user/${user._id}`);
        setOrders(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user?._id) {
      fetchOrders();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (!mounted || isLoading) {
    return <div className="text-center py-20">Loading orders...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto my-12">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
           <LogIn className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-3xl font-black italic uppercase">Login Required</h2>
        <p className="text-gray-500 mb-10 max-w-xs mx-auto">You must be logged in to view your order history and track deliveries.</p>
        <Link href="/login" className="px-10 py-5 bg-black text-white rounded-2xl font-black text-lg shadow-xl shadow-black/10">
           Sign In to Account
        </Link>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-4xl mx-auto">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
           <Package className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
        <p className="text-gray-500 mb-8">When you place orders, they will appear here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 p-4 md:p-6 flex flex-wrap justify-between items-center gap-4">
               <div>
                  <p className="text-xs text-gray-500 mb-1">Order ID</p>
                  <p className="font-semibold text-sm">#{order._id}</p>
               </div>
               <div>
                  <p className="text-xs text-gray-500 mb-1">Date</p>
                  <p className="font-semibold text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
               </div>
               <div>
                  <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                  <p className="font-bold text-sm">EGP {order.totalOrderPrice}</p>
               </div>
               <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {order.isDelivered ? <CheckCircle className="w-4 h-4"/> : <Clock className="w-4 h-4"/>}
                    {order.isDelivered ? 'Delivered' : 'Processing'}
                  </span>
               </div>
            </div>
            
            <div className="p-4 md:p-6 space-y-4">
              {order.cartItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 border-b last:border-0 pb-4 last:pb-0">
                  <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.product?.imageCover || '/placeholder.jpg'} alt={item.product?.title || 'product'} fill className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-sm md:text-base line-clamp-1">{item.product?.title || 'Unknown Product'}</h4>
                    <p className="text-xs text-gray-500 mt-1">Qty: {item.count} &times; EGP {item.price}</p>
                  </div>
                  <div className="font-bold text-sm">
                    EGP {item.count * item.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
