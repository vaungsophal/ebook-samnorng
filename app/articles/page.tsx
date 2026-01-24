'use client';

import { Header } from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'Introduction to Structural Steel Design',
    excerpt: 'Learn the fundamentals of structural steel design and how to apply Eurocode 3 standards in your projects.',
    category: 'Structural Design',
    author: 'Dr. Sarah Johnson',
    date: '2024-01-15',
    readTime: '8 min',
  },
  {
    id: 2,
    title: 'Fire Safety in High-Rise Buildings',
    excerpt: 'Explore the latest fire safety considerations for multi-storey construction projects.',
    category: 'Fire Safety',
    author: 'Prof. Michael Chen',
    date: '2024-01-12',
    readTime: '12 min',
  },
  {
    id: 3,
    title: 'Sustainable Construction Materials',
    excerpt: 'Discover eco-friendly building materials that meet modern engineering standards.',
    category: 'Materials',
    author: 'Emma Williams',
    date: '2024-01-10',
    readTime: '10 min',
  },
  {
    id: 4,
    title: 'Foundation Design Best Practices',
    excerpt: 'Master the principles of soil mechanics and foundation engineering for various soil conditions.',
    category: 'Foundation',
    author: 'Dr. James Park',
    date: '2024-01-08',
    readTime: '15 min',
  },
  {
    id: 5,
    title: 'Project Management in Construction',
    excerpt: 'Learn proven strategies for managing large-scale construction projects efficiently.',
    category: 'Project Management',
    author: 'Lisa Anderson',
    date: '2024-01-05',
    readTime: '11 min',
  },
  {
    id: 6,
    title: 'Water Resource Engineering Fundamentals',
    excerpt: 'Understanding hydraulics and water management systems in infrastructure development.',
    category: 'Water Engineering',
    author: 'Dr. Robert Kumar',
    date: '2024-01-02',
    readTime: '9 min',
  },
];

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Breadcrumb Section */}
      <div className="bg-[#f5f5f5] py-3 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase">
            <Link href="/" className="text-gray-500 hover:text-primary transition-colors">HOME</Link>
            <span className="text-gray-300">/</span>
            <span className="text-foreground">ARTICLES</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 max-w-6xl mx-auto px-2 sm:px-4 py-6 sm:py-12 w-full">

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Engineering Articles & Resources
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12">
          Stay updated with the latest insights, best practices, and industry trends in civil engineering
        </p>

        {/* Featured Article */}
        {articles.length > 0 && (
          <div className="mb-12 sm:mb-16">
            <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="h-64 sm:h-full min-h-64 bg-gradient-to-br from-primary to-primary/50 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl sm:text-6xl font-bold text-primary-foreground/20 mb-4">★</div>
                      <p className="text-primary-foreground/60 text-sm">Featured Article</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-primary font-semibold mb-3">
                      {articles[0].category}
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                      {articles[0].title}
                    </h2>
                    <p className="text-sm sm:text-base text-foreground leading-relaxed mb-6">
                      {articles[0].excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex flex-col gap-2 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{articles[0].author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(articles[0].date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm flex items-center gap-2">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {articles.slice(1).map((article) => (
              <div
                key={article.id}
                className="bg-card rounded-lg border border-border p-5 sm:p-6 hover:shadow-lg hover:border-primary/50 transition-all group"
              >
                <p className="text-xs uppercase tracking-wide text-primary font-semibold mb-3 group-hover:text-primary/80 transition-colors">
                  {article.category}
                </p>

                <h3 className="font-bold text-base sm:text-lg text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-foreground mb-4 line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex flex-col gap-3 border-t border-border pt-3 mb-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{article.author}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <button className="w-full px-3 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all font-medium text-sm">
                  Read Article
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-12 sm:mt-16 bg-primary text-primary-foreground rounded-lg border border-primary/20 p-6 sm:p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Subscribe to Our Newsletter</h2>
            <p className="mb-6 text-sm sm:text-base opacity-90">
              Get the latest articles, engineering tips, and industry insights delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
