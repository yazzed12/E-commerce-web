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
  const [priceRange, setPriceRange] = useState<number>(50000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>('default');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

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

  // Faceted counts logic
  const facetedCounts = useMemo(() => {
    const categoryCounts: Record<string, number> = {};
    const brandCounts: Record<string, number> = {};
    
    products.forEach(p => {
      categoryCounts[p.category._id] = (categoryCounts[p.category._id] || 0) + 1;
      brandCounts[p.brand._id] = (brandCounts[p.brand._id] || 0) + 1;
    });

    return { categoryCounts, brandCounts };
  }, [products]);

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

    if (inStockOnly) {
      result = result.filter(p => (p.quantity || 0) > 0);
    }

    result = result.filter(p => p.price <= priceRange);

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
    } else if (sortBy === 'sold') {
      result.sort((a, b) => (b.ratingsQuantity || 0) - (a.ratingsQuantity || 0));
    }

    return result;
  }, [products, searchTerm, selectedCategories, selectedBrands, minRating, priceRange, inStockOnly, sortBy]);

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
    setPriceRange(50000);
    setSearchTerm('');
    setInStockOnly(false);
    setSortBy('default');
  };

  const totalActiveFilters = selectedCategories.length + selectedBrands.length + (minRating > 0 ? 1 : 0) + (priceRange < 50000 ? 1 : 0) + (inStockOnly ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Magnificent Promo Banner */}
      <div className="bg-black text-white p-6 md:p-10 mb-12 rounded-[48px] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500 opacity-20 rounded-full blur-[100px] -ml-32 -mb-32"></div>
         
         <div className="relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-4">
               <Sparkles className="w-5 h-5 text-yellow-400" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Premium Catalog</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black leading-none mb-6 italic uppercase">Exclusive <span className="text-gray-500">Finds</span></h1>
            <p className="text-gray-400 max-w-sm font-medium">Explore handpicked products from a global community of designers and brands.</p>
         </div>

         <div className="relative z-10 w-full md:w-auto">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[40px] flex items-center gap-8 group hover:bg-white/10 transition-colors">
               <div className="text-center border-r border-white/10 pr-8">
                  <div className="text-4xl font-black mb-1 text-white">{filteredProducts.length}</div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Items</div>
               </div>
               <div className="flex flex-col gap-2">
                  <div className="h-2 w-32 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-white transition-all duration-1000" style={{ width: `${(filteredProducts.length / (products.length || 1)) * 100}%` }}></div>
                   </div>
                   <span className="text-[10px] font-bold text-gray-400">Total Catalog: {products.length}</span>
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Magnificent Filter Sidebar */}
          <aside className="hidden lg:block w-80 shrink-0 space-y-12 sticky top-24 h-fit">
             <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black italic">Filter <span className="text-gray-300">By</span></h3>
                {totalActiveFilters > 0 && (
                   <button onClick={clearFilters} className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-colors">
                      <X className="w-5 h-5" />
                   </button>
                )}
             </div>

             {/* Dynamic Search */}
             <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-black transition-colors" />
                <input 
                  type="text" 
                  placeholder="Brand, category, etc." 
                  className="w-full pl-12 pr-6 py-5 bg-white border-2 border-transparent rounded-[28px] focus:bg-white focus:border-black focus:outline-none transition-all font-bold placeholder:text-gray-300 shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>

             {/* Categories Section */}
             <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4 border-gray-100">
                   <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 italic">Categories</h4>
                   <span className="text-[10px] text-gray-400 font-bold">{categories.length} Types</span>
                </div>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-200">
                   {categories.map((cat) => (
                      <button 
                         key={cat._id}
                         onClick={() => toggleCategory(cat._id)}
                         className={`w-full text-left flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                            selectedCategories.includes(cat._id) ? 'bg-black text-white shadow-xl shadow-black/10' : 'bg-white text-gray-500 hover:bg-gray-100'
                         }`}
                      >
                         <span className="text-sm font-bold truncate max-w-[150px]">{cat.name}</span>
                         <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${selectedCategories.includes(cat._id) ? 'bg-white/20' : 'bg-gray-50'}`}>
                            {facetedCounts.categoryCounts[cat._id] || 0}
                         </span>
                      </button>
                   ))}
                </div>
             </div>

             {/* Price Visual Filter */}
             <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4 border-gray-100">
                   <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 italic">Price Range</h4>
                   <span className="text-[10px] text-gray-400 font-bold shrink-0">EGP {priceRange}</span>
                </div>
                <div className="p-8 bg-black rounded-[40px] text-white">
                   <div className="flex items-end gap-1 mb-8 h-12">
                      {[12, 14, 18, 24, 20, 32, 28, 40, 35, 24].map((h, i) => (
                         <div key={i} className="flex-1 bg-white/10 rounded-full" style={{ height: `${h}%` }}></div>
                      ))}
                   </div>
                   <input 
                      type="range" 
                      min="0" max="50000" step="500"
                      className="w-full h-2 bg-white/10 rounded-full appearance-none accent-white cursor-pointer mb-6"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                   />
                   <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-gray-500">
                      <span>0</span>
                      <span className="text-white text-lg">Max</span>
                      <span>50k</span>
                   </div>
                </div>
             </div>

             {/* Stock Availability */}
             <div className="bg-white p-6 rounded-[32px] border-2 border-transparent hover:border-black transition-colors cursor-pointer group shadow-sm" onClick={() => setInStockOnly(!inStockOnly)}>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${inStockOnly ? 'bg-black text-white' : 'bg-gray-50 text-gray-400'}`}>
                         <Package className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="text-sm font-black italic uppercase">In Stock Only</h4>
                         <p className="text-[10px] font-bold text-gray-400">Hide out of stock items</p>
                      </div>
                   </div>
                   <div className={`w-10 h-6 rounded-full p-1 transition-colors ${inStockOnly ? 'bg-black' : 'bg-gray-200'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${inStockOnly ? 'translate-x-4' : 'translate-x-0'}`}></div>
                   </div>
                </div>
             </div>

             {/* Brands Horizontal Scroll */}
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
                           selectedBrands.includes(brand._id) ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-400'
                        }`}
                      >
                         {brand.name}
                      </button>
                   ))}
                </div>
             </div>
          </aside>

          {/* Product Engine Results */}
          <div className="flex-grow">
             <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-[40px] mb-12 gap-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2">
                   <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                      <LayoutGrid className="w-5 h-5 text-black" />
                   </div>
                   <div className="ml-2">
                      <h3 className="text-lg font-black italic uppercase italic tracking-tighter">{filteredProducts.length} Results</h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Matches found in catalog</p>
                   </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                   {totalActiveFilters > 0 && (
                      <button onClick={clearFilters} className="px-5 py-3 border-2 border-red-100 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-colors">
                        Clear ({totalActiveFilters})
                      </button>
                   )}
                   <div className="bg-gray-50 rounded-2xl flex items-center px-6 py-3 border border-gray-100 focus-within:border-black transition-colors">
                      <ArrowUpDown className="w-4 h-4 text-gray-400 mr-4" />
                      <select 
                        className="bg-transparent text-sm font-black uppercase tracking-widest focus:outline-none cursor-pointer"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                         <option value="default">Relevance</option>
                         <option value="price-low">Lowest Price</option>
                         <option value="price-high">Highest Price</option>
                         <option value="rating">Top Rated</option>
                         <option value="sold">Popularity</option>
                      </select>
                   </div>
                </div>
             </div>

             {/* Grid Space */}
             {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                   {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-white rounded-[48px] p-8 h-[500px] animate-pulse">
                         <div className="h-3/5 bg-gray-50 rounded-[32px] mb-8"></div>
                         <div className="h-6 bg-gray-50 rounded-full w-2/3 mb-4"></div>
                         <div className="h-4 bg-gray-50 rounded-full w-1/3 mb-8"></div>
                         <div className="h-12 bg-gray-50 rounded-2xl w-full"></div>
                      </div>
                   ))}
                </div>
             ) : filteredProducts.length === 0 ? (
                <div className="bg-white rounded-[64px] border border-gray-100 py-40 text-center flex flex-col items-center">
                   <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8 border border-red-100 animate-bounce">
                      <Search className="w-10 h-10 text-red-400" />
                   </div>
                   <h2 className="text-4xl font-black mb-4 italic uppercase">Nothing Found</h2>
                   <p className="text-gray-400 mb-12 max-w-sm font-medium">We couldn't find any items matching your current filters. Try resetting to see all products.</p>
                   <button onClick={clearFilters} className="px-12 py-5 bg-black text-white rounded-[24px] font-black text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all">Reset All Filters</button>
                </div>
             ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                   {filteredProducts.map(product => (
                      <ProductCard key={product._id} product={product} />
                   ))}
                </div>
             )}
          </div>
        </div>
      </div>

      {/* Magnificent Mobile Drawer */}
      {showMobileFilter && (
         <div className="fixed inset-0 z-[100] flex justify-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" onClick={() => setShowMobileFilter(false)}></div>
            <div className="relative w-full max-w-md bg-white h-full px-10 py-12 animate-in slide-in-from-right duration-500 overflow-y-auto">
               <div className="flex justify-between items-center mb-16">
                  <h2 className="text-4xl font-black italic uppercase">Filter</h2>
                  <button onClick={() => setShowMobileFilter(false)} className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center"><X className="w-6 h-6" /></button>
               </div>

               <div className="space-y-16">
                  <div className="space-y-8">
                     <h4 className="text-xs font-black uppercase tracking-widest border-l-8 border-black pl-4 italic">Categories</h4>
                     <div className="grid grid-cols-2 gap-3">
                        {categories.map(cat => (
                           <button 
                              key={cat._id}
                              onClick={() => toggleCategory(cat._id)}
                              className={`p-4 rounded-2xl text-xs font-black uppercase transition-all ${selectedCategories.includes(cat._id) ? 'bg-black text-white shadow-xl shadow-black/20' : 'bg-gray-50 text-gray-400'}`}
                           >
                              {cat.name}
                           </button>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-8">
                     <h4 className="text-xs font-black uppercase tracking-widest border-l-8 border-black pl-4 italic">Availability</h4>
                     <button 
                        onClick={() => setInStockOnly(!inStockOnly)}
                        className={`w-full p-6 rounded-[28px] flex items-center justify-between transition-all ${inStockOnly ? 'bg-green-500 text-white shadow-xl shadow-green-500/20' : 'bg-gray-50 text-gray-400'}`}
                     >
                        <span className="font-black italic uppercase">Show In Stock Only</span>
                        <div className={`w-10 h-6 border-2 border-white/20 rounded-full flex items-center px-1`}>
                           <div className={`w-3 h-3 rounded-full bg-white transition-transform ${inStockOnly ? 'translate-x-4' : 'translate-x-0'}`}></div>
                        </div>
                     </button>
                  </div>

                  <div className="pt-10">
                     <button onClick={() => setShowMobileFilter(false)} className="w-full bg-black text-white py-8 rounded-[32px] text-2xl font-black uppercase italic shadow-2xl hover:scale-105 transition-all">Apply Results</button>
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* Floating Toggle for Mobile */}
      <button 
         onClick={() => setShowMobileFilter(true)}
         className="lg:hidden fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-10 py-5 rounded-full font-black uppercase flex items-center gap-4 shadow-2xl animate-bounce"
      >
         <SlidersHorizontal className="w-6 h-6" /> Filter
      </button>
    </div>
  );
}
