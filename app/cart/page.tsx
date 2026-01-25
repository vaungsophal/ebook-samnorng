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

        <h1 className={`font-black text-foreground mb-10 ${language === 'km' ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'}`}>
          {t('cart.title')}
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-lg border border-border shadow-sm">
            <p className="text-muted-foreground text-xl sm:text-2xl mb-10 font-bold">{t('cart.empty')}</p>
            <Link
              href="/shop"
              className="inline-block px-10 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-black text-lg active:scale-95 shadow-lg"
            >
              {t('cart.continue_shopping')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-14">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border border-border overflow-hidden shadow-sm">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex p-6 sm:p-10 gap-6 sm:gap-10 border-b border-gray-100 last:border-b-0 group transition-all"
                  >
                    {/* Product Image - Tall Book Cover Style */}
                    <Link
                      href={`/product/${item.id}`}
                      className="w-32 sm:w-44 shrink-0 aspect-[3/4] rounded-lg overflow-hidden bg-gray-50 border border-gray-100 shadow-sm relative group-hover:shadow-lg transition-all"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-contain sm:object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="space-y-2">
                        <Link href={`/product/${item.id}`} className="hover:text-red-600 transition-colors block">
                          <h3 className={`font-black text-[#222] leading-tight ${language === 'km' ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl line-clamp-2'}`}>
                            {item.title}
                          </h3>
                        </Link>
                        <p className="text-[12px] sm:text-[14px] text-gray-400 uppercase tracking-widest font-black">
                          {item.category}
                        </p>
                        <p className="text-2xl sm:text-3xl font-black text-[#111] mt-3 sm:mt-4">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-8">
                        {/* Quantity Controls - Larger */}
                        <div className="flex items-center border-2 border-[#eee] rounded-lg bg-white shadow-sm h-12 sm:h-14 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-12 sm:w-16 h-full flex items-center justify-center text-gray-400 hover:text-red-600 transition-all border-r-2 border-[#eee] hover:bg-gray-50"
                          >
                            <Minus className="w-5 h-5 sm:w-6 sm:h-6" />
                          </button>
                          <span className="w-12 sm:w-16 text-center font-black text-lg sm:text-xl text-[#333]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-12 sm:w-16 h-full flex items-center justify-center text-gray-400 hover:text-red-600 transition-all border-l-2 border-[#eee] hover:bg-gray-50"
                          >
                            <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
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
                            className="text-gray-300 hover:text-red-600 p-2 transition-all hover:scale-125"
                            title={t('cart.remove_item')}
                          >
                            <Trash2 className="w-7 h-7 sm:w-8 sm:h-8" />
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
              <div className="bg-card rounded-xl border-2 border-border p-8 sm:p-10 sticky top-28 shadow-xl">
                <h2 className="font-black text-2xl sm:text-3xl text-foreground mb-8 uppercase tracking-tight">{t('cart.order_summary')}</h2>

                <div className="space-y-5 mb-8 pb-8 border-b-2 border-border">
                  <div className="flex justify-between text-lg text-foreground font-bold">
                    <span>{t('cart.subtotal')}:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg text-foreground font-bold">
                    <span>{t('cart.shipping')}:</span>
                    <span className="text-green-600 uppercase italic">{t('cart.free')}</span>
                  </div>
                  <div className="flex justify-between text-lg text-foreground font-bold">
                    <span>{t('cart.tax')}:</span>
                    <span className="text-[#888] italic">{t('cart.included')}</span>
                  </div>
                </div>

                <div className="flex justify-between text-3xl sm:text-4xl font-black text-foreground mb-10 tracking-tighter">
                  <span>{t('cart.total')}:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full px-8 py-5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all font-black text-xl text-center mb-5 block shadow-lg active:scale-[0.98]"
                >
                  {t('cart.proceed_to_checkout')}
                </Link>

                <button
                  onClick={() => clearCart()}
                  className="w-full px-8 py-3 border-2 border-border text-foreground rounded-xl hover:bg-secondary transition-all font-bold text-base active:scale-[0.98] mb-4"
                >
                  {t('cart.clear_cart')}
                </button>

                <Link
                  href="/shop"
                  className="w-full px-8 py-3 text-primary hover:underline text-center mt-6 block text-lg font-black transition-all"
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
