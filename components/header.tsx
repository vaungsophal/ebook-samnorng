'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items, total } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Top Bar - Very thin link/info bar if needed, but the image doesn't show one. 
          The image shows a large beige section. */}

      {/* Main Header Section (Beige) */}
      <div className="bg-[#e9e9cc] w-full border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 h-16 flex items-center">
            <Image
              src="/logo.png"
              alt="bookxaydung.com logo"
              width={260}
              height={70}
              className="h-full w-auto object-contain"
              priority
            />
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-xl relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-5 py-2.5 rounded-full border border-gray-300 bg-white shadow-inner focus:outline-none text-sm italic"
            />
            <Search className="absolute right-4 top-3 w-4 h-4 text-gray-800" />
          </div>

          {/* Cart Section */}
          <Link href="/cart" className="flex items-center gap-4 group">
            <div className="text-right hidden sm:block">
              <span className="text-[11px] font-bold text-gray-600 uppercase tracking-tighter">
                SHOPPING CART / {mounted ? `$${total.toFixed(2)}` : '$0.00'}
              </span>
            </div>
            <div className="w-10 h-10 border-2 border-slate-400 rounded flex items-center justify-center relative bg-white/50 group-hover:bg-white transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-white text-[10px] font-bold px-1.5 py-0.5 rounded border border-slate-300 leading-none">
                {mounted ? items.length : '0'}
              </span>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* Navigation Bar (Green) */}
      <div className="bg-[#1a4d2e] w-full h-12 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto h-full flex items-stretch">

          {/* Categories Button with Hover Dropdown */}
          <div className="relative group">
            <button className="bg-[#ff4d4d] h-full text-white font-bold text-[13px] px-8 flex items-center gap-2 hover:bg-[#ff3333] transition-colors uppercase tracking-wider cursor-default">
              <Menu className="w-4 h-4" />
              PRODUCT CATEGORIES
            </button>

            {/* Dropdown - Shows on HOVER */}
            <div className="absolute top-full left-0 w-[240px] bg-white text-[#334155] shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100">
              <div className="flex flex-col py-1">
                {[
                  'Architectural Documentation',
                  'Vietnamese Texture Books',
                  'English Texture Books',
                  'M&E Documents',
                  'Construction Documents',
                  'Construction Economics Document',
                  'Construction Software',
                  'Construction spreadsheet',
                  'Building Standards',
                  'Building Materials',
                  'Traffic Works',
                ].map((name) => (
                  <Link
                    key={name}
                    href={`/shop?category=${encodeURIComponent(name)}`}
                    className="px-5 py-3 text-[12px] border-b border-gray-50 last:border-0 hover:bg-gray-50 hover:text-[#ff4d4d] transition-colors"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex items-center gap-1 ml-4 overflow-x-auto no-scrollbar">
            <div className="h-full flex items-center px-1">
              <Link href="/" className="bg-[#004b8d] text-white px-5 py-2 rounded-full font-bold text-[11px] tracking-wider hover:bg-[#003d73] transition-all">
                HOME
              </Link>
            </div>

            <Link href="/about" className="px-4 py-3 text-yellow-400 font-bold text-[11px] tracking-wider hover:text-white transition-colors">
              ABOUT US
            </Link>
            <Link href="/shop" className="px-4 py-3 text-yellow-400 font-bold text-[11px] tracking-wider hover:text-white transition-colors">
              SHOP
            </Link>
            <Link href="/cart" className="px-4 py-3 text-yellow-400 font-bold text-[11px] tracking-wider hover:text-white transition-colors">
              SHOPPING CART
            </Link>
            <Link href="/checkout" className="px-4 py-3 text-yellow-400 font-bold text-[11px] tracking-wider hover:text-white transition-colors">
              PAYMENT INSTRUCTIONS
            </Link>
            <Link href="/articles" className="px-4 py-3 text-yellow-400 font-bold text-[11px] tracking-wider hover:text-white transition-colors">
              ARTICLES
            </Link>
            <Link href="/contact" className="px-4 py-3 text-yellow-400 font-bold text-[11px] tracking-wider hover:text-white transition-colors">
              CONTACT US
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#1a4d2e] border-t border-white/10 z-50">
            <nav className="flex flex-col p-4 space-y-3">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-white font-bold text-[12px] py-1 border-b border-white/5">HOME</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-yellow-400 font-bold text-[12px] py-1 border-b border-white/5">ABOUT US</Link>
              <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="text-yellow-400 font-bold text-[12px] py-1 border-b border-white/5">SHOP</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-yellow-400 font-bold text-[12px] py-1">CONTACT US</Link>
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
