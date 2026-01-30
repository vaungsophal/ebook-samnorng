'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Download, Smartphone, X } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/context/language-context';
import Image from 'next/image';

export function InstallPWA() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isInstalled, setIsInstalled] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        // Check if service worker is supported and register it
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(
                    (registration) => {
                        console.log('SW registered: ', registration);
                    },
                    (registrationError) => {
                        console.log('SW registration failed: ', registrationError);
                    }
                );
            });
        }

        // Check if app is already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true);
        }

        const handler = (e: any) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);

            // Show the install toast with a slight delay
            setTimeout(() => {
                showInstallToast(e);
            }, 3000);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const showInstallToast = (promptEvent: any) => {
        toast.custom((id) => (
            <div className="bg-white border-2 border-[#064884]/10 shadow-2xl rounded-2xl p-4 flex items-center gap-4 max-w-sm w-full animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex-shrink-0 w-12 h-12 bg-[#064884]/5 rounded-xl flex items-center justify-center p-1 border border-[#064884]/10">
                    <Image src="/favicon.png" alt="App Logo" width={40} height={40} className="rounded-lg shadow-sm" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-black text-[#064884] leading-tight mb-0.5">
                        {t('pwa.install_title')}
                    </h3>
                    <p className="text-[12px] text-gray-500 font-medium leading-snug line-clamp-2">
                        {t('pwa.install_description')}
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => {
                            if (promptEvent) {
                                promptEvent.prompt();
                                promptEvent.userChoice.then((choiceResult: any) => {
                                    if (choiceResult.outcome === 'accepted') {
                                        toast.dismiss(id);
                                    }
                                    setDeferredPrompt(null);
                                });
                            }
                        }}
                        className="bg-[#064884] text-white text-[12px] font-bold px-4 py-2 rounded-lg hover:bg-[#004b8d] transition-all whitespace-nowrap shadow-md shadow-[#064884]/20 active:scale-95"
                    >
                        {t('pwa.install_button')}
                    </button>
                    <button
                        onClick={() => toast.dismiss(id)}
                        className="text-[11px] text-gray-400 hover:text-gray-600 font-bold text-center underline decoration-dotted underline-offset-2"
                    >
                        Not now
                    </button>
                </div>
            </div>
        ), {
            duration: 15000,
            position: 'top-center'
        });
    };

    if (isInstalled) return null;

    return null;
}
