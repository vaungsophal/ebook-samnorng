'use client';

import { Header } from '@/components/header';
import Footer from '@/components/footer';
import { useCart } from '@/context/cart-context';
import { useLanguage } from '@/context/language-context';
import Link from 'next/link';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Breadcrumb Section */}
      <div className="bg-[#f5f5f5] py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-xs font-black tracking-widest uppercase">
            <Link href="/" className="text-gray-500 hover:text-primary transition-colors">{t('common.home')}</Link>
            <span className="text-gray-300">/</span>
            <span className="text-foreground">{t('cart.title')}</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-12 w-full">

        <h1 className={`font-black text-foreground mb-6 sm:mb-10 ${language === 'km' ? 'text-xl sm:text-3xl' : 'text-2xl sm:text-4xl'}`}>
          {t('cart.title')}
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-12 sm:py-20 bg-card rounded-md border border-border shadow-sm">
            <p className="text-muted-foreground text-lg sm:text-2xl mb-8 font-bold">{t('cart.empty')}</p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all font-black text-base sm:text-lg active:scale-95 shadow-md"
            >
              {t('cart.continue_shopping')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-14">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-md border border-border overflow-hidden shadow-sm">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex p-4 sm:p-10 gap-4 sm:gap-10 border-b border-gray-100 last:border-b-0 group transition-all"
                  >
                    {/* Product Image - Tall Book Cover Style */}
                    <Link
                      href={`/product/${item.id}`}
                      className="w-24 sm:w-44 shrink-0 aspect-[3/4] rounded-md overflow-hidden bg-gray-50 border border-gray-100 shadow-sm relative group-hover:shadow-lg transition-all"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-contain sm:object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="space-y-1">
                        <Link href={`/product/${item.id}`} className="hover:text-red-600 transition-colors block">
                          <h3 className={`font-black text-[#222] leading-tight ${language === 'km' ? 'text-lg sm:text-2xl' : 'text-xl sm:text-3xl line-clamp-2'}`}>
                            {item.title}
                          </h3>
                        </Link>
                        <p className="text-[10px] sm:text-[14px] text-gray-400 uppercase tracking-widest font-black">
                          {item.category}
                        </p>
                        <p className="text-xl sm:text-3xl font-black text-[#111] mt-2 sm:mt-4">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4 sm:mt-8">
                        {/* Quantity Controls - Larger */}
                        <div className="flex items-center border border-[#eee] rounded bg-white shadow-sm h-10 sm:h-14 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 sm:w-16 h-full flex items-center justify-center text-gray-400 hover:text-red-600 transition-all border-r border-[#eee] hover:bg-gray-50"
                          >
                            <Minus className="w-4 h-4 sm:w-6 sm:h-6" />
                          </button>
                          <span className="w-10 sm:w-16 text-center font-black text-base sm:text-xl text-[#333]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 sm:w-16 h-full flex items-center justify-center text-gray-400 hover:text-red-600 transition-all border-l border-[#eee] hover:bg-gray-50"
                          >
                            <Plus className="w-4 h-4 sm:w-6 sm:h-6" />
                          </button>
                        </div>

                        {/* Subtotal & Delete */}
                        <div className="flex items-center gap-6 sm:gap-10">
                          <div className="hidden sm:block text-right">
                            <p className="text-[11px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1">{t('cart.subtotal')}</p>
                            <p className="text-xl font-black text-[#111]">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-300 hover:text-red-600 p-2 transition-all hover:scale-110"
                            title={t('cart.remove_item')}
                          >
                            <Trash2 className="w-6 h-6 sm:w-8 sm:h-8" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-md border border-border p-6 sm:p-10 sticky top-28 shadow-lg">
                <h2 className="font-black text-xl sm:text-3xl text-foreground mb-6 uppercase tracking-tight">{t('cart.order_summary')}</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-base text-foreground font-bold">
                    <span>{t('cart.subtotal')}:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base text-foreground font-bold">
                    <span>{t('cart.shipping')}:</span>
                    <span className="text-green-600 uppercase italic">{t('cart.free')}</span>
                  </div>
                  <div className="flex justify-between text-base text-foreground font-bold">
                    <span>{t('cart.tax')}:</span>
                    <span className="text-[#888] italic">{t('cart.included')}</span>
                  </div>
                </div>

                <div className="flex justify-between text-2xl sm:text-4xl font-black text-foreground mb-8 tracking-tighter">
                  <span>{t('cart.total')}:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full px-8 py-3.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all font-black text-lg text-center mb-4 block shadow-md active:scale-[0.98]"
                >
                  {t('cart.proceed_to_checkout')}
                </Link>

                <button
                  onClick={() => clearCart()}
                  className="w-full px-8 py-2.5 border border-border text-foreground rounded-md hover:bg-secondary transition-all font-bold text-sm active:scale-[0.98] mb-4"
                >
                  {t('cart.clear_cart')}
                </button>

                <Link
                  href="/shop"
                  className="w-full px-8 py-2 text-primary hover:underline text-center mt-4 block text-base font-black transition-all"
                >
                  {t('cart.continue_shopping')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
