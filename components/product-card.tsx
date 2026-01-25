'use client';

import { Star, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '@/lib/products';

interface ProductCardProps extends Product { }

export function ProductCard({
  id,
  title,
  image,
  price,
  rating,
  reviews,
  category,
  description,
  details,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    const product: Product = {
      id,
      title,
      image,
      price,
      rating,
      reviews,
      category,
      description,
      details,
    };
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };
  return (
    <div className="bg-white hover:shadow-xl transition-all h-full flex flex-col group border border-[#eee] rounded-sm overflow-hidden">
      {/* Image Container - Clickable */}
      <Link href={`/product/${id}`} className="relative w-full aspect-[2/3] overflow-hidden cursor-pointer block bg-[#f3f3f3]">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-0 right-0 bg-[#b22222] text-white px-2 py-1 text-[11px] font-bold z-10">
          NEW
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col items-center text-center flex-grow">
        {/* Category */}
        <p className="text-[11px] sm:text-[12px] text-[#888] mb-2 uppercase tracking-wider font-bold">
          {category}
        </p>

        {/* Title - Clickable */}
        <Link href={`/product/${id}`} className="hover:text-[#2b3a8c] transition-colors mb-2">
          <h3 className="font-black text-[17px] sm:text-[19px] text-[#2b3a8c] line-clamp-3 leading-[1.4] min-h-[75px]">
            {title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-0.5 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(rating)
                ? 'fill-[#f39c12] text-[#f39c12]'
                : 'text-gray-200'
                }`}
            />
          ))}
        </div>

        {/* Price */}
        <div className="mt-auto pt-2">
          <span className="text-xl sm:text-2xl font-black text-[#111]">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
