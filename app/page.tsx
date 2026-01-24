'use client';

import { Header } from '@/components/header';
import { ProductCard } from '@/components/product-card';
import Footer from '@/components/footer';
import Link from 'next/link';
import { products } from '@/lib/products';
import { ArrowRight, BookOpen, Shield, Zap } from 'lucide-react';
import { BannerSlider } from '@/components/banner-slider';

export default function HomePage() {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <Header />

      <main className="w-full pt-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Left Sidebar: Product Categories - Always Visible on Home */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                <div className="flex flex-col">
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
                      className="flex items-center justify-between px-4 py-3.5 text-[13px] text-[#4b5563] border-b border-gray-100 last:border-0 hover:bg-gray-50 hover:text-[#ff4d4d] group transition-colors"
                    >
                      <span className="font-medium">{name}</span>
                      <svg className="w-3 h-3 text-gray-300 group-hover:text-[#ff4d4d] transition-colors" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
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
          {/* Features Section */}
          <section className="py-12 sm:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-2 sm:px-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-12 text-center">
                Why Choose EbookSamnorng?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="bg-card rounded-lg border border-border p-6 sm:p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-foreground mb-3">Instant Access</h3>
                  <p className="text-sm sm:text-base text-foreground leading-relaxed">
                    Download e-books immediately after purchase. Access all your books anytime, anywhere on any device.
                  </p>
                </div>

                <div className="bg-card rounded-lg border border-border p-6 sm:p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-foreground mb-3">Premium Quality</h3>
                  <p className="text-sm sm:text-base text-foreground leading-relaxed">
                    Every book is carefully curated and verified by industry experts to ensure quality and relevance.
                  </p>
                </div>

                <div className="bg-card rounded-lg border border-border p-6 sm:p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-foreground mb-3">Affordable Pricing</h3>
                  <p className="text-sm sm:text-base text-foreground leading-relaxed">
                    Professional resources at competitive prices. Great value for your investment in professional development.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Products */}
          <section className="py-12 sm:py-16 lg:py-20 bg-secondary/30">
            <div className="max-w-7xl mx-auto px-2 sm:px-4">
              <div className="flex items-center justify-between mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                  Featured E-Books
                </h2>
                <Link
                  href="/shop"
                  className="text-primary hover:text-primary/80 transition-colors font-semibold text-sm flex items-center gap-2"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
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
