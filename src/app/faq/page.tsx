'use client';

import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

const faqs = [
  { q: "How long does shipping take?", a: "Standard shipping usually takes 3-5 business days. Express shipping is 1-2 business days." },
  { q: "What is your return policy?", a: "We offer a 30-day hassle-free return policy. Items must be in original condition." },
  { q: "Do you ship internationally?", a: "Yes, we ship to most countries world-wide. Rates may vary based on location." },
  { q: "How can I track my order?", a: "Once shipped, you will receive an email with a tracking number and a link." },
  { q: "Is registration required to shop?", a: "While not required, having an account allows you to track orders and save your wishlist." }
];

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 md:py-24">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-8 h-8 text-black" />
        </div>
        <h1 className="text-4xl font-black mb-4 tracking-tighter uppercase italic">Frequently Asked <span className="text-gray-400">Questions</span></h1>
        <p className="text-gray-500">Everything you need to know about our products and services.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
            <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
              <span className="text-lg font-bold text-gray-900 group-open:text-black">{faq.q}</span>
              <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-8 pb-8 text-gray-500 leading-relaxed font-medium">
              {faq.a}
            </div>
          </details>
        ))}
      </div>

      <div className="mt-16 p-10 bg-black rounded-3xl text-center text-white">
        <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
        <p className="text-gray-400 mb-8 max-w-sm mx-auto">If you can't find the answer you're looking for, please feel free to reach out to our support team.</p>
        <a href="/contact" className="inline-block px-10 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-100 transition shadow-xl">Contact Support</a>
      </div>
    </div>
  );
}
