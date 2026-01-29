'use client';

import { Header } from '@/components/header';
import { ProductCard } from '@/components/product-card';
import Footer from '@/components/footer';
import Link from 'next/link';
import { products, categories, categoryStructure } from '@/lib/products';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { BannerSlider } from '@/components/banner-slider';
import { useLanguage } from '@/context/language-context';
import { useState } from 'react';

export default function HomePage() {
  const featuredProducts = products.slice(0, 8);
  const { t } = useLanguage();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);


  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <Header />

      <main className="w-full pt-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Left Sidebar: Product Categories - Always Visible on Home */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="bg-white border border-gray-200 shadow-sm overflow-hidden h-[300px] sm:h-[450px] lg:h-[536px] rounded flex flex-col">


                <div className="flex flex-col overflow-y-auto h-full">

                  {categoryStructure.map((category) => (
                    <div key={category.name} className="border-b border-gray-100 last:border-0">
                      {/* Main Category Header */}
                      <div className="flex items-center">
                        <Link
                          href={`/shop?category=${encodeURIComponent(category.name)}`}
                          className="flex-1 px-4 py-2.5 text-[14px] sm:text-[15px] text-[#4b5563] hover:bg-gray-50 transition-colors font-bold text-left hover:text-[#ff4d4d]"
                        >
                          {t(`categories.${category.name}`)}
                        </Link>
                        <button
                          onClick={() => setExpandedCategory(expandedCategory === category.name ? null : category.name)}
                          className="px-4 py-2.5 text-gray-400 hover:text-[#ff4d4d] transition-colors"
                        >
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-all flex-shrink-0 ${expandedCategory === category.name ? 'rotate-180' : ''
                              }`}
                          />
                        </button>
                      </div>

                      {/* Subcategories */}
                      {expandedCategory === category.name && (
                        <div className="bg-gray-50 border-t border-gray-100">
                          {category.subcategories.map((sub) => (
                            <Link
                              key={sub}
                              href={`/shop?category=${encodeURIComponent(sub)}`}
                              className="flex items-center justify-between px-6 py-2 text-[13px] sm:text-[14px] text-[#6b7280] hover:bg-white hover:text-[#ff4d4d] transition-colors border-b border-gray-100 last:border-0 group"
                            >
                              <span className="font-medium">{t(`categories.${sub}`)}</span>
                              <svg className="w-2.5 h-2.5 text-gray-300 group-hover:text-[#ff4d4d] transition-colors flex-shrink-0 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>


            {/* Right Content: Banner Slider */}
            <div className="lg:col-span-9 overflow-hidden">
              <BannerSlider />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 space-y-16 pb-20">
          {/* Featured Products with Slanted Section Header */}
          <section className="py-8 sm:py-16">
            <div className="max-w-7xl mx-auto">
              <div className="w-full relative h-12 flex items-stretch mb-8 overflow-hidden rounded-sm">
                <div className="bg-[#009661] text-white px-8 flex items-center font-bold text-base sm:text-lg italic tracking-tight" style={{ clipPath: 'polygon(0 0, 95% 0, 100% 100%, 0% 100%)' }}>
                  {t('common.featured_repository')}
                </div>
                <div className="flex-1 bg-[#ffed4a] flex items-center justify-end px-8 font-black text-base sm:text-lg text-[#1a4d2e] italic tracking-tight" style={{ marginLeft: '-15px', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 5% 100%)' }}>
                  {t('common.online_library')}
                </div>
              </div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">{t('common.latest_resources')}</p>
                <Link
                  href="/shop"
                  className="text-[#1a4d2e] hover:underline transition-colors font-bold text-sm sm:text-base flex items-center gap-2"
                >
                  {t('common.view_all')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
