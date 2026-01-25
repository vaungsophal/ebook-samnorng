'use client';

import { Header } from '@/components/header';
import Footer from '@/components/footer';
import { useCart } from '@/context/cart-context';
import { useLanguage } from '@/context/language-context';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { t, language } = useLanguage();
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
        <div className="flex-1 max-w-7xl mx-auto px-4 py-20 w-full text-center">
          <h1 className="text-3xl font-black text-foreground mb-8">{t('cart.empty')}</h1>
          <Link href="/shop" className="text-primary hover:underline font-black text-xl">
            {t('checkout.back_to_shop')}
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

        <main className="flex-1 py-16 px-4 sm:py-24">
          <div className="max-w-4xl mx-auto">
            {/* Main Success Container */}
            <div className="bg-white rounded-[40px] shadow-[0_30px_70px_rgba(0,0,0,0.08)] overflow-hidden border border-white">

              {/* Header Visual Section */}
              <div className="bg-[#1a4d2e] pt-20 pb-16 px-10 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2"></div>

                {/* Checkmark Animation Hub */}
                <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-10 shadow-2xl relative z-10">
                  <svg className="w-12 h-12 text-[#1a4d2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">{t('checkout.purchase_verified')}</h1>
                <p className="text-white/80 text-xl font-bold max-w-2xl mx-auto leading-relaxed">
                  {t('checkout.success_message')}
                </p>
              </div>

              <div className="p-10 md:p-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                  {/* Left Column: Order Details */}
                  <div className="space-y-12">
                    <div>
                      <h3 className="text-[13px] font-black text-[#1a4d2e] uppercase tracking-[0.2em] mb-6">{t('checkout.receipt_details')}</h3>
                      <div className="space-y-5 bg-gray-50 p-8 rounded-3xl border border-gray-100">
                        <div className="flex justify-between items-center text-base">
                          <span className="text-gray-400 font-black uppercase tracking-tighter text-[11px]">{t('checkout.client_name')}</span>
                          <span className="text-[#222] font-black">{formData.firstName} {formData.lastName}</span>
                        </div>
                        <div className="flex justify-between items-center text-base">
                          <span className="text-gray-400 font-black uppercase tracking-tighter text-[11px]">{t('checkout.registered_email')}</span>
                          <span className="text-[#222] font-black lowercase">{formData.email}</span>
                        </div>
                        <div className="flex justify-between items-center text-base">
                          <span className="text-gray-400 font-black uppercase tracking-tighter text-[11px]">{t('checkout.support_id')}</span>
                          <span className="text-[#222] font-black">{formData.phone}</span>
                        </div>
                        <div className="pt-6 border-t border-gray-200 mt-6 flex justify-between items-center">
                          <span className="text-[#1a4d2e] font-black uppercase tracking-tighter text-[13px]">{t('checkout.total_payment')}</span>
                          <span className="text-3xl font-black text-[#1a4d2e]">${finalTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-[13px] font-black text-[#1a4d2e] uppercase tracking-[0.2em]">{t('checkout.next_steps')}</h3>
                      <div className="space-y-5">
                        {[
                          "Confirm receipt of the automated confirmation email",
                          "Download the encrypted ZIP/RAR from Drive below",
                          "Message us on Telegram with your verify ID",
                          "Receive your technical extraction key instantly"
                        ].map((step, i) => (
                          <div key={i} className="flex items-center gap-5">
                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0 border border-green-100">
                              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-[15px] text-gray-600 font-black">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Dynamic Access */}
                  <div className="space-y-8 flex flex-col">
                    <div className="bg-[#f0f9ff] border-2 border-dashed border-blue-200 rounded-[40px] p-10 text-center flex-1">
                      <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-xl">
                        <svg className="w-12 h-12 text-[#0088cc]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.17 11L10 18l-1.41-1.42L11.76 13 8.59 9.83 10 8.41 13.17 11.59 16.34 8.41 17.76 9.83 14.59 13l3.17 3.17-1.42 1.41z" opacity=".1" />
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.35-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.35-.49.96-.75 3.78-1.65 6.31-2.74 7.58-3.27 3.61-1.51 4.35-1.77 4.84-1.78.11 0 .35.03.5.16.13.12.16.28.18.39.02.05.02.2.01.32z" />
                        </svg>
                      </div>
                      <h4 className="text-2xl font-black text-[#1e3a8a] mb-4 uppercase tracking-tight">{t('checkout.secure_access')}</h4>
                      <p className="text-blue-700/70 text-[14px] font-black mb-12 leading-relaxed uppercase tracking-widest italic">
                        {t('checkout.password_required')}
                      </p>

                      <div className="space-y-6 px-6">
                        <a
                          href="https://drive.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-[#1a4d2e] text-white py-6 rounded-[24px] font-black text-[14px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-[#143d24] transition-all shadow-xl hover:-translate-y-1 active:scale-95 border-b-4 border-[#0e2a19]"
                        >
                          {t('checkout.access_library')}
                        </a>
                        <a
                          href="https://t.me/ebooksamnorng"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-[#0088cc] text-white py-6 rounded-[24px] font-black text-[14px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-[#0077b5] transition-all shadow-xl hover:-translate-y-1 active:scale-95 border-b-4 border-[#006e9c]"
                        >
                          {t('checkout.request_key')}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-20 text-center pb-12 border-t border-gray-100">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-8 text-[13px] font-black text-gray-400 uppercase tracking-[0.2em] group hover:text-[#1a4d2e] transition-colors"
                >
                  <span>{t('checkout.back_to_shop')}</span>
                  <div className="w-16 h-[3px] bg-red-600"></div>
                </Link>
              </div>
            </div>

            {/* Trust Footer */}
            <div className="mt-16 text-center text-[12px] text-gray-400 uppercase tracking-widest font-black">
              {t('checkout.trust_footer')}
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
      <div className="bg-[#f5f5f5] py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-[13px] font-black tracking-widest uppercase">
            <Link href="/" className="text-gray-500 hover:text-primary transition-colors">{t('common.home')}</Link>
            <span className="text-gray-300">/</span>
            <Link href="/cart" className="text-gray-500 hover:text-primary transition-colors">{t('cart.title')}</Link>
            <span className="text-gray-300">/</span>
            <span className="text-foreground">{t('checkout.title')}</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-2 sm:px-4 py-10 sm:py-16 w-full font-sans">

        <h1 className={`font-black text-foreground mb-12 ${language === 'km' ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl'}`}>
          {t('checkout.title')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-14">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePlaceOrder} className="space-y-10">
              {/* Personal Information */}
              <div className="bg-card rounded-2xl border-2 border-border p-8 sm:p-10 shadow-sm">
                <h2 className="font-black text-xl sm:text-2xl text-foreground mb-8 uppercase tracking-tight">{t('checkout.personal_info')}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="firstName"
                    placeholder={t('checkout.first_name')}
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="px-6 py-4 border-2 border-border rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 bg-background text-base sm:text-lg font-bold"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder={t('checkout.last_name')}
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="px-6 py-4 border-2 border-border rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 bg-background text-base sm:text-lg font-bold"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder={t('checkout.email')}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 border-2 border-border rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 bg-background text-base sm:text-lg font-bold mt-6"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder={t('checkout.phone')}
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 border-2 border-border rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 bg-background text-base sm:text-lg font-bold mt-6"
                />
              </div>

              {/* Payment Method */}
              <div className="bg-card rounded-2xl border-2 border-border p-8 sm:p-10 overflow-hidden shadow-sm">
                <h2 className="font-black text-xl sm:text-2xl text-foreground mb-8 uppercase tracking-tight">{t('checkout.payment_info')}</h2>

                <div className="space-y-10">
                  {/* Digital Wallet / KHQR */}
                  <div className="p-8 border-2 border-primary/20 rounded-[32px] bg-primary/5">
                    <div className="flex items-center gap-5 mb-8">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-lg font-black shadow-lg">
                        <span>1</span>
                      </div>
                      <h3 className="font-black text-xl text-foreground uppercase tracking-tight">{t('checkout.scan_khqr')}</h3>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
                      <div className="w-full md:w-60 bg-white p-5 rounded-3xl shadow-xl border border-gray-100">
                        <Image
                          src="/QRKH.png"
                          alt="Payment QR Code"
                          width={400}
                          height={600}
                          className="w-full h-auto rounded-xl"
                        />
                      </div>

                      <div className="flex-1 space-y-6">
                        <div className="space-y-2">
                          <p className="text-[12px] text-muted-foreground uppercase font-black tracking-widest">{t('checkout.account_name')}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-5 items-center">
                            <p className="text-xl font-black text-foreground">VAUNG SOPHAL</p>
                            <a
                              href="https://pay.ababank.com/oRF8/mox4etnp"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-3 bg-[#005a8c] text-white px-5 py-2.5 rounded-xl text-[12px] font-black hover:bg-[#004b75] transition-all shadow-lg active:scale-95"
                            >
                              {t('checkout.pay_aba_link')}
                            </a>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-[12px] text-muted-foreground uppercase font-black tracking-widest">{t('checkout.amount_due')}</p>
                          <p className="text-4xl font-black text-primary">${total.toFixed(2)}</p>
                        </div>

                        <div className="p-5 bg-white/50 border-2 border-primary/10 rounded-2xl text-[14px] text-foreground italic font-medium leading-relaxed shadow-inner">
                          {t('checkout.payment_note')}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <p className="text-[14px] text-muted-foreground font-bold italic">{t('checkout.other_payments')}</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-10 py-6 bg-primary text-primary-foreground rounded-[24px] hover:bg-primary/90 transition-all font-black text-2xl shadow-2xl active:scale-[0.98] border-b-4 border-black/20"
              >
                {t('checkout.place_order')}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border-2 border-border p-8 sm:p-10 sticky top-28 shadow-xl">
              <h2 className="font-black text-xl sm:text-2xl text-foreground mb-8 uppercase tracking-tight">{t('cart.order_summary')}</h2>

              <div className="space-y-5 mb-8 pb-8 border-b-2 border-border max-h-96 overflow-y-auto custom-scrollbar pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-4 text-base font-bold text-foreground">
                    <span className="line-clamp-1">{item.title}</span>
                    <span className="shrink-0 text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-8 pb-8 border-b-2 border-border">
                <div className="flex justify-between text-base font-black text-foreground">
                  <span>{t('cart.subtotal')}:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-foreground">
                  <span>{t('cart.shipping')}:</span>
                  <span className="text-green-600 italic uppercase">{t('cart.free')}</span>
                </div>
                <div className="flex justify-between text-base font-black text-foreground">
                  <span>{t('cart.tax')}:</span>
                  <span className="text-[#888] italic">{t('cart.included')}</span>
                </div>
              </div>

              <div className="flex justify-between text-3xl font-black text-foreground tracking-tighter">
                <span>{t('cart.total')}:</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
