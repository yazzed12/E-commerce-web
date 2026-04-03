import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, CreditCard, RotateCcw } from "lucide-react";

async function getProducts() {
  try {
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/products', { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Fetch products API error", error);
    return [];
  }
}

async function getCategories() {
  try {
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories', { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Fetch categories API error", error);
    return [];
  }
}

// Since ProductCard uses client components (Hooks like zustand), we will load it as a separate Client component wrapper, 
// or let the card be a client component (which it is implicitly since it imports zustand, wait, I forgot to add 'use client' to ProductCard).
import { ProductCard } from "../components/product/ProductCard";

export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories();

  // Pick some features products
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative h-[500px] sm:h-[600px] w-full bg-gray-100 rounded-2xl overflow-hidden shadow-sm flex items-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Hero Background" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 md:from-black/60 md:to-transparent" />
        </div>
        
        <div className="relative z-10 px-6 sm:px-12 md:px-20 max-w-2xl text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Discover Your <br /> Next Style
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-md">
            Explore our new collection of premium clothing, gadgets, and accessories.
          </p>
          <Link href="/products" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl">
            Shop Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {[
          { icon: Truck, title: "Free Shipping", subtitle: "Orders over 3000 EGP" },
          { icon: ShieldCheck, title: "Genuine Products", subtitle: "100% Quality Guaranteed" },
          { icon: RotateCcw, title: "30 Days Return", subtitle: "Easy return policy" },
          { icon: ArrowRight, title: "Fast Delivery", subtitle: "Quick and reliable shipping" },
        ].map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 mb-4 sm:mb-0">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-black">
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1 leading-tight">{feature.title}</h3>
            <p className="text-sm text-gray-500">{feature.subtitle}</p>
          </div>
        ))}
      </section>

      {/* Categories Section */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Shop by Category</h2>
            <p className="text-gray-500 mt-2">Explore our wide range of categories</p>
          </div>
          <Link href="/categories" className="hidden sm:flex text-black font-medium hover:underline items-center gap-1">
            See All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.slice(0, 6).map((cat: any) => (
            <Link key={cat._id} href={`/categories/${cat._id}`} className="group block">
              <div className="aspect-square relative rounded-xl overflow-hidden bg-gray-100 mb-3 border border-gray-200">
                <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-center font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Featured Products</h2>
            <p className="text-gray-500 mt-2">Check out our most popular items</p>
          </div>
          <Link href="/products" className="hidden sm:flex text-black font-medium hover:underline items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Promotion/Banner */}
      <section className="bg-black text-white rounded-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 md:p-16 relative">
         <div className="z-10 text-center md:text-left md:max-w-xl">
           <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Special Offer <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Save up to 50%</span> </h2>
           <p className="text-gray-300 text-lg mb-8">
             Upgrade your lifestyle with our premium collection. Limited time offer, don't miss out!
           </p>
           <Link href="/products" className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
             Shop The Deal
           </Link>
         </div>
      </section>
    </div>
  );
}
