import { useEffect, useState } from 'react';

/**
 * Hook to detect if the app is running on iOS
 * Checks for iPad/iPhone/iPod user agents and excludes IE on Windows
 */
export function useIsIOS() {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
    setIsIOS(isIOSDevice);
  }, []);

  return isIOS;
}
