'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled up to given distance
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top coordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className={`fixed bottom-6 right-6 z-[100] transition-all duration-500 ${isVisible ? 'opacity-20 hover:opacity-60 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
            <button
                type="button"
                onClick={scrollToTop}
                className="text-gray-500 transition-all duration-300 hover:scale-125 active:scale-95 flex items-center justify-center p-2"
                aria-label="Scroll to top"
            >
                <ChevronUp className="w-6 h-6" strokeWidth={1.5} />
            </button>
        </div>
    );
}
