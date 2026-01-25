'use client';

import { useState, useEffect, use } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { categories } from '@/lib/products';
import Link from 'next/link';
import { ArrowLeft, Save, X, Image as ImageIcon, Link as LinkIcon, DollarSign, Tag, FileText, Info, Eye } from 'lucide-react';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function EditBookPage({ params }: PageProps) {
    const { id } = use(params);
    const router = useRouter();
    const supabase = createClientComponentClient();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: categories[1],
        price: '',
        details: '',
        imageUrl: '',
        fileUrl: '',
    });

    useEffect(() => {
        const checkSessionAndFetch = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/login');
                return;
            }
            if (id) {
                fetchBook();
            }
        };
        checkSessionAndFetch();
    }, [id, supabase, router]);

    const fetchBook = async () => {
        try {
            const { data, error } = await supabase
                .from('books')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;

            if (data) {
                setFormData({
                    title: data.title || '',
                    description: data.description || '',
                    category: data.category || categories[1],
                    price: data.price ? data.price.toString() : '',
                    details: data.details || '',
                    imageUrl: data.image_url || '',
                    fileUrl: data.file_url || '',
                });
            }
        } catch (error) {
            console.error('Error fetching book:', error);
            alert('Error fetching book details');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const { error: updateError } = await supabase
                .from('books')
                .update({
                    title: formData.title,
                    description: formData.description,
                    category: formData.category,
                    price: parseFloat(formData.price) || 0,
                    details: formData.details,
                    image_url: formData.imageUrl,
                    file_url: formData.fileUrl,
                })
                .eq('id', id);

            if (updateError) throw updateError;

            alert('Book updated successfully!');
            router.push('/admin');
        } catch (error: any) {
            console.error('Error updating book:', error);
            alert('Error updating book: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a4d2e]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
            {/* Sticky Admin Header */}
            <div className="bg-white border-b border-gray-200 h-16 sm:h-20 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-[100] shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-lg font-black text-gray-900 uppercase tracking-tight leading-none">Modify Record</h1>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">ID: {id.substring(0, 12)}...</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin"
                        className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors uppercase tracking-widest"
                    >
                        Cancel
                    </Link>
                    <button
                        form="edit-book-form"
                        type="submit"
                        disabled={saving}
                        className="bg-[#1a4d2e] text-white px-6 py-2.5 rounded-lg font-black text-sm uppercase tracking-widest shadow-lg shadow-green-900/20 hover:bg-[#143d24] transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        {saving ? <div className="w-4 h-4 border-2 border-white/30 border-b-white animate-spin rounded-full" /> : <Save className="w-4 h-4" />}
                        Apply Changes
                    </button>
                </div>
            </div>

            <div className="flex-1 lg:flex overflow-hidden">
                {/* Scrollable Form Column */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 scrollbar-hide">
                    <form id="edit-book-form" onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-12">

                        {/* Section 1: Identity */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                                    <Info className="w-5 h-5" />
                                </div>
                                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Metadata & Identity</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Book Title</label>
                                    <div className="relative group">
                                        <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-600 transition-colors" />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Ex: Structural Analysis 101"
                                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/5 focus:border-green-600 outline-none transition-all font-bold text-gray-800 placeholder:text-gray-300 shadow-sm"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Category</label>
                                        <div className="relative group">
                                            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-600 transition-colors" />
                                            <select
                                                className="w-full pl-12 pr-10 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/5 focus:border-green-600 outline-none transition-all font-black text-[13px] text-gray-800 appearance-none shadow-sm uppercase tracking-wide"
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            >
                                                {categories.map((cat) => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Price ($)</label>
                                        <div className="relative group">
                                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-600 transition-colors" />
                                            <input
                                                type="number"
                                                step="0.01"
                                                required
                                                placeholder="0.00"
                                                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/5 focus:border-green-600 outline-none transition-all font-bold text-gray-800 shadow-sm"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Assets */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                                    <ImageIcon className="w-5 h-5" />
                                </div>
                                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Assets & Connectivity</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Cover Image URL</label>
                                    <div className="relative group">
                                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-600 transition-colors" />
                                        <input
                                            type="url"
                                            required
                                            placeholder="https://..."
                                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/5 focus:border-green-600 outline-none transition-all font-medium text-gray-800 shadow-sm"
                                            value={formData.imageUrl}
                                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Digital File Link (Google Drive)</label>
                                    <div className="relative group">
                                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-600 transition-colors" />
                                        <input
                                            type="url"
                                            required
                                            placeholder="https://drive.google.com/..."
                                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/5 focus:border-green-600 outline-none transition-all font-medium text-gray-800 shadow-sm"
                                            value={formData.fileUrl}
                                            onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Content */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Content & Marketing</h3>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Tagline / Short Description</label>
                                    <textarea
                                        rows={2}
                                        required
                                        placeholder="A punchy 1-sentence summary..."
                                        className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/5 focus:border-green-600 outline-none transition-all font-medium text-gray-800 shadow-sm resize-none"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Full Details & Index</label>
                                    <textarea
                                        rows={6}
                                        required
                                        placeholder="Detailed overview, table of contents, etc..."
                                        className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/5 focus:border-green-600 outline-none transition-all font-medium text-gray-800 shadow-sm resize-none"
                                        value={formData.details}
                                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Preview Column (Sticky/Fixed) */}
                <div className="hidden lg:block w-[450px] bg-white border-l border-gray-100 p-12 overflow-y-auto shadow-2xl shadow-black/5">
                    <div className="sticky top-0 space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                <Eye className="w-4 h-4 text-green-600" />
                                Live Preview
                            </h3>
                            <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded">Desktop Card</span>
                        </div>

                        {/* Card Preview Mockup */}
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden group transition-all duration-500 max-w-[320px] mx-auto">
                            <div className="aspect-[3/4] relative bg-gray-100">
                                {formData.imageUrl ? (
                                    <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-300">
                                        <ImageIcon className="w-12 h-12 mb-2" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Image Preview</span>
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-[#1a4d2e] text-white px-2 py-1 text-[10px] font-black tracking-widest rounded-sm">EDITING</div>
                            </div>
                            <div className="p-6 text-center space-y-4">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none truncate">
                                    {formData.category || 'CATEGORY'}
                                </p>
                                <h3 className="font-black text-lg text-gray-900 leading-tight line-clamp-2 min-h-[3rem]">
                                    {formData.title || 'Product Title Appears Here'}
                                </h3>
                                <div className="flex items-center justify-center gap-0.5 text-yellow-400">
                                    {[...Array(5)].map((_, i) => <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>)}
                                </div>
                                <div className="text-2xl font-black text-gray-900 border-t border-gray-50 pt-4">
                                    ${formData.price || '0.00'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
