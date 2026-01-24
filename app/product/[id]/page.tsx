'use client';

import { Header } from '@/components/header';
import Footer from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { Star, ShoppingCart, ChevronLeft, X, Download as DownloadIcon, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { supabase } from '@/utils/supabase/client';

// ... (imports remain the same, ensure to keep others)
// removing 'products' import from lib/products if not needed, or keep for type
import { products as staticProducts } from '@/lib/products';
import { useCart } from '@/context/cart-context';
import { use, useState, useEffect } from 'react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Fetch current product
        const { data: productData, error: productError } = await supabase
          .from('books')
          .select('*')
          .eq('id', id)
          .single();

        if (productError && productError.code !== 'PGRST116') { // PGRST116 is "not found"
          console.error('Error fetching product:', productError);
        }

        let currentProduct = productData;

        // Fallback to static products if not found in DB (optional, for backward compatibility)
        if (!currentProduct) {
          currentProduct = staticProducts.find((p: any) => p.id === id);
        } else {
          // Map DB fields to app fields
          currentProduct = {
            ...currentProduct,
            image: currentProduct.image_url || '/placeholder.svg'
          };
        }

        setProduct(currentProduct);

        if (currentProduct) {
          // Fetch related products (same category, exclude current)
          const { data: relatedData } = await supabase
            .from('books')
            .select('*')
            .eq('category', currentProduct.category)
            .neq('id', id)
            .limit(4);

          let related: any[] = relatedData?.map(p => ({ ...p, image: p.image_url || '/placeholder.svg' })) || [];

          // If strictly using DB, rely on that. If mixing, maybe fetch from static too? 
          // Let's stick to DB + static fallback for now for related? 
          // Actually, if we are "updating by adding new book", we want to see new books.
          // If the current product is from DB, show DB related. 
          // If current product is static, show static related?
          // Simpler: Just try to fill related with whatever we have.

          if (related.length === 0) {
            related = staticProducts
              .filter((p: any) => p.category === currentProduct.category && p.id !== currentProduct.id)
              .slice(0, 4);
          }
          setRelatedProducts(related);
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left Column: Product Image (5/12) */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="border border-[#eee] relative bg-white shadow-sm rounded-sm overflow-hidden">
              <div
                className="w-full bg-white text-center flex items-center justify-center cursor-zoom-in"
                onClick={() => setShowLightbox(true)}
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-auto object-cover"
                />
              </div>
              <button
                onClick={() => setShowLightbox(true)}
                className="absolute bottom-4 left-4 w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-full text-gray-400 hover:text-[#c0392b] transition-all hover:scale-110 shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Middle Column: Product Info (4/12) */}
          <div className="lg:col-span-6 xl:col-span-4 flex flex-col">
            {/* Breadcrumb */}
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


            {/* Short Description (Replaces Meta Data) */}
            <div className="mb-8 sm:mb-10 text-base text-gray-600 leading-relaxed border-b border-dashed border-gray-200 pb-8">
              {product.description}
            </div>

            {/* Download Link Section - SIMPLE & PROFESSIONAL */}
            <div className="mb-8 sm:mb-10">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-[#248a3d]" />
                <span className="text-[12px] font-bold text-[#444] uppercase tracking-wider">Verified Source</span>
              </div>

              <a
                href={product.file_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!product.file_url) {
                    e.preventDefault();
                    alert("No file available for download.");
                  }
                }}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-sm shadow-lg transition-all group overflow-hidden relative ${product.file_url ? 'bg-gray-900 text-white hover:bg-black cursor-pointer shadow-xl transform active:scale-[0.99]' : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70'}`}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div className="p-2 bg-white/10 rounded">
                    <DownloadIcon className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm tracking-widest uppercase">Download Now</div>
                    <div className="text-[10px] opacity-80">
                      {product.file_url ? "Click to download file directly" : "File download unavailable"}
                    </div>
                  </div>
                </div>
                <div className="text-[10px] font-bold bg-white/10 px-2 py-1 rounded relative z-10">
                  PDF / ZIP
                </div>

                {/* Subtle hover effect */}
                {product.file_url && (
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                )}
              </a>
            </div>

            {/* Full Details */}
            {product.details && (
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-3">Details</h3>
                <div className="text-[#444] text-[14px] leading-relaxed whitespace-pre-wrap">
                  {product.details}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart - ALWAYS IN-LINE */}
            <div className="flex flex-row items-center gap-2 sm:gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center border border-[#eee] rounded bg-white shadow-sm overflow-hidden h-10 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 sm:w-11 h-full flex items-center justify-center text-[#999] hover:text-[#c0392b] hover:bg-gray-50 transition-colors text-base"
                >
                  −
                </button>
                <span className="w-10 sm:w-12 text-center font-bold text-xs sm:text-sm border-x border-[#eee] h-full flex items-center justify-center text-[#333]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 sm:w-11 h-full flex items-center justify-center text-[#999] hover:text-[#c0392b] hover:bg-gray-50 transition-colors text-base"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 h-10 rounded-sm text-white font-bold text-[10px] sm:text-[11px] tracking-[0.05em] transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-1.5 uppercase relative overflow-hidden group ${isAdded
                  ? 'bg-[#27ae60] shadow-green-500/10'
                  : 'bg-[#c0392b] hover:bg-[#a93226] shadow-red-500/10'
                  }`}
              >
                {!isAdded && <ShoppingCart className="w-3.5 h-3.5" />}
                <span className="relative z-10 whitespace-nowrap">
                  {isAdded ? 'ADDED' : 'ADD TO CART'}
                </span>

                {/* Subtle shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
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

      {/* Lightbox / Fullscreen Overlay */}
      {showLightbox && (
        <div
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 sm:p-10 transition-all"
          onClick={() => setShowLightbox(false)}
        >
          <button
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            onClick={() => setShowLightbox(false)}
          >
            <X className="w-10 h-10" />
          </button>

          <div className="max-w-full max-h-full relative flex items-center justify-center">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className="max-w-full max-h-[90vh] object-contain shadow-2xl animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
