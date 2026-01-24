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

      <div className="flex-1 max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-8 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-foreground font-semibold">SHOPPING CART</span>
        </div>

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
                    className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6 border-b border-border last:border-b-0 hover:bg-secondary/50 transition-colors"
                  >
                    {/* Product Image */}
                    <Link
                      href={`/product/${item.id}`}
                      className="flex-shrink-0 w-full sm:w-24 h-32 sm:h-24 rounded-lg overflow-hidden bg-secondary"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1">
                      <Link href={`/product/${item.id}`} className="hover:text-primary transition-colors">
                        <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                        {item.category}
                      </p>
                      <p className="text-lg sm:text-xl font-bold text-foreground">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex flex-col items-end justify-between">
                      <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-foreground hover:text-primary transition-colors p-1"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-foreground font-medium min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-foreground hover:text-primary transition-colors p-1"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <p className="text-sm text-muted-foreground">
                          Subtotal:
                        </p>
                        <p className="text-lg font-bold text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors mt-2"
                        title="Remove from cart"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
