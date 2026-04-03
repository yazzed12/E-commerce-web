'use client';

import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-100 rounded-full blur-[120px] -mr-64 -mt-64 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-100 rounded-full blur-[100px] -ml-40 -mb-40 opacity-30"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
            Connect with us
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-gray-900 mb-8 leading-[0.9] tracking-tighter uppercase italic">
            Talk to <span className="text-gray-300">Yazzed</span>
          </h1>
          <p className="text-gray-500 text-xl font-medium max-w-lg leading-relaxed mb-10">
            We value your feedback and are here to provide world-class support for your shopping experience. Reach out anytime.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              </div>
              <span className="text-sm font-bold">Online Now</span>
            </div>
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-3xl border border-gray-100 shadow-sm">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-bold">Response: ~5 mins</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-black mb-8 group-hover:bg-black group-hover:text-white transition-colors duration-500">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black mb-4">Email</h3>
            <p className="text-gray-400 text-sm font-medium mb-6">Drop us a line anytime</p>
            <a href="mailto:yazzedstd1@gmail.com" className="text-black font-bold flex items-center gap-2 group-hover:underline">
              yazzedstd1@gmail.com <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          <div className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group translate-y-8">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-black mb-8 group-hover:bg-black group-hover:text-white transition-colors duration-500">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black mb-4">Phone</h3>
            <p className="text-gray-400 text-sm font-medium mb-6">Available 24/7 for you</p>
            <a href="tel:01xxxxxxxx" className="text-black font-bold flex items-center gap-2 group-hover:underline">
              01xxxxxxxx <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-black text-white p-12 rounded-[56px] relative overflow-hidden min-h-[400px] flex flex-col justify-end">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl"></div>
            <MapPin className="w-12 h-12 text-gray-500 mb-6" />
            <h3 className="text-3xl font-black mb-4 italic">Our Studio</h3>
            <p className="text-gray-400 font-medium leading-relaxed mb-8">
              Come visit our creative headquarters located in the heart of the business district.
            </p>
            <div className="pt-8 border-t border-white/10">
              <p className="text-xl font-bold">123 Business St, Cairo, Egypt</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-[32px] border border-gray-100 text-center">
              <Globe className="w-6 h-6 mx-auto mb-3 text-gray-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Global Reach</span>
            </div>
            <div className="bg-white p-6 rounded-[32px] border border-gray-100 text-center focus-within:border-black transition-colors">
              <MessageSquare className="w-6 h-6 mx-auto mb-3 text-gray-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Live Support</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white p-10 md:p-16 rounded-[56px] border border-gray-100 shadow-sm relative">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-black italic uppercase">Send a <span className="text-gray-300">Message</span></h2>
              <div className="hidden sm:flex -space-x-4">
                {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200"></div>)}
              </div>
            </div>

            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Full Name</label>
                  <input
                    type="text"
                    placeholder="Yazzed"
                    className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-[24px] focus:bg-white focus:border-black focus:outline-none transition-all font-bold placeholder:text-gray-300"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                  <input
                    type="email"
                    placeholder="yazzedjsnvn@dndv.com"
                    className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-[24px] focus:bg-white focus:border-black focus:outline-none transition-all font-bold placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-[24px] focus:bg-white focus:border-black focus:outline-none transition-all font-bold placeholder:text-gray-300"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Your Message</label>
                <textarea
                  rows={5}
                  placeholder="Type your magic here..."
                  className="w-full px-8 py-6 bg-gray-50 border-2 border-transparent rounded-[32px] focus:bg-white focus:border-black focus:outline-none transition-all font-bold placeholder:text-gray-300 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-6 rounded-[28px] font-black text-xl flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl hover:shadow-black/20 group"
              >
                Submit Message <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
