'use client';

import { Header } from '@/components/header';
import Footer from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { Star, ShoppingCart, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products';
import { useCart } from '@/context/cart-context';
import { use, useState } from 'react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
            <Link href="/shop" className="text-primary hover:underline">
              Back to shop
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left Column: Product Image (5/12) */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="border border-[#e5e5e5] p-3 sm:p-6 relative bg-[#fff] shadow-sm rounded-sm">
              <div className="aspect-[1/1.4] bg-white overflow-hidden text-center flex items-center justify-center">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <button className="absolute bottom-4 left-4 w-10 h-10 flex items-center justify-center bg-gray-50/80 backdrop-blur-sm border border-gray-100 rounded-full text-gray-400 hover:text-primary transition-all hover:scale-110">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Middle Column: Product Info (4/12) */}
          <div className="lg:col-span-6 xl:col-span-4 flex flex-col">
            {/* Breadcrumb - Hidden on very small screens or made more compact */}
            <nav className="flex flex-wrap items-center gap-1.5 text-[10px] tracking-[0.05em] text-[#999] uppercase mb-4 sm:mb-6 font-semibold">
              <Link href="/" className="hover:text-primary transition-colors">HOME</Link>
              <span className="text-[#ccc]">/</span>
              <Link href="/shop" className="hover:text-primary transition-colors whitespace-nowrap">DOCUMENTS</Link>
              <span className="text-[#ccc]">/</span>
              <span className="text-[#555] truncate max-w-[150px]">{product.title}</span>
            </nav>

            <h1 className="text-2xl sm:text-[28px] font-bold text-[#222] mb-3 leading-[1.2] tracking-tight">
              {product.title}
            </h1>

            <div className="w-12 h-[3px] bg-red-600 mb-5 sm:mb-6"></div>

            {/* Rating */}
            <div className="flex items-center gap-0.5 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating)
                    ? 'fill-[#f39c12] text-[#f39c12]'
                    : 'text-gray-200'
                    }`}
                />
              ))}
            </div>

            {/* Price */}
            <div className="mb-6 sm:mb-8 flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-[#111]">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Meta Data */}
            <div className="space-y-3.5 mb-8 sm:mb-10 text-[14px] border-b border-dashed border-gray-200 pb-8">
              <div className="flex items-center gap-2">
                <span className="text-[#888] w-24 sm:w-32 shrink-0">Author:</span>
                <span className="font-bold text-[#333]">Ebook Samnorng</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#888] w-24 sm:w-32 shrink-0">Pages:</span>
                <span className="font-bold text-[#333]">25 pages</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#888] w-24 sm:w-32 shrink-0">Format:</span>
                <span className="font-bold text-[#333] uppercase">pdf</span>
              </div>
            </div>

            {/* Download Link Section */}
            <div className="mb-8 sm:mb-10 p-4 sm:p-5 bg-[#fff8f8] border border-red-50/50 rounded-lg">
              <p className="text-[#e63946] font-bold text-base sm:text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Product download link:
              </p>
              <button className="w-full flex items-center justify-center gap-3 bg-[#248a3d] text-white px-4 sm:px-6 py-3.5 rounded shadow-md hover:bg-[#1e7232] transition-all transform hover:-translate-y-0.5">
                <div className="bg-white/20 p-1.5 rounded shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-black text-lg sm:text-xl leading-none">DOWNLOAD</div>
                  <div className="text-[9px] sm:text-[10px] opacity-80 uppercase tracking-widest font-bold">Encrypted Source</div>
                </div>
                <div className="ml-auto bg-black/10 px-2 py-1 text-[10px] sm:text-xs font-bold rounded shrink-0">ZIP/RAR</div>
              </button>
            </div>

            <p className="text-[#686868] text-[14px] mb-8 leading-relaxed italic pr-4 bg-gray-50/50 p-4 rounded-r-lg border-l-4 border-red-500/20">
              {product.description || "Add this product to your cart to complete checkout and receive the decompression password immediately."}
            </p>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-4">
              <div className="flex items-center border-2 border-[#eee] rounded bg-white h-12">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-full flex items-center justify-center text-[#ccc] hover:text-red-500 hover:bg-gray-50 transition-colors text-xl font-light"
                >
                  −
                </button>
                <span className="w-12 text-center font-bold text-base border-x border-[#eee] h-full flex items-center justify-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-full flex items-center justify-center text-[#ccc] hover:text-red-500 hover:bg-gray-50 transition-colors text-xl font-light"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 h-12 bg-[#c0392b] text-white font-black text-sm tracking-[0.1em] hover:bg-[#a93226] transition-all shadow-lg hover:shadow-red-500/20 active:scale-95 flex items-center justify-center gap-2 ${isAdded ? 'bg-green-600' : ''}`}
              >
                {!isAdded && <ShoppingCart className="w-4 h-4" />}
                {isAdded ? 'ADDED TO CART' : 'ADD TO CART'}
              </button>
            </div>

            <div className="mt-8 sm:mt-12 pt-6 border-t border-gray-100 uppercase text-[10px] tracking-widest font-bold text-[#bbb]">
              PRODUCT CODE: <span className="text-[#888]">{id}</span>
            </div>
          </div>

          {/* Right Column: Sidebar (3/12) */}
          <div className="lg:col-span-12 xl:col-span-3">
            {/* Payment Guide - KHQR English Version */}
            <div className="bg-white border border-[#eee] rounded-lg overflow-hidden shadow-sm lg:max-w-md xl:max-w-none mx-auto">
              <div className="bg-[#e63946] px-5 py-3 text-center">
                <h3 className="font-bold text-[13px] tracking-wider text-white uppercase">
                  PAYMENT VIA KHQR
                </h3>
              </div>
              <div className="p-5 flex flex-col items-center">
                <div className="bg-[#fcfcfc] p-4 rounded-xl mb-4 w-full border border-gray-100 max-w-[280px]">
                  <Image
                    src="/QRKH.png"
                    alt="KHQR Payment Guide"
                    width={400}
                    height={600}
                    className="w-full h-auto rounded shadow-sm"
                  />
                </div>
                <div className="text-center space-y-4">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-[#222] uppercase tracking-wider">Account: VAUNG SOPHAL</p>
                    <a
                      href="https://pay.ababank.com/oRF8/mox4etnp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#005a8c] text-white px-5 py-2.5 rounded-full text-[11px] font-bold hover:bg-[#004b75] transition-all shadow-sm active:scale-95"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                      </svg>
                      PAY WITH ABA BANK
                    </a>
                  </div>
                  <p className="text-[10px] text-[#888] leading-relaxed italic max-w-[240px] mx-auto">
                    Scan the QR code or click the button above to pay securely via ABA Bank.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Similar Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24">
            <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-black text-[#111] tracking-tight uppercase">SIMILAR PRODUCTS</h2>
              <div className="flex-1 h-[2px] bg-[#f0f0f0] relative">
                <div className="absolute left-0 top-0 h-full w-16 sm:w-24 bg-red-600"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
