'use client';

import Link from 'next/link';
import { Facebook, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-bg text-white w-full py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">

        {/* ABOUT US */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm tracking-widest uppercase relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[1px] after:bg-white/30">
            ABOUT US
          </h3>
          <div className="space-y-4 text-[12px] leading-relaxed opacity-90">
            <p>EbookSamnorng.com – No. 1 website for construction documents.</p>
            <p>
              EbookSamnorng.com is a place to buy, sell, exchange and share design and construction documents.
            </p>
            <p>
              Specializing in providing digital products in the field of construction: books, documents, software, spreadsheets, forms, images, videos...
            </p>
          </div>
        </div>

        {/* CUSTOMER SUPPORT */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm tracking-widest uppercase relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[1px] after:bg-white/30">
            CUSTOMER SUPPORT
          </h3>
          <ul className="space-y-4 text-[12px] opacity-90">
            <li>
              <Link href="/checkout" className="hover:text-yellow-400 transition-colors block">
                Payment Instructions
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-yellow-400 transition-colors block">
                Instructions for listing products for sale
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT INFORMATION */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm tracking-widest uppercase relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[1px] after:bg-white/30">
            CONTACT INFORMATION
          </h3>
          <div className="space-y-4 text-[12px] leading-relaxed opacity-90">
            <div>
              <p className="font-semibold">Phone Number (Zalo):</p>
              <p>0967950480</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <p>ebookbiino@gmail.com</p>
            </div>
            <div className="pt-2 flex gap-4">
              <a
                href="https://www.facebook.com/groups/238173047768987"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-[#3b5998] text-white rounded-full hover:bg-white hover:text-[#3b5998] transition-all transform hover:scale-110 shadow-lg"
                title="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/yourusername" // Replace with actual telegram link if available
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-[#0088cc] text-white rounded-full hover:bg-white hover:text-[#0088cc] transition-all transform hover:scale-110 shadow-lg"
                title="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-8 text-center">
        <p className="text-[11px] opacity-50 uppercase tracking-widest">
          Copyright © 2024 EbookSamnorng. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
