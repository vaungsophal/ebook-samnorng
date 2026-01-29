'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, Facebook, Youtube, ChevronDown, Mail, User, Send } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { useLanguage } from '@/context/language-context';
import { categories, categoryStructure } from '@/lib/products';
import { LanguageSwitcher } from './language-switcher';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { items, total } = useCart();
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileSearchOpen(false);
    }
  };

  const navLinks = [
    { name: t('common.home'), href: '/' },
    { name: t('common.shop'), href: '/shop' },
    { name: t('common.cart'), href: '/cart' },
    { name: t('common.payment'), href: '/payment-instruction' },
    { name: t('common.contact'), href: '/contact' },
  ];

  return (
    <>
      {/* Top Announcement Bar - Absolute Minimum Height */}
      <div className="bg-[#064884] text-white text-[10px] sm:text-[13px] py-0 font-medium border-b border-white/5 h-6 sm:h-8 flex items-center">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center w-full">
          <div className="truncate pr-4 text-[10px] sm:text-[13px] font-semibold">
            {t('common.announcement')}
          </div>
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="https://www.facebook.com/groups/1157562836264568/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition-colors flex items-center gap-1"
              >
                <Facebook className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden md:inline text-[12px] font-bold">{t('common.facebook')}</span>
              </a>
              <div className="w-[1px] h-3 bg-white/20"></div>
              <a
                href="https://t.me/SORIYA_VAUNG"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden md:inline text-[12px] font-bold">{t('common.telegram')}</span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[1px] h-3 bg-white/20"></div>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Section - Redesigned Mobile Layout */}
      <div className="bg-[#e9e9cc] w-full border-b border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4 h-12 sm:h-16 flex items-center justify-between">
          {/* Left: Mobile Menu Trigger */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-700 bg-white/50 rounded-lg shadow-sm border border-black/5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Center: Logo (Adjusted responsive size) */}
          <Link href="/" className="flex items-center absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <Image
              src="/logo.png"
              alt="EbookSomnorng Logo"
              width={400}
              height={100}
              className="h-9 w-auto sm:h-13 object-contain"
              priority
            />
          </Link>

          {/* Desktop Only: Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md relative mx-12">
            <input
              type="text"
              placeholder={t('common.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-inner focus:outline-none text-sm italic"
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
              <Search className="w-4 h-4 text-gray-800 hover:text-primary transition-colors" />
            </button>
          </form>

          {/* Right: Mobile Info & Cart */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-700 bg-white/50 rounded-lg shadow-sm border border-black/5"
            >
              {mobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>

            <Link href="/cart" className="flex items-center group">
              <div className="text-right hidden md:block mr-4">
                <span className={`text-[14px] font-bold text-gray-600 uppercase tracking-tighter ${language === 'km' ? 'text-[13px]' : ''}`}>
                  {t('common.cart')} / {mounted ? `$${total.toFixed(2)}` : '$0.00'}
                </span>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-slate-400 rounded-lg flex items-center justify-center relative bg-white/50 group-hover:bg-white transition-all shadow-sm">
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] sm:text-[12px] font-black px-1.5 sm:px-2 py-0.5 rounded-full shadow-lg leading-none border-2 border-white">
                  {mounted ? items.length : '0'}
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Search Overlay - Sliding Down */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white/80 backdrop-blur-md border-t border-black/5 ${mobileSearchOpen ? 'max-h-20 opacity-100 py-3 px-4' : 'max-h-0 opacity-0'}`}>
          <form onSubmit={handleSearch} className="relative max-w-lg mx-auto">
            <input
              type="text"
              placeholder={t('common.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-5 pr-12 py-2 bg-white rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]/20 text-sm italic"
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-[#1a4d2e]">
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Navigation Bar (Green/Dark) - Always Visible on Mobile */}
      <div className="bg-[#1a4d2e] w-full py-1 sm:py-1.5 sm:h-12 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center lg:items-stretch lg:justify-start h-full">

          {/* Desktop Categories Button */}
          <div className="hidden lg:flex relative group">
            <button className={`bg-[#ff4d4d] h-full text-white font-bold px-10 flex items-center gap-3 hover:bg-[#ff3333] transition-colors uppercase tracking-wider cursor-default ${language === 'km' ? 'text-[15px]' : 'text-[16px]'}`}>
              <Menu className="w-5 h-5" />
              {t('common.categories')}
            </button>
            <div className="absolute top-full left-0 w-[350px] bg-white text-[#334155] shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 z-50 overflow-hidden rounded-b-xl">
              <div className="flex flex-col py-2 max-h-[75vh] overflow-y-auto no-scrollbar">
                {/* All Categories Link */}
                <Link
                  href="/shop"
                  className={`px-6 py-3 font-black border-b border-gray-100 hover:bg-gray-50 hover:text-[#ff4d4d] transition-colors uppercase tracking-widest ${language === 'km' ? 'text-[14px]' : 'text-[13px]'}`}
                >
                  {t('common.all_categories')}
                </Link>

                {categoryStructure.map((category) => (
                  <div key={category.name} className="flex flex-col">
                    {/* Main Category Header */}
                    <Link
                      href={`/shop?category=${encodeURIComponent(category.name)}`}
                      className={`px-6 py-2 bg-gray-50/50 font-bold hover:bg-gray-100 hover:text-[#ff4d4d] transition-colors uppercase tracking-tight ${language === 'km' ? 'text-[13px]' : 'text-[12px]'}`}
                    >
                      {t(`categories.${category.name}`)}
                    </Link>
                    {/* Subcategories */}
                    <div className="flex flex-col pb-2">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub}
                          href={`/shop?category=${encodeURIComponent(sub)}`}
                          className={`px-10 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors ${language === 'km' ? 'text-[12px]' : 'text-[11px]'}`}
                        >
                          • {t(`categories.${sub}`)}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Nav Links - Center/Scroll on Mobile */}
          <nav className="flex items-center gap-1.5 sm:gap-4 lg:ml-6 overflow-x-auto no-scrollbar w-full lg:w-auto py-1.5 sm:py-0">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 sm:px-6 py-1 sm:py-1.5 rounded-full font-black tracking-wider transition-all whitespace-nowrap shadow-sm hover:scale-105 active:scale-95 ${language === 'km' ? 'text-[14px]' : 'text-[13px] sm:text-[14px]'} ${isActive
                    ? 'bg-[#004b8d] text-white'
                    : 'bg-white/5 text-yellow-400 hover:text-white hover:bg-white/10'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      {/* Mobile Menu Overlay - Simple & Professional */}
      <div
        className={`fixed inset-0 bg-background z-[100] transition-all duration-300 lg:hidden flex flex-col ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <Image src="/logo.png" alt="Logo" width={180} height={50} className="h-10 w-auto object-contain" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-foreground hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Nav Links */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-2xl font-black tracking-tight ${pathname === link.href ? 'text-primary' : 'text-foreground hover:text-primary/70 transition-colors'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-border">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">{t('common.categories')}</h3>
            <div className="flex flex-col space-y-1">
              {/* All Categories Link */}
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold text-foreground hover:text-primary transition-colors py-2 flex items-center justify-between"
              >
                <span>{t('common.all_categories')}</span>
                <ChevronDown className="w-4 h-4 -rotate-90 opacity-40" />
              </Link>

              {categoryStructure.map((category) => (
                <div key={category.name} className="flex flex-col border-b border-border/10 last:border-0">
                  <div
                    className="flex items-center justify-between py-3 cursor-pointer group"
                    onClick={() => toggleCategory(category.name)}
                  >
                    <span className="text-base font-bold text-foreground group-hover:text-primary transition-colors flex-1">
                      {t(`categories.${category.name}`)}
                    </span>
                    <div className="p-1 hover:bg-muted rounded-md transition-colors">
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expandedCategory === category.name ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {/* Subcategories */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedCategory === category.name ? 'max-h-[500px] opacity-100 pb-3' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <div className="flex flex-col pl-4 border-l-2 border-primary/20 space-y-2">
                      {/* View All for this category */}
                      <Link
                        href={`/shop?category=${encodeURIComponent(category.name)}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm font-bold text-primary hover:underline transition-colors py-1 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {t('common.view_all_products')}
                      </Link>

                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub}
                          href={`/shop?category=${encodeURIComponent(sub)}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-1 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                          {t(`categories.${sub}`)}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="p-6 bg-card border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary rounded-full text-foreground hover:bg-primary hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://t.me/SORIYA_VAUNG" target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary rounded-full text-foreground hover:bg-primary hover:text-white transition-colors">
                <Send className="w-5 h-5" />
              </a>
            </div>
            <LanguageSwitcher />
          </div>
          <p className="text-xs text-center text-muted-foreground font-medium">© 2024 EbookSomnorng</p>
        </div>
      </div>
    </>
  );
}
