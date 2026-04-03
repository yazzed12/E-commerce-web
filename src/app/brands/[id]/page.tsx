import React from 'react';
import Image from 'next/image';
import { ProductCard } from '../../../components/product/ProductCard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

async function getBrandInfo(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    return data.data;
  } catch (error) {
    return null;
  }
}

async function getBrandProducts(brandId: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    return [];
  }
}

export default async function BrandDetailsPage({ params }: { params: { id: string } }) {
  const brandId = params.id;
  
  // Fetch both concurrently for speed
  const [brand, products] = await Promise.all([
    getBrandInfo(brandId),
    getBrandProducts(brandId)
  ]);

  if (!brand) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold mb-4">Brand Not Found</h2>
        <Link href="/brands" className="text-blue-600 hover:underline">Return to Brands</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/brands" className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-8 font-medium">
        <ArrowLeft className="w-5 h-5" /> Back to all brands
      </Link>

      {/* Brand Header */}
      <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="relative w-48 h-48 bg-gray-50 rounded-full overflow-hidden border-4 border-white shadow-md flex-shrink-0">
          <Image 
            src={brand.image} 
            alt={brand.name} 
            fill 
            className="object-contain p-4" 
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{brand.name}</h1>
          <p className="text-gray-500 max-w-xl">
            Explore the complete collection of premium products brought to you by {brand.name}. Quality and performance combined.
          </p>
        </div>
      </div>

      {/* Products Library */}
      <div>
        <div className="flex justify-between items-end mb-8 border-b pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products ({products.length})</h2>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
             <p className="text-gray-500 text-lg">No products are currently available for this brand.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
