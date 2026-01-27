'use client';

import { Header } from '@/components/header';
import Footer from '@/components/footer';
import { useCart } from '@/context/cart-context';
import { useLanguage } from '@/context/language-context';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download } from 'lucide-react';

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
  const [cartSnapshot, setCartSnapshot] = useState<typeof items>([]);

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
      setCartSnapshot([...items]); // Save items for receipt
      setOrderPlaced(true);
      clearCart();
    }
  };

  const generateReceipt = () => {
    const doc = new jsPDF();

    // Define colors
    const primaryColor = [26, 77, 46] as [number, number, number]; // #1a4d2e

    // Header
    doc.setFontSize(22);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('EbookSamnorng Receipt', 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    const date = new Date().toLocaleDateString();
    doc.text(`Date: ${date}`, 14, 28);
    doc.text(`Receipt ID: #${Math.floor(Math.random() * 100000)}`, 14, 33);

    // Customer Info Section
    doc.setDrawColor(200);
    doc.line(14, 38, 196, 38);

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Customer Information:', 14, 46);
    doc.setFontSize(10);
    doc.text(`Name: ${formData.firstName} ${formData.lastName}`, 14, 52);
    doc.text(`Email: ${formData.email}`, 14, 57);
    doc.text(`Phone: ${formData.phone}`, 14, 62);

    // Items Table
    const tableColumn = ["No.", "ID", "Item", "Price", "Qty", "Total", "Drive Link"];
    const tableRows = cartSnapshot.map((item, index) => [
      index + 1,
      item.id,
      item.title,
      `$${item.price.toFixed(2)}`,
      item.quantity,
      `$${(item.price * item.quantity).toFixed(2)}`,
      (item as any).file_url || "Link pending"
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 70,
      theme: 'grid',
      headStyles: { fillColor: primaryColor },
      styles: {
        fontSize: 7,
        cellPadding: 2,
        overflow: 'linebreak', // Ensure text wraps
      },
      columnStyles: {
        0: { cellWidth: 8 },  // No.
        1: { cellWidth: 20 }, // ID
        2: { cellWidth: 50 }, // Item
        3: { cellWidth: 15 }, // Price
        4: { cellWidth: 10 }, // Qty
        5: { cellWidth: 15 }, // Total
        6: { cellWidth: 'auto' } // Drive Link
      },
      didDrawCell: (data) => {
        // Only target the "Drive Link" column (index 6) and exclude header
        if (data.section === 'body' && data.column.index === 6) {
          const url = data.cell.raw as string;
          if (url && url.startsWith('http')) {
            // Add blue color to indicate it's a link
            doc.setTextColor(0, 0, 255);
            // Add clickable link on top of the cell
            doc.link(data.cell.x, data.cell.y, data.cell.width, data.cell.height, { url: url });
          }
        }
      }
    });

    // Total Section
    const finalY = (doc as any).lastAutoTable.finalY + 10;

    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text(`Total Amount Paid: $${finalTotal.toFixed(2)}`, 14, finalY);

    // Instructions
    const instructionY = finalY + 15;
    doc.setFillColor(245, 245, 245);
    doc.setDrawColor(220, 220, 220);
    doc.rect(14, instructionY, 182, 30, 'FD');

    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('Next Step:', 18, instructionY + 8);

    doc.setFontSize(10);
    doc.setTextColor(60);
    doc.text('Please send this receipt PDF to our Telegram support to receive', 18, instructionY + 16);
    doc.text('your unzip password/access key immediately.', 18, instructionY + 22);
    doc.text('Telegram: @SORIYA_VAUNG', 18, instructionY + 28); // Updated telegram

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text('Thank you for choosing EbookSamnorng!', 105, 285, { align: 'center' });

    doc.save(`Receipt_EbookSamnorng_${formData.phone}.pdf`);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
        <Header />

        <main className="flex-1 py-12 px-4">
          <div className="max-w-3xl mx-auto">
            {/* Main Success Container */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">

              {/* Header Visual Section */}
              <div className="bg-[#1a4d2e] py-8 px-6 text-center relative">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-md mb-4 shadow-md">
                  <svg className="w-8 h-8 text-[#1a4d2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">{t('checkout.purchase_verified')}</h1>
                <p className="text-white/80 text-base max-w-xl mx-auto">
                  {t('checkout.success_message')}
                </p>
              </div>

              <div className="p-6 sm:p-12">
                <div className="text-center mb-8">
                  <button
                    onClick={generateReceipt}
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-2.5 rounded-md font-bold hover:bg-primary/90 transition-colors shadow-sm text-sm"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download Receipt PDF
                  </button>
                  <p className="mt-3 text-sm text-gray-500 max-w-md mx-auto">
                    Please download the receipt and send it to our Telegram to get your access key.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                  {/* Left Column: Order Details */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">{t('checkout.receipt_details')}</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">{t('checkout.client_name')}</span>
                          <span className="font-medium text-gray-900">{formData.firstName} {formData.lastName}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">{t('checkout.registered_email')}</span>
                          <span className="font-medium text-gray-900">{formData.email}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">{t('checkout.support_id')}</span>
                          <span className="font-medium text-gray-900">{formData.phone}</span>
                        </div>
                        <div className="pt-3 border-t border-gray-100 mt-3 flex justify-between items-center">
                          <span className="text-gray-900 font-bold">{t('checkout.total_payment')}</span>
                          <span className="text-xl font-bold text-primary">${finalTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 border-b pb-2">{t('checkout.next_steps')}</h3>
                      <ul className="space-y-3">
                        {[
                          "Download your receipt (above)",
                          "Click Telegram button used below",
                          "Send the receipt PDF to chat",
                          "Receive your password instantly"
                        ].map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-green-700 text-xs font-bold">{i + 1}</span>
                            </div>
                            <span className="text-sm text-gray-600">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                      <div className="text-center mb-8">
                        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">{t('checkout.secure_access')}</h2>
                      </div>

                      <div className="space-y-10">
                        {cartSnapshot.map((item, idx) => (
                          <div key={idx} className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 bg-[#1a4d2e]/10 text-[#1a4d2e] rounded flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-black">{idx + 1}</div>
                              <p className="text-[13px] font-bold text-gray-700 leading-snug">{item.title}</p>
                            </div>

                            <div className="flex flex-col gap-2">
                              <a
                                href={(item as any).file_url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-[#1a4d2e] text-white py-3 rounded-md font-black text-sm flex items-center justify-center gap-2 hover:bg-[#143d24] transition-all shadow-md active:scale-[0.98]"
                              >
                                <Download className="w-4 h-4" />
                                {t('checkout.access_library')}
                              </a>
                              <a
                                href={`https://t.me/SORIYA_VAUNG?text=Hello, I just purchased: ${item.title} (ID: ${item.id}). Here is my receipt. Please provide the unzip password.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-[#0088cc] text-white py-3 rounded-md font-black text-sm flex items-center justify-center gap-2 hover:bg-[#0077b5] transition-all shadow-md active:scale-[0.98]"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.37-.48 1.02-.73 3.98-1.73 6.64-2.88 7.99-3.45 3.8-1.59 4.59-1.86 5.1-.14z" />
                                </svg>
                                Request Unzip Pass
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary transition-colors uppercase tracking-wider"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>{t('checkout.back_to_shop')}</span>
                </Link>
              </div>
            </div>

            {/* Trust Footer */}
            <div className="mt-8 text-center text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
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
          <nav className="flex items-center gap-2 text-xs font-black tracking-widest uppercase">
            <Link href="/" className="text-gray-500 hover:text-primary transition-colors">{t('common.home')}</Link>
            <span className="text-gray-300">/</span>
            <Link href="/cart" className="text-gray-500 hover:text-primary transition-colors">{t('cart.title')}</Link>
            <span className="text-gray-300">/</span>
            <span className="text-foreground">{t('checkout.title')}</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-2 sm:px-4 py-10 sm:py-16 w-full font-sans">

        <h1 className={`font-black text-foreground mb-8 ${language === 'km' ? 'text-xl sm:text-3xl' : 'text-2xl sm:text-4xl'}`}>
          {t('checkout.title')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-14">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePlaceOrder} className="space-y-6 sm:space-y-10">
              {/* Personal Information */}
              <div className="bg-card rounded-md border border-border p-6 sm:p-10 shadow-sm">
                <h2 className="font-black text-lg sm:text-2xl text-foreground mb-6 sm:mb-8 uppercase tracking-tight">{t('checkout.personal_info')}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="firstName"
                    placeholder={t('checkout.first_name')}
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-4 focus:ring-primary/20 bg-background text-sm sm:text-lg font-bold"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder={t('checkout.last_name')}
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-4 focus:ring-primary/20 bg-background text-sm sm:text-lg font-bold"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder={t('checkout.email')}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-4 focus:ring-primary/20 bg-background text-sm sm:text-lg font-bold mt-4"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder={t('checkout.phone')}
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-4 focus:ring-primary/20 bg-background text-sm sm:text-lg font-bold mt-4"
                />
              </div>

              {/* Payment Method */}
              <div className="bg-card rounded-md border border-border p-6 sm:p-10 overflow-hidden shadow-sm">
                <h2 className="font-black text-lg sm:text-2xl text-foreground mb-6 sm:mb-8 uppercase tracking-tight">{t('checkout.payment_info')}</h2>

                <div className="space-y-6 sm:space-y-10">
                  {/* Digital Wallet / KHQR */}
                  <div className="p-6 sm:p-8 border border-primary/10 rounded-xl bg-primary/5">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-base font-black shadow-md">
                        <span>1</span>
                      </div>
                      <h3 className="font-black text-lg text-foreground uppercase tracking-tight">{t('checkout.scan_khqr')}</h3>
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

                      <div className="flex-1 space-y-4">
                        <div className="space-y-1">
                          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{t('checkout.account_name')}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 items-center">
                            <p className="text-lg font-black text-gray-900">VAUNG SOPHAL</p>
                            <a
                              href="https://pay.ababank.com/oRF8/4qgylds2"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-[#005a8c] text-white px-4 py-2 rounded-lg text-[10px] font-black hover:bg-[#004b75] transition-all shadow-md active:scale-95"
                            >
                              {t('checkout.pay_aba_link')}
                            </a>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{t('checkout.amount_due')}</p>
                          <p className="text-3xl font-black text-[#1a4d2e]">${total.toFixed(2)}</p>
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
                className="w-full px-8 py-4 bg-[#1a4d2e] text-white rounded-md hover:bg-[#143d24] transition-all font-black text-lg sm:text-xl shadow-lg active:scale-[0.98] border-b-2 border-black/10"
              >
                {t('checkout.place_order')}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-md border border-border p-6 sm:p-10 sticky top-28 shadow-lg">
              <h2 className="font-black text-lg sm:text-2xl text-foreground mb-6 uppercase tracking-tight">{t('cart.order_summary')}</h2>

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

              <div className="flex justify-between text-2xl font-black text-foreground tracking-tighter">
                <span>{t('cart.total')}:</span>
                <span className="text-[#1a4d2e]">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
