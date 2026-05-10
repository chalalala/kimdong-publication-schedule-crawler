'use client';

import { Button } from '@/components/ui/button';
import { useStandalone } from '@/hooks/useStandalone';
import { useIsIOS } from '@/hooks/useIsIOS';
import { useDeferredPrompt } from '@/hooks/useDeferredPrompt';

export function InstallPrompt() {
  const isStandalone = useStandalone();
  const isIOS = useIsIOS();
  const { deferredPrompt, clearPrompt } = useDeferredPrompt(!isStandalone);

  // Don't render if:
  // - Still checking standalone mode
  // - App is running in standalone mode
  // - No deferred prompt available (app is already installed)
  if (isStandalone === null || isStandalone || !deferredPrompt) return null;

  const triggerInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    clearPrompt();
  };

  return (
    <div className='fixed bottom-6 z-50'>
      <div className='w-full border-b border-gray-200 bg-white/90 shadow-sm backdrop-blur-sm'>
        <div className='mx-auto flex items-center justify-between gap-4 px-4 py-2'>
          <div className='flex items-center gap-4'>
            <div>
              <h3 className='text-sm font-medium'>Install App</h3>
              <p className='text-xs text-muted-foreground'>Add to your home screen for quick access.</p>
            </div>
            {isIOS && (
              <p className='hidden text-xs text-muted-foreground sm:block'>
                To install on iOS: tap the share button ⎋ then &quot;Add to Home Screen&quot; ➕.
              </p>
            )}
          </div>

          <div className='flex items-center gap-2'>
            <Button size='sm' onClick={triggerInstall} aria-label={'Add to Home Screen'}>
              Add to Home Screen
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
