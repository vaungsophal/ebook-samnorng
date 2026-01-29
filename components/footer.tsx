'use client';

import Link from 'next/link';
import { Facebook, Send } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="footer-bg text-white w-full py-8 md:py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-12">

        {/* ABOUT US */}
        <div className="space-y-4">
          <h3 className={`font-bold tracking-widest uppercase relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[1px] after:bg-white/30 ${language === 'km' ? 'text-lg' : 'text-base'}`}>
            {t('common.footer.about_title')}
          </h3>
          <div className="space-y-4 text-[13px] sm:text-[14px] leading-relaxed opacity-90">
            <p>{t('common.footer.about_p1')}</p>
            <p>{t('common.footer.about_p2')}</p>
            <p>{t('common.footer.about_p3')}</p>
          </div>
        </div>

        {/* CUSTOMER SUPPORT */}
        <div className="space-y-4">
          <h3 className={`font-bold tracking-widest uppercase relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[1px] after:bg-white/30 ${language === 'km' ? 'text-lg' : 'text-base'}`}>
            {t('common.footer.support_title')}
          </h3>
          <ul className="space-y-4 text-[13px] sm:text-[14px] opacity-90">
            <li>
              <Link href="/payment-instruction" className="hover:text-yellow-400 transition-colors block">
                {t('common.footer.payment_instr')}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-yellow-400 transition-colors block">
                {t('common.footer.listing_instr')}
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT INFORMATION */}
        <div className="space-y-4">
          <h3 className={`font-bold tracking-widest uppercase relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[1px] after:bg-white/30 ${language === 'km' ? 'text-lg' : 'text-base'}`}>
            {t('common.footer.contact_title')}
          </h3>
          <div className="space-y-4 text-[13px] sm:text-[14px] leading-relaxed opacity-90">
            <div>
              <p className="font-semibold">{t('common.footer.phone_label')}</p>
              <p>087330027</p>
            </div>
            <div>
              <p className="font-semibold">{t('common.footer.email_label')}</p>
              <p>ebooksomnorng@gmail.com</p>
            </div>
            <div className="pt-2 flex gap-4">
              <a
                href="https://www.facebook.com/groups/1157562836264568/?ref=share&mibextid=NSMWBT"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-[#3b5998] text-white rounded-full hover:bg-white hover:text-[#3b5998] transition-all transform hover:scale-110 shadow-lg"
                title="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/SORIYA_VAUNG" // Updated telegram link
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-[#0088cc] text-white rounded-full hover:bg-white hover:text-[#0088cc] transition-all transform hover:scale-110 shadow-lg"
                title="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-8 pt-6 md:mt-16 md:pt-10 text-center">
        <p className="text-[14px] opacity-70 uppercase tracking-widest font-black">
          {t('common.footer.copyright')}
        </p>
      </div>
    </footer>
  );
}
