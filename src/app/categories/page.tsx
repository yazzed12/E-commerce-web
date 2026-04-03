import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

async function getCategories() {
  try {
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories', { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories</h1>
        <p className="text-gray-500">Explore all our product categories</p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500">No categories found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.map((cat: any) => (
            <Link key={cat._id} href={`/categories/${cat._id}`} className="group block text-center">
              <div className="aspect-square relative rounded-xl overflow-hidden bg-gray-50 mb-3 border border-gray-200 shadow-sm">
                <Image 
                  src={cat.image} 
                  alt={cat.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{cat.name}</h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
