'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer-bg text-white w-full">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 mb-12">
          <div className="space-y-4">
            <h3 className="font-bold text-lg">About Us</h3>
            <p className="text-sm opacity-70 leading-relaxed max-w-xs">
              EbookSamnorng is your premier destination for quality engineering e-books and resources for civil engineers and construction professionals.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="opacity-70 hover:opacity-100 transition-opacity">Home</Link></li>
              <li><Link href="/shop" className="opacity-70 hover:opacity-100 transition-opacity">Shop</Link></li>
              <li><Link href="/about" className="opacity-70 hover:opacity-100 transition-opacity">About</Link></li>
              <li><Link href="/contact" className="opacity-70 hover:opacity-100 transition-opacity">Contact</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/articles" className="opacity-70 hover:opacity-100 transition-opacity">Articles</Link></li>
              <li><a href="#" className="opacity-70 hover:opacity-100 transition-opacity">Payment Info</a></li>
              <li><a href="#" className="opacity-70 hover:opacity-100 transition-opacity">Returns</a></li>
              <li><a href="#" className="opacity-70 hover:opacity-100 transition-opacity">Privacy</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Contact</h3>
            <div className="space-y-3 text-sm opacity-70">
              <p>Email: Info@ebooksamnorng.com</p>
              <p>Phone: +1 (555) 000-0000</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-xs sm:text-sm opacity-60">
          <p>© 2024 EbookSamnorng. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
