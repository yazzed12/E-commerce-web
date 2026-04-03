'use client';

import React, { useState, useMemo } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { BrandCard } from '../../components/BrandCard';
import { useBrands } from '../../hooks/useBrands';
import { Input } from '../../components/ui/Input';

export default function BrandsPage() {
  const { brands, isLoading, error } = useBrands();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBrands = useMemo(() => {
    if (!searchTerm) return brands;
    return brands.filter((brand) =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [brands, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-main mb-2 tracking-tight">All Brands</h1>
          <p className="text-gray-500 text-lg">
            Discover our collection of premium partners and brands
          </p>
        </div>
        
        {/* Search Input Bonus target */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-black focus:border-black transition-colors"
            placeholder="Search brands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="flex flex-col items-center justify-center py-20 bg-red-50 rounded-2xl border border-red-100">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-xl font-bold text-red-800 mb-2">Oops! Something went wrong.</h3>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-[250px] flex flex-col items-center justify-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredBrands.length === 0 && (
        <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No brands found</h3>
          <p className="text-gray-500">We couldn't find any brands matching "{searchTerm}"</p>
        </div>
      )}

      {/* Brands Grid */}
      {!isLoading && !error && filteredBrands.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredBrands.map((brand) => (
            <BrandCard
              key={brand._id}
              id={brand._id}
              name={brand.name}
              image={brand.image}
            />
          ))}
        </div>
      )}
      
      {/* Optional dummy pagination or load more text */}
      {!isLoading && !error && filteredBrands.length > 0 && (
        <div className="mt-12 text-center text-sm text-gray-400">
           Showing {filteredBrands.length} brands
        </div>
      )}
    </div>
  );
}
