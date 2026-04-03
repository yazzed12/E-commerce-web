import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingBasket } from 'lucide-react';
import { ProductCard } from '../../../components/product/ProductCard';

async function getCategoryInfo(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch category');
    const data = await res.json();
    return data.data;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const category = await getCategoryInfo(params.id);
  if (!category) return { title: 'Category Not Found' };
  
  return {
    title: `${category.name} Collection`,
    description: `Shop the best ${category.name} products at Yazzed Shop Mart. Explore our curated selection of high-quality items.`,
    openGraph: {
      images: [category.image],
    },
  };
}

async function getCategoryProducts(categoryId: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    return [];
  }
}

export default async function CategoryDetailsPage({ params }: { params: { id: string } }) {
  const categoryId = params.id;
  
  const [category, products] = await Promise.all([
    getCategoryInfo(categoryId),
    getCategoryProducts(categoryId)
  ]);

  if (!category) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
        <Link href="/categories" className="text-blue-600 hover:underline">Return to Categories</Link>
      </div>
    );
  }

  // Check if it's the "Super Market" category for enhancement
  // The name in the API is usually "SuperMarket"
  const isSuperMarket = category.name.toLowerCase().includes('super') || category.name.toLowerCase().includes('market');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/categories" className="inline-flex items-center gap-2 text-gray-400 hover:text-black mb-8 transition-colors group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Categories
      </Link>

      {/* Hero Section */}
      <div className={`relative rounded-[40px] overflow-hidden mb-12 min-h-[300px] flex items-center p-8 md:p-16 ${isSuperMarket ? 'bg-green-50' : 'bg-gray-100'}`}>
        <div className="relative z-10 max-w-xl">
           <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 ${isSuperMarket ? 'bg-green-600 text-white' : 'bg-black text-white'}`}>
             Collection 2024
           </div>
           <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 flex items-center gap-4">
             {isSuperMarket && <ShoppingBasket className="w-10 h-10 text-green-600" />}
             {category.name}
           </h1>
           <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
             {isSuperMarket 
               ? "Freshness delivered right to your door. Explore our wide range of groceries and household essentials."
               : `Browse our curated selection of high-quality items in the ${category.name} department.`}
           </p>
        </div>
        
        <div className="absolute right-0 top-0 h-full w-1/3 md:w-1/2 opacity-20 md:opacity-100 pointer-events-none">
           <Image 
             src={category.image} 
             alt={category.name} 
             fill 
             className="object-contain object-right p-4" 
           />
        </div>
      </div>

      {/* Product List */}
      <div>
        <div className="flex justify-between items-center mb-8 border-b pb-4">
           <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
             Featured in {category.name} 
             <span className="text-sm font-bold bg-gray-100 text-gray-400 px-3 py-1 rounded-full ml-2">{products.length} Items</span>
           </h2>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[40px] border border-gray-100 text-center">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <ShoppingBasket className="w-10 h-10 text-gray-200" />
             </div>
             <h3 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h3>
             <p className="text-gray-500 max-w-xs mx-auto">We are currently stocking up this section with fresh new arrivals. Stay tuned!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
