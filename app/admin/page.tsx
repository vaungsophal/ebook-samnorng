'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, Plus, LogOut, BookOpen, Layers, Search, ExternalLink, ChevronRight, Eye, EyeOff, Copy, Check } from 'lucide-react';
import Image from 'next/image';

export default function AdminDashboard() {
    const router = useRouter();
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState<'title' | 'id'>('title');
    const [filterCategory, setFilterCategory] = useState('All');
    const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
    const [copiedId, setCopiedId] = useState<string | null>(null);
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
        const query = searchQuery.toLowerCase();
        let matchesSearch = true;

        if (query) {
            if (searchType === 'title') {
                matchesSearch = book.title?.toLowerCase().includes(query);
            } else {
                matchesSearch = book.id?.toString().includes(query);
            }
        }

        const matchesCategory = filterCategory === 'All' || book.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const uniqueCategories = ['All', ...Array.from(new Set(books.map(b => b.category).filter(Boolean)))];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Professional Header */}
            <header className="bg-[#1a4d2e] text-white shadow-sm h-16 flex items-center justify-between px-6 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-white p-1.5 rounded">
                            <Image src="/logo.png" alt="Logo" width={100} height={28} className="h-6 w-auto object-contain" />
                        </div>
                        <span className="text-lg font-semibold tracking-tight hidden sm:inline-block ml-2 border-l border-white/20 pl-4">Admin Console</span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-xs text-white/60 hidden md:block">
                        Signed in as <span className="text-white font-medium">Administrator</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </header>

            <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
                {/* Page Title & Add Button */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                        <p className="text-sm text-gray-500">Manage your ebook collection and categories</p>
                    </div>
                    <Link
                        href="/admin/add-book"
                        className="inline-flex items-center justify-center gap-2 bg-[#1a4d2e] text-white px-4 py-2.5 rounded shadow-sm hover:bg-[#143d24] transition-colors font-semibold"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Book
                    </Link>
                </div>

                {/* Statistics Simplified */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-5 rounded border border-gray-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-50 text-green-700 flex items-center justify-center rounded">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Books</span>
                            <div className="text-3xl font-bold text-gray-900">{books.length}</div>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded border border-gray-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-700 flex items-center justify-center rounded">
                            <Layers className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Categories</span>
                            <div className="text-3xl font-bold text-gray-900">{uniqueCategories.length - 1}</div>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded border border-gray-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-50 text-amber-700 flex items-center justify-center rounded">
                            <ExternalLink className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Live Site</span>
                            <Link href="/" target="_blank" className="text-sm font-semibold text-[#1a4d2e] flex items-center gap-1 hover:underline mt-1">
                                View Storefront <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Filters Row */}
                <div className="bg-white p-5 border border-gray-200 rounded shadow-sm mb-6 flex flex-col xl:flex-row gap-5">
                    {/* Search Section */}
                    <div className="flex-1 flex flex-col sm:flex-row gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-gray-400 uppercase whitespace-nowrap">Search By:</span>
                            <select
                                value={searchType}
                                onChange={(e) => setSearchType(e.target.value as 'title' | 'id')}
                                className="bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#1a4d2e] font-medium"
                            >
                                <option value="title">Book Title</option>
                                <option value="id">Book ID</option>
                            </select>
                        </div>
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder={searchType === 'title' ? "Search by title..." : "Search by 5-digit ID..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#1a4d2e] transition-all"
                            />
                        </div>
                    </div>

                    {/* Filter Section */}
                    <div className="flex items-center gap-3 border-t xl:border-t-0 xl:border-l border-gray-100 pt-5 xl:pt-0 xl:pl-5">
                        <span className="text-xs font-semibold text-gray-400 uppercase whitespace-nowrap">Show Category:</span>
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="bg-gray-50 border border-gray-200 rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#1a4d2e] min-w-[200px] font-medium"
                        >
                            {uniqueCategories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat === 'All' ? 'All Categories' : cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">Zip Code</th>
                                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center">
                                            <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-[#1a4d2e]"></div>
                                            <span className="ml-3 text-sm text-gray-500">Loading books...</span>
                                        </td>
                                    </tr>
                                ) : filteredBooks.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">
                                            No books found matching your current filters.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredBooks.map((book) => (
                                        <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-10 flex-shrink-0 bg-gray-100 border border-gray-200 rounded overflow-hidden">
                                                        {book.image_url ? (
                                                            <img src={book.image_url} alt="" className="h-full w-full object-cover" />
                                                        ) : (
                                                            <div className="h-full w-full flex items-center justify-center text-[8px] text-gray-400 font-bold uppercase">No Image</div>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="text-sm font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-xs">{book.title}</div>
                                                        <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                                                            ID: {book.id}
                                                            {book.file_url && <span className="bg-blue-100 text-blue-700 px-1 py-0.5 rounded-[2px] text-[9px] font-bold uppercase tracking-tight">Digital Link</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-semibold text-gray-700 uppercase tracking-tight">{book.main_category || 'N/A'}</span>
                                                    <span className="text-[10px] text-gray-500 uppercase">{book.category}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-bold text-gray-900">${book.price}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="relative group flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-2 py-1.5 rounded min-w-[120px]">
                                                        <code className={`text-xs font-black ${visiblePasswords[book.id] ? 'text-[#b22222]' : 'text-gray-300'}`}>
                                                            {visiblePasswords[book.id] ? (book.unzip_password || '---') : '••••••••'}
                                                        </code>

                                                        <div className="flex items-center gap-1 ml-auto">
                                                            <button
                                                                onClick={() => setVisiblePasswords(prev => ({ ...prev, [book.id]: !prev[book.id] }))}
                                                                className="p-1 hover:bg-gray-200 rounded text-gray-500 transition-colors"
                                                                title={visiblePasswords[book.id] ? "Hide" : "Show"}
                                                            >
                                                                {visiblePasswords[book.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                                            </button>

                                                            <button
                                                                onClick={() => {
                                                                    if (book.unzip_password) {
                                                                        navigator.clipboard.writeText(book.unzip_password);
                                                                        setCopiedId(book.id);
                                                                        setTimeout(() => setCopiedId(null), 2000);
                                                                    }
                                                                }}
                                                                className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-[#1a4d2e] transition-colors"
                                                                title="Copy Password"
                                                                disabled={!book.unzip_password}
                                                            >
                                                                {copiedId === book.id ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/admin/edit/${book.id}`}
                                                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded border border-transparent hover:border-blue-100 transition-all"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(book.id)}
                                                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded border border-transparent hover:border-red-100 transition-all"
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
            </main>

            <footer className="py-6 px-8 border-t border-gray-200 bg-white text-center">
                <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} EbookSomnorng Administration Panel. All rights reserved.</p>
            </footer>
        </div>
    );
}
