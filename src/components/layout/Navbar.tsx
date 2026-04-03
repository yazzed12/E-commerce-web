'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, User, LogOut, Menu, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';

export const Navbar = () => {
  const { isAuthenticated, logout, checkAuth } = useAuthStore();
  const { numOfCartItems, fetchCart } = useCartStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'Brands', path: '/brands' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-2xl tracking-tighter uppercase">YAZZED <span className="text-gray-400">SHOP MART</span><span className="text-gray-500">.</span></span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-black transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {mounted && isAuthenticated ? (
              <>
                <Link href="/wishlist" className="text-gray-600 hover:text-black transition-colors">
                  <Heart className="w-6 h-6" />
                </Link>
                <Link href="/cart" className="text-gray-600 hover:text-black transition-colors relative">
                  <ShoppingCart className="w-6 h-6" />
                  {numOfCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {numOfCartItems}
                    </span>
                  )}
                </Link>
                <Link href="/profile" className="text-gray-600 hover:text-black transition-colors">
                  <User className="w-6 h-6" />
                </Link>
                <button onClick={logout} className="text-gray-600 hover:text-black transition-colors">
                  <LogOut className="w-6 h-6" />
                </button>
              </>
            ) : mounted ? (
              <div className="flex space-x-4">
                <Link href="/login" className="text-gray-900 text-sm font-medium hover:underline">
                  Login
                </Link>
                <Link href="/register" className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                  Sign up
                </Link>
              </div>
            ) : null}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-black focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {mounted && isAuthenticated ? (
              <div className="flex items-center justify-around px-5">
                <Link href="/wishlist" className="p-2 text-gray-600">
                  <Heart className="w-6 h-6" />
                </Link>
                <Link href="/cart" className="relative p-2 text-gray-600">
                  <ShoppingCart className="w-6 h-6" />
                  {numOfCartItems > 0 && (
                    <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {numOfCartItems}
                    </span>
                  )}
                </Link>
                <Link href="/profile" className="p-2 text-gray-600">
                  <User className="w-6 h-6" />
                </Link>
                <button onClick={logout} className="p-2 text-gray-600">
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            ) : mounted ? (
              <div className="flex flex-col space-y-2 px-4">
                <Link href="/login" className="block text-center border border-gray-300 text-gray-900 px-4 py-2 rounded-md text-base font-medium">
                  Login
                </Link>
                <Link href="/register" className="block text-center bg-black text-white px-4 py-2 rounded-md text-base font-medium">
                  Sign up
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
};
