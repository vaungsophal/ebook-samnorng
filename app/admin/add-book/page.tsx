'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { categoryStructure } from '@/lib/products';
import Link from 'next/link';
import { ArrowLeft, Save, Plus } from 'lucide-react';

export default function AddBookPage() {
    const router = useRouter();
    const supabase = createClientComponentClient();
    const [loading, setLoading] = useState(false);
    const [isAuthChecking, setIsAuthChecking] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/login');
            } else {
                setIsAuthChecking(false);
            }
        };
        checkSession();
    }, [supabase, router]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        mainCategory: categoryStructure[0].name,
        category: categoryStructure[0].subcategories[0],
        price: '',
        details: '',
        imageUrl: '',
        imageUrl2: '',
        imageUrl3: '',
        fileUrl: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error: insertError } = await supabase
                .from('books')
                .insert([
                    {
                        title: formData.title,
                        description: formData.description,
                        main_category: formData.mainCategory,
                        category: formData.category,
                        price: parseFloat(formData.price) || 0,
                        details: formData.details,
                        image_url: formData.imageUrl,
                        image_url2: formData.imageUrl2 || null,
                        image_url3: formData.imageUrl3 || null,
                        file_url: formData.fileUrl,
                        rating: 5,
                        reviews: 0,
                    },
                ]);

            if (insertError) throw insertError;

            alert('Book added successfully!');
            router.push('/admin');
        } catch (error: any) {
            console.error('Error adding book:', error);
            alert('Error adding book: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (isAuthChecking) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-[#1a4d2e]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Professional Header */}
            <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-lg font-bold text-gray-900">Add New Book</h1>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/admin" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                        Cancel
                    </Link>
                    <button
                        form="add-book-form"
                        type="submit"
                        disabled={loading}
                        className="bg-[#1a4d2e] text-white px-5 py-2 rounded shadow-sm font-semibold text-sm hover:bg-[#143d24] transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <div className="w-4 h-4 border-2 border-white/30 border-b-white animate-spin rounded-full" /> : <Save className="w-4 h-4" />}
                        Save Entry
                    </button>
                </div>
            </header>

            <main className="flex-1 max-w-4xl w-full mx-auto py-8 px-4 md:px-8">
                <form id="add-book-form" onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                            <Plus className="w-4 h-4 text-[#1a4d2e]" />
                            Book Information
                        </h2>
                    </div>

                    <div className="p-6 md:p-8 space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Book Title</label>
                            <input
                                type="text"
                                required
                                placeholder="Enter book title"
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-[#1a4d2e] focus:border-[#1a4d2e] outline-none transition-all text-sm"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Main Category */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Main Category</label>
                                <select
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-[#1a4d2e] focus:border-[#1a4d2e] outline-none transition-all text-sm appearance-none"
                                    value={formData.mainCategory}
                                    onChange={(e) => {
                                        const selectedMain = e.target.value;
                                        const selectedCategoryObj = categoryStructure.find(c => c.name === selectedMain);
                                        setFormData({
                                            ...formData,
                                            mainCategory: selectedMain,
                                            category: selectedCategoryObj?.subcategories[0] || ''
                                        });
                                    }}
                                >
                                    {categoryStructure.map((cat) => (
                                        <option key={cat.name} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Subcategory */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Subcategory</label>
                                <select
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-[#1a4d2e] focus:border-[#1a4d2e] outline-none transition-all text-sm appearance-none"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {categoryStructure
                                        .find(c => c.name === formData.mainCategory)
                                        ?.subcategories.map((sub) => (
                                            <option key={sub} value={sub}>{sub}</option>
                                        ))}
                                </select>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Price ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    placeholder="0.00"
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-[#1a4d2e] focus:border-[#1a4d2e] outline-none transition-all text-sm"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Images Section */}
                        <div className="pt-4 border-t border-gray-100">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Book Images (Up to 3)</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-3">
                                    <input
                                        type="url"
                                        required
                                        placeholder="Cover Image URL"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-[#1a4d2e] focus:border-[#1a4d2e] outline-none transition-all text-sm"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    />
                                    <div className="aspect-[3/4] rounded border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50">
                                        {formData.imageUrl ? (
                                            <img src={formData.imageUrl} alt="Preview 1" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Main Cover</span>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <input
                                        type="url"
                                        placeholder="Second Image URL (Optional)"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-[#1a4d2e] focus:border-[#1a4d2e] outline-none transition-all text-sm"
                                        value={formData.imageUrl2}
                                        onChange={(e) => setFormData({ ...formData, imageUrl2: e.target.value })}
                                    />
                                    <div className="aspect-[3/4] rounded border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50">
                                        {formData.imageUrl2 ? (
                                            <img src={formData.imageUrl2} alt="Preview 2" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Image 2</span>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <input
                                        type="url"
                                        placeholder="Third Image URL (Optional)"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-[#1a4d2e] focus:border-[#1a4d2e] outline-none transition-all text-sm"
                                        value={formData.imageUrl3}
                                        onChange={(e) => setFormData({ ...formData, imageUrl3: e.target.value })}
                                    />
                                    <div className="aspect-[3/4] rounded border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50">
                                        {formData.imageUrl3 ? (
                                            <img src={formData.imageUrl3} alt="Preview 3" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Image 3</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Digital File */}
                        <div className="pt-4 border-t border-gray-100">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Digital File Link</label>
                            <input
                                type="url"
                                required
                                placeholder="https://drive.google.com/..."
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-[#1a4d2e] focus:border-[#1a4d2e] outline-none transition-all text-sm"
                                value={formData.fileUrl}
                                onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Short Description</label>
                            <textarea
                                rows={2}
                                required
                                placeholder="Enter a brief summary"
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-[#1a4d2e] focus:border-[#1a4d2e] outline-none transition-all text-sm resize-none"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        {/* Full Details */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Full Details & Table of Contents</label>
                            <textarea
                                rows={6}
                                required
                                placeholder="Enter full book details"
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-[#1a4d2e] focus:border-[#1a4d2e] outline-none transition-all text-sm resize-none"
                                value={formData.details}
                                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                            />
                        </div>
                    </div>
                </form>
            </main>

            <footer className="py-6 px-8 text-center">
                <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} EbookSamnorng Administration Panel.</p>
            </footer>
        </div>
    );
}
