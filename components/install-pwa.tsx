'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Download } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/context/language-context';

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

            // Show the install toast
            showInstallToast(e);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const showInstallToast = (promptEvent: any) => {
        toast.info(t('pwa.install_title'), {
            description: t('pwa.install_description'),
            duration: 10000,
            action: {
                label: t('pwa.install_button'),
                onClick: () => {
                    if (promptEvent) {
                        promptEvent.prompt();
                        promptEvent.userChoice.then((choiceResult: any) => {
                            if (choiceResult.outcome === 'accepted') {
                                console.log('User accepted the install prompt');
                            } else {
                                console.log('User dismissed the install prompt');
                            }
                            setDeferredPrompt(null);
                        });
                    }
                },
            },
        });
    };

    if (isInstalled) return null;

    return null; // This component doesn't render anything visible directly, it uses toasts
}
