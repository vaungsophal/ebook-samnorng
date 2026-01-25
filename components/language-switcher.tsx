'use client';

import Image from 'next/image';
import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ className }: { className?: string }) {
    const { language, setLanguage } = useLanguage();

    return (
        <div className={cn("flex items-center gap-3", className)}>
            <button
                onClick={() => setLanguage('km')}
                className={cn(
                    "relative w-9 h-6 sm:w-11 sm:h-8 overflow-hidden rounded shadow-sm transition-all hover:scale-110 active:scale-95",
                    language === 'km' ? "ring-2 ring-yellow-400 ring-offset-1" : "opacity-60 grayscale-[0.3] hover:opacity-100 hover:grayscale-0"
                )}
                title="Khmer"
            >
                <Image
                    src="/langs/km.png"
                    alt="Khmer"
                    fill
                    className="object-cover"
                />
            </button>
            <button
                onClick={() => setLanguage('en')}
                className={cn(
                    "relative w-9 h-6 sm:w-11 sm:h-8 overflow-hidden rounded shadow-sm transition-all hover:scale-110 active:scale-95",
                    language === 'en' ? "ring-2 ring-yellow-400 ring-offset-1" : "opacity-60 grayscale-[0.3] hover:opacity-100 hover:grayscale-0"
                )}
                title="English"
            >
                <Image
                    src="/langs/en.png"
                    alt="English"
                    fill
                    className="object-cover"
                />
            </button>
        </div>
    );
}
