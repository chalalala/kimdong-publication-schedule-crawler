import { CrawlData } from '@/types/CrawlData';

export const exportData = (data: (CrawlData | undefined)[]) => {
  if (!data) {
    return;
  }

  const blob = new Blob([JSON.stringify(data, undefined, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.href = url;
  const fileName = 'publication-schedule.json';

  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
};
