'use client';

import React from 'react';
import { RotateCcw, ShieldCheck, CheckCircle2, ChevronRight, MessageSquare } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 md:py-24">
      <div className="text-center mb-16 px-4">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <RotateCcw className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase italic">Returns <span className="text-gray-400">& Refunds</span></h1>
        <p className="text-gray-500 max-w-lg mx-auto">Not happy? No problem. We've made our returns process as simple and straightforward as possible.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { icon: ShieldCheck, title: "30-Day Policy", desc: "Easy returns within 30 days of receiving your order." },
          { icon: CheckCircle2, title: "Original Items", desc: "Must be in original condition with all tags attached." },
          { icon: RotateCcw, title: "Full Refund", desc: "Get your money back in 7-10 business days after inspection." }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center text-black mb-6">
              <item.icon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold mb-3">{item.title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm font-medium">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-12 rounded-[40px] border border-gray-100 shadow-sm mb-16 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full blur-[100px] -mr-32 -mt-32"></div>
         <h2 className="relative z-10 text-3xl font-black mb-10 italic">How it <span className="text-gray-400">Works</span></h2>
         
         <div className="relative z-10 space-y-12">
            {[
              { step: "01", title: "Contact Support", desc: "Send us an email or start a chat to initiate your return request." },
              { step: "02", title: "Pack Your Items", desc: "Place items securely in original packaging with any manuals or accessories." },
              { step: "03", title: "Handover to Courier", desc: "Our shipping partner will pick up the package from your address." },
              { step: "04", title: "Receive Your Refund", desc: "Once processed, your refund will be issued to your original payment method." }
            ].map((step, idx) => (
               <div key={idx} className="flex gap-6 items-start">
                  <span className="text-4xl font-black text-gray-200 font-mono tracking-tighter">{step.step}</span>
                  <div className="pt-2">
                     <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                       {step.title} <ChevronRight className="w-4 h-4 text-gray-300" />
                     </h4>
                     <p className="text-gray-500 font-medium">{step.desc}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>

      <div className="bg-black p-10 rounded-3xl text-center text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-left">
           <h3 className="text-2xl font-bold mb-1">Need help with a return?</h3>
           <p className="text-gray-400">Our customer team is available around the clock.</p>
        </div>
        <a href="/contact" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black font-bold rounded-2xl hover:bg-gray-100 transition shadow-xl shrink-0">
          <MessageSquare className="w-5 h-5" /> Chat with Us
        </a>
      </div>
    </div>
  );
}
