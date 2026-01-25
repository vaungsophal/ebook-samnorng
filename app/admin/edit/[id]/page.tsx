'use client';

import { useState, useEffect, use } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { categories } from '@/lib/products';
import Link from 'next/link';
import Image from 'next/image';

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
        if (id) {
            fetchBook();
        }
    }, [id]);

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
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <div className="bg-[#e9e9cc] w-full border-b border-gray-200 h-16 sm:h-20 flex items-center justify-center shadow-sm sticky top-0 z-50">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="EbookSamnorng Logo"
                            width={300}
                            height={75}
                            className="h-10 w-auto sm:h-12 object-contain"
                            priority
                        />
                    </Link>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Simple Admin Header */}
            <div className="bg-white border-b border-gray-200 h-16 sm:h-20 flex items-center justify-center shadow-sm sticky top-0 z-50">
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="EbookSamnorng Logo"
                        width={300}
                        height={75}
                        className="h-10 w-auto sm:h-12 object-contain"
                        priority
                    />
                </Link>
            </div>

            <div className="flex-1 max-w-4xl mx-auto w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <Link href="/admin" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors">
                            &larr; Back to Dashboard
                        </Link>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2 tracking-tight">Edit Book</h1>
                        <p className="mt-1 text-sm text-gray-500">Update the book's information.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="p-6 sm:p-10 space-y-8">

                        {/* Section: Basic Info */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Book Title</label>
                                    <input
                                        type="text"
                                        required
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-4 bg-gray-50 hover:bg-white transition-colors"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                                        <div className="relative">
                                            <select
                                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-4 bg-gray-50 hover:bg-white transition-colors appearance-none"
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            >
                                                {categories.map((cat) => (
                                                    <option key={cat} value={cat}>
                                                        {cat}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                                <span className="text-gray-500 sm:text-sm">$</span>
                                            </div>
                                            <input
                                                type="number"
                                                step="0.01"
                                                required
                                                className="block w-full rounded-lg border-gray-300 pl-7 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 bg-gray-50 hover:bg-white transition-colors"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description</label>
                                    <input
                                        type="text"
                                        required
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-4 bg-gray-50 hover:bg-white transition-colors"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                    <p className="mt-1 text-xs text-gray-500">This appears on the product card and top of detail page.</p>
                                </div>
                            </div>
                        </div>

                        {/* Section: Assets */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Digital Assets</h3>
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image URL</label>
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-1">
                                            <input
                                                type="url"
                                                required
                                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-4 bg-gray-50 hover:bg-white transition-colors"
                                                value={formData.imageUrl}
                                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                            />
                                        </div>
                                        {formData.imageUrl && (
                                            <div className="hidden sm:block h-20 w-14 flex-shrink-0 border border-gray-200 rounded overflow-hidden bg-gray-100">
                                                <img src={formData.imageUrl} alt="Pre" className="h-full w-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Book File URL (PDF/EPUB/ZIP)</label>
                                    <input
                                        type="url"
                                        required
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-4 bg-gray-50 hover:bg-white transition-colors"
                                        value={formData.fileUrl}
                                        onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Direct download link for the customer.</p>
                                </div>
                            </div>
                        </div>

                        {/* Section: Detailed Content */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Detailed Content</h3>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Details</label>
                                <textarea
                                    rows={8}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-4 bg-gray-50 hover:bg-white transition-colors"
                                    value={formData.details}
                                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="bg-gray-50 px-6 py-4 sm:px-10 flex items-center justify-end border-t border-gray-100 gap-4">
                        <Link
                            href="/admin"
                            className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex justify-center px-8 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                        >
                            {saving ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </span>
                            ) : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
