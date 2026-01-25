'use client';

import React from "react"

import { Header } from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

import { useLanguage } from '@/context/language-context';

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.subject && formData.message) {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Breadcrumb Section */}
      <div className="bg-[#f5f5f5] py-3 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase">
            <Link href="/" className="text-gray-500 hover:text-primary transition-colors">{t('contact_page.breadcrumb_home')}</Link>
            <span className="text-gray-300">/</span>
            <span className="text-foreground">{t('contact_page.breadcrumb_title')}</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 max-w-6xl mx-auto px-2 sm:px-4 py-6 sm:py-12 w-full">

        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-4 uppercase tracking-tight">
          {t('contact_page.title')}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mb-8 sm:mb-12">
          {t('contact_page.subtitle')}
        </p>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Contact Info Cards */}
          <div className="bg-card rounded-lg border border-border p-6 sm:p-8 text-center">
            <div className="flex justify-center mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold text-base text-foreground mb-2">{t('contact_page.email')}</h3>
            <p className="text-sm text-foreground break-all">
              <a href="mailto:info@ebooksamnorng.com" className="hover:text-primary transition-colors">
                info@ebooksamnorng.com
              </a>
            </p>
            <p className="text-xs text-muted-foreground mt-2">{t('contact_page.email_sub')}</p>
          </div>

          <div className="bg-card rounded-lg border border-border p-6 sm:p-8 text-center">
            <div className="flex justify-center mb-4">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold text-base text-foreground mb-2">{t('contact_page.phone')}</h3>
            <p className="text-sm text-foreground">
              <a href="tel:087330027" className="hover:text-primary transition-colors">
                087 330 027
              </a>
            </p>
            <p className="text-xs text-muted-foreground mt-2">{t('contact_page.phone_sub')}</p>
          </div>

          <div className="bg-card rounded-lg border border-border p-6 sm:p-8 text-center">
            <div className="flex justify-center mb-4">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold text-base text-foreground mb-2">{t('contact_page.address')}</h3>
            <p className="text-sm text-foreground whitespace-pre-line">
              {t('contact_page.address_val')}
            </p>
          </div>
        </div>

        {/* Contact Form & FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <div className="bg-card rounded-lg border border-border p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-black text-foreground mb-6 uppercase tracking-tight">{t('contact_page.form_title')}</h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-900">
                <p className="text-sm font-medium">{t('contact_page.form_success')}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder={t('contact_page.name_placeholder')}
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-sm"
              />

              <input
                type="email"
                name="email"
                placeholder={t('contact_page.email_placeholder')}
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-sm"
              />

              <input
                type="text"
                name="subject"
                placeholder={t('contact_page.subject_placeholder')}
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-sm"
              />

              <textarea
                name="message"
                placeholder={t('contact_page.message_placeholder')}
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-sm resize-none"
              />

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-sm sm:text-base"
              >
                {t('contact_page.send_button')}
              </button>
            </form>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">{t('contact_page.faq_title')}</h2>

            <div className="space-y-4">
              <details className="bg-card rounded-lg border border-border p-4 sm:p-6 cursor-pointer group">
                <summary className="font-semibold text-foreground group-open:text-primary transition-colors">
                  {t('contact_page.faq_q1')}
                </summary>
                <p className="text-sm text-foreground mt-3 leading-relaxed">
                  {t('contact_page.faq_a1')}
                </p>
              </details>

              <details className="bg-card rounded-lg border border-border p-4 sm:p-6 cursor-pointer group">
                <summary className="font-semibold text-foreground group-open:text-primary transition-colors">
                  {t('contact_page.faq_q2')}
                </summary>
                <p className="text-sm text-foreground mt-3 leading-relaxed">
                  {t('contact_page.faq_a2')}
                </p>
              </details>

              <details className="bg-card rounded-lg border border-border p-4 sm:p-6 cursor-pointer group">
                <summary className="font-semibold text-foreground group-open:text-primary transition-colors">
                  {t('contact_page.faq_q3')}
                </summary>
                <p className="text-sm text-foreground mt-3 leading-relaxed">
                  {t('contact_page.faq_a3')}
                </p>
              </details>

              <details className="bg-card rounded-lg border border-border p-4 sm:p-6 cursor-pointer group">
                <summary className="font-semibold text-foreground group-open:text-primary transition-colors">
                  {t('contact_page.faq_q4')}
                </summary>
                <p className="text-sm text-foreground mt-3 leading-relaxed">
                  {t('contact_page.faq_a4')}
                </p>
              </details>

              <details className="bg-card rounded-lg border border-border p-4 sm:p-6 cursor-pointer group">
                <summary className="font-semibold text-foreground group-open:text-primary transition-colors">
                  {t('contact_page.faq_q5')}
                </summary>
                <p className="text-sm text-foreground mt-3 leading-relaxed">
                  {t('contact_page.faq_a5')}
                </p>
              </details>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 bg-primary text-primary-foreground rounded-lg border border-primary/20 p-6 sm:p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">{t('contact_page.ready_title')}</h2>
          <p className="mb-6 text-sm sm:text-base opacity-90">
            {t('contact_page.ready_subtitle')}
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
          >
            {t('contact_page.browse_button')}
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
