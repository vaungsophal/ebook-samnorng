'use client';

import { Header } from '@/components/header';
import Footer from '@/components/footer';
import { useCart } from '@/context/cart-context';
import Link from 'next/link';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
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
      <div className="bg-[#f5f5f5] py-3 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase">
            <Link href="/" className="text-gray-500 hover:text-primary transition-colors">HOME</Link>
            <span className="text-gray-300">/</span>
            <span className="text-foreground">SHOPPING CART</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-8 w-full">

        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border">
            <p className="text-muted-foreground text-base sm:text-lg mb-6">Your cart is empty</p>
            <Link
              href="/shop"
              className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex p-4 sm:p-6 gap-4 sm:gap-6 border-b border-gray-100 last:border-b-0 group transition-all"
                  >
                    {/* Product Image - Tall Book Cover Style */}
                    <Link
                      href={`/product/${item.id}`}
                      className="w-24 sm:w-32 shrink-0 aspect-[3/4] rounded-lg overflow-hidden bg-gray-50 border border-gray-100 shadow-sm relative group-hover:shadow-md transition-shadow"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-contain sm:object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="space-y-1">
                        <Link href={`/product/${item.id}`} className="hover:text-red-600 transition-colors block">
                          <h3 className="font-bold text-sm sm:text-lg text-[#222] leading-tight truncate sm:whitespace-normal">
                            {item.title}
                          </h3>
                        </Link>
                        <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest font-bold">
                          {item.category}
                        </p>
                        <p className="text-base sm:text-xl font-black text-[#111] mt-1 sm:mt-2">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls - Compact */}
                        <div className="flex items-center border border-[#eee] rounded-md bg-white shadow-sm h-8 sm:h-9 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 sm:w-10 h-full flex items-center justify-center text-gray-400 hover:text-red-600 transition-all border-r border-[#eee]"
                          >
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <span className="w-8 sm:w-10 text-center font-bold text-xs sm:text-sm text-[#333]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 sm:w-10 h-full flex items-center justify-center text-gray-400 hover:text-red-600 transition-all border-l border-[#eee]"
                          >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>

                        {/* Subtotal & Delete */}
                        <div className="flex items-center gap-3 sm:gap-6">
                          <div className="hidden sm:block text-right">
                            <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">Subtotal</p>
                            <p className="text-sm font-black text-[#111]">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-300 hover:text-red-600 p-1.5 transition-colors"
                            title="Remove from cart"
                          >
                            <Trash2 className="w-5 h-5" />
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
              <div className="bg-card rounded-lg border border-border p-4 sm:p-6 sticky top-20">
                <h2 className="font-bold text-lg sm:text-xl text-foreground mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm text-foreground">
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-foreground">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-sm text-foreground">
                    <span>Tax:</span>
                    <span>Included</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg sm:text-xl font-bold text-foreground mb-6">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-center mb-3 block"
                >
                  Proceed to Checkout
                </Link>

                <button
                  onClick={() => clearCart()}
                  className="w-full px-6 py-2 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors font-medium text-sm"
                >
                  Clear Cart
                </button>

                <Link
                  href="/shop"
                  className="w-full px-6 py-2 text-primary hover:underline text-center mt-4 block text-sm font-medium"
                >
                  Continue Shopping
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
