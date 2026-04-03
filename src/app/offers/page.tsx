import React from 'react';
import { Tag, Sparkles, Zap, Gift } from 'lucide-react';
import { ProductCard } from '../../components/product/ProductCard';

async function getOfferProducts() {
  try {
    // Fetch products and filter by those that have a priceAfterDiscount or just sample some
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/products?limit=8', { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    return [];
  }
}

export default async function OffersPage() {
  const products = await getOfferProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
      <div className="bg-black rounded-[48px] p-10 md:p-20 text-white mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 opacity-20 rounded-full blur-[100px] -mr-48 -mt-48 animate-pulse"></div>
        <div className="relative z-10 max-w-2xl">
           <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-tighter mb-8">
             Limited Time Only
           </div>
           <h1 className="text-5xl md:text-8xl font-black mb-8 leading-none tracking-tighter italic">MEGA <span className="text-yellow-400">OFFERS</span> DAY</h1>
           <p className="text-gray-400 text-xl md:text-2xl font-bold max-w-lg mb-10 leading-snug underline decoration-yellow-400 decoration-4 underline-offset-[12px]">
             Get up to 70% off on premium collections and top brands today only!
           </p>
           <div className="flex gap-4">
              <Zap className="w-10 h-10 text-yellow-400 shrink-0" />
              <span className="text-sm font-bold tracking-widest uppercase py-3 border-l-2 pl-6 border-white/20">Hurry, offers end in precisely 04h : 20m : 12s</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
         {[
           { icon: Tag, title: "70% OFF", label: "Selected Items" },
           { icon: Sparkles, title: "BUY 1 GET 1", label: "Accessories" },
           { icon: Zap, title: "FLASH SALE", label: "Ends nightly" },
           { icon: Gift, title: "FREE GIFT", label: "Over 5k EGP" }
         ].map((card, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center group hover:scale-105 transition-transform duration-300">
               <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-black mb-4 group-hover:bg-yellow-400 transition-colors">
                 <card.icon className="w-8 h-8" />
               </div>
               <h3 className="text-2xl font-black tracking-tighter italic">{card.title}</h3>
               <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">{card.label}</p>
            </div>
         ))}
      </div>

      <div>
        <h2 className="text-4xl font-black text-gray-900 mb-10 italic uppercase border-b-8 border-yellow-400 inline-block pr-8 pb-4">Hot Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {products.map((product: any) => (
             <ProductCard key={product._id} product={product} />
           ))}
        </div>
      </div>
    </div>
  );
}
