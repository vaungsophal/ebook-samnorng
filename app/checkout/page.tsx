'use client';

import React from "react"

import { Header } from '@/components/header';
import Footer from '@/components/footer';
import { useCart } from '@/context/cart-context';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    paymentMethod: 'bank',
  });

  const [finalTotal, setFinalTotal] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h1>
          <Link href="/shop" className="text-primary hover:underline">
            Back to shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.email && formData.phone) {
      setFinalTotal(total);
      setOrderPlaced(true);
      clearCart();
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-sans">
        <Header />

        <main className="flex-1 py-12 px-4 sm:py-20">
          <div className="max-w-3xl mx-auto">
            {/* Main Success Container */}
            <div className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-white">

              {/* Header Visual Section */}
              <div className="bg-[#1a4d2e] pt-16 pb-12 px-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2"></div>

                {/* Checkmark Animation Hub */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-8 shadow-2xl relative z-10">
                  <svg className="w-10 h-10 text-[#1a4d2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">Purchase Verified</h1>
                <p className="text-white/80 text-lg font-medium max-w-lg mx-auto leading-relaxed">
                  Your order has been successfully processed. You now have official access to the professional engineering repository.
                </p>
              </div>

              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                  {/* Left Column: Order Details */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-[11px] font-black text-[#1a4d2e] uppercase tracking-[0.2em] mb-4">Official Receipt Details</h3>
                      <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400 font-bold uppercase tracking-tighter text-[10px]">Client Name</span>
                          <span className="text-[#222] font-black">{formData.firstName} {formData.lastName}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400 font-bold uppercase tracking-tighter text-[10px]">Registered Email</span>
                          <span className="text-[#222] font-black lowercase">{formData.email}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400 font-bold uppercase tracking-tighter text-[10px]">Support ID</span>
                          <span className="text-[#222] font-black">{formData.phone}</span>
                        </div>
                        <div className="pt-4 border-t border-gray-200 mt-4 flex justify-between items-center">
                          <span className="text-[#1a4d2e] font-black uppercase tracking-tighter text-[12px]">Total Payment</span>
                          <span className="text-2xl font-black text-[#1a4d2e]">${finalTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-[11px] font-black text-[#1a4d2e] uppercase tracking-[0.2em]">Next Steps Checklist</h3>
                      <div className="space-y-3">
                        {[
                          "Confirm receipt of the automated confirmation email",
                          "Download the encrypted ZIP/RAR from Drive below",
                          "Message us on Telegram with your verify ID",
                          "Receive your technical extraction key instantly"
                        ].map((step, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center shrink-0 border border-green-100">
                              <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-[13px] text-gray-600 font-semibold">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Dynamic Access */}
                  <div className="space-y-6 flex flex-col">
                    <div className="bg-[#f0f9ff] border-2 border-dashed border-blue-200 rounded-[32px] p-8 text-center flex-1">
                      <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                        <svg className="w-10 h-10 text-[#0088cc]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.17 11L10 18l-1.41-1.42L11.76 13 8.59 9.83 10 8.41 13.17 11.59 16.34 8.41 17.76 9.83 14.59 13l3.17 3.17-1.42 1.41z" opacity=".1" />
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.35-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.35-.49.96-.75 3.78-1.65 6.31-2.74 7.58-3.27 3.61-1.51 4.35-1.77 4.84-1.78.11 0 .35.03.5.16.13.12.16.28.18.39.02.05.02.2.01.32z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-black text-[#1e3a8a] mb-3 uppercase tracking-tight">Secure File Access</h4>
                      <p className="text-blue-700/70 text-[13px] font-bold mb-10 leading-relaxed uppercase tracking-widest italic">
                        Technical Extraction Password Required
                      </p>

                      <div className="space-y-5 px-4">
                        <a
                          href="https://drive.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-[#1a4d2e] text-white py-5 rounded-2xl font-black text-[12px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#143d24] transition-all shadow-[0_15px_35px_rgba(26,77,46,0.25)] hover:-translate-y-1 active:scale-95 border-b-4 border-[#0e2a19]"
                        >
                          Access Digital Library
                        </a>
                        <a
                          href="https://t.me/ebooksamnorng"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-[#0088cc] text-white py-5 rounded-2xl font-black text-[12px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#0077b5] transition-all shadow-[0_15px_35px_rgba(0,136,204,0.25)] hover:-translate-y-1 active:scale-95 border-b-4 border-[#006e9c]"
                        >
                          Request Extraction Key
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 text-center pt-8 border-t border-gray-100">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] group hover:text-[#1a4d2e] transition-colors"
                >
                  <span>Back to Shop Gallery</span>
                  <div className="w-12 h-[2px] bg-red-600"></div>
                </Link>
              </div>
            </div>

            {/* Trust Footer */}
            <div className="mt-12 text-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
              Secure Digital Delivery • Professional Engineering Library • 24/7 Support
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
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
            <Link href="/cart" className="text-gray-500 hover:text-primary transition-colors">CART</Link>
            <span className="text-gray-300">/</span>
            <span className="text-foreground">CHECKOUT</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-8 w-full">

        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-card rounded-lg border border-border p-4 sm:p-6">
                <h2 className="font-bold text-lg text-foreground mb-4">Personal Information</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-sm"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-sm"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-sm mt-4"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-sm mt-4"
                />
              </div>



              {/* Payment Method */}
              <div className="bg-card rounded-lg border border-border p-4 sm:p-6 overflow-hidden">
                <h2 className="font-bold text-lg text-foreground mb-4">Payment Information</h2>

                <div className="space-y-6">
                  {/* Digital Wallet / KHQR */}
                  <div className="p-5 border-2 border-primary/20 rounded-xl bg-primary/5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                        <span className="text-sm font-bold">1</span>
                      </div>
                      <h3 className="font-bold text-foreground">Scan KHQR to Pay</h3>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                      <div className="w-full md:w-48 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                        <Image
                          src="/QRKH.png"
                          alt="Payment QR Code"
                          width={400}
                          height={600}
                          className="w-full h-auto rounded"
                        />
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="space-y-1">
                          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Account Name</p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <p className="text-base font-black text-foreground">VAUNG SOPHAL</p>
                            <a
                              href="https://pay.ababank.com/oRF8/mox4etnp"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-[#005a8c] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-[#004b75] transition-all shadow-sm"
                            >
                              PAY VIA ABA BANK LINK
                            </a>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Amount Due</p>
                          <p className="text-2xl font-black text-primary">${total.toFixed(2)}</p>
                        </div>

                        <div className="p-3 bg-white/50 border border-primary/10 rounded text-[11px] text-foreground italic leading-relaxed">
                          Once you have completed the payment, please fill in your details and click "Confirm Order" below. We will verify and send your e-books immediately.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <p className="text-xs text-muted-foreground">Other payment methods are available on request. Contact us via Telegram for faster support.</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-base"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-4 sm:p-6 sticky top-20">
              <h2 className="font-bold text-lg text-foreground mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4 pb-4 border-b border-border max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-foreground">
                    <span>{item.title.substring(0, 20)}...</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b border-border">
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

              <div className="flex justify-between text-lg font-bold text-foreground">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
