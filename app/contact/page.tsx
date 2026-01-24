'use client';

import React from "react"

import { Header } from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
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

      <div className="flex-1 max-w-6xl mx-auto px-2 sm:px-4 py-6 sm:py-12 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-foreground font-semibold">CONTACT</span>
        </div>

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Contact Us
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12">
          We&apos;d love to hear from you. Let us know how we can help!
        </p>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Contact Info Cards */}
          <div className="bg-card rounded-lg border border-border p-6 sm:p-8 text-center">
            <div className="flex justify-center mb-4">
              <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            </div>
            <h3 className="font-bold text-lg text-foreground mb-2">Email</h3>
            <p className="text-sm text-foreground break-all">
              <a href="mailto:info@ebooksamnorng.com" className="hover:text-primary transition-colors">
                info@ebooksamnorng.com
              </a>
            </p>
            <p className="text-xs text-muted-foreground mt-2">We reply within 24 hours</p>
          </div>

          <div className="bg-card rounded-lg border border-border p-6 sm:p-8 text-center">
            <div className="flex justify-center mb-4">
              <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            </div>
            <h3 className="font-bold text-lg text-foreground mb-2">Phone</h3>
            <p className="text-sm text-foreground">
              <a href="tel:+15550000000" className="hover:text-primary transition-colors">
                +1 (555) 000-0000
              </a>
            </p>
            <p className="text-xs text-muted-foreground mt-2">Mon-Fri, 9AM-5PM EST</p>
          </div>

          <div className="bg-card rounded-lg border border-border p-6 sm:p-8 text-center">
            <div className="flex justify-center mb-4">
              <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            </div>
            <h3 className="font-bold text-lg text-foreground mb-2">Address</h3>
            <p className="text-sm text-foreground">
              123 Engineering Street<br />
              New York, NY 10001<br />
              United States
            </p>
          </div>
        </div>

        {/* Contact Form & FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <div className="bg-card rounded-lg border border-border p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Send us a Message</h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-900">
                <p className="text-sm font-medium">Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-sm"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-sm"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-sm"
              />

              <textarea
                name="message"
                placeholder="Your Message"
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
                Send Message
              </button>
            </form>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <details className="bg-card rounded-lg border border-border p-4 sm:p-6 cursor-pointer group">
                <summary className="font-semibold text-foreground group-open:text-primary transition-colors">
                  How do I download my e-books?
                </summary>
                <p className="text-sm text-foreground mt-3 leading-relaxed">
                  After purchase, you can download your e-books directly from your account dashboard. You&apos;ll have lifetime access to all your purchases.
                </p>
              </details>

              <details className="bg-card rounded-lg border border-border p-4 sm:p-6 cursor-pointer group">
                <summary className="font-semibold text-foreground group-open:text-primary transition-colors">
                  What payment methods do you accept?
                </summary>
                <p className="text-sm text-foreground mt-3 leading-relaxed">
                  We accept bank transfers, credit cards, debit cards, and digital wallets. All payments are processed securely.
                </p>
              </details>

              <details className="bg-card rounded-lg border border-border p-4 sm:p-6 cursor-pointer group">
                <summary className="font-semibold text-foreground group-open:text-primary transition-colors">
                  Can I get a refund?
                </summary>
                <p className="text-sm text-foreground mt-3 leading-relaxed">
                  Yes, we offer a 14-day money-back guarantee on all e-book purchases if you&apos;re not satisfied with the content.
                </p>
              </details>

              <details className="bg-card rounded-lg border border-border p-4 sm:p-6 cursor-pointer group">
                <summary className="font-semibold text-foreground group-open:text-primary transition-colors">
                  Are the books available on mobile?
                </summary>
                <p className="text-sm text-foreground mt-3 leading-relaxed">
                  Our e-books are compatible with all devices including smartphones, tablets, and computers. Simply use your preferred PDF reader.
                </p>
              </details>

              <details className="bg-card rounded-lg border border-border p-4 sm:p-6 cursor-pointer group">
                <summary className="font-semibold text-foreground group-open:text-primary transition-colors">
                  How often do you add new books?
                </summary>
                <p className="text-sm text-foreground mt-3 leading-relaxed">
                  We add new titles to our collection weekly. Subscribe to our newsletter to be notified about new releases.
                </p>
              </details>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 bg-primary text-primary-foreground rounded-lg border border-primary/20 p-6 sm:p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Explore?</h2>
          <p className="mb-6 text-sm sm:text-base opacity-90">
            Browse our collection of engineering e-books and start learning today
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
          >
            Browse E-Books
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
