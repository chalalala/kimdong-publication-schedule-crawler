'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  async function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      });

      // registration successful
      console.log('Service worker registered:', registration);
    } catch (err) {
      console.error('Service worker registration failed:', err);
    }
  }

  useEffect(() => {
    registerServiceWorker();
  }, []);

  return null;
}
