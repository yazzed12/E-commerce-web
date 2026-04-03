import { Metadata } from 'next';
import Image from 'next/image';
import { Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { AddToCartButton } from './AddToCartButton';

async function getProduct(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    return data.data;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id);
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: product.title,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: [product.imageCover],
    },
  };
}

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <main className="text-center py-32">
        <h1 className="text-4xl font-black uppercase italic text-gray-300">Product Not Found</h1>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto py-10">
      <article className="bg-white rounded-[40px] p-8 md:p-16 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* SEO Optimized Image Section */}
          <section aria-label="Product Images" className="space-y-6">
            <div className="relative aspect-square w-full rounded-[48px] overflow-hidden bg-gray-50 border border-gray-50 group shadow-inner">
              <Image 
                src={product.imageCover} 
                alt={`${product.title} - Main View`} 
                fill 
                className="object-contain p-12 group-hover:scale-105 transition-transform duration-700" 
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-6">
              {product.images?.slice(0, 4).map((img: string, idx: number) => (
                <div key={idx} className="relative aspect-square rounded-[24px] overflow-hidden bg-gray-50 border border-gray-100 cursor-pointer hover:border-black transition-all">
                  <Image src={img} alt={`${product.title} variant view ${idx + 1}`} fill className="object-contain p-3" />
                </div>
              ))}
            </div>
          </section>

          {/* Clean Content Section */}
          <section aria-label="Product Information" className="flex flex-col">
            <header className="mb-10">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                 {product.category.name} &bull; {product.brand.name}
               </div>
               <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight uppercase italic mb-6">
                 {product.title}
               </h1>
               
               <div className="flex items-center gap-8 border-y border-gray-100 py-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-500" />
                    <span className="font-black text-xl">{product.ratingsAverage}</span>
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                    Trusted by {product.ratingsQuantity}+ Shoppers
                  </span>
               </div>
            </header>
            
            <div className="mb-12">
               <div className="text-6xl font-black text-gray-900 tracking-tighter mb-2">
                 EGP {product.price}
               </div>
               <p className="text-xs font-bold text-gray-400 uppercase">Inclusive of all taxes</p>
            </div>
            
            <div className="prose prose-lg text-gray-500 font-medium leading-relaxed mb-16">
              {product.description}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
              {product.category.name?.toLowerCase().includes('electron') && (
                <div className="flex items-center gap-4 p-5 rounded-[24px] bg-[#FAFAFA] border border-gray-100">
                  <ShieldCheck className="w-6 h-6 text-green-500" /> 
                  <div className="text-xs font-black uppercase">Official Warranty</div>
                </div>
              )}
              <div className="flex items-center gap-4 p-5 rounded-[24px] bg-[#FAFAFA] border border-gray-100">
                <RotateCcw className="w-6 h-6 text-blue-500" /> 
                <div className="text-xs font-black uppercase">30-Day Exchange</div>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-[24px] bg-[#FAFAFA] border border-gray-100">
                <Truck className="w-6 h-6 text-purple-500" /> 
                <div className="text-xs font-black uppercase">Express Delivery</div>
              </div>
            </div>

            <div className="mt-auto pt-10 border-t-2 border-gray-50">
              <AddToCartButton productId={product._id} />
            </div>
          </section>

        </div>
      </article>
    </main>
  );
}
