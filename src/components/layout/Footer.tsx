import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <span className="font-bold text-2xl tracking-tighter uppercase">YAZZED <span className="text-gray-400">SHOP MART</span><span className="text-gray-500">.</span></span>
            <p className="mt-4 text-gray-500 text-sm">
              Your one-stop destination for all your needs. Modern shopping made simple.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Shop</h3>
            <ul className="space-y-4">
              <li><Link href="/products" className="text-sm text-gray-500 hover:text-gray-900">All Products</Link></li>
              <li><Link href="/categories" className="text-sm text-gray-500 hover:text-gray-900">Categories</Link></li>
              <li><Link href="/brands" className="text-sm text-gray-500 hover:text-gray-900">Brands</Link></li>
              <li><Link href="/offers" className="text-sm text-gray-500 hover:text-gray-900">Special Offers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Support</h3>
            <ul className="space-y-4">
              <li><Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900">Contact Us</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-500 hover:text-gray-900">Detailed FAQ</Link></li>
              <li><Link href="/shipping" className="text-sm text-gray-500 hover:text-gray-900">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-sm text-gray-500 hover:text-gray-900">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Subscribe</h3>
            <p className="text-sm text-gray-500 mb-4">Keep up with our latest collections and offers.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-black"
              />
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Yazzed Shop Mart. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* Social icons can go here */}
            <span className="text-gray-400 hover:text-gray-500">Facebook</span>
            <span className="text-gray-400 hover:text-gray-500">Twitter</span>
            <span className="text-gray-400 hover:text-gray-500">Instagram</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
