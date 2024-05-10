'use client';

import React, { useState } from 'react';
import ScheduleLinkInput from './ScheduleLinkInput';
import ScheduleData from './ScheduleData';
import { CrawlData } from '@/types/CrawlData';

const PublicationCrawler = () => {
  const [crawlData, setCrawlData] = useState<CrawlData[] | undefined>();
  const [url, setUrl] = useState('');

  return url && crawlData ? (
    <ScheduleData data={crawlData} inputUrl={url} setUrl={setUrl} />
  ) : (
    <ScheduleLinkInput url={url} setUrl={setUrl} setCrawlData={setCrawlData} />
  );
};

export default PublicationCrawler;
