'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, Plus, LogOut, BookOpen, Layers, Search, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function AdminDashboard() {
    const router = useRouter();
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const supabase = createClientComponentClient();

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/login');
                return;
            }
            fetchBooks();
        };
        checkSession();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('books')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching books:', error);
        } else {
            setBooks(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this book?')) return;

        try {
            const { error } = await supabase
                .from('books')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setBooks(books.filter(book => book.id !== id));
            alert('Book deleted successfully');
        } catch (error: any) {
            console.error('Error deleting book:', error);
            alert('Error deleting book: ' + error.message);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    };

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'All' || book.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const uniqueCategories = ['All', ...Array.from(new Set(books.map(b => b.category)))];

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Simple Admin Header */}
            <div className="bg-[#1a4d2e] w-full h-16 sm:h-20 flex items-center justify-between px-4 sm:px-8 shadow-md">
                <Link href="/">
                    <div className="bg-white p-2 rounded">
                        <Image
                            src="/logo.png"
                            alt="EbookSamnorng Logo"
                            width={150}
                            height={40}
                            className="h-8 w-auto object-contain"
                            priority
                        />
                    </div>
                </Link>
                <div className="flex items-center gap-6">
                    <span className="text-white/70 text-sm hidden sm:block">Admin Session</span>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-white hover:text-red-300 transition-colors font-bold text-sm bg-white/10 px-4 py-2 rounded-lg"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
                        <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                            <BookOpen className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Books</p>
                            <h3 className="text-3xl font-black text-gray-900">{books.length}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
                        <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                            <Layers className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Categories</p>
                            <h3 className="text-3xl font-black text-gray-900">{uniqueCategories.length - 1}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between col-span-1 sm:col-span-2 lg:col-span-1">
                        <Link
                            href="/admin/add-book"
                            className="w-full flex items-center justify-center gap-2 bg-[#1a4d2e] text-white px-6 py-4 rounded-xl hover:bg-[#143d24] transition-all shadow-lg shadow-green-900/10 font-black text-lg"
                        >
                            <Plus className="w-6 h-6" />
                            Add New Book
                        </Link>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by title or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 bg-white shadow-sm font-medium"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
                        {uniqueCategories.slice(0, 5).map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilterCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${filterCategory === cat
                                    ? 'bg-[#1a4d2e] text-white shadow-md'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-green-500'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Books Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Product Info</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Main Category</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Subcategory</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Price</th>
                                    <th className="px-6 py-4 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 bg-white">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
                                                <p className="text-gray-400 font-bold">Loading your library...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredBooks.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center text-gray-400 font-bold italic">
                                            No books found matching your criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredBooks.map((book) => (
                                        <tr key={book.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-16 w-12 flex-shrink-0 relative rounded-lg overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
                                                        {book.image_url ? (
                                                            <img className="h-full w-full object-cover" src={book.image_url} alt="" />
                                                        ) : (
                                                            <div className="h-full w-full flex items-center justify-center text-[10px] text-gray-400 font-black">NO IMAGE</div>
                                                        )}
                                                    </div>
                                                    <div className="max-w-xs sm:max-w-md">
                                                        <div className="text-sm font-black text-gray-900 truncate">{book.title}</div>
                                                        <div className="text-[11px] text-gray-400 truncate mt-1 flex items-center gap-2">
                                                            ID: {book.id.substring(0, 8)}...
                                                            {book.file_url && <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-[9px] font-black uppercase">Has Link</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 text-[11px] font-black rounded-full bg-purple-50 text-purple-700 uppercase tracking-wider">
                                                    {book.main_category || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 text-[11px] font-black rounded-full bg-green-50 text-green-700 uppercase tracking-wider">
                                                    {book.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-black text-gray-900">${book.price}</div>
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link
                                                        href={`/product/${book.id}`}
                                                        target="_blank"
                                                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                                                        title="View Live"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/edit/${book.id}`}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 hover:bg-[#1a4d2e] hover:text-white rounded-lg transition-all font-black text-[11px] uppercase tracking-wider"
                                                        title="Edit Details"
                                                    >
                                                        <Pencil className="w-3.5 h-3.5" />
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(book.id)}
                                                        className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all ml-1"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
