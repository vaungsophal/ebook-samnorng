'use client';

import React, { useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const banners = [
    { id: 1, src: '/banners/banner-1.png', alt: 'Engineering Knowledge Banner 1' },
    { id: 2, src: '/banners/banner-2.png', alt: 'Construction Resources Banner 2' },
];

export function BannerSlider() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="relative group overflow-hidden bg-gray-100 w-full h-[300px] sm:h-[450px] lg:h-[536px] rounded shadow-sm">
            <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                    {banners.map((banner, index) => (
                        <div key={banner.id} className="flex-[0_0_100%] min-w-0 relative h-full">
                            <Image
                                src={banner.src}
                                alt={banner.alt}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                                priority={index === 0}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 960px"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={scrollPrev}
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={scrollNext}
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className={`w-2 h-2 rounded-full transition-all ${selectedIndex === index ? 'bg-white w-6' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
