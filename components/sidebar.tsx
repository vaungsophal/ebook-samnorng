'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Category {
  name: string;
  subcategories?: string[];
}

const categories: Category[] = [
  {
    name: 'Structural Analysis',
    subcategories: [
      'Steel Structures',
      'Concrete Design',
      'Foundation Design',
      'Seismic Design'
    ]
  },
  {
    name: 'Construction Management',
    subcategories: [
      'Project Management',
      'Cost Estimation',
      'Scheduling',
      'Safety Management'
    ]
  },
  {
    name: 'Building Materials',
    subcategories: [
      'Concrete Technology',
      'Steel Materials',
      'Building Stones',
      'Timber'
    ]
  },
  {
    name: 'Geotechnical Engineering',
    subcategories: [
      'Soil Mechanics',
      'Foundation Analysis',
      'Earth Dams',
      'Slope Stability'
    ]
  },
  {
    name: 'Transportation',
    subcategories: [
      'Highway Design',
      'Bridge Engineering',
      'Railway Engineering',
      'Airport Design'
    ]
  },
  {
    name: 'Water Resources',
    subcategories: [
      'Hydraulics',
      'Water Supply',
      'Irrigation Systems',
      'Drainage'
    ]
  },
  {
    name: 'Standards & Codes',
    subcategories: [
      'Building Codes',
      'Design Standards',
      'Safety Regulations',
      'Environmental Guidelines'
    ]
  }
];

export function Sidebar() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <aside className="w-full lg:w-64 bg-card border border-border lg:border-r rounded-lg lg:rounded-lg">
      <div className="p-3 sm:p-4">
        <h2 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-foreground uppercase tracking-wide">Categories</h2>
        <div className="space-y-1">
          {categories.map((category) => (
            <div key={category.name}>
              <button
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === category.name ? null : category.name
                  )
                }
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-secondary text-foreground text-xs sm:text-sm transition-colors active:bg-primary/20"
              >
                <span className="font-medium truncate">{category.name}</span>
                {category.subcategories && (
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 ml-2 transition-transform ${
                      expandedCategory === category.name ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>

              {expandedCategory === category.name && category.subcategories && (
                <div className="ml-2 space-y-1 mt-1 pl-2 border-l-2 border-primary/30">
                  {category.subcategories.map((sub) => (
                    <a
                      key={sub}
                      href="#"
                      className="block px-3 py-2 text-xs sm:text-sm text-primary hover:text-primary/80 hover:bg-secondary rounded transition-colors truncate"
                    >
                      {sub}
                    </a>
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
