'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Category {
  name: string;
  subcategories?: string[];
}

import { categoryStructure } from '@/lib/products';
import { useLanguage } from '@/context/language-context';
import Link from 'next/link';

export function Sidebar({ selectedCategory }: { selectedCategory?: string }) {
  const { t, language } = useLanguage();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(() => {
    // Auto-expand if a subcategory within this category is selected
    if (selectedCategory) {
      const parent = categoryStructure.find(cat => cat.subcategories.includes(selectedCategory));
      return parent ? parent.name : null;
    }
    return null;
  });

  return (
    <aside className="w-full lg:w-64 bg-card border border-border lg:border-r rounded-lg lg:rounded-lg">
      <div className="p-3 sm:p-4">
        <h3 className="font-black text-sm sm:text-base mb-3 sm:mb-4 text-foreground uppercase tracking-widest border-b border-border pb-2">
          {t('common.categories_title')}
        </h3>
        <div className="space-y-1">
          {/* All Categories Link */}
          <Link
            href="/shop"
            className={`w-full flex items-center px-3 py-2 rounded-lg hover:bg-secondary transition-colors font-bold uppercase tracking-wider mb-1 ${!selectedCategory || selectedCategory === 'All Categories'
                ? 'bg-primary text-primary-foreground text-xs sm:text-sm'
                : 'text-foreground text-xs sm:text-sm'
              }`}
          >
            {t('common.all_categories')}
          </Link>

          {categoryStructure.map((category) => (
            <div key={category.name}>
              <button
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === category.name ? null : category.name
                  )
                }
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-secondary text-foreground text-xs sm:text-sm transition-colors active:bg-primary/20 group"
              >
                <span className={`font-bold truncate text-left ${expandedCategory === category.name ? 'text-primary' : ''}`}>
                  {t(`categories.${category.name}`)}
                </span>
                {category.subcategories && (
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 ml-2 transition-transform ${expandedCategory === category.name ? 'rotate-180 text-primary' : 'text-muted-foreground'
                      }`}
                  />
                )}
              </button>

              {expandedCategory === category.name && category.subcategories && (
                <div className="ml-3 space-y-1 mt-1 pl-3 border-l-2 border-primary/20">
                  {category.subcategories.map((sub) => (
                    <Link
                      key={sub}
                      href={`/shop?category=${encodeURIComponent(sub)}`}
                      className={`block px-3 py-2 text-[11px] sm:text-xs transition-colors truncate font-bold uppercase tracking-tight rounded ${selectedCategory === sub
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:text-primary hover:bg-secondary'
                        }`}
                    >
                      {t(`categories.${sub}`)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

        </div>
      </div>
    </aside>
  );
}
