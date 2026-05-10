import { useEffect, useState } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

declare global {
  interface Window {
    __deferredInstallPrompt?: BeforeInstallPromptEvent | null;
  }
}

/**
 * Hook to manage the deferred install prompt
 * Listens for the beforeinstallprompt event and provides state management
 * @param enabled - Whether to listen for the prompt event (e.g., disable when in standalone mode)
 */
export function useDeferredPrompt(enabled: boolean = true) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      const installPrompt = event as BeforeInstallPromptEvent;
      setDeferredPrompt(installPrompt);
      window.__deferredInstallPrompt = installPrompt;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [enabled]);

  const clearPrompt = () => {
    setDeferredPrompt(null);
    window.__deferredInstallPrompt = null;
  };

  return { deferredPrompt, clearPrompt };
}
