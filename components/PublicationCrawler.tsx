'use client';

import React, { useState } from 'react';
import ScheduleLinkInput from './ScheduleLinkInput';
import ScheduleData from './ScheduleData';
import { CrawlData } from '@/types/CrawlData';

const PublicationCrawler = () => {
  const [crawlData, setCrawlData] = useState<CrawlData[] | undefined>();
  const [url, setUrl] = useState(
    () => `https://nxbkimdong.com.vn/blogs/lich-phat-hanh-sach-dinh-ky/lich-phat-hanh-sach-dinh-ki-thang-${new Date().getMonth() + 2}-2024`
  );

  return url && crawlData ? (
    <ScheduleData data={crawlData} inputUrl={url} setUrl={setUrl} setCrawlData={setCrawlData} />
  ) : (
    <ScheduleLinkInput url={url} setUrl={setUrl} setCrawlData={setCrawlData} />
  );
};

export default PublicationCrawler;
