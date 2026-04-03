'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useCartStore } from '../../store/cartStore';
import api from '../../services/api';

const addressSchema = yup.object().shape({
  details: yup.string().required('Address details are required'),
  phone: yup.string().required('Phone is required'),
  city: yup.string().required('City is required')
});

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(addressSchema)
  });

  const onSubmit = async (data: any) => {
    if (!cart?._id) return toast.error('Cart is empty');
    
    setIsLoading(true);
    try {
      await api.post(`/orders/${cart._id}`, {
        shippingAddress: data
      });
      await clearCart();
      toast.success('Order placed successfully (Cash on Delivery)');
      router.push('/orders');
    } catch (error: any) {
      toast.error('Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input label="City" {...register('city')} error={errors.city?.message} placeholder="Cairo" />
              <Input label="Address Details" {...register('details')} error={errors.details?.message} placeholder="123 Street Name" />
              <Input label="Phone" {...register('phone')} error={errors.phone?.message} placeholder="01xxxxxxxx" />
            </form>
          </Card>
          
          <Card className="p-6 mt-6">
             <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
             <div className="p-4 rounded-xl border border-black bg-gray-50 flex items-center gap-3">
               <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center">
                 <div className="w-2 h-2 rounded-full bg-white"></div>
               </div>
               <span className="font-medium">Cash on Delivery</span>
             </div>
          </Card>
        </div>

        <div>
          <Card className="p-6 sticky top-24">
             <h2 className="text-xl font-semibold mb-6">Order Total</h2>
             
             <div className="mb-6 space-y-3 max-h-[40vh] overflow-y-auto pr-2">
               {cart?.products.map((item) => (
                 <div key={item._id} className="flex justify-between items-center text-sm border-b pb-2">
                   <span className="text-gray-600 line-clamp-1 max-w-[200px]">{item.count}x {item.product.title}</span>
                   <span className="font-medium">EGP {item.price * item.count}</span>
                 </div>
               ))}
             </div>

             <div className="flex justify-between items-center text-lg font-bold border-t pt-4">
               <span>Total to Pay</span>
               <span>EGP {cart?.totalCartPrice || 0}</span>
             </div>

             <Button 
               type="submit" 
               form="checkout-form"
               className="w-full mt-6 py-4 rounded-xl shadow-lg"
               isLoading={isLoading}
             >
               Place Order
             </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
