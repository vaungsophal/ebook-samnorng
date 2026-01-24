'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, Facebook, Youtube, ChevronDown, Mail, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { categories } from '@/lib/products';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items, total } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#002b5c] text-white text-[10px] sm:text-xs py-1.5 px-4 text-center font-medium">
        EbookSamnorng.com - Knowledge repository of the construction industry
      </div>

      {/* Main Header Section */}
      <div className="bg-[#e9e9cc] w-full border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-22 flex items-center justify-between">

          {/* Mobile Menu Button - LEFT */}
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo - CENTERED on Mobile, LEFT on Desktop */}
          <Link href="/" className="flex items-center absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <Image
              src="/logo.png"
              alt="EbookSamnorng Logo"
              width={300}
              height={75}
              className="h-10 w-auto sm:h-16 object-contain"
              priority
            />
          </Link>

          {/* Search Bar - Hidden on Mobile */}
          <div className="hidden lg:flex flex-1 max-w-xl relative mx-12">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-5 py-2.5 rounded-full border border-gray-300 bg-white shadow-inner focus:outline-none text-sm italic"
            />
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-800" />
          </div>

          {/* Cart Section - RIGHT */}
          <Link href="/cart" className="flex items-center group relative lg:static">
            <div className="text-right hidden md:block mr-4">
              <span className="text-[11px] font-bold text-gray-600 uppercase tracking-tighter">
                SHOPPING CART / {mounted ? `$${total.toFixed(2)}` : '$0.00'}
              </span>
            </div>
            <div className="w-10 h-10 border-2 border-slate-400 rounded-lg flex items-center justify-center relative bg-white/50 group-hover:bg-white transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              <span className="absolute -top-1.5 -right-1.5 bg-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-slate-300 shadow-sm leading-none">
                {mounted ? items.length : '0'}
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Navigation Bar (Green/Dark) - Always Visible on Mobile */}
      <div className="bg-[#1a4d2e] w-full py-2 sm:h-12 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center lg:items-stretch lg:justify-start">

          {/* Desktop Categories Button */}
          <div className="hidden lg:flex relative group">
            <button className="bg-[#ff4d4d] h-full text-white font-bold text-[13px] px-8 flex items-center gap-2 hover:bg-[#ff3333] transition-colors uppercase tracking-wider cursor-default">
              <Menu className="w-4 h-4" />
              PRODUCT CATEGORIES
            </button>
            <div className="absolute top-full left-0 w-[280px] bg-white text-[#334155] shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 z-50">
              <div className="flex flex-col py-1 max-h-[70vh] overflow-y-auto no-scrollbar">
                {categories.map((name) => (
                  <Link
                    key={name}
                    href={name === 'All Categories' ? '/shop' : `/shop?category=${encodeURIComponent(name)}`}
                    className="px-5 py-2.5 text-[11px] font-medium border-b border-gray-50 last:border-0 hover:bg-gray-50 hover:text-[#ff4d4d] transition-colors whitespace-nowrap"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Nav Links - Wrapped/Centered on Mobile */}
          <nav className="flex flex-wrap items-center justify-center gap-y-2 lg:gap-1 lg:ml-4 sm:flex-nowrap sm:overflow-x-auto no-scrollbar">
            {[
              { name: 'HOME', href: '/' },
              { name: 'SHOP', href: '/shop' },
              { name: 'SHOPPING CART', href: '/cart' },
              { name: 'PAYMENT INSTRUCTIONS', href: '/checkout' },
              { name: 'CONTACT US', href: '/contact' },
            ].map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-1.5 sm:py-2 rounded-full font-bold text-[10px] sm:text-[11px] tracking-wider transition-all whitespace-nowrap ${isActive
                    ? 'bg-[#004b8d] text-white'
                    : 'text-yellow-400 hover:text-white'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 lg:hidden ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-[#f8f9fa] z-[101] shadow-2xl transform transition-transform duration-300 lg:hidden flex flex-col ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Mobile Sidebar Header: Search */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-4 pr-10 py-2 bg-gray-100 rounded border-none text-sm focus:ring-1 focus:ring-primary"
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute -right-12 top-0 p-2 bg-white/20 text-white rounded-full lg:hidden"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Categories */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="flex flex-col">
            {categories.map((name) => (
              <Link
                key={name}
                href={name === 'All Categories' ? '/shop' : `/shop?category=${encodeURIComponent(name)}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-5 py-3.5 text-[11px] font-bold text-[#4b5563] border-b border-gray-100 uppercase tracking-tight hover:bg-gray-50 transition-colors"
              >
                <span>{name}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </Link>
            ))}

            {/* Additional Links */}
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-5 py-4 text-[11px] font-bold text-[#4b5563] border-b border-gray-100 uppercase tracking-tight"
            >
              <User className="w-4 h-4" />
              LOG IN
            </Link>
            <div className="flex items-center gap-2 px-5 py-4 text-[11px] font-bold text-[#4b5563] border-b border-gray-100 uppercase tracking-tight">
              <Mail className="w-4 h-4" />
              NEWSLETTER
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Socials */}
        <div className="p-5 flex gap-3 bg-white border-t border-gray-100">
          <a href="#" className="w-8 h-8 flex items-center justify-center bg-[#3b5998] text-white rounded">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="#" className="w-8 h-8 flex items-center justify-center bg-[#cc181e] text-white rounded">
            <Youtube className="w-4 h-4" />
          </a>
        </div>
      </div>
    </>
  );
}
