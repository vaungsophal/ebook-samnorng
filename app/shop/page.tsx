'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { ProductCard } from '@/components/product-card';
import { ChevronDown, Search } from 'lucide-react';
import { products, categories as allCategories } from '@/lib/products';
import Footer from '@/components/footer';
import Link from 'next/link';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (categoryParam && allCategories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All Categories');
    }
  }, [categoryParam]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setIsMobileFilterOpen(false);
    if (category === 'All Categories') {
      router.push('/shop');
    } else {
      router.push(`/shop?category=${encodeURIComponent(category)}`);
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    let sorted = [...filtered];
    switch (sortBy) {
      case 'popular':
        sorted.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'latest':
      default:
        // Keep original order
        break;
    }

    return sorted;
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Breadcrumb Section */}
      <div className="bg-[#f5f5f5] py-3 border-b border-gray-200 mb-6">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase">
            <Link href="/" className="text-gray-500 hover:text-primary transition-colors">HOME</Link>
            <span className="text-gray-300">/</span>
            <span className="text-foreground">SHOP</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 w-full">

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Sidebar - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-3 sm:p-4">
              <h2 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-foreground uppercase tracking-wide">Categories</h2>
              <div className="space-y-1">
                {allCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${selectedCategory === category
                      ? 'bg-primary text-primary-foreground font-semibold'
                      : 'hover:bg-secondary text-foreground'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="w-full px-3 sm:px-4 py-2 bg-card border border-border rounded-lg flex items-center justify-between text-foreground text-sm sm:text-base mb-4 transition-colors hover:bg-secondary"
              >
                <span className="font-medium">Filters & Categories</span>
                <ChevronDown
                  className={`w-4 h-4 flex-shrink-0 transition-transform ${isMobileFilterOpen ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {isMobileFilterOpen && (
                <div className="mb-4 max-h-96 overflow-y-auto bg-card border border-border rounded-lg p-3">
                  <h2 className="font-bold text-sm mb-3 text-foreground uppercase tracking-wide">Categories</h2>
                  <div className="space-y-1">
                    {allCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${selectedCategory === category
                          ? 'bg-primary text-primary-foreground font-semibold'
                          : 'hover:bg-secondary text-foreground'
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="mb-4 sm:mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search e-books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-card text-sm"
                />
                <Search className="absolute right-3 top-2.5 w-5 h-5 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Top Bar */}
            <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1 break-words">
                  {selectedCategory === 'All Categories' ? 'All E-Books' : selectedCategory}
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Showing {filteredAndSortedProducts.length} results
                </p>
              </div>

              {/* Sort Dropdown */}
              <div className="w-full">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 bg-card border border-border rounded-lg text-foreground text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                >
                  <option value="latest">Latest</option>
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-sm sm:text-base">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
