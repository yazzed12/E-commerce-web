'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, ArrowUpDown, ChevronDown, LayoutGrid, X, Star, Check, Package, Sparkles } from 'lucide-react';
import { ProductCard } from '../../components/product/ProductCard';
import { productsService, categoriesService, brandsService } from '../../services/content.service';
import { Product, Category, Brand } from '../../types';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [currentMaxLimit, setCurrentMaxLimit] = useState<number>(50000);
  const [sortBy, setSortBy] = useState<string>('default');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Dynamic values calculation
  useEffect(() => {
    if (products.length > 0) {
      const actualMax = Math.max(...products.map(p => p.price));
      const ceilMax = Math.ceil(actualMax / 100) * 100;
      setCurrentMaxLimit(ceilMax || 50000);
      setMaxPrice(prev => prev === 50000 ? ceilMax || 50000 : prev);
    }
  }, [products]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productsRes, categoriesRes, brandsRes] = await Promise.all([
          productsService.getAll(),
          categoriesService.getAll(),
          brandsService.getAll()
        ]);
        setProducts(productsRes.data || []);
        setCategories(categoriesRes.data || []);
        setBrands(brandsRes.data || []);
      } catch (error) {
        console.error('Failed to fetch filter data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Main Filter Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(lowerSearch) ||
        p.description.toLowerCase().includes(lowerSearch)
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category._id));
    }

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand._id));
    }

    if (minRating > 0) {
      result = result.filter(p => p.ratingsAverage >= minRating);
    }

    result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
    }

    return result;
  }, [products, searchTerm, selectedCategories, selectedBrands, minRating, minPrice, maxPrice, sortBy]);

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleBrand = (id: string) => {
    setSelectedBrands(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinRating(0);
    setMinPrice(0);
    setMaxPrice(currentMaxLimit);
    setSearchTerm('');
    setSortBy('default');
  };

  const totalActiveFilters = selectedCategories.length + selectedBrands.length + (minRating > 0 ? 1 : 0) + (minPrice > 0 || maxPrice < currentMaxLimit ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-8">
        {/* Horizontal Filter Bar */}
        <div className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm flex flex-wrap items-end gap-10 relative z-50">
           
           {/* Section 1: Search */}
           <div className="flex-grow max-w-sm">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1 mb-2.5 block italic">Search Catalog</label>
              <div className="relative group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-black transition-colors" />
                 <input 
                   type="text" 
                   placeholder="Keywords..." 
                   className="w-full pl-10 pr-6 py-3 bg-gray-50 border-none rounded-xl focus:bg-white focus:ring-1 focus:ring-black transition-all font-bold placeholder:text-gray-300 text-sm italic"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
           </div>

           {/* Section 2: Price Slider */}
           <div className="min-w-[280px]">
              <div className="flex items-center justify-between pl-1 mb-2">
                 <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest italic">Price Range</label>
                 <span className="text-[10px] font-black text-black">EGP {minPrice} - {maxPrice}</span>
              </div>
              <div className="relative h-10 flex flex-col justify-center px-1">
                 <div className="relative w-full h-[3px] bg-gray-100 rounded-full">
                    <div 
                       className="absolute h-full bg-black rounded-full"
                       style={{ 
                          left: `${(minPrice / currentMaxLimit) * 100}%`, 
                          width: `${((maxPrice - minPrice) / currentMaxLimit) * 100}%` 
                       }}
                    ></div>
                 </div>
                 <input 
                    type="range" min="0" max={currentMaxLimit} step="10"
                    className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none z-20 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 10))}
                 />
                 <input 
                    type="range" min="0" max={currentMaxLimit} step="10"
                    className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none z-10 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 10))}
                 />
              </div>
           </div>

           {/* Section 3: Sort */}
           <div>
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1 mb-2 block italic">Sort By</label>
              <div className="bg-gray-50 rounded-2xl flex items-center px-6 py-3.5 border border-transparent focus-within:bg-white focus-within:border-black transition-all">
                 <ArrowUpDown className="w-4 h-4 text-gray-400 mr-4" />
                 <select 
                   className="bg-transparent text-[11px] font-black uppercase tracking-widest focus:outline-none cursor-pointer"
                   value={sortBy}
                   onChange={(e) => setSortBy(e.target.value)}
                 >
                    <option value="default">Relevance</option>
                    <option value="price-low">Lowest Price</option>
                    <option value="price-high">Highest Price</option>
                    <option value="rating">Top Rated</option>
                 </select>
              </div>
           </div>

           <div className="flex gap-4 ml-auto">
              {totalActiveFilters > 0 && (
                 <button onClick={clearFilters} className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-100 transition-colors">
                    <X className="w-5 h-5" />
                 </button>
              )}
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 pt-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-12">
             <div className="space-y-8">
                <div className="flex items-center justify-between border-b-2 border-black pb-4">
                   <h3 className="text-xl font-black italic uppercase tracking-tighter">Shop <span className="text-gray-300">By</span> Category</h3>
                </div>
                <div className="space-y-1">
                   {categories.map((cat) => (
                      <button 
                         key={cat._id}
                         onClick={() => toggleCategory(cat._id)}
                         className={`w-full text-left group flex items-center justify-between py-3 px-4 rounded-xl transition-all ${
                            selectedCategories.includes(cat._id) ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50 hover:text-black font-semibold'
                         }`}
                      >
                         <span className="text-sm">{cat.name}</span>
                         <div className={`w-1.5 h-1.5 rounded-full transition-all ${selectedCategories.includes(cat._id) ? 'bg-white opacity-100' : 'bg-black opacity-0 group-hover:opacity-10'}`}></div>
                      </button>
                   ))}
                </div>
             </div>

             <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4 border-gray-100">
                   <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 italic">Top Brands</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                   {brands.slice(0, 15).map(brand => (
                      <button 
                        key={brand._id}
                        onClick={() => toggleBrand(brand._id)}
                        className={`px-4 py-2 rounded-full text-[10px] font-black uppercase transition-all tracking-widest ${
                           selectedBrands.includes(brand._id) ? 'bg-black text-white shadow-lg' : 'bg-white border border-gray-100 text-gray-400 hover:border-black'
                        }`}
                      >
                         {brand.name}
                      </button>
                   ))}
                </div>
             </div>
          </aside>

          {/* Results Area */}
          <div className="flex-grow">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white">
                       <LayoutGrid className="w-5 h-5" />
                    </div>
                    <div>
                       <h3 className="text-lg font-black italic uppercase tracking-tighter">{filteredProducts.length} Results</h3>
                       <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Available now</p>
                    </div>
                 </div>
              </div>

             {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                   {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-white rounded-[32px] p-8 h-[500px] animate-pulse border border-gray-100">
                         <div className="h-2/3 bg-gray-50 rounded-[24px] mb-6"></div>
                         <div className="h-6 bg-gray-50 rounded-full w-2/3 mb-4"></div>
                         <div className="h-4 bg-gray-50 rounded-full w-1/3"></div>
                      </div>
                   ))}
                </div>
             ) : filteredProducts.length === 0 ? (
                <div className="bg-white rounded-[48px] border border-gray-100 py-40 text-center flex flex-col items-center">
                   <Search className="w-16 h-16 text-gray-100 mb-6" />
                   <h2 className="text-3xl font-black mb-4 italic uppercase">No Products Found</h2>
                   <p className="text-gray-400 mb-10 max-w-sm">Try resetting your filters to explore more.</p>
                   <button onClick={clearFilters} className="px-10 py-4 bg-black text-white rounded-full font-black uppercase shadow-xl hover:scale-105 transition-all">Clear Filters</button>
                </div>
             ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                   {filteredProducts.map(product => (
                      <ProductCard key={product._id} product={product} />
                   ))}
                </div>
             )}
          </div>
        </div>
      </div>

      <button 
         onClick={() => setShowMobileFilter(true)}
         className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-10 py-4 rounded-full font-black uppercase shadow-2xl"
      >
         Filter
      </button>

      {/* Simplified Mobile Drawer */}
      {showMobileFilter && (
         <div className="fixed inset-0 z-[100] flex justify-end">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowMobileFilter(false)}></div>
            <div className="relative w-full max-w-sm bg-white h-full p-8 animate-in slide-in-from-right overflow-y-auto">
               <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-black italic uppercase">Filter</h2>
                  <button onClick={() => setShowMobileFilter(false)}><X className="w-8 h-8" /></button>
               </div>
               {/* Mobile content simplified */}
               <div className="space-y-10">
                  {/* ... Add mobile filters if needed ... */}
                  <p className="text-gray-400 italic">Advanced filters available on desktop.</p>
                  <button onClick={() => setShowMobileFilter(false)} className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase">Close</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
