'use client';

import Link from 'next/link';

import { Header } from '@/components/header';
import Footer from '@/components/footer';
import {
    ArrowRight,
    CheckCircle2,
    Send,
    Lock,
    ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function PaymentInstructionPage() {
    const { t } = useLanguage();

    const steps = [
        {
            title: t('payment_instruction.steps.step1.title'),
            subtitle: t('payment_instruction.steps.step1.subtitle'),
            description: t('payment_instruction.steps.step1.description'),
            imageUrl: "/browsing_ebooks_1769275211119.png",
            alt: t('payment_instruction.steps.step1.alt')
        },
        {
            title: t('payment_instruction.steps.step2.title'),
            subtitle: t('payment_instruction.steps.step2.subtitle'),
            description: t('payment_instruction.steps.step2.description'),
            imageUrl: "/shopping_cart_action_1769275228017.png",
            alt: t('payment_instruction.steps.step2.alt')
        },
        {
            title: t('payment_instruction.steps.step3.title'),
            subtitle: t('payment_instruction.steps.step3.subtitle'),
            description: t('payment_instruction.steps.step3.description'),
            imageUrl: "https://images.unsplash.com/photo-1556742044-3c52d6e88c02?q=80&w=2070&auto=format&fit=crop",
            alt: t('payment_instruction.steps.step3.alt')
        },
        {
            title: t('payment_instruction.steps.step4.title'),
            subtitle: t('payment_instruction.steps.step4.subtitle'),
            description: t('payment_instruction.steps.step4.description'),
            imageUrl: "https://images.unsplash.com/photo-1520923179289-6abc3bc8570c?q=80&w=1974&auto=format&fit=crop",
            alt: t('payment_instruction.steps.step4.alt')
        }
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col selection:bg-red-100">
            <Header />

            {/* Breadcrumb Section */}
            <div className="bg-[#f5f5f5] py-3 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <nav className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase">
                        <Link href="/" className="text-gray-500 hover:text-[#064884] transition-colors">{t('payment_instruction.breadcrumb_home')}</Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-[#064884]">{t('payment_instruction.breadcrumb_title')}</span>
                    </nav>
                </div>
            </div>

            <main className="flex-1">
                {/* Clean Header Section */}
                <section className="relative py-12 md:py-16 bg-[#064884] overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="max-w-5xl mx-auto px-4 relative z-10 text-center uppercase tracking-tight">
                        <h1 className="text-xl md:text-2xl font-bold text-white mb-2" dangerouslySetInnerHTML={{ __html: t('payment_instruction.header_title') }}>
                        </h1>
                        <p className="text-blue-100 text-[11px] md:text-xs font-semibold opacity-80 uppercase tracking-widest">
                            {t('payment_instruction.header_subtitle')}
                        </p>
                    </div>
                </section>

                {/* Step Sections */}
                <section className="py-16 md:py-24">
                    <div className="max-w-6xl mx-auto px-4 space-y-24 md:space-y-32">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-20`}
                            >
                                {/* Image Side */}
                                <div className="w-full lg:w-1/2 relative">
                                    <div className="relative aspect-video overflow-hidden rounded shadow-xl border border-gray-100">
                                        <img
                                            src={step.imageUrl}
                                            alt={step.alt}
                                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 w-12 h-12 md:w-16 md:h-16 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-lg md:text-2xl text-[#064884] shadow-lg z-20 border-4 border-white">
                                        {index + 1}
                                    </div>
                                </div>

                                {/* Text Side */}
                                <div className="w-full lg:w-1/2 space-y-3">
                                    <div className="inline-block px-2.5 py-1 bg-red-50 text-red-600 rounded text-[9px] font-bold uppercase tracking-[0.2em]">
                                        Phase 0{index + 1}
                                    </div>
                                    <h2 className="text-lg md:text-xl font-bold text-[#111] uppercase tracking-tight">
                                        {step.title}
                                    </h2>
                                    <h4 className="text-[11px] md:text-xs text-[#064884] font-bold uppercase tracking-[0.15em] opacity-80">
                                        {step.subtitle}
                                    </h4>
                                    <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                                        {step.description}
                                    </p>
                                    <div className="pt-2 flex items-center gap-2 text-[#064884] font-bold text-[10px] group cursor-pointer hover:gap-3 transition-all uppercase tracking-widest">
                                        <span>{t('payment_instruction.details_button')}</span>
                                        <ChevronRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Fulfillment Summary */}
                <section className="bg-gray-50 py-16 mb-20 border-y border-gray-100">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="bg-white rounded-xl p-8 md:p-10 shadow-sm border border-gray-100">
                            <div className="flex flex-col md:flex-row gap-10 items-center">
                                <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-[#064884] rounded shadow-md flex items-center justify-center">
                                    <Send className="w-10 h-10 md:w-14 md:h-14 text-white" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-lg md:text-xl font-bold text-[#111] uppercase tracking-tight" dangerouslySetInnerHTML={{ __html: t('payment_instruction.delivery_title') }}>
                                    </h3>
                                    <p className="text-gray-600 text-[13px] leading-relaxed" dangerouslySetInnerHTML={{ __html: t('payment_instruction.delivery_description') }}>
                                    </p>
                                    <div className="flex flex-wrap gap-4 pt-2">
                                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> {t('payment_instruction.secure_drive')}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                            <Lock className="w-3.5 h-3.5 text-green-500" /> {t('payment_instruction.encrypted_rar')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
