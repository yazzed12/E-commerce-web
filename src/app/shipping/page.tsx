'use client';

import React from 'react';
import { Truck, Globe, Clock, Package } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 md:py-24">
      <div className="text-center mb-16 px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Truck className="w-8 h-8 text-black" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase italic">Shipping <span className="text-gray-400">& Delivery</span></h1>
        <p className="text-gray-500 max-w-lg mx-auto">Fast, reliable, and secure. We make sure your orders reach you in perfect condition, every time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {[
          { icon: Clock, title: "Standard Delivery", desc: "Arrives in 3-5 business days. Free for orders over 3000 EGP." },
          { icon: Globe, title: "International Shipping", desc: "Available for most countries. Delivery in 7-14 business days." },
          { icon: Package, title: "Order Tracking", desc: "Real-time updates sent to your email as soon as your package ships." },
          { icon: Truck, title: "Express Shipping", desc: "Guaranteed delivery in 1-2 business days for urgent needs." }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-black mb-6">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-gray-500 leading-relaxed text-sm font-medium">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 p-12 rounded-[40px] border border-dashed border-gray-300">
         <h2 className="text-2xl font-black mb-8 underline decoration-4 underline-offset-8">Shipping FAQ</h2>
         <div className="space-y-8 prose prose-gray">
            <div>
               <h4 className="font-bold text-gray-900 mb-2 italic">How much is shipping?</h4>
               <p className="text-gray-500 font-medium">Standard shipping within Egypt is free for orders over 3000 EGP. Below that, it's a flat rate of 50 EGP. International rates are calculated at checkout.</p>
            </div>
            <div>
               <h4 className="font-bold text-gray-900 mb-2 italic">What carriers do you use?</h4>
               <p className="text-gray-500 font-medium">We partner with leading local and international carriers including Aramex, DHL, and Bosta to ensure your packages are handled with care.</p>
            </div>
            <div className="border-t pt-8 border-gray-200">
               <p className="text-xs text-gray-400">Please note: Delivery times are estimates and may vary slightly during peak seasons or holidays.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
