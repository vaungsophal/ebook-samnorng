'use client';

import { Header } from '@/components/header';
import Footer from '@/components/footer';
import { BookOpen, Shield, Users, Trophy, Target, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
            <Header />

            <main className="flex-1 w-full">
                {/* Hero Section */}
                <section className="bg-[#1a4d2e] text-white py-20 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase">About BookXaydung.com</h1>
                        <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed font-medium">
                            Your Premier Destination for Civil Engineering Excellence and Professional Construction Knowledge.
                        </p>
                    </div>
                </section>

                {/* Story Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#f8f9fa]">
                                <img
                                    src="https://images.unsplash.com/photo-1503387762-592dea58ef23?q=80&w=2000"
                                    alt="Modern Architecture"
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a4d2e]/60 to-transparent"></div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-[#1a4d2e] mb-2 uppercase tracking-tight">Our Mission</h2>
                                    <div className="w-20 h-1.5 bg-[#ff4d4d] rounded-full"></div>
                                </div>

                                <p className="text-gray-600 text-lg leading-relaxed">
                                    BookXaydung.com was founded with a single goal: to bridge the gap between academic knowledge and practical field expertise in the construction industry. We provide engineers, architects, and students with high-quality, verified documentation that drives innovation and safety in every project.
                                </p>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-4 bg-[#f8f9fa] rounded-xl border-l-4 border-[#ff4d4d]">
                                        <div className="text-2xl font-black text-[#1a4d2e] mb-1">500+</div>
                                        <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">Premium E-Books</div>
                                    </div>
                                    <div className="p-4 bg-[#f8f9fa] rounded-xl border-l-4 border-[#1a4d2e]">
                                        <div className="text-2xl font-black text-[#1a4d2e] mb-1">50K+</div>
                                        <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">Global Members</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-24 bg-[#f8f9fa]">
                    <div className="max-w-7xl mx-auto px-4 text-center mb-16">
                        <h2 className="text-3xl font-black text-[#1a4d2e] uppercase tracking-tight mb-4">Why Professionals Trust Us</h2>
                        <p className="text-gray-500 max-w-xl mx-auto">We don't just sell books; we provide the foundation for your professional growth.</p>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Award className="w-8 h-8 text-[#ff4d4d]" />,
                                title: "Curated Excellence",
                                desc: "Every resource is hand-picked and reviewed by industry veterans to ensure technical accuracy and relevance."
                            },
                            {
                                icon: <Shield className="w-8 h-8 text-[#1a4d2e]" />,
                                title: "Secure & Instant",
                                desc: "Get immediate access to your documents through our secure platform. No waiting, no delays."
                            },
                            {
                                icon: <Users className="w-8 h-8 text-[#ff4d4d]" />,
                                title: "Expert community",
                                desc: "Join a network of thousands of construction professionals sharing insights and expanding knowledge."
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all group border border-gray-100">
                                <div className="w-16 h-16 bg-[#f8f9fa] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[#1a4d2e] mb-4 uppercase tracking-tight">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="flex gap-6">
                                <Target className="w-12 h-12 text-[#ff4d4d] flex-shrink-0" />
                                <div>
                                    <h4 className="text-lg font-bold text-[#1a4d2e] mb-2 uppercase tracking-tight">Focus on Quality</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">We prioritize depth and accuracy over quantity, ensuring every page provides value.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <Trophy className="w-12 h-12 text-[#1a4d2e] flex-shrink-0" />
                                <div>
                                    <h4 className="text-lg font-bold text-[#1a4d2e] mb-2 uppercase tracking-tight">Industry Leading</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">Stay ahead of the curve with documents that reflect the latest standards and technologies.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Join Us CTA */}
                <section className="py-20">
                    <div className="max-w-5xl mx-auto px-4">
                        <div className="bg-[#1a4d2e] rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff4d4d]/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                            <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">Ready to Build Your Library?</h2>
                            <p className="text-lg opacity-80 mb-10 max-w-xl mx-auto">Access thousands of professional documents and start your journey toward construction mastery today.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/shop" className="bg-[#ff4d4d] hover:bg-[#ff3333] text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg active:scale-95">
                                    Browse Catalog
                                </Link>
                                <Link href="/contact" className="bg-white/10 hover:bg-white/20 border border-white/20 px-10 py-4 rounded-full font-bold transition-all backdrop-blur-sm">
                                    Contact Support
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
