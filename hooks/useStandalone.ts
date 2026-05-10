import { useEffect, useState } from 'react';

declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

/**
 * Hook to detect if the app is running in standalone mode (installed PWA)
 * Checks multiple methods for compatibility across platforms:
 * - CSS media query: (display-mode: standalone)
 * - iOS Safari: navigator.standalone
 * - Android: android-app:// referrer
 */
export function useStandalone() {
  const [isStandalone, setIsStandalone] = useState<boolean | null>(null);

  useEffect(() => {
    const checkStandalone = (): boolean => {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        navigator.standalone === true ||
        document.referrer.includes('android-app://')
      );
    };

    const isStandaloneMode = checkStandalone();
    setIsStandalone(isStandaloneMode);

    // Listen for display-mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      setIsStandalone(e.matches);
    };

    mediaQuery.addEventListener('change', handleDisplayModeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleDisplayModeChange);
    };
  }, []);

  return isStandalone;
}
